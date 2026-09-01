export interface PuericulturaConsult {
  id: string;
  idade: string;
  idadeMinimaMeses?: number; // for sorting/timeline placement
  subtitulo?: string;
  anamnese: string[];
  desenvolvimento: {
    texto: string;
    categoria: 'Grossa' | 'Fina' | 'Linguagem' | 'Social';
  }[];
  vacinas: string[];
  triagens: string[];
  orientacoes: string[];
  proxima: string;
  topicsOrder?: string[];
  topicTitles?: Record<string, string>;
  customChecklists?: { id: string; title: string; items: any[]; layout?: string }[];
  embeddedCalculators?: string[];
}

export interface PreNatalConsult {
  id: string;
  ig: string;
  semanaMax?: number; // for matching gestational calculation
  subtitulo?: string;
  anamnese: string[];
  exames: string[];
  vacinas: string[];
  alertas: { texto: string; gravidade: 'yellow' | 'red' }[];
  orientacoes: string[];
  proxima: string;
  topicsOrder?: string[];
  topicTitles?: Record<string, string>;
  customChecklists?: { id: string; title: string; items: any[]; layout?: string }[];
  embeddedCalculators?: string[];
}

export const INITIAL_PUERICULTURA_CONSERTS: PuericulturaConsult[] = [
  {
    id: 'rn',
    idade: '1ª Semana (RN)',
    idadeMinimaMeses: 0.2,
    anamnese: [
      'Como foi o parto e internação? Alguma intercorrência?',
      'Aleitamento materno exclusivo? Pega e sucção adequadas?',
      'Rotina de sono e padrão de choro da família?',
      'Frequência de diurese (≥6 trocas/dia) e evacuações (mecônio eliminado)?',
      'Uso de suplemento de vitamina D (iniciar na primeira semana conforme SBP)?'
    ],
    desenvolvimento: [
      { texto: 'Postura fletida simétrica, membros aduzidos', categoria: 'Grossa' },
      { texto: 'Mãos predominantemente fechadas, reflexo de preensão', categoria: 'Fina' },
      { texto: 'Reage ao som de sineta ou voz (assusta-se ou pisca)', categoria: 'Linguagem' },
      { texto: 'Fixa o olhar brevemente no rosto humano central', categoria: 'Social' }
    ],
    vacinas: [
      'BCG (Dose única intradérmica ao nascer)',
      'Hepatite B (1ª Dose ao nascer no hospital)'
    ],
    triagens: [
      'Teste do Pezinho (idealmente entre o 3º e 5º dia de vida)',
      'Teste do Olhinho (Reflexo Vermelho realizado na maternidade ou 1ª consulta)',
      'Teste da Orelhinha (Emissões Otoacústicas até o 1º mês)',
      'Teste do Coraçãozinho (Oximetria de pulso entre 24h e 48h de vida)',
      'Teste da Linguinha (Avaliação do frênulo lingual)'
    ],
    orientacoes: [
      'Higiene adequada do coto umbilical com álcool 70% a cada troca',
      'Posição de sono recomendada exclusivamente em decúbito dorsal (barriga para cima)',
      'Banho morno rápido, prevenção de hipotermia, sem aplicação de substâncias na pele',
      'Exposição solar não é mais recomendada rotineiramente; iniciar Vitamina D (400 UI/dia)',
      'Acolhimento da mãe, identificação precoce de sinais de depressão pós-parto'
    ],
    proxima: 'Em 15 dias de vida (para acompanhamento do ganho ponderal inicial).'
  },
  {
    id: '15d',
    idade: '15 Dias de Vida',
    idadeMinimaMeses: 0.5,
    anamnese: [
      'Ganho de peso substancial? Ultrapassou o peso do nascimento?',
      'Frequência de mamadas, ritmo de sono diurno/noturno?',
      'Presença de cólicas intensas, regurgitações ou distensão abdominal?',
      'Administração correta da suplementação de Vitamina D?'
    ],
    desenvolvimento: [
      { texto: 'Eleva levemente a cabeça por breves instantes em prono', categoria: 'Grossa' },
      { texto: 'Segue brevemente um objeto com o olhar a curta distância', categoria: 'Fina' },
      { texto: 'Emite pequenos sons guturais além do choro', categoria: 'Linguagem' },
      { texto: 'Acalma-se ou reage positivamente ao colo materno', categoria: 'Social' }
    ],
    vacinas: [
      'Verificar pendências vacinais da maternidade (BCG e Hep B)'
    ],
    triagens: [
      'Rever resultado e pendência do Teste do Pezinho',
      'Checar se teste da orelhinha e teste do olhinho foram concluídos'
    ],
    orientacoes: [
      'Aleitamento materno livre demanda, evitar uso de bicos artificiais (chupeta/mamadeira)',
      'Estimular breve período de bruços supervisado acordado (tummy time)',
      'Orientações sobre cólicas do lactente (massagens, compressa morna, acolhimento)',
      'Manter Vitamina D (400 UI/dia)'
    ],
    proxima: 'Com 1 mês de vida.'
  },
  {
    id: '1m',
    idade: '1 Mês',
    idadeMinimaMeses: 1,
    anamnese: [
      'Aleitamento materno e padrão de eliminação intestinal?',
      'Padrão de sono, cólicas, uso de chupetas?',
      'Suplementação de Vitamina D sendo mantida corretamente?',
      'Mãe sente-se segura? Padrão de apoio familiar?'
    ],
    desenvolvimento: [
      { texto: 'Mantém a cabeça erguida por momentos em linha média em prono', categoria: 'Grossa' },
      { texto: 'Acompanha objeto móvel em arco de 95 graus', categoria: 'Fina' },
      { texto: 'Vocaliza (sons curtos "ah", "eh")', categoria: 'Linguagem' },
      { texto: 'Sorriso social reflexivo ou inicial ao estímulo', categoria: 'Social' }
    ],
    vacinas: [
      'Hepatite B (2ª Dose recomendada com 1 mês do nascimento)'
    ],
    triagens: [
      'Revisão final dos resultados das triagens neonatais (Pezinho, Olhinho, Orelhinha, Coraçãozinho)'
    ],
    orientacoes: [
      'Cuidados com a pele doce do bebê, prevenção de brotocuras/dermatite de fraldas',
      'Estimular banho de sol indireto durante passeios rápidos protegidos',
      'Manter tummy time diário sistemático',
      'Enfatizar proibição de uso de chás, água ou outros líquidos adicionais'
    ],
    proxima: 'Com 2 meses de vida.'
  },
  {
    id: '2m',
    idade: '2 Meses',
    idadeMinimaMeses: 2,
    anamnese: [
      'Padrão respiratório normal? Presença de tosse ou obstrução nasal?',
      'Evolução do peso e estatura?',
      'Adaptação vacinal? Reação febril anterior?'
    ],
    desenvolvimento: [
      { texto: 'Eleva a cabeça e tórax apoiado nos antebraços em prono', categoria: 'Grossa' },
      { texto: 'Abre bastante as mãos, segura objeto colocado nelas', categoria: 'Fina' },
      { texto: 'Emite sons de arrulho ("cooing") estruturados', categoria: 'Linguagem' },
      { texto: 'Sorriso social voluntário em resposta ao cuidador', categoria: 'Social' }
    ],
    vacinas: [
      'Penta (1ª dose: DTP+HB+Hib)',
      'VIP (1ª dose: Salk - Paralisia Infantil)',
      'Pneumocócica 10 Valente (1ª dose)',
      'Rotavírus Humano (1ª dose)'
    ],
    triagens: [
      'Exame de reflexo vermelho repetido se suspeita ou fator de risco familiar'
    ],
    orientacoes: [
      'Prevenção de acidentes: queda de trocador, sufocamento com mantas e pelúcias',
      'Manejo de febre pós-vacinal (analgésico conforme prescrição na dose por peso)',
      'Manter Vitamina D diária ativa'
    ],
    proxima: 'Com 3 meses de vida.'
  },
  {
    id: '3m',
    idade: '3 Meses',
    idadeMinimaMeses: 3,
    anamnese: [
      'Padrão de sono, desperta quantas vezes à noite?',
      'Regurgitações abundantes após mamadas? Engasgos?',
      'Segurança e bem-estar materno.'
    ],
    desenvolvimento: [
      { texto: 'Controle firme e estável da cabeça quando erguido na vertical', categoria: 'Grossa' },
      { texto: 'Entrecruza e brinca com as próprias mãos em linha média', categoria: 'Fina' },
      { texto: 'Responde à conversa com gargalhadas e barulhos expressivos', categoria: 'Linguagem' },
      { texto: 'Inicia vocalização recíproca e imitação de gestos faciais', categoria: 'Social' }
    ],
    vacinas: [
      'Meningocócica C Conjugada (1ª dose)'
    ],
    triagens: [
      'Não há exames de triagem de rotina nesta idade se triagem neonatal normal'
    ],
    orientacoes: [
      'Brinquedos coloridos ao alcance visual para incentivar a preensão de objetos',
      'Ler e cantar rotineiramente para o bebê, incentivo à fala interativa',
      'Não usar móbiles perigosos ou andadores mecânicos sob nenhuma circunstância'
    ],
    proxima: 'Com 4 meses.'
  },
  {
    id: '4m',
    idade: '4 Meses',
    idadeMinimaMeses: 4,
    anamnese: [
      'Mantém aleitamento exclusivo? Planejando retorno ao trabalho?',
      'Início de salivação aumentada? Erupção dentária?',
      'Uso de copos ou mamadeiras sendo evitado?'
    ],
    desenvolvimento: [
      { texto: 'Rola da posição de bruços para costas de modo ativo', categoria: 'Grossa' },
      { texto: 'Alcança e agarra objetos oferecidos levando-os à boca', categoria: 'Fina' },
      { texto: 'Balbucia ativamente e emite sons balbuciantes bilaterais', categoria: 'Linguagem' },
      { texto: 'Chora ou resmunga quando a atividade com o cuidador é interrompida', categoria: 'Social' }
    ],
    vacinas: [
      'Penta (2ª dose)',
      'VIP (2ª dose)',
      'Pneumocócica 10V (2ª dose)',
      'Rotavírus Humano (2ª dose)'
    ],
    triagens: [
      'Se houver risco de deficiência de ferro, discutir triagem clínica de anemia'
    ],
    orientacoes: [
      'Orientações detalhadas para mães que retornam ao trabalho: ordenha e estocagem de leite materno',
      'Incentivar brincadeiras de tapete protegidas, desenvolvimento motor simétrico',
      'Manter suplementação de Vitamina D'
    ],
    proxima: 'Com 6 meses de vida (fase de introdução alimentar).'
  },
  {
    id: '6m',
    idade: '6 Meses',
    idadeMinimaMeses: 6,
    anamnese: [
      'Bebê já demonstra sinais de prontidão para comer?',
      'Consegue sentar com pouco apoio ou sem apoio?',
      'Introdução à suplementação de Ferro profilático (conforme SBP)?'
    ],
    desenvolvimento: [
      { texto: 'Senta apoando-se nas próprias mãos à frente (posição tripé)', categoria: 'Grossa' },
      { texto: 'Transfere um brinquedo de uma mão para a outra livremente', categoria: 'Fina' },
      { texto: 'Produz monossílabos repetitivos ("ba-ba", "da-da")', categoria: 'Linguagem' },
      { texto: 'Distingue rostos familiares de estranhos de modo claro', categoria: 'Social' }
    ],
    vacinas: [
      'Penta (3ª dose)',
      'VIP (3ª dose)',
      'Vacina Influenza (Dose anual conforme campanha de inverno)'
    ],
    triagens: [
      'Solicitar hemograma completo e ferritina sérica se fatores de risco ou rotina local'
    ],
    orientacoes: [
      'Iniciar INTRODUÇÃO ALIMENTAR: papas de frutas e papa principal (completa, amassada - não batida ou liquidificada)',
      'Água filtrada deve ser oferecida sistematicamente a partir deste momento',
      'Iniciar Ferro profilático (1mg/kg/dia de ferro elementar ou dose recomendada para peso)',
      'Iniciar higienização da gengiva/primeiros dentes com escova macia e pasta de dente fluoretada (≥ 1100 ppm) em quantidade grão de arroz'
    ],
    proxima: 'Com 9 meses de vida.'
  },
  {
    id: '9m',
    idade: '9 Meses',
    idadeMinimaMeses: 9,
    anamnese: [
      'Grau de aceitação das refeições principais?',
      'Como está a consistência das fezes e hábito urinário?',
      'Presença de reações alérgicas alimentares iniciais?'
    ],
    desenvolvimento: [
      { texto: 'Senta de forma independente por tempo prolongado sem cair', categoria: 'Grossa' },
      { texto: 'Realiza pinça imatura (polegar e borda da mão ou dedos)', categoria: 'Fina' },
      { texto: 'Atende quando chamado pelo próprio nome de forma consistente', categoria: 'Linguagem' },
      { texto: 'Brinca de "esconder e achar" ("peep-bo") e acena', categoria: 'Social' }
    ],
    vacinas: [
      'Febre Amarela (1ª dose recomendada aos 9 meses pelo MS)'
    ],
    triagens: [
      'Revisar exames de anemia colhidos aos 6 meses'
    ],
    orientacoes: [
      'Evoluir a textura da alimentação (deixar pedacinhos maiores para mastigação)',
      'Prevenção de engasgos severos: evitar grãos inteiros pequenos, uvas inteiras, sementes',
      'Banir andadores: risco de quedas graves e atraso do padrão correto de marcha'
    ],
    proxima: 'Com 12 meses (1 ano).'
  },
  {
    id: '12m',
    idade: '12 Meses (1 Ano)',
    idadeMinimaMeses: 12,
    anamnese: [
      'Início de marcha independente ou com apoio?',
      'Uso de telas (celular, TV, tablet) sendo mantido em zero minutos (SBP)?',
      'Suplementação contínua de Vitamina D e Ferro?'
    ],
    desenvolvimento: [
      { texto: 'Fica de pé sozinho ou dá alguns passos sem apoio', categoria: 'Grossa' },
      { texto: 'Pinça completa desenvolvida (segura grão com polegar e indicador)', categoria: 'Fina' },
      { texto: 'Fala pelo menos duas ou três palavras com significado claro ("mamã", "papá")', categoria: 'Linguagem' },
      { texto: 'Imita gestos simples dos adultos e bate palmas', categoria: 'Social' }
    ],
    vacinas: [
      'Tríplice Viral (1ª dose: Sarampo, Caxumba, Rubéola)',
      'Pneumocócica 10 Valente (Reforço)',
      'Meningocócica C (Reforço)'
    ],
    triagens: [
      'Hemograma de rastreio de anemia anual se indicado'
    ],
    orientacoes: [
      'Transição para comida da família integral (baixo sal, sem açúcar até os 2 anos)',
      'Fomentar a autonomia: deixar comer com as próprias mãos (método BLW ou misto)',
      'Zero tempo de telas virtuais (recomendação rígida da SBP/OMS)',
      'Higiene bucal com escova infantil e pasta com flúor a cada refeição principal'
    ],
    proxima: 'Com 15 meses.'
  },
  {
    id: '15m',
    idade: '15 Meses',
    idadeMinimaMeses: 15,
    anamnese: [
      'Marcha estável? Interação com outras crianças?',
      'Qual o padrão alimentar atual?'
    ],
    desenvolvimento: [
      { texto: 'Anda bem de forma autônoma sem apoios', categoria: 'Grossa' },
      { texto: 'Empilha blocos duplos, rabisca livremente com giz', categoria: 'Fina' },
      { texto: 'Usa gestos corporais estruturados combinando com poucas palavras', categoria: 'Linguagem' },
      { texto: 'Aponta o dedo indicador para pedir coisas ou demonstrar interesse', categoria: 'Social' }
    ],
    vacinas: [
      'DTP (1º Reforço)',
      'VOP (1º Reforço - Gotinha)',
      'Hepatite A (Dose única ao completar 15 meses pelo MS)',
      'Tetra Viral ou Tríplice + Varicela'
    ],
    triagens: [
      'Não há rastreios específicos'
    ],
    orientacoes: [
      'Adaptação a limites comportamentais firmes e amáveis das birras',
      'Segurança do lar: protetores de tomada, telas em janelas, portões em escadas',
      'Estimular jogos de encaixar e blocos coloridos para cognição espacial'
    ],
    proxima: 'Com 18 meses.'
  },
  {
    id: '18m',
    idade: '18 Meses',
    idadeMinimaMeses: 18,
    anamnese: [
      'Noção de perigo? Respostas sociais adequadas?',
      'Vocabulário crescendo constantemente?'
    ],
    desenvolvimento: [
      { texto: 'Sobe degraus com apoio, corre com estabilidade básica', categoria: 'Grossa' },
      { texto: 'Come com colher derrubando pouco, constrói torre de 3 blocos', categoria: 'Fina' },
      { texto: 'Vocabulário de pelo menos 10 a 15 palavras inteligíveis', categoria: 'Linguagem' },
      { texto: 'Demonstra afeto beijando cuidador e brinca com faz de conta inicial', categoria: 'Social' }
    ],
    vacinas: [
      'Rever calendário e aplicar eventuais atrasadas'
    ],
    triagens: [
      'Aplicação do M-CHAT (Rastreio de autismo - recomendado entre 18 e 24 meses)'
    ],
    orientacoes: [
      'Manter zero açúcar no cardápio de forma rigorosa',
      'Estimular a fala de forma interativa sem adivinhar ou antecipar o pedido apontado da criança',
      'Roteiro de sono e estabelecimento de rituais noturnos previsíveis'
    ],
    proxima: 'Com 2 anos completos.'
  },
  {
    id: '2a',
    idade: '2 Anos',
    idadeMinimaMeses: 24,
    anamnese: [
      'Sono consolidado? Desfralde iniciado ou programado?',
      'Controle de tempo de telas?'
    ],
    desenvolvimento: [
      { texto: 'Chuta bola deliberadamente, salta com ambos os pés juntos', categoria: 'Grossa' },
      { texto: 'Desenha linha vertical imitada de forma básica', categoria: 'Fina' },
      { texto: 'Forma frases curtas simples com sujeito + verbo ("Eu quero água")', categoria: 'Linguagem' },
      { texto: 'Brincadeira paralela ativa com outras crianças', categoria: 'Social' }
    ],
    vacinas: [
      'Varicela (2ª dose recomendada)'
    ],
    triagens: [
      'Aplicação complementar ou revisão do M-CHAT',
      'Hemograma de triagem se fatores clínicos'
    ],
    orientacoes: [
      'Iniciar o processo amigável e gradual de desfralde se a criança der claros sinais de controle',
      'Permitido no máximo 1 hora de telas recreativas de alta qualidade assistidas por dia (SBP)',
      'Escovação dentária supervisionada com pasta de dente de 1100 a 1450 ppm de flúor'
    ],
    proxima: 'Com 3 anos.'
  },
  {
    id: '3a',
    idade: '3 Anos',
    idadeMinimaMeses: 36,
    anamnese: [
      'Hábito escolar? Padrão de sociabilização?',
      'Birras frequentes ou agressividade incomum?'
    ],
    desenvolvimento: [
      { texto: 'Pedala triciclo de forma coordenada, fica bem num pé só por instantes', categoria: 'Grossa' },
      { texto: 'Copia círculo desenhado pelo examinador', categoria: 'Fina' },
      { texto: 'Diz seu nome completo, idade e gênero de forma compreensível', categoria: 'Linguagem' },
      { texto: 'Veste algumas roupas simples sozinho e brincadeira de cooperação', categoria: 'Social' }
    ],
    vacinas: [
      'Doador anual de influenza'
    ],
    triagens: [
      'Primeira aferição sistemática de pressão arterial clínica infantil se fatores de risco'
    ],
    orientacoes: [
      'Fomentar a independência nas atividades cotidianas (arrumar brinquedos, lavar as mãos)',
      'Alimentação familiar equilibrada, evitar ultraprocessados de forma vigilante',
      'Leitura compartilhada antes de dormir como hábito central de desenvolvimento cognitivo'
    ],
    proxima: 'Com 4 anos.'
  },
  {
    id: '4a',
    idade: '4 Anos',
    idadeMinimaMeses: 48,
    anamnese: [
      'Entendimento das regras e limites clínicos?',
      'Acidentes frequentes ou dificuldades de visão perceptíveis?'
    ],
    desenvolvimento: [
      { texto: 'Pula num pé só de forma repetida e mantém equilíbrio na trave', categoria: 'Grossa' },
      { texto: 'Desenha pessoa com pelo menos 3 partes identificáveis corporais', categoria: 'Fina' },
      { texto: 'Conta histórias simples sequenciais, fala 100% inteligível para estranhos', categoria: 'Linguagem' },
      { texto: 'Prefere brincar com outras crianças em vez de sozinho, simula papéis', categoria: 'Social' }
    ],
    vacinas: [
      'DTP (2º reforço)',
      'VIP (Reforço)',
      'Meningocócica ACWY (Dose única ou reforço se atrasada)'
    ],
    triagens: [
      'Triagem de acuidade visual com tabela infantil adaptada (símbolos ou Snellen)'
    ],
    orientacoes: [
      'Tempo de tela restrito a menos de 1 hora diária',
      'Incentivar a prática de atividades físicas ativas brincando ao ar livre',
      'Prevenção de afogamentos estruturados e quedas de altura'
    ],
    proxima: 'Com 5 anos.'
  },
  {
    id: '5a',
    idade: '5 Anos',
    idadeMinimaMeses: 60,
    anamnese: [
      'Prepara-se para o ingresso no ensino fundamental?',
      'Controle total de esfíncteres (diurno e noturno)?'
    ],
    desenvolvimento: [
      { texto: 'Pula corda, salta obstáculos altos correndo', categoria: 'Grossa' },
      { texto: 'Segura lápis em empunhadura tripé correta de escrita', categoria: 'Fina' },
      { texto: 'Fala de forma gramaticalmente correta frases longas e complexas', categoria: 'Linguagem' },
      { texto: 'Distingue de modo integral a fantasia do mundo real clínico', categoria: 'Social' }
    ],
    vacinas: [
      'Febre Amarela (Dose de reforço aos 4-5 anos)'
    ],
    triagens: [
      'Exame oftalmológico de rotina formal pré-escolar'
    ],
    orientacoes: [
      'Estabelecer rotinas consistentes de estudos e lazer ativo',
      'Estimular diálogo franco sobre sentimentos e inteligência emocional',
      'Supervisão cerrada do uso de equipamentos de internet e redes sociais (deve ser zero)'
    ],
    proxima: 'Com 6 anos.'
  },
  {
    id: '6a',
    idade: '6 Anos',
    idadeMinimaMeses: 72,
    anamnese: [
      'Como está o processo inicial de alfabetização?',
      'Dores nos membros ("dor de crescimento") frequentes?'
    ],
    desenvolvimento: [
      { texto: 'Ampla coordenação motora geral, anda de bicicleta se ensinado', categoria: 'Grossa' },
      { texto: 'Começa a escrever letras e números espelhados ou normais', categoria: 'Fina' },
      { texto: 'Inicia leitura de palavras curtas simétricas', categoria: 'Linguagem' },
      { texto: 'Expressa forte noção de regras de convivência e jogos dirigidos', categoria: 'Social' }
    ],
    vacinas: [
      'DPTa ou DTP (Reforços pendentes); Influenza sazonal'
    ],
    triagens: [
      'Avaliação postural inicial e avaliação do desenvolvimento odontológico'
    ],
    orientacoes: [
      'Evitar mochilas excessivamente pesadas (máximo 10% do peso corporal da criança)',
      'Escovação bucal com fio dental agora se houver toque interdentário comum',
      'Estimular hábitos regulares de dormir cedo (mínimo de 9-11 horas de sono noturno)'
    ],
    proxima: 'A cada 2 anos (Consultas periódicas de infância e adolescência).'
  },
  {
    id: 'teen_8',
    idade: '8 Anos',
    idadeMinimaMeses: 96,
    anamnese: [
      'Desempenho escolar e comportamento com professores?',
      'Hábitos de brincadeira física ativa no contra-turno?',
      'Sinais iniciais de puberdade precoce (telarca ou aumento de testículos)?'
    ],
    desenvolvimento: [
      { texto: 'Corrida rápida mudando de direção, coordenação de esportes coletivos', categoria: 'Grossa' },
      { texto: 'Escrita legível e controle fino de canetas e pincéis', categoria: 'Fina' },
      { texto: 'Leitura fluente autônoma de pequenos livros infantis', categoria: 'Linguagem' },
      { texto: 'Formação de grupos de amigos e compreensão do ponto de vista do outro', categoria: 'Social' }
    ],
    vacinas: [
      'Rever coberturas vacinais gerais'
    ],
    triagens: [
      'Aferição clínica de PA e avaliação de IMC estruturado para percentis de obesidade'
    ],
    orientacoes: [
      'Alimentação balanceada saudável: reduzir ultraprocessados a níveis mínimos',
      'Atividade física dirigida por pelo menos 1 hora diária vigorosa ou moderada',
      'Orientar pais sobre privacidade da criança e educação sexual inicial segura'
    ],
    proxima: 'Aos 10 anos.'
  },
  {
    id: 'teen_10',
    idade: '10 Anos',
    idadeMinimaMeses: 120,
    anamnese: [
      'Mudanças corporais em andamento?',
      'Dificuldades ou queixas psicossociais?'
    ],
    desenvolvimento: [
      { texto: 'Amplo equilíbrio corporal e força em desenvolvimento ativo', categoria: 'Grossa' },
      { texto: 'Manipulação avançada de instrumentos e jogos de tabuleiro complexos', categoria: 'Fina' },
      { texto: 'Domínio linguístico amplo e compreensão de duplo sentido/ironias', categoria: 'Linguagem' },
      { texto: 'Independência emocional crescendo, forte laço de amizade recíproca', categoria: 'Social' }
    ],
    vacinas: [
      'HPV Quadrivalente (1ª e 2ª doses conforme esquema atualizado a partir dos 9 anos)',
      'Meningocócica ACWY (Reforço entre 11-12 anos)'
    ],
    triagens: [
      'Rastreio lipídico (colesterol total e frações, triglicerídeos) conforme recomendação'
    ],
    orientacoes: [
      'Orientações sobre as mudanças físicas da puberdade de forma natural e acolhedora',
      'Limitar o sedentarismo e desencorajar uso de telas no quarto à noite',
      'Discutir a prevenção sistemática do bullying e isolamento social'
    ],
    proxima: 'Aos 12 anos.'
  },
  {
    id: 'teen_12',
    idade: '12 Anos',
    idadeMinimaMeses: 144,
    anamnese: [
      'Início do estirão estatural?',
      'Relação com imagem corporal e autoestima?',
      'Percepção clínica de estabilidade de humor?'
    ],
    desenvolvimento: [
      { texto: 'Controle de grandes capacidades físicas em modalidades de esportes', categoria: 'Grossa' },
      { texto: 'Especialização nas habilidades manuais pessoais', categoria: 'Fina' },
      { texto: 'Pensamento lógico-formal abstrato sólido', categoria: 'Linguagem' },
      { texto: 'Estilo próprio de comportamento e busca por identidade pessoal', categoria: 'Social' }
    ],
    vacinas: [
      'Meningocócica ACWY (Verificar se realizada)',
      'dTpa (Tríplice bacteriana acelular do adolescente - reforço a cada 10 anos)'
    ],
    triagens: [
      'Triagem de desvios da coluna (escoliose - teste de inclinação de Adams)'
    ],
    orientacoes: [
      'Apoio à saúde mental: dialogar ativamente sobre ansiedade, autocuidado',
      'Higiene pessoal vigorosa relacionada ao suor das glândulas apócrinas e acne puberal',
      'Orientar sobre prevenção do consumo inicial de álcool, cigarros normais e eletrônicos'
    ],
    proxima: 'Aos 14 anos.'
  },
  {
    id: 'teen_14_18',
    idade: 'Adolescência (14 a 18 Anos)',
    idadeMinimaMeses: 168,
    anamnese: [
      'Avaliação psicopolicial e social profunda (método HEADS/HEEADSSS: Casa, Educação, Atividades, Drogas, Sexualidade, Suicídio)',
      'Sono de má qualidade ou fadiga crônica?',
      'Uso persistente e viciante de redes eletrônicas?'
    ],
    desenvolvimento: [
      { texto: 'Estatura adulta aproximando-se do patamar final, força equivalente', categoria: 'Grossa' },
      { texto: 'Desenvolvimento total de todas as habilidades de coordenação fina', categoria: 'Fina' },
      { texto: 'Pensamento crítico social consolidado e reflexão ética profunda', categoria: 'Linguagem' },
      { texto: 'Identificação prioritária com pares de amigos e construção de planos futuros', categoria: 'Social' }
    ],
    vacinas: [
      'Dupla Adulto (Reforço a cada 10 anos para Tétano/Difteria)',
      'Hepatite B e Tríplice Viral se esquemas estiverem incompletos na infância'
    ],
    triagens: [
      'Aferição profunda de PA infantil/juvenil, avaliação ponderal rigorosa contra obesidade',
      'Investigação laboratorial direcionada para queixas de comportamento ou anemias se suspeito'
    ],
    orientacoes: [
      'Conversa confidencial aberta sobre sexualidade protetora, gravidez e proliferação de ISTs',
      'Foco exaustivo sobre malefícios e toxicidade de cigarros eletrônicos (vapes) e tabaco',
      'Higiene mental ativa: resiliência ao estresse pré-vestibular e cansaço',
      'Planejamento de rotina física diária'
    ],
    proxima: 'Alta da puericultura tradicional aos 18 anos, integrando à clínica médica geral.'
  }
];

