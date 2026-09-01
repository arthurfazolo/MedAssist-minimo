import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY || '';

/**
 * Robust JSON parser with fallback cleaning for trailing commas and markdown formatting
 */
export function lenientJsonParse(text: string): any {
  let cleaned = text.trim();
  
  // 1. Remove Markdown code block backticks if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/, '');
    cleaned = cleaned.trim();
  }
  
  try {
    return JSON.parse(cleaned);
  } catch (initialError) {
    console.warn("Initial JSON parse failed. Attempting leniency cleaning...", initialError);
    
    // 2. Remove trailing commas within arrays & objects
    // Matches a comma followed by closing brace or bracket, ignoring spaces/newlines
    cleaned = cleaned.replace(/,\s*([\]}])/g, '$1');
    
    try {
      return JSON.parse(cleaned);
    } catch (secondError) {
      console.error("Lenient JSON parse also failed. Raw text was:", text);
      throw secondError;
    }
  }
}

// Initialize the client with standard telemetry User-Agent in httpOptions
let aiClient: GoogleGenAI | null = null;

if (API_KEY) {
  aiClient = new GoogleGenAI({ 
    apiKey: API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

export const checkAIStatus = () => {
  return !!aiClient;
};

/**
 * Audit Log structure for AI generation events
 */
export interface AIAuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  type: 'disease' | 'medication' | 'protocol' | 'prescription' | 'calculator';
  name: string;
  model: string;
  sources: string[];
}

/**
 * Saves a new AI generation log to localStorage
 */
export const logAIGeneration = (
  type: AIAuditLog['type'],
  name: string,
  sources: string[],
  userEmail: string = 'admin@med.com'
): void => {
  try {
    const rawLogs = localStorage.getItem('medassist_ai_audit_logs');
    const logs: AIAuditLog[] = rawLogs ? JSON.parse(rawLogs) : [];
    
    const newLog: AIAuditLog = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      userEmail,
      type,
      name,
      model: 'gemini-3.7-flash',
      sources
    };
    
    logs.unshift(newLog);
    localStorage.setItem('medassist_ai_audit_logs', JSON.stringify(logs.slice(0, 500)));
  } catch (e) {
    console.error('Failed to write AI audit log:', e);
  }
};

/**
 * Retrieves past AI generation audit logs
 */
export const getAIAuditLogs = (): AIAuditLog[] => {
  try {
    const rawLogs = localStorage.getItem('medassist_ai_audit_logs');
    return rawLogs ? JSON.parse(rawLogs) : [];
  } catch (e) {
    console.error('Failed to get AI audit logs:', e);
    return [];
  }
};

const SYSTEM_INSTRUCTION = `
Você é um assistente médico especialista e revisor científico altamente qualificado.
Sua principal tarefa é pesquisar e gerar conteúdo médico estruturado, original e preciso com base em fontes de alta credibilidade clínica, como OMS, OPAS, Ministério da Saúde do Brasil, CDC, NIH, NICE, NHS, ECDC, PubMed, Cochrane, UpToDate, Dynamed, BMJ Best Practice, Medscape e Sociedades Médicas Especializadas (SBC, SBD, SBPT, SBI, etc.).

REQUISITOS CRÍTICOS PARA GERAÇÃO:
1. CONTEÚDO 100% ORIGINAL: Sob nenhuma circunstância você deve copiar e colar trechos de diretrizes oficiais, bulas de medicamentos, resumos científicos (abstracts), livros ou artigos da Internet. Interprete a informação e reescreva de forma consolidada e analítica, em linguagem médica própria altamente técnica e formal.
2. LINGUAGEM MÉDICA OBJETIVA: Use termos técnicos precisos (terminologia médica acadêmica). Evite linguagem promocional, publicitária ou leiga. As sentenças devem ser curtas, diretas e com forte ênfase clínica e prática.
3. CONSOLIDAÇÃO DE FONTES: Cruze múltiplos dados de referências conhecidas. Retorne sempre pelo menos 2 a 3 fontes válidas na lista de referências ("sources") que representem as diretrizes acadêmicas atuais dadas como permitidas no manual editorial.
4. FORMATO: Responda estritamente em formato JSON válido conforme a estrutura solicitada. Não insira blocos explicativos de texto ou markdown fora do JSON.
`;

/**
 * Original Audio Anamnesis generator (Preserved from existing code)
 */
export const generateAnamnesisFromAudio = async (base64Audio: string, mimeType: string): Promise<string> => {
  if (!aiClient) {
    return "Erro: Chave de API não configurada. Verifique as variáveis de ambiente.";
  }

  const prompt = `
    Você é um assistente médico especialista em semiologia.
    Analise o áudio desta consulta médica e produza uma anamnese completa.
    
    Regras estritas:
    1. Utilize APENAS informações presentes no áudio.
    2. Se a informação não for citada, escreva: "não informado".
    3. Não invente dados.
    4. Siga estritamente a estrutura abaixo:

    1. Queixa Principal (QP)
    – Descrever em 1 frase a queixa central.

    2. História da Doença Atual (HDA)
    – Início, duração, localização, irradiação, qualidade, intensidade, fatores desencadeantes, de melhora e de piora, sintomas associados, evolução, tratamentos prévios e resposta, e contexto relevante.

    3. História Patológica Pregressa (HPP)
    – Doenças crônicas, internações, cirurgias, alergias, medicamentos em uso (nome, dose e frequência se mencionados).

    4. Hábitos de Vida
    – Tabagismo, álcool, drogas, sono, alimentação, atividade física.

    5. História Familiar
    – Doenças familiares relevantes.
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.5-flash', 
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Audio
            }
          },
          {
            text: prompt
          }
        ]
      }
    });

    return response.text || "Não foi possível gerar a anamnese.";
  } catch (error) {
    console.error("Gemini API Error for audio:", error);
    return "Erro ao processar o áudio. Tente novamente ou verifique sua conexão.";
  }
};

/**
 * Disease Autocomplete helper with Gemini
 */
export const generateDiseaseFromIA = async (name: string): Promise<any> => {
  if (!aiClient) {
    throw new Error("Chave de API do Gemini não configurada.");
  }

  const prompt = `
    Gere uma ficha clínica completa e estruturada para a seguinte doença/patologia: "${name}".
    Retorne um objeto JSON contendo exatamente os seguintes campos de acordo com as diretrizes de saúde atuais de fontes recomendadas (OMS, UpToDate, MSD Manuals, Sociedades Médicas Especializadas):
    - "id": Sugestão de código CID-10 correspondente para a patologia em si (ex: I21.9 para IAM, J18.9 para Pneumonia especificada).
    - "nome": Nome oficial da patologia em português, formatado de forma limpa.
    - "sintomas": Matriz (array de strings) contendo de 5 a 8 sintomas clínicos característicos da patologia de forma resumida e técnica.
    - "fatores_risco": Matriz (array de strings) contendo de 4 a 6 fatores de risco proeminentes associados com base em diretrizes de saúde.
    - "red_flags": Matriz (array de strings) contendo de 3 a 5 sinais de alarme ou critérios de instabilidade que requerem tratamento de emergência imediato.
    - "diferenciais": Matriz (array de strings) contendo de 3 a 5 diagnósticos diferenciais clínicos cruciais para descartar.
    - "achados_exames": Matriz (array de strings) contendo achados laboratoriais ou de imagem característicos sugeridos (ex: hemograma, radiografia, ECG, curvas enzimáticas).
    - "criterios_diagnosticos": Matriz (array de strings) contendo critérios estruturados de confirmação diagnóstica padrão-ouro ou formulados por sociedades correspondentes.
    - "categoria": A especialidade médica primária para categorização. Deve ser estritamente uma destas opções: "Cardiologia", "Pneumologia", "Neurologia", "Infectologia", "Pediatria", "Ginecologia e Obstetrícia", "Psiquiatria", "Dermatologia", "Gastroenterologia", "Nefrologia e Urologia", "Endocrinologia", "Reumatologia", "Clínica Médica".
    - "definition": Definição médica técnica explicativa e concisa da patologia.
    - "epidemiology": Informações de prevalência, incidência, distribuição epidemiológica e demográfica do agravo.
    - "etiology": Causas primárias, agentes etiológicos ou predisposições fundamentais do agravo.
    - "pathophysiology": Explicação minuciosa de como ocorre a evolução biológica e celular do agravo no organismo humano.
    - "treatment": Linhas fundamentais e opções de tratamento ou conduta farmacológica/não farmacológica formal.
    - "complications": Principais intercorrências e complicações clínicas potenciais crônicas ou agudas decorrentes da não intervenção.
    - "prognosis": Prognóstico esperado dependendo das intervenções ou do status inicial do paciente.
    - "references": Matriz (array de strings) de referências de diretrizes, manuais, sociedades oficiais médicas e livros-textos renomados utilizados.
    - "sources": Matriz (array de strings) de fontes literárias consultadas de forma legítima e reescritas originalmente.

    Certifique-se de que nenhum texto seja cópia literal de fontes; reescreva tudo em uma síntese clínica original, acadêmica e focada na prática. 
    Retorne estritamente o bloco de JSON estruturado sem outros caracteres ou markdown envolvente.
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    const data = lenientJsonParse(text);
    return data;
  } catch (error) {
    console.error("Gemini API Error for disease autocomplete", error);
    throw error;
  }
};