export const INITIAL_PRENATAL_CONSERTS: PreNatalConsult[] = [
  {
    id: 'pn_12',
    ig: '1ª Consulta (< 12 Semanas)',
    semanaMax: 12,
    anamnese: [
      'Planejamento ou gestação inesperada? Sentimentos sobre a gestação?',
      'Náuseas frequentes, vômitos severos (pesquisar hiperêmese)?',
      'Sangramento vaginal de pequena ou grande monta ou cólica pélvica?',
      'História obstétrica anterior (abortos recorrentes, partos prematuros, pré-eclâmpsia)?',
      'Uso de medicamentos contínuos e hábitos de fumo, álcool ou drogas?'
    ],
    exames: [
      'Tipagem Sanguínea Rh e Pesquisa de Anticorpos Irregulares (Coombs Indireto se Rh negativo)',
      'Hemograma Completo de rastreio inicial',
      'Glicemia de Jejum de base',
      'VDRL (Sífilis) e Teste de Triagem Rápida',
      'HIV 1 e 2 (Sorologia ou Teste Rápido)',
      'Hepatite B (HBsAg) sorologia',
      'Toxoplasmose IgM e IgG',
      'Urina Tipo 1 (EAS) e Urocultura com Antibiograma',
      'Ultrassonografia Obstétrica Inicial (para datar a IG - preferencialmente transvaginal entre 7 e 11 semanas)'
    ],
    vacinas: [
      'Influenza (Dose recomendada anual em qualquer IG)',
      'Hepatite B (Iniciar ou completar 3 doses se não vacinada anteriormente)'
    ],
    alertas: [
      { texto: 'Sangramento vaginal profuso ou cólicas agudas podem indicar aborto espontâneo ou gestação ectópica.', gravidade: 'red' },
      { texto: 'Pacientes com Coombs Indireto positivo devem ser encaminhadas para Pré-Natal de Alto Risco.', gravidade: 'yellow' },
      { texto: 'Glicemia de jejum inicial ≥ 92 mg/dL configura diagnóstico de Diabetes Gestacional.', gravidade: 'red' }
    ],
    orientacoes: [
      'Prescrição obrigatória de Ácido Fólico (400 mcg/dia) para prevenção de defeitos do tubo neural',
      'Avaliar suplementação ativa de Ferro elementar e Vitamina D se indicação clínica',
      'Alimentação equilibrada saudável: lavar exaustivamente verduras e não consumir carnes malpassadas (risco de toxoplasmose aguda)',
      'Cessação imediata do consumo de álcool, tabaco e medicamentos sem chancela do obstetra'
    ],
    proxima: 'Com 16 semanas.'
  },
  {
    id: 'pn_16',
    ig: '16 Semanas',
    semanaMax: 16,
    anamnese: [
      'Queixas de infecção urinária (disúria, polaciúria, dor lombar)?',
      'Movimentação fetal percebida (raro no primeiro filho nesta idade)?',
      'Estabilidade emocional e adaptação às mudanças físicas corporais?'
    ],
    exames: [
      'Revisão completa dos resultados impressos dos exames solicitados no 1º trimestre',
      'Programar Ultrassonografia Morfológica de 2º Trimestre (idealmente entre 20 e 24 semanas)',
      'Se Rh negativo e Coombs negativo, organizar profilaxia se indicado por tempo de repetição'
    ],
    vacinas: [
      'Manter imunizações contra Hepatite B ou Influenza se pendentes'
    ],
    alertas: [
      { texto: 'Aumento severo de corrimento vaginal com odor fétido/prurido deve ser examinado e tratado.', gravidade: 'yellow' },
      { texto: 'Aferição de Pressão Arterial sistólica ≥ 140 mmHg ou diastólica ≥ 90 mmHg exige investigação imediata.', gravidade: 'red' }
    ],
    orientacoes: [
      'Prescrição rotineira de Carbonato de Cálcio (1,5g a 2g ao dia) se baixa ingesta de produtos lácteos',
      'Prescrever e orientar uso correto de Ferro elementar profilático (40mg/dia conforme recomendação do MS para não anêmicas)',
      'Atividades físicas de baixo impacto recomendadas (caminhadas, pilates ou hidroginástica adaptada)'
    ],
    proxima: 'Com 20 semanas.'
  },
  {
    id: 'pn_20',
    ig: '20 Semanas (Metade da Gestação)',
    semanaMax: 20,
    anamnese: [
      'Início perceptível de movimentos do bebê na gestante?',
      'Episódios de cefaleia intensa, dor epigástrica ou perturbação visual?',
      'Cãibras intensas nas pernas ou dores fasciais?'
    ],
    exames: [
      'Ultrassonografia Morfológica de Segundo Trimestre (detecção de malformações estruturais e medição do colo uterino para avaliar risco de prematuridade)'
    ],
    vacinas: [
      'Vacina dT (Difteria e Tétano): iniciar esquema de 3 doses ou manter conforme histórico de reforços'
    ],
    alertas: [
      { texto: 'Prevenção de Pré-Eclâmpsia: se houver fatores de risco (ex: hipertensão prévia, obesidade), iniciar Ácido Acetilsalicílico (AAS 100-150mg/dia à noite) antes de 16-20 semanas.', gravidade: 'red' },
      { texto: 'Medição de comprimento de Colo Uterino < 25 mm indica alto risco de parto prematuro (prescrever progesterona natural micronizada).', gravidade: 'red' }
    ],
    orientacoes: [
      'Garantir sono adequado deitada preferencialmente do lado esquerdo para melhorar retorno venoso uteroplacentário',
      'Cuidados com a pele das mamas, não massagear ou preparar mamilos de forma abrasiva'
    ],
    proxima: 'Com 24 semanas.'
  },
  {
    id: 'pn_24',
    ig: '24 Semanas',
    semanaMax: 24,
    anamnese: [
      'Presença de corrimento vaginal aquoso profuso (excluir amniorrexe prematura)?',
      'Padrão normal e regular de movimentos do feto?',
      'Dificuldades intestinais acentuadas ou constipação gestacional?'
    ],
    exames: [
      'TOTG 75g (Teste Oral de Tolerância à Glicose com medição em jejum, 1h e 2h - rastreio obrigatório entre 24 e 28 semanas para todas as sem diagnóstico)',
      'Se Rh negativo com Coombs alternado, repetir o Coombs Indireto'
    ],
    vacinas: [
      ' dTpa (Tríplice bacteriana acelular do adulto - aplicar obrigatoriamente a partir de 20 semanas em todas as gestações para proteger o RN contra coqueluche)'
    ],
    alertas: [
      { texto: 'Valores alterados no TOTG (Jejum ≥ 92; 1h ≥ 180; 2h ≥ 153 mg/dL) firmam diagnóstico de Diabetes Gestacional.', gravidade: 'red' },
      { texto: 'Perda súbita de líquido transparente é alerta imediato para rotura de membranas.', gravidade: 'red' }
    ],
    orientacoes: [
      'Aumentar o aporte hídrico corporal e consumo de fibras vegetais contra constipação',
      'Reforçar importância do uso diário regular da suplementação de Ferro e Cálcio prescritos'
    ],
    proxima: 'Com 28 semanas.'
  },
  {
    id: 'pn_28',
    ig: '28 Semanas (Início do 3º Trimestre)',
    semanaMax: 28,
    anamnese: [
      'Contração uterina indolor esporádica (Braxton-Hicks) ou dolorosa frequente?',
      'Percepção de inchaço importante em mãos e rosto ao acordar?'
    ],
    exames: [
      'Repetição de Glicemia de Jejum e hemograma se TOTG indisponível ou suspeita',
      'Fazer Imunoglobulina Anti-D se mãe Rh negativa com Coombs indireto negativo (profilaxia de aloimunização com 28 semanas)'
    ],
    vacinas: [
      'Verificar pendências de vacinas do trimestre anterior (dTpa, dT, Hep B)'
    ],
    alertas: [
      { texto: 'Contração dolorosa regular (mais de 4 por hora) pode ser trabalho de parto prematuro.', gravidade: 'red' },
      { texto: 'Cefaleia inexplicada refratária com edema facial acusa sinal clínico de iminência de eclâmpsia.', gravidade: 'red' }
    ],
    orientacoes: [
      'Discutir o plano inicial de parto e esclarecer dúvidas sobre canais de atendimento de maternidade de referência',
      'Usar meias elásticas de compressão graduada durante o dia para amenizar fadiga e edemas de membros inferiores'
    ],
    proxima: 'Com 30 semanas.'
  },
  {
    id: 'pn_30',
    ig: '30 Semanas',
    semanaMax: 30,
    anamnese: [
      'Como estão as dores nas costas e quadril (atuação da relaxina)?',
      'Sono prejudicado por dificuldade de posição física?'
    ],
    exames: [
      'Segundo bloco de exames de rastreio de sorologias do Ministério da Saúde: VDRL, HIV, Hepatite B e Toxoplasmose (se IgG negativo anterior)'
    ],
    vacinas: [
      'Rever vacinas realizadas'
    ],
    alertas: [
      { texto: 'Redução drástica (menos de 5 movimentos fetais em 1 hora ativa pós-prandial) exige avaliação urgente.', gravidade: 'red' },
      { texto: 'PA ≥ 140/90 associada a proteinúria de fita é diagnóstico de Pré-eclâmpsia.', gravidade: 'red' }
    ],
    orientacoes: [
      'Banho quente nas costas e compressas secas contra lombalgias de gravidez',
      'Evitar períodos excessivos sentada com as pernas pendentes em consultórios'
    ],
    proxima: 'Com 32 semanas.'
  },
  {
    id: 'pn_32',
    ig: '32 Semanas',
    semanaMax: 32,
    anamnese: [
      'Sinais de refluxo gastroesofágico acentuado (pirose noturna)?',
      'Presença de varizes dolorosas nas pernas ou na vulva?'
    ],
    exames: [
      'Ultrassonografia Obstétrica do 3º Trimestre (para monitorar crescimento fetal, localização placentária e volume de líquido amniótico)'
    ],
    vacinas: [
      'dTpa vacina deve estar aplicada'
    ],
    alertas: [
      { texto: 'Apresentação pélvica ou cólica intensa deve ser avaliada na USG obstétrica.', gravidade: 'yellow' },
      { texto: 'Volume de líquido diminuído (oligoâmnio) ou restrição de crescimento fetal requerem encaminhamento de alto risco.', gravidade: 'red' }
    ],
    orientacoes: [
      'Manejo de azia: fracionar refeições em pequenas porções, deitar só 2 horas após comer',
      'Incentivar e apoiar a leitura ativa sobre técnicas práticas de amamentação'
    ],
    proxima: 'Com 34 semanas.'
  },
  {
    id: 'pn_34',
    ig: '34 Semanas (Consultas Quinzenais recomendadas)',
    semanaMax: 34,
    anamnese: [
      'Contração de Braxton-Hicks mais frequentes?',
      'Falta de ar leve temporária devido à compressão do diafragma?'
    ],
    exames: [
      'Rastreio de Estreptococo do Grupo B (Coleta de swab vaginal e anal recomendado entre 35 e 37 semanas)'
    ],
    vacinas: [
      'Certificar finalização de esquemas obrigatórios'
    ],
    alertas: [
      { texto: 'Qualquer perda de sangue de cor vermelho vivo requer internação IMEDIATA para afastar descolamento prematuro de placenta (DPP) ou placenta prévia.', gravidade: 'red' }
    ],
    orientacoes: [
      'Preparação das malas da gestante e do bebê para a maternidade',
      'Ensinar sobre massagem perineal para aumentar a flexibilidade dos músculos do assoalho pélvico'
    ],
    proxima: 'Com 36 semanas.'
  },
  {
    id: 'pn_36',
    ig: '36 Semanas (Fase Final)',
    semanaMax: 36,
    anamnese: [
      'Contrações perceptíveis? Perda de tampão mucoso (geleia com sangue leve)?',
      'Padrão urinário intensificado à noite (compressão de bexiga)?'
    ],
    exames: [
      'Rever exames de Swab do Estreptococo B (GBS) (positivo indica necessidade de profilaxia com penicilina no trabalho de parto)'
    ],
    vacinas: [
      'Nenhuma programada'
    ],
    alertas: [
      { texto: 'Presença de febre inexplicada ou dor uterina contínua acende alerta para corioamnionite.', gravidade: 'red' },
      { texto: 'Cefaleia refratária persistente, epigastralgia ou náusea forte exigem exclusão de Síndrome HELLP.', gravidade: 'red' }
    ],
    orientacoes: [
      'Instruir como identificar o verdadeiro trabalho de parto: contrações rítmicas e dolorosas de 5 em 5 minutos durando 1 minuto inteiro',
      'Garantir que a paciente saiba exatamente onde ir em caso de emergência obstétrica'
    ],
    proxima: 'Com 38 semanas (Consultas semanais a partir de agora).'
  },
  {
    id: 'pn_38',
    ig: '38 Semanas',
    semanaMax: 38,
    anamnese: [
      'Sente dores irradiando para coxas nas contrações?',
      'Acompanhamento do peso da mãe e batimentos fetais nas últimas consultas.'
    ],
    exames: [
      'Cardiotocografia de base se houver indicação ou fatores locais de monitoramento'
    ],
    vacinas: [
      'Nenhuma'
    ],
    alertas: [
      { texto: 'Líquido amniótico verde-escuro ou mecônio saindo pela vulva indica sofrimento fetal.', gravidade: 'red' }
    ],
    orientacoes: [
      'Orientações exaustivas sobre a hora de ouro (Golden Hour) de contato pele a pele e estímulo ao aleitamento na 1ª hora pós-parto',
      'Exercícios de relaxamento respiratório e movimentação em bola suíça auxiliadores'
    ],
    proxima: 'Com 40 semanas.'
  },
  {
    id: 'pn_40',
    ig: '40 Semanas (Idade Gestacional Termo)',
    semanaMax: 40,
    anamnese: [
      'Como está o nível de cansaço e ansiedade da paciente para o nascimento?',
      'Disfunções ou perdas de tampão documentadas?'
    ],
    exames: [
      'Perfil Biofísico Fetal, Cardiotocografia sistemática frequente e medição de ILA (Índice de Líquido Amniótico) para vigilância clínica de segurança fetal'
    ],
    vacinas: [
      'Nenhuma'
    ],
    alertas: [
      { texto: 'Ausência ou lentidão súbita de movimentos de chutar exigem rastreamento de traçado cardiotocográfico.', gravidade: 'red' },
      { texto: 'Gestantes que ultrapassam 40 semanas sem entrar em parto devem discutir indução ou acompanhamento hipervigilante de pós-termo diário.', gravidade: 'yellow' }
    ],
    orientacoes: [
      'Apoio espiritual e emocional reforçado com a gestante e acompanhante eleito',
      'Explicar o fluxo seguro de internação preventiva ou indução de parto programada'
    ],
    proxima: 'A cada 2-3 dias se manter vigilância ou internação eletiva em breve.'
  },
  {
    id: 'pn_puerp',
    ig: 'Consulta Pós-Parto (Puerpério)',
    semanaMax: 99,
    anamnese: [
      'Tipo de parto e cicatrização de períneo ou cicatriz cirúrgica de cesárea?',
      'Evolução do sangramento vaginal (lóquios)? Cheiro fétido?',
      'Mamas ingurgitadas, dolorosas, fissuras em mamilos (apoio à amamentação)?',
      'Sintomas depressivos ou ansiedade importante (Baby Blues vs. Depressão Puerperal)?',
      'Como está a rotina de cuidados do recém-nascido?'
    ],
    exames: [
      'Não há exames laboratoriais de rotina no pós-parto fisiológico, a menos que haja perda hemática grave suspeita (hemograma completo) ou infecção clínica'
    ],
    vacinas: [
      'Atualizar dTpa e Tríplice Viral na alta hospitalar se não realizadas'
    ],
    alertas: [
      { texto: 'Lóquios fétidos acompanhados de calafrios, febre alta e dor uterina à palpação sugerem endometrite aguda.', gravidade: 'red' },
      { texto: 'Febre súbita, mal-estar generalizado e área de mama eritematosa, endurecida e extremamente dolorosa indicam mastite aguda lactacional.', gravidade: 'red' },
      { texto: 'Tristeza profunda persistente, choro inconsolável e rejeição inconsciente aos cuidados do RN sugerem Depressão Puerperal severa.', gravidade: 'red' }
    ],
    orientacoes: [
      'Consulta deve ser agendada idealmente entre o 7º e 10º dia pós-parto e repetida em 42 dias para alta oficial',
      'Conversar sensivelmente sobre planejamento familiar contraceptivo compatível com a amamentação (ex: anticoncepcionais exclusivos de progesterona, implantes, DIU de cobre ou hormonal)',
      'Reforçar o aleitamento materno exclusivo sob livre demanda até o sexto mês, tirando dúvidas técnicas práticas da pega correta'
    ],
    proxima: 'Consulta final de alta do puerpério com 42 dias de pós-parto.'
  }
];