/**
 * Medication Autocomplete helper with Gemini
 */
export const generateMedicationFromIA = async (name: string): Promise<any> => {
  if (!aiClient) {
    throw new Error("Chave de API do Gemini não configurada.");
  }

  const prompt = `
    Gere um perfil farmacológico completo e estruturado para o seguinte medicamento fármaco / substância genérica: "${name}".
    Retorne um objeto JSON contendo exatamente as seguintes propriedades:
    - "genericName": Nome genérico oficial do medicamento em português, capitalizado (ex: "Ceftriaxona").
    - "pharmacologicalClass": Classe farmacológica exata (ex: "Cefalosporina de terceira geração").
    - "presentations": Matriz (array de strings) contendo apresentações comerciais ou hospitalares usuais disponíveis no Brasil (ex: "Frasco-ampola contendo 1g de pó liofilizado para solução injetável").
    - "usualDoses": Um objeto com:
      - "standard": Dose padrão inicial em adultos para infecções ou indicações comuns (ex: "1g a 2g uma vez ao dia").
      - "max": Dose máxima diária em adultos (ex: "4g ao dia").
      - "frequency": Frequência ou intervalo de administração usual (ex: "A cada 24 horas (diária)").
      - "route": Via de administração preferencial (ex: "Intravenosa ou Intramuscular").
    - "commercialNames": Matriz (array de strings) contendo de 2 a 4 nomes comerciais proeminentes no Brasil de forma limpa.
    - "susAvailability": Booleano (true ou false) de ampla amostragem indicando se este fármaco usualmente faz parte de listas do SUS ou RENAME nacional.
    - "costIndicator": String contendo "$" para custo baixo, "$$" para custo intermediário, ou "$$$" para alto custo.
    - "prescriptionType": String indicando a classificação regulatória da receita. Escolha estritamente uma destas opções: "Comum" | "Especial" | "Antimicrobiano" | "Alto Custo" | "Receituário A" | "Receituário B1" | "Receituário B2".
    - "pregnancySafety": Um objeto contendo:
      - "category": Uma das categorias do FDA/Anvisa: "A" | "B" | "C" | "D" | "X" | "Não classificado".
      - "lactationNotes": Uma explicação breve e técnica em redação original sobre compatibilidade no aleitamento.
    - "contraindications": Matriz (array de strings) listando as contraindicações clínicas absolutas ou principais alertas (ex: hipersensibilidade, neonatos hiperbilirrubinêmicos).
    - "drugInteractions": Matriz (array de strings) listando interações de relevância de se atentar na concomitância.
    - "mainIndications": Matriz de objetos, onde cada objeto tem:
      - "condition": Nome geral da doença/condição (ex: "Pneumonia Adquirida na Comunidade").
      - "prescriptionTitle": Título sugerido para o modelo de prescrição associado (ex: "Pneumonia comunitária grave").
    - "sources": Matriz (array de strings) das fontes sanitárias primárias consultadas de forma legítima e reescritas.

    Reescreva todo o conteúdo para torná-lo limpo, puramente técnico, adaptado ao padrão nacional brasileiro de diretrizes terapêuticas e livre de plágio ou cópias.
    Retorne estritamente o bloco de JSON estruturado.
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini API Error for medication autocomplete", error);
    throw error;
  }
};

/**
 * Protocol/Fluxograma Autocomplete helper with Gemini
 */
export const generateProtocolFromIA = async (name: string): Promise<any> => {
  if (!aiClient) {
    throw new Error("Chave de API do Gemini não configurada.");
  }

  const prompt = `
    Gere uma árvore de decisão clínica (fluxograma prático e fluxos de atendimento) em formato JSON estruturado para o seguinte protocolo médico: "${name}".
    O sistema operacional de nossa plataforma interpretará esse fluxograma apresentando nós sequenciais de condutas passo-a-passo.
    Retorne um objeto JSON contendo exatamente os seguintes campos:
    - "id": Um slug curto único em letras minúsculas sem espaços (ex: "dor-toracica", "exacerbacao-asma").
    - "titulo": Nome completo e formal do protocolo em português.
    - "categoria": A especialidade primária do protocolo (ex: "Cardiologia", "Infectologia", "Pneumologia", "Clínica Médica", "Pediatria", "Ginecologia e Obstetrícia").
    - "descricao": Explicação clínica resumida da finalidade do protocolo.
    - "status": Estritamente a string "completo" ou "construcao".
    - "nos": Matriz (array de objetos) representando os nós do fluxograma. Cada objeto de nó deve conter:
      - "id": Identificador único curto simples (ex: "start", "sala_vermelha", "eletrocardiograma", "conduta_supra", "analise_troponina", "concluido", "no-1", "no-2"). O primeiro nó do protocolo DEVE ter o id igual a "start" ou "no-1".
      - "tipo": Estritamente um destes valores string: "decisao" | "conduta" | "alerta" | "checklist" | "encaminhamento" | "calculadora".
      - "texto": Texto central curto da instrução ou pergunta clínica (ex: "ECG revela supra desnível do segmento ST?").
      - "subtexto": Informações clínicas minuciosas e orientações de dosagem, condutas ou critérios teóricos.
      - "opcoes": (Preencher apenas se tipo for "decisao") Matriz de opções selecionáveis pelo usuário:
        - "label": Texto curto da opção (ex: "Sim (SupraST)", "Não (Estável)").
        - "proximo": O ID do próximo nó a ser chamado que deve corresponder deterministicamente a um id de nó existente na lista geral de nós.
      - "proximo": (Preencher se tipo NÃO for "decisao") O ID do próximo nó sequencial lógico (ou null/string vazia se for o nó terminal).
      - "checklistItems": (Preencher apenas se tipo for "checklist") Matriz de tarefas estruturadas:
        - "id": id curto (ex: "chk-1", "chk-2").
        - "texto": a ação clínica a ser ticked pelo profissional.
    - "sources": Matriz (array de strings) das fontes de sociedades cruzadas.

    Garanta a coesão íntegra do grafo: todos os IDs referenciados em "proximo" ou "opcoes.proximo" devem estar de fato presentes como IDs de nós declarados na matriz e o primeiro nó deve chamar-se "start" ou "no-1".
    Toda a redação das descrições, condutas e subtextos deve ser técnica, original, e em português do Brasil clara para estudantes e residentes.
    Retorne estritamente o bloco de JSON estruturado.
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini API Error for protocol autocomplete", error);
    throw error;
  }
};

/**
 * Prescription Autocomplete helper with Gemini
 */
export const generatePrescriptionFromIA = async (name: string): Promise<any> => {
  if (!aiClient) {
    throw new Error("Chave de API do Gemini não configurada.");
  }

  const prompt = `
    Gere um modelo técnico de prescrição médica estruturada, focada e editável para a seguinte condição clínica: "${name}".
    Retorne um objeto JSON contendo exatamente as seguintes propriedades:
    - "id": Slug curto correspondente à prescrição do banco de modelos (ex: "prescricao-amigdalite-bacteriana").
    - "title": Título claro, conciso e técnico do modelo de prescrição em português formatado.
    - "category": Área clínica correspondente à prescrição empírica (ex: "Infectologia", "Cardiologia", "Pneumologia").
    - "content": O corpo textual da prescrição estruturada propriamente dita. Formate com espaçamento claro e numeração formal do receituário de forma realística (fármaco, apresentação, posologia legível, dose, via de administração, frequências de ingestão, duração planejada e orientações gerais ou sinais de alerta de retorno clínico ao paciente).
    - "notes": Observações clínicas e operacionais cruciais para o profissional médico como contraindicações graves, ajustes para população especial e monitoramentos.
    - "sources": Matriz (array de strings) de fontes literárias consultadas e reescritas.

    Não reproduza cópias literais; toda redação do corpo textual e das observações deve ser puramente original e em conformidade estrita com as diretrizes vigentes no Brasil.
    Retorne estritamente o bloco de JSON estruturado.
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini API Error for prescription autocomplete", error);
    throw error;
  }
};

/**
 * Calculator Autocomplete helper with Gemini
 */
export const generateCalculatorFromIA = async (name: string): Promise<any> => {
  if (!aiClient) {
    throw new Error("Chave de API do Gemini não configurada.");
  }

  const prompt = `
    Gere as diretrizes matemáticas e estruturais de configuração para construir uma calculadora médica automatizada correspondente ao seguinte escore ou cálculo: "${name}".
    Nossa plataforma avaliará a expressão algébrica dinamicamente via math.js utilizando as variáveis declaradas na matriz de "inputs".
    Retorne um objeto JSON contendo exatamente as seguintes propriedades:
    - "name": Nome formal ou designação técnica da calculadora/escore clínico em português (ex: "Escore CURB-65 para Gravidade de Pneumonia").
    - "description": Explicação clínica objetiva e reescrita de forma original sobre a aplicabilidade prática e relevância diagnóstica do escore.
    - "category": Categoria principal correspondente à especialidade clínica.
    - "inputs": Matriz (array de objetos) descrevendo as variáveis essenciais de entrada na tela. Cada objeto de variável deve conter:
      - "id": Identificador único legível curto em letras minúsculas sem caracteres especiais ou espaços, correspondente à variável lógica na fórmula (ex: "temperatura", "avc", "has", "idade65").
      - "label": Texto limpo do rótulo exibido na tela contendo opcionalmente a pontuação do escore (ex: "Confusão mental aguda (+1)", "Idade maior ou igual a 65 anos (+1)").
      - "type": Tipo do campo, que deve ser estritamente "number" (para entradas numéricas digitáveis livres) ou "boolean" (para checkbox Sim/Não onde Sim/true vale 1 e Não/false vale 0 na avaliação da fórmula).
    - "formula": A expressão matemática matemática válida em math.js usando as ids definidas no passo anterior para renderizar e calcular o resultado final numérico (ex: "icc * 1 + has * 1 + idade65 * 1" ou "peso / (altura ^ 2)").
    - "sources": Matriz (array de strings) contendo as principais referências acadêmicas do escore clínico mapeado de forma literária correspondente.

    Certifique-se de que a fórmula matemática utilize única e exclusivamente as ids exatas especificadas nas variáveis declaradas em "inputs".
    Reescreva as descrições e títulos para serem 100% originais e de redação técnica médica padrão.
    Retorne estritamente o bloco de JSON estruturado.
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    return lenientJsonParse(text);
  } catch (error) {
    console.error("Gemini API Error for calculator autocomplete", error);
    throw error;
  }
};