export interface GeriatriaConsult {
  id: string;
  dominio: string;
  ordem: number;
  subtitulo?: string;
  anamnese: string[];
  triagens: {
    texto: string;
    categoria: 'Cognitivo' | 'Funcional' | 'Motor' | 'Nutricional' | 'Geral';
  }[];
  vacinas: string[];
  alertas: { texto: string; gravidade: 'yellow' | 'red' }[];
  orientacoes: string[];
  proxima: string;
  topicsOrder?: string[];
  topicTitles?: Record<string, string>;
  customChecklists?: { id: string; title: string; items: any[]; layout?: string }[];
  embeddedCalculators?: string[];
}

export const INITIAL_GERIATRIA_CONSULTS: GeriatriaConsult[] = [
  {
    id: 'g_funcionalidade',
    dominio: 'Avaliação Geral & Funcionalidade',
    ordem: 1,
    anamnese: [
      'Incontinência urinária ou intestinal relatada ou negada?',
      'Dificuldades no sono (insônia inicial, fragmentação do sono)?',
      'Queixas álgicas crônicas (dor osteoarticular, neuropática, intensidade)?',
      'Suporte social adequado e presença de cuidador principal?'
    ],
    triagens: [
      { texto: 'Independência em Atividades Básicas da Vida Diária (AVDs - Escala de Katz: banho, vestir, higiene)', categoria: 'Funcional' },
      { texto: 'Independência em Atividades Instrumentais da Vida Diária (AIVDs - Escala de Lawton: telefone, compras, remédios)', categoria: 'Funcional' },
      { texto: 'Rastreio veloz de fragilidade (Escala de Fragilidade Clínica ou Edmonton)', categoria: 'Geral' }
    ],
    vacinas: [
      'Influenza (Dose anual na campanha de outono/inverno)'
    ],
    alertas: [
      { texto: 'Indivíduo dependente em 3 ou mais AVDs básicas possui risco crítico de institucionalização sem rede de apoio sólida.', gravidade: 'yellow' },
      { texto: 'Incontinência urinária de início súbito requer investigação laboratorial de Infecção do Trato Urinário (ITU).', gravidade: 'yellow' }
    ],
    orientacoes: [
      'Incentivar adaptações domiciliares para facilitar atividades básicas com segurança',
      'Apoiar o envolvimento do idoso nas tomadas de decisão sobre sua rotina'
    ],
    proxima: 'Em 6 meses para reavaliação de capacidade funcional.'
  },
  {
    id: 'g_cognicao',
    dominio: 'Cognição & Saúde Mental',
    ordem: 2,
    anamnese: [
      'Queixa recente de esquecimento relatada pelo idoso ou familiar?',
      'Perda de interesse por atividades anteriormente prazerosas (anedonia)?',
      'Alucinações, delírios ou agitação reportados pelo cuidador no período noturno?',
      'Mudanças súbitas de humor ou ansiedade generalizada?'
    ],
    triagens: [
      { texto: 'Mini-Exame do Estado Mental (MEEM) ou MoCA ajustado para escolaridade', categoria: 'Cognitivo' },
      { texto: 'Escala de Depressão Geriátrica (GDS-15) - pontuação superior a 5 indica suspeita', categoria: 'Cognitivo' },
      { texto: 'Teste do Desenho do Relógio (TDR) - avalia funções executivas e visuoespaciais', categoria: 'Cognitivo' },
      { texto: 'Teste de Fluência Verbal Fonológica ou Semântica (nomes de animais em 1 minuto)', categoria: 'Cognitivo' }
    ],
    vacinas: [
      'Pneumocócica 13-Valente (Conjugada) seguida da 23-Valente (Polissacarídica)'
    ],
    alertas: [
      { texto: 'Declínio cognitivo flutuante de início abrupto sugere Delirium; rastrear infecção latente ou efeitos adversos de fármacos.', gravidade: 'red' },
      { texto: 'Ideação suicida expressa ou pontuação em GDS-15 igual ou maior que 10 exige intervenção psiquiátrica imediata.', gravidade: 'red' }
    ],
    orientacoes: [
      'Incentivar estimulação cognitiva dirigida (leitura, jogos, socialização ativa)',
      'Recomendar manutenção obstinada de rotina diurna com luz solar para prevenir síndrome do pôr do sol'
    ],
    proxima: 'Em 3 a 6 meses conforme a pontuação cognitiva obtida.'
  },
  {
    id: 'g_mobilidade',
    dominio: 'Mobilidade & Risco de Quedas',
    ordem: 3,
    anamnese: [
      'Histórico de quedas no último ano (quantas, contexto, lesões geradas)?',
      'Sensação de tontura, desequilíbrio ao levantar-se ou caminhar?',
      'Uso de dispositivos de auxílio à marcha (bengala, andador)?',
      'Presença de dor crônica em membros inferiores ou coluna?'
    ],
    triagens: [
      { texto: 'Teste Timed Up and Go (TUG) - tempo superior a 12-14 segundos indica alto risco de quedas', categoria: 'Motor' },
      { texto: 'Triagem de Sarcopenia - Questionário SARC-F (força de preensão, assistência ao caminhar)', categoria: 'Motor' },
      { texto: 'Teste de Velocidade da Marcha (marcha lenta e inadequada menor ou igual a 0.8 m/s)', categoria: 'Motor' },
      { texto: 'Avaliação da força muscular proximal de membros inferiores (sentar e levantar da cadeira 5 vezes)', categoria: 'Motor' }
    ],
    vacinas: [
      'Dupla Adulto (dT - difteria e tétano): reforço a cada 10 anos'
    ],
    alertas: [
      { texto: 'Idoso com 2 ou mais quedas no último ano preenche critério de alto risco; exige revisão imediata de fatores domiciliares e biomecânicos.', gravidade: 'red' },
      { texto: 'TUG maior que 20 segundos aponta para comprometimento motor grave, exigindo fisioterapia reabilitadora motora imediata.', gravidade: 'red' }
    ],
    orientacoes: [
      'Promover remoção de tapetes soltos, fios expostos e sugerir instalação de barras de apoio no banheiro',
      'Estimular atividades que fortaleçam musculatura de membros inferiores (Pilates clínico, musculação adaptada)'
    ],
    proxima: 'Em 4 meses para aferição da força física e eficácia de treinos de estabilidade.'
  },
  {
    id: 'g_nutricao',
    dominio: 'Nutrição & Saúde Sensorial',
    ordem: 4,
    anamnese: [
      'Perda involuntária de peso nos últimos 3 meses (peso anterior vs peso atual)?',
      'Dificuldades na mastigação, deglutição (engasgos frequentes) ou prótese dentária desadaptada?',
      'Dificuldade visual (visão embaçada, perda de contraste, catarata)?',
      'Dificuldade auditiva (hipoacusia, isolamento social por barreira de comunicação)?'
    ],
    triagens: [
      { texto: 'Mini Avaliação Nutricional (MNA-SF) simplificada', categoria: 'Nutricional' },
      { texto: 'Aferição da circunferência da panturrilha (CP menor que 31 cm sugere perda muscular expressiva)', categoria: 'Nutricional' },
      { texto: 'Teste de acuidade visual com tabela de Snellen e rastreio de hipoacusia pelo teste do sussurro', categoria: 'Geral' }
    ],
    vacinas: [
      'Herpes Zoster recombinante (duas doses com intervalo de 2 a 6 meses)'
    ],
    alertas: [
      { texto: 'Perda ponderal involuntária superior a 5% em 1 mês ou 10% em 6 meses indica desnutrição moderada a grave; investigar neoplasia ou depressão.', gravidade: 'red' },
      { texto: 'Disfagia moderada com engasgos frequentes para líquidos exige encaminhamento precoce à fonoaudiologia para evitar pneumonia aspirativa.', gravidade: 'red' }
    ],
    orientacoes: [
      'Orientar alimentos enriquecidos em proteínas, fracionamento de dieta e ingesta hídrica monitorizada de 1.5L a 2L diários',
      'Recomendar consulta anual com oftalmologista e readequação de iluminação doméstica'
    ],
    proxima: 'Em 3 meses para acompanhar evolução de peso e ingestão dietética.'
  },
  {
    id: 'g_polifarmacia',
    dominio: 'Polifarmácia & Medicamentos',
    ordem: 5,
    anamnese: [
      'Quantos medicamentos de uso contínuo (prescritos e automedicação) estão ativos atualmente?',
      'Idoso ou cuidador sabe a indicação de cada remédio prescrito?',
      'Histórico de reações adversas, tontura ao deitar/levantar ou sonolência excessiva?',
      'Uso frequente de automedicação (especialmente anti-inflamatórios e analgésicos comuns)?'
    ],
    triagens: [
      { texto: 'Análise de Polifarmácia (uso simultâneo de 5 ou mais medicamentos contínuos)', categoria: 'Geral' },
      { texto: 'Rastreio de Medicamentos Inapropriados para Idosos (Critérios de Beer ou STOPP/START)', categoria: 'Geral' },
      { texto: 'Triagem de hipotensão postural/ortostática (aferição da PA deitado e de pé após 1 e 3 minutos)', categoria: 'Geral' },
      { texto: 'Investigação de adesão terapêutica (Teste de Morisky-Green ou escala equivalente)', categoria: 'Geral' }
    ],
    vacinas: [
      'Tríplice bacteriana acelular do tipo adulto (dTpa) para idosos com contato próximo a recém-nascidos'
    ],
    alertas: [
      { texto: 'Uso de Benzodiazepínicos (Diazepam, Clonazepam), Neurolépticos ou anti-histamínicos de 1ª geração está associado a declínio cognitivo e alto risco de quedas.', gravidade: 'red' },
      { texto: 'Queda na PA sistólica igual ou maior que 20 mmHg ou PA diastólica igual ou maior que 10 mmHg ao levantar-se confirma Hipotensão Ortostática; rever medicamentos anti-hipertensivos.', gravidade: 'red' }
    ],
    orientacoes: [
      'Elaborar tabela visual simplificada ou caixa organizadora de medicamentos estruturada',
      'Orientar a realizar prescrição reversa (desprescrição lenta de fármacos sem indicação clínica clara)'
    ],
    proxima: 'Em 1 a 2 meses para acompanhamento de desprescrições ou trocas de terapia medicamentosa.'
  }
];