/**
 * Hypertension Guide Autocomplete helper with Gemini
 */
export const generateHipertensaoFromIA = async (domainName: string): Promise<any> => {
  if (!aiClient) {
    throw new Error("Chave de API do Gemini não configurada.");
  }

  const prompt = `
    Gere diretrizes e condutas clínicas detalhadas para o domínio de acompanhamento de hipertensão arterial: "${domainName}".
    O conteúdo deve ser baseado estritamente nas diretrizes brasileiras de hipertensão arterial (SBC/SBD 2020) ou outras diretrizes internacionais consagradas.
    Retorne um objeto JSON contendo exatamente as seguintes propriedades:
    - "subtitulo": Uma explicação clínica resumida do objetivo ou finalidade clínica deste domínio (ex: "Metas não farmacológicas essenciais para o controle pressórico sustentável").
    - "anamnese": Uma matriz de perguntas clínicas essenciais a serem feitas ao paciente durante a consulta correspondente (de 3 a 6 perguntas como string).
    - "triagens": Uma matriz de objetos representando as tarefas de triagem ou monitoramento para aquele domínio. Cada objeto deve conter:
      - "texto": Descrição concisa da triagem/rastreamento clínico.
      - "categoria": A categoria correspondente, que deve ser estritamente uma destas opções: "Diagnóstico" | "Estratificação" | "MEV" | "Tratamento" | "Monitoramento" | "Geral".
    - "vacinas": Uma matriz de recomendações vacinais específicas ou orientações de imunização recomendadas para pacientes hipertensos de risco (de 1 a 3 itens).
    - "alertas": Uma matriz de objetos representando riscos ou achados agudos. Cada objeto de alerta deve conter:
      - "texto": O achado ou achado de risco clínico (ex: "Sintomas de cefaleia súbita intensa, dor torácica...").
      - "gravidade": Estritamente a string "yellow" ou "red".
      - "conduta": A conduta imediata que o profissional deve tomar diante do achado.
    - "orientacoes": Uma matriz de metas ou orientações educativas a serem explicadas ao paciente (de 3 a 5 orientações).
    - "proxima": O intervalo de tempo ideal sugerido para a próxima avaliação do paciente.

    Retorne apenas o JSON estruturado de acordo com o esquema acima em português brasileiro estruturado e técnico.
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini API Error for hypertension autocomplete", error);
    throw error;
  }
};

/**
 * Geriatria Guide Autocomplete helper with Gemini (SBGG / Katz & Index Guidelines)
 */
export const generateGeriatriaFromIA = async (domainName: string): Promise<any> => {
  if (!aiClient) {
    throw new Error("Chave de API do Gemini não configurada.");
  }

  const prompt = `
    Gere diretrizes e condutas clínicas detalhadas para o domínio de acompanhamento de geriatria / saúde do idoso: "${domainName}".
    O conteúdo deve ser baseado estritamente em consensos da Sociedade Brasileira de Geriatria e Gerontologia (SBGG) e OMS.
    Retorne um objeto JSON contendo exatamente as seguintes propriedades:
    - "subtitulo": Uma explicação clínica resumida do objetivo deste domínio de rastreamento no idoso (ex: "Protocolo multidimensional de avaliação cognitiva e prevenção de declínio secundário").
    - "anamnese": Uma matriz de perguntas diagnósticas fundamentais a serem feitas ao paciente idoso ou cuidador (de 3 a 5 perguntas como string).
    - "triagens": Uma matriz de objetos representando as tarefas de triagem ou escalas para aquele domínio. Cada objeto deve conter:
      - "texto": Descrição concisa do teste de triagem (ex: "Avaliar velocidade da marcha de 4 metros" ou "Aplicar o Mini-Mental (MEEM)").
      - "categoria": A categoria correspondente, que deve ser estritamente uma destas opções: "Cognitivo" | "Funcional" | "Motor" | "Nutricional" | "Geral".
    - "vacinas": Uma matriz de fluxos vacinais prioritários pela SBIm para este domínio de risco do idoso (de 1 a 3 itens).
    - "alertas": Uma matriz de objetos representando riscos geriátricos agudos. Cada objeto de alerta deve conter:
      - "texto": O achado de perigo físico ou mental (ex: "Perda ponderal involuntária maior que 10% em 6 meses").
      - "gravidade": Estritamente a string "yellow" ou "red".
      - "conduta": Conduta clínica imediata e vigilante a ser tomada.
    - "orientacoes": Uma matriz de ações de reabilitação, autocuidado ou metas familiares para o idoso (de 3 a 5 orientações).
    - "proxima": O intervalo sugerido de tempo recomendável para reavaliação.

    Retorne apenas o JSON estruturado de acordo com o esquema acima em português brasileiro.
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini API Error for geriatria autocomplete", error);
    throw error;
  }
};

/**
 * PreNatal Guide Autocomplete helper with Gemini (FEBRASGO / MS Guidelines)
 */
export const generatePreNatalFromIA = async (igName: string): Promise<any> => {
  if (!aiClient) {
    throw new Error("Chave de API do Gemini não configurada.");
  }

  const prompt = `
    Gere diretrizes e condutas clínicas detalhadas para a idade gestacional ou trimestre de acompanhamento pré-natal: "${igName}".
    O conteúdo deve basear-se rigorosamente no Manual de Gestação de Alto Risco do Ministério da Saúde e FEBRASGO.
    Retorne um objeto JSON contendo exatamente as seguintes propriedades:
    - "subtitulo": Uma explicação clínica estruturada do objetivo do pré-natal nesta fase específica (ex: "Rastreamento precoce de pré-eclâmpsia e triagem infecciosa primária").
    - "anamnese": Uma matriz de perguntas essenciais a serem dirigidas à gestante (de 3 a 5 perguntas como string).
    - "exames": Uma matriz de exames de laboratório ou imagem prioritários para esta idade gestacional (ex: "Urina tipo 1 com urocultura", "Ultrassonografia morfológica de 1º trimestre", "Glicemia de jejum") (de 3 a 6 itens como string).
    - "vacinas": Uma matriz de vacinas elegíveis na gestação nesta fase (ex: "dtpa a partir de 20 semanas", "Vacina Influenza") (de 1 a 3 itens como string).
    - "alertas": Uma matriz de objetos representando eventos de emergência obstétrica ou risco. Cada objeto deve conter:
      - "texto": O principal sintoma de alerta (ex: "Sangramento vaginal com dores cólicas", "Cefaleia refratária com escotomas").
      - "gravidade": Estritamente a string "yellow" ou "red".
      - "conduta": A conduta de urgência obstétrica a ser orientada ou tomada.
    - "orientacoes": Uma matriz de orientações educativas e preventivas sobre queixas gestacionais comuns na fase (de 3 a 5 orientações como string).
    - "proxima": O intervalo recomendado para a próxima consulta pré-natal nesta fase.

    Retorne apenas o JSON estruturado de acordo com o esquema em português brasileiro.
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini API Error for prenatal autocomplete", error);
    throw error;
  }
};

/**
 * Puericultura Guide Autocomplete helper with Gemini (SBP Guidelines)
 */
export const generatePuericulturaFromIA = async (idadeName: string): Promise<any> => {
  if (!aiClient) {
    throw new Error("Chave de API do Gemini não configurada.");
  }

  const prompt = `
    Gere diretrizes e condutas clínicas detalhadas para o acompanhamento pediátrico / consulta de puericultura da seguinte faixa etária: "${idadeName}".
    O conteúdo deve seguir de forma fidedigna as diretrizes e marcos do desenvolvimento da Sociedade Brasileira de Pediatria (SBP) e Ministério da Saúde.
    Retorne um objeto JSON contendo exatamente as seguintes propriedades:
    - "subtitulo": Explicação clínica concisa do objetivo pediátrico desta consulta (ex: "Vigilância dos marcos motores finos, audição reflexiva e transição alimentar").
    - "anamnese": Uma matriz de questionamentos anamnésicos cruciais a serem direcionados aos pais ou cuidadores (de 3 a 6 perguntas como string).
    - "desenvolvimento": Uma matriz de objetos representando os marcos do desenvolvimento infantil esperados para esta idade gestacional/cronológica. Cada objeto deve conter:
      - "texto": O marco específico a ser testado (ex: "Acompanha objeto móvel em arco de 90 graus" ou "Eleva a cabeça apoiado nos antebraços").
      - "categoria": A categoria do marco, que deve ser estritamente uma destas opções: "Grossa" | "Fina" | "Linguagem" | "Social".
    - "vacinas": Uma matriz de imunizações recomendadas especificamente de acordo com o Calendário Vacinal do Lactente da SBP/SBIm e PNI (ex: "Vacina BCG", "Penta 1ª dose", "VIP 1ª dose", etc.) (de 1 a 4 itens como string).
    - "triagens": Uma matriz de triagens ou exames recomendados nesta idade (ex: "Revisar resultado do Teste do Pezinho", "Repetir reflexo vermelho se suspeita") (de 1 a 3 itens como string).
    - "orientacoes": Uma matriz de orientações de estímulo precoce, introdução de banho de sol ou prevenção de acidentes domésticos adequados à idade (de 3 a 5 orientações como string).
    - "proxima": O intervalo ideal e seguro para a próxima consulta de puericultura no primeiro e segundo ano de vida.

    Retorne apenas o JSON estruturado de acordo com o esquema em português brasileiro.
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini API Error for puericultura autocomplete", error);
    throw error;
  }
};

/**
 * Autocomplete helper for custom multi-consultation Special Sections
 */
export const generateCustomSpecialSectionFromIA = async (sectionTitle: string, consultationName: string): Promise<any> => {
  if (!aiClient) {
    throw new Error("Chave de API do Gemini não configurada.");
  }

  const prompt = `
    Gere diretrizes e condutas clínicas refinadas para um acompanhamento médico no contexto de "${sectionTitle}", especificamente para a consulta/etapa cronológica intitulada: "${consultationName}".
    O conteúdo deve seguir rigorosamente as melhores evidências científicas e consensos clínicos vigentes.
    Retorne um objeto JSON contendo exatamente as seguintes propriedades em português brasileiro:
    - "subtitulo": Explicação clínica resumida do foco/objetivo desta consulta em particular (ex: "Rastreio de complicações microvasculares e ajuste de terapia oral" ou "Investigação sindrômica inicial e mapeamento de redes de apoio").
    - "anamnese": Uma matriz (array de strings) com 3 a 5 perguntas chave anamnésicas indispensáveis para orientar o julgamento clínico.
    - "desenvolvimento": Uma matriz de objetos representando o exame físico detalhado, avaliações estruturadas ou checklists clínicos desta etapa. Cada item deve conter:
      - "texto": O parâmetro ou teste a ser avaliado (ex: "Teste de sensibilidade com monofilamento de 10g" ou "Pesquisa de hipotensão ortostática").
      - "categoria": A categoria do parâmetro, que deve ser stritamente uma destas opções: "Grossa" | "Fina" | "Linguagem" | "Social" | "Geral". Se não for um marco de desenvolvimento infantil clássico, utilize "Geral".
    - "vacinas": Uma matriz (array de strings) com 1 a 3 medidas preventivas, profilaxias ou vacinas recomendadas especificamente nesta fase ou para este perfil de acompanhamento.
    - "triagens": Uma matriz (array de strings) com 1 a 3 exames laboratoriais, de imagem ou ferramentas de triagem periódicas indicados para esta consulta.
    - "orientacoes": Uma matriz (array de strings) com 3 a 5 condutas clínicas, aconselhamentos ou sinais de alerta fundamentais para orientar o paciente ou familiares.
    - "proxima": O intervalo sugerido ou critério de aprazamento clínico para o próximo retorno ou consulta.

    Retorne apenas o JSON puro, estritamente estruturado de acordo com o esquema definido.
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subtitulo: {
              type: Type.STRING,
              description: "Explicação clínica resumida do foco/objetivo desta consulta"
            },
            anamnese: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 a 5 perguntas chave anamnésicas"
            },
            desenvolvimento: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  texto: { type: Type.STRING, description: "Parâmetro ou teste a ser avaliado" },
                  categoria: { type: Type.STRING, description: "Grossa | Fina | Linguagem | Social | Geral" }
                },
                required: ["texto", "categoria"]
              }
            },
            vacinas: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            triagens: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            orientacoes: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            proxima: {
              type: Type.STRING
            }
          },
          required: ["subtitulo", "anamnese", "desenvolvimento", "vacinas", "triagens", "orientacoes", "proxima"]
        }
      }
    });

    const text = response.text || '{}';
    return lenientJsonParse(text);
  } catch (error) {
    console.error("Gemini API Error for custom special section autocomplete", error);
    throw error;
  }
};


