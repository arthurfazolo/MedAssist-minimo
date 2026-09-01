import { PrescriptionModel } from '../types';

export const INITIAL_PRESCRIPTIONS: PrescriptionModel[] = [
  // --- GERAIS / AMBULATÓRIO ---
  {
    id: '1',
    category: 'Ambulatório',
    title: 'Amigdalite Bacteriana (Adulto)',
    content: `1. Amoxicilina 500mg ------ 1 caixa
   Tomar 1 comprimido, via oral, de 8 em 8 horas, por 7 dias.

2. Dipirona 500mg --------- 1 caixa
   Tomar 1 comprimido, via oral, de 6 em 6 horas, se dor ou febre.`,
    notes: 'Contraindicado em alérgicos a penicilina. Orientar hidratação.'
  },
  {
    id: '2',
    category: 'Ambulatório',
    title: 'Lombalgia Aguda',
    content: `1. Cetoprofeno 100mg ------ 1 caixa
   Tomar 1 comprimido, via oral, de 12 em 12 horas, por 5 dias (após refeições).

2. Ciclobenzaprina 10mg --- 1 caixa
   Tomar 1 comprimido, via oral, à noite, por 5 dias.

3. Dipirona 1g ------------ 1 frasco
   Tomar 40 gotas, via oral, de 6 em 6 horas, se dor forte.`,
    notes: 'Cuidado com AINEs em idosos, nefropatas e pacientes com úlcera gástrica.'
  },
  {
    id: '3',
    category: 'Ambulatório',
    title: 'Hipertensão Leve (Início)',
    content: `1. Losartana Potássica 50mg ----- 1 caixa
   Tomar 1 comprimido, via oral, de 12 em 12 horas.

2. Hidroclorotiazida 25mg ------- 1 caixa
   Tomar 1 comprimido, via oral, pela manhã.`,
    notes: 'Solicitar potássio e função renal após 2 semanas. Monitorar PA.'
  },
  {
    id: '5',
    category: 'Ambulatório',
    title: 'DRGE / Gastrite',
    content: `1. Omeprazol 20mg ------------- 1 caixa
   Tomar 1 comprimido, via oral, em jejum (30 min antes do café), por 4 semanas.`,
    notes: 'Medidas comportamentais: evitar café, álcool, tabaco e deitar após comer.'
  },

  // --- PRONTO SOCORRO ---

  // Bloco 1
  {
    id: 'ps-tsv',
    category: 'Pronto Socorro',
    title: 'Taquicardia Supraventricular Estável (TSV)',
    content: `1. Adenosina 6 mg/2 mL — 1 ampola (dose inicial: 6 mg)
   Administrar 1 ampola em bolus rápido IV.
   Acompanhar de flush imediato com 20 mL de SF 0,9%.
   Elevar o membro utilizado durante a administração.

   Sem resposta após 1 a 2 minutos → dobrar a dose:
   Adenosina 6 mg/2 mL — 2 ampolas (dose de 12 mg), em bolus rápido IV.

Dose pediátrica: 0,05 a 0,1 mg/kg (dose máxima inicial: 6 mg).
   Sem reversão em 1-2 min: aumentar 0,05 a 0,1 mg/kg; repetir até dose única máxima de 12 mg.`,
    notes: 'Preferir veias proximais — o medicamento possui meia-vida extremamente curta. Monitorização contínua obrigatória. Risco de assistolia ou fibrilação ventricular em casos extremos. Contraindicado em bloqueio AV de qualquer grau (não administrar doses adicionais nesses pacientes). Pacientes instáveis hemodinamicamente devem ser submetidos a cardioversão elétrica sincronizada (difere da desfibrilação).'
  },

  // Bloco 2
  {
    id: 'ps-tv',
    category: 'Pronto Socorro',
    title: 'Taquicardia Ventricular Estável (TV)',
    content: `Dose de ataque:
1. Amiodarona 150 mg/3 mL — 2 ampolas (dose: 300 mg)
   Diluir 2 ampolas em 250 mL de SG 5%.
   Infundir IV durante 30 minutos.

Dose de impregnação:
2. Amiodarona 150 mg/3 mL — 6 ampolas (dose: 900 mg)
   Diluir 6 ampolas em 500 mL de SG 5%.
   Infusão IV contínua em BIC:
   - 34 mL/h (1 mg/min) nas primeiras 6 horas.
   - 17 mL/h (0,5 mg/min) nas 18 horas seguintes.`,
    notes: 'Interromper em caso de surgimento de bloqueio atrioventricular. Em caso de falha terapêutica, recorrer à cardioversão elétrica sincronizada (CVE). Pacientes instáveis (hipotensão, rebaixamento de consciência, dor torácica anginosa, dispneia cardíaca) devem ser submetidos diretamente à CVE.'
  },

  // Bloco 3
  {
    id: 'ps-fa-flutter',
    category: 'Pronto Socorro',
    title: 'Fibrilação Atrial / Flutter — Cardioversão Química e Controle de Frequência',
    content: `Cardioversão química:
1. Amiodarona 150 mg/3 mL — 2 ampolas
   Diluir 2 ampolas (300 mg) em 250 mL de SG 5%.
   Infundir IV em 30 minutos.

Dose de impregnação:
   Amiodarona 150 mg/3 mL — 6 ampolas (900 mg)
   Diluir em 500 mL SG 5% em BIC:
   - 34 mL/h (1 mg/min) nas primeiras 6h.
   - 17 mL/h (0,5 mg/min) nas 18h seguintes.

Controle de frequência — Betabloqueadores:
2. Metoprolol 5 mg/5 mL
   Administrar 1 ampola EV em 3 a 5 minutos (preferencialmente a 1 mg/min).
   Repetir a cada 5 minutos se necessário, até dose máxima de 15 mg (3 ampolas).

Bloqueador de canal de cálcio:
3. Verapamil 5 mg/2 mL
   Administrar 5 mg (1 ampola) EV em 2 a 5 minutos.
   Sem resposta: repetir 10 mg EV 30 minutos após a dose inicial.
   Manutenção VO: 40 mg a cada 8 horas.
   Contraindicado na insuficiência ventricular esquerda!

Digital:
4. Deslanosídeo 0,4 mg/2 mL
   Dose inicial: 1 ampola (0,4 mg) EV em bolus.
   Dose máxima: 1,6 mg (4 ampolas).

Anticoagulação oral (após cardioversão — manutenção):
5. Rivaroxabana 20 mg — Tomar 1 comprimido durante refeição, 1 vez ao dia.
   (ClCr 30–50 mL/min: reduzir para 15 mg)

6. Apixabana 5 mg — Tomar 1 comprimido a cada 12 horas.
   (ClCr 15–30 mL/min: reduzir para 2,5 mg a cada 12 horas)

7. Dabigatrana 150 mg — Tomar 1 comprimido 2 vezes ao dia.
   (≥ 80 anos ou risco de sangramento: 110 mg, 2 vezes ao dia)

Amiodarona VO pós-cardioversão:
8. Amiodarona 200 mg
   Impregnação (600–800 mg/dia até completar 10 g total):
   - 1 comprimido a cada 8 horas por 10 dias.
   - Depois: 1 comprimido a cada 12 horas por 10 dias.
   - Manutenção: 1 comprimido ao dia.`,
    notes: 'Cardioversão de ritmo somente após confirmação de ausência de trombo em átrio/ventrículo esquerdo (FA < 24h, ecocardiograma negativo, ou anticoagulação correta por 3–4 semanas). Varfarina é preferível em casos de prótese metálica valvar e FA com estenose mitral reumática.'
  },

  // Bloco 4
  {
    id: 'ps-bradi-acls',
    category: 'Pronto Socorro',
    title: 'Bradiarritmia — Paciente Instável (Protocolo ACLS)',
    content: `1. Atropina 1 mg IV em bolus
   Repetir a cada 3 a 5 minutos se necessário.
   Dose máxima: 3 mg.

Se persistência da bradicardia após atropina:

2. Dopamina 50 mg — 5 ampolas
   Diluir 5 ampolas em 200 mL SG 5% para BIC.
   Dose: 5 a 20 mcg/kg/min.

OU

3. Adrenalina 1 mg/mL — 4 ampolas
   Diluir 4 ampolas em 234 mL de SG 5% para BIC.
   Dose: 2 a 10 mcg/min.

OU

4. Marcapasso transcutâneo (se instabilidade refratária).`,
    notes: 'No Bloqueio Atrioventricular Total (BAVT), a atropina frequentemente não é eficaz. Considerar marcapasso transcutâneo ou transvenoso nessa situação. Se o marcapasso transcutâneo for utilizado por falta de habilidade técnica para o transvenoso, garantir analgesia potente e encaminhamento urgente ao especialista.'
  },

  // Bloco 5
  {
    id: 'ps-sca',
    category: 'Pronto Socorro',
    title: 'Síndrome Coronariana Aguda — Manejo Inicial (SCA)',
    content: `Via oral:
1. AAS 100 mg
   Mastigar e engolir 3 comprimidos (dose de ataque: 300 mg).
   Após: 1 comprimido a cada 24 horas.

2. Ticagrelor 90 mg
   Tomar 2 comprimidos como dose de ataque (180 mg).
   Manutenção: 1 comprimido a cada 12 horas. Atenção em bradicardias.

OU Clopidogrel 75 mg:
   - Sem supradesnivelamento: 4 comprimidos (300 mg) dose única; depois 1 cp/24h.
   - Com supradesnivelamento ou oclusão coronariana aguda:
     * Trombólise: 4 comprimidos (300 mg); > 75 anos: 75 mg (1 comprimido).
     * Angioplastia (ICP): 8 comprimidos (600 mg).

3. Atorvastatina 80 mg
   Tomar 1 comprimido a cada 24 horas.

4. Isossorbida 5 mg (Isordil) sublingual — para dor torácica ativa
   1 comprimido SL; repetir a cada 5 min, até mais 2 vezes.
   Falha: partir para nitrato endovenoso (Tridil).

5. Carvedilol 3,125 mg — via oral, a cada 12 horas.

Via subcutânea:
6. Enoxaparina 60 mg — 1 mg/kg SC a cada 12 horas.
   (> 75 anos: 0,75 mg/kg SC a cada 12 horas)
   (ClCr < 30 mL/min: metade da dose)

Via intravenosa (dor persistente ou sinais congestivos):
7. Nitroglicerina [Tridil] 25 mg/5 mL
   Diluir 1 ampola em 230 mL de SF 0,9%.
   Infundir em BIC iniciando com 5 mL/h, titulando conforme resposta, evitando hipotensão.

Trombólise (antes de iniciar):
8. Enoxaparina 30 mg — 1 ampola EV em bolus (omitir em pacientes > 75 anos).
9. Alteplase 1 mg/mL — dose máxima 100 mg.
   Bolus inicial: 15 mg IV.
   A seguir: 0,75 mg/kg durante 30 min (máx. 50 mg).
   Depois: 0,50 mg/kg durante 60 min (máx. 35 mg).`,
    notes: 'Não utilizar nitrato em IAM de parede inferior com envolvimento de ventrículo direito. Contraindicar nitratos se uso de Sildenafil/Vardenafil nas últimas 24h ou Tadalafil nas últimas 48h. Oferecer suplementação de oxigênio se saturação < 90%. Prasugrel: evitar em peso < 60 kg, AVC prévio ou idade > 75 anos; utilizar apenas após conhecimento da anatomia coronariana.'
  },

  // Bloco 6
  {
    id: 'ps-eap-icad',
    category: 'Pronto Socorro',
    title: 'Edema Agudo de Pulmão / Insuficiência Cardíaca Aguda Descompensada',
    content: `1. Ventilação Não Invasiva (VNI) — iniciar imediatamente.
   SCAPE: PS 12 cmH₂O + PEEP 6-7 cmH₂O. Ajustar FiO₂ pela saturação.
   Desmame em reduções de 2 cmH₂O de PS.

2. Furosemida (20 mg/2 mL) IV
   Dose de ataque: 1,0 a 1,5 mg/kg.
   (Uso prévio de furosemida VO: converter — 40 mg VO equivale a 20 mg EV)

3. Nitroglicerina [Tridil] 50 mg/10 mL IV
   Diluir 1 ampola em 240 mL SF 0,9% (concentração: 200 mcg/mL).
   SCAPE (conforme PAS):
   - PAS 160–179 mmHg: bolus de 3 mL.
   - PAS 180–199 mmHg: bolus de 4 mL.
   - PAS ≥ 200 mmHg: bolus de 5 mL.
   Manutenção: 30 mL/h; ajustar conforme resposta pressórica.
   FOSPE: iniciar com 5 mL/h e titular conforme resposta.

4. Nitroprussiato de Sódio [Nipride] 50 mg/2 mL IV
   Diluir 1 ampola em 248 mL SF 0,9% (concentração: 200 mcg/mL).
   Iniciar BIC a 5 mL/h; dose inicial: 0,25–0,5 mcg/kg/min; máx. 10 mcg/kg/min.

5. Dobutamina 250 mg/20 mL IV (para baixo débito)
   Diluir 4 ampolas (80 mL) em 170 mL SF 0,9% (concentração: 4 mg/mL).
   Iniciar BIC a 2 mL/h; dose usual: 2–20 mcg/kg/min.`,
    notes: 'A morfina não é mais recomendada no EAP pela ausência de benefício documentado e risco de hipotensão. Diureticoterapia via EV é preferível em cenário de emergência — absorção oral imprevisível na hipervolemia. Distinguir SCAPE (redistribuição hídrica sem excesso de volume) de FOSPE (sobrecarga hídrica crônica agudizada) para definir a abordagem.'
  },

  // Bloco 7
  {
    id: 'ps-has-emergencia',
    category: 'Pronto Socorro',
    title: 'Urgência e Emergência Hipertensiva',
    content: `Emergência hipertensiva — IV:
1. Nitroprussiato de Sódio [Nipride] 50 mg/2 mL
   Diluir 1 ampola em 248 mL SF 0,9% (concentração: 200 mcg/mL).
   Iniciar BIC a 5 mL/h; titular conforme PA.
   Dose inicial: 0,25–0,5 mcg/kg/min; dose máxima: 10 mcg/kg/min.

OU
   Diluir 2 ampolas (4 mL) em 246 mL SF 0,9% (concentração: 400 mcg/mL).
   Iniciar BIC a 2–3 mL/h.

2. Nitroglicerina [Tridil] 50 mg/10 mL IV
   Diluir 1 ampola em 240 mL SG 5%.
   BIC com titulação conforme tolerância clínica.
   Dose inicial: 5–20 mcg/min; dose máxima: 400 mcg/min.`,
    notes: 'A urgência hipertensiva (sem lesão de órgão-alvo aguda) NÃO exige correção pressórica imediata no pronto-socorro. Descartar fatores contribuintes como dor, ansiedade e má adesão ao tratamento ambulatorial. A emergência hipertensiva (com lesão de órgão-alvo em evolução) requer internação e manejo IV com monitorização contínua.'
  },

  // Bloco 8
  {
    id: 'ps-disseccao-aorta',
    category: 'Pronto Socorro',
    title: 'Dissecção Aguda de Aorta — Controle Hemodinâmico',
    content: `Primeira linha — Betabloqueador IV:
1. Esmolol — bolus de 500 mcg/kg, seguido de infusão contínua de 50–200 mcg/kg/min.

OU

2. Metoprolol 5 mg/5 mL
   Administrar 5 mg (1 ampola) EV em 5 minutos.
   Pode ser repetido até mais 2 vezes.
   Manutenção: 5 mg a cada 4–6 horas após estabilização.

Analgesia:
3. Morfina 10 mg/mL
   Diluir 1 ampola (1 mL) em 9 mL de água destilada.
   Administrar 2 mL EV imediatamente, ajustar conforme dor.

Vasodilatador adjuvante:
4. Nitroprussiato de Sódio [Nipride] 50 mg/2 mL
   Diluir 1 ampola em 248 mL SF 0,9% (concentração: 200 mcg/mL).
   Iniciar BIC a 5 mL/h e titular conforme PA.
   Iniciar SOMENTE após controle adequado da frequência cardíaca.`,
    notes: 'O objetivo central é a redução do estresse de cisalhamento vascular — controlar primeiramente a frequência cardíaca (FC < 60 bpm) e depois a pressão arterial. Não iniciar nitroprussiato antes do betabloqueador (risco de taquicardia reflexa). Acionar obrigatoriamente a equipe de cardiocirurgia ou cirurgia vascular. Classificações Stanford Tipo A e DeBakey Tipos I e II têm indicação cirúrgica.'
  },

  // Bloco 9
  {
    id: 'ps-enxaqueca-crise',
    category: 'Pronto Socorro',
    title: 'Enxaqueca — Tratamento de Crise Aguda (Pronto-Atendimento)',
    content: `Linha inicial:
1. Dipirona 1000 mg/2 mL — 1 a 2 ampolas EV.
   Alternativa VO: Paracetamol 750 mg a cada 6 horas.

2. Cetoprofeno 100 mg/2 mL
   Diluir 1 ampola em 100 mL SF 0,9% e administrar IV em 20 minutos, a cada 12 horas.

3. Metoclopramida 10 mg/2 mL — 1 ampola EV.
   Alternativas: Bromoprida 10 mg VO/EV; Ondansetrona 4–8 mg EV.

Para refratariedade à abordagem inicial:
4. Clorpromazina 5 mg/mL (1 ampola — 5 mL)
   Dose de ataque: 0,1 mg/kg EV em 3 minutos.
   Manutenção: 0,7 mg/kg em BIC por 30 minutos; pode ser repetida até 3 vezes.
   OU: Clorpromazina 25 mg (1 ampola) IM.
   OU: Clorpromazina 4% — 3 a 10 gotas VO a cada 6–8 horas.

Alternativas:
5. Sumatriptano 6 mg/0,5 mL SC — 6 a 12 mg SC; pode repetir após 2 horas.
6. Dexametasona 10 mg/2,5 mL — 1 ampola EV em bolus (crises > 48 horas).

Via oral:
7. Sumatriptano + Naproxeno [Sumaxpro] 50/500 mg
   1 comprimido no início da crise; repetir após 2 horas se necessário (máx. 2 cp/dia).
8. Naproxeno 500 mg — 1 comprimido a cada 12 horas.`,
    notes: 'A metoclopramida é a primeira escolha antiemética por possuir também ação analgésica. Hidratação adequada é parte fundamental do tratamento. Sumatriptanos são contraindicados em doença arterial preexistente ou hipertensão mal controlada. Atentar para cefaleia por abuso de analgésicos se uso frequente.'
  },

  // Bloco 10
  {
    id: 'ps-vertigem',
    category: 'Pronto Socorro',
    title: 'Vertigem — Tratamento Farmacológico',
    content: `Via endovenosa (pronto-atendimento):
1. Dimenidrato + Piridoxina [Dramin B6] 50 mg EV — 1 ampola a cada 6 horas.

Via oral (ambulatorial):
2. Dimenidrato 50 mg — 1 comprimido a cada 4 ou 6 horas.
3. Cinarizina 25 mg — 1 comprimido a cada 8 horas.
4. Meclozina 50 mg — 1 comprimido a cada 8 horas.
5. Dimenidrato + Piridoxina [Dramin B6] 50 mg + 10 mg
   1 comprimido a cada 4 horas (não exceder 400 mg — 8 comprimidos ao dia).`,
    notes: 'Fármacos utilizados incluem anti-histamínicos, benzodiazepínicos e antieméticos. Cautela com vertigens refratárias ou com sinais de alarme para etiologia central (aplicar protocolo HINTS, avaliar sinais neurológicos focais). Encaminhamento especializado indicado em casos de refratariedade.'
  },

  // Bloco 11
  {
    id: 'ps-convulsao-status',
    category: 'Pronto Socorro',
    title: 'Crise Convulsiva / Estado de Mal Epiléptico',
    content: `Esquema inicial:
1. Diazepam 10 mg/2 mL — 1 ampola IV em bolus lento.
   Dose pediátrica: 0,1 a 0,3 mg/kg (máximo 10 mg).

Sem acesso venoso:
   Midazolam 10 mg — 1 ampola IM.
   Dose pediátrica: 0,25 a 0,5 mg/kg (máximo 10 mg).

Refratário após 5 min — repetir benzodiazepínico:
   Diazepam 10 mg IV em bolus lento OU Midazolam 10 mg IM.

Refratário após benzodiazepínicos:
2. Fenitoína [Hidantal] 250 mg/5 mL
   Dose de ataque: peso (kg) × 20 mg.
   Ex.: 68 kg × 20 = 1.360 mg (≈ 6 ampolas / 1.500 mg).
   Diluir em 250 mL SF 0,9% e infundir em 1 hora.
   Manutenção: 100 mg + 100 mL SF 0,9% a cada 8 horas.

3. Fenobarbital 200 mg/2 mL
   Diluir 5 ampolas em 90 mL NaCl 0,9% (concentração 10 mg/mL).
   Administrar 10 mg/kg (≈ 1 mL/kg).

Estado de mal refratário — proceder à IOT:
4. Midazolam 50 mg/10 mL
   Diluir 3 ampolas em 120 mL NaCl 0,9% (concentração 1 mg/mL).
   Ataque: 0,2 mg/kg EV. Manutenção: 0,1 a 0,4 mg/kg/h.

5. Propofol 200 mg/20 mL
   Diluir 1 ampola em 180 mL NaCl 0,9%.
   Ataque: 1–2 mg/kg EV. Manutenção: 5–10 mg/kg/h.`,
    notes: 'Verificar glicemia capilar imediatamente. Identificar e tratar causa subjacente. Fenitoína deve ser diluída exclusivamente em SF 0,9% (incompatível com glicosado). Monitorar pressão arterial e ritmo cardíaco durante administração de fenitoína.'
  },

  // Bloco 12
  {
    id: 'ps-meningite-encefalite',
    category: 'Pronto Socorro',
    title: 'Meningite Bacteriana e Encefalite — Tratamento por Perfil',
    content: `1. Adulto imunocompetente:
   Ceftriaxona 2 g IV a cada 12 horas, por 10–14 dias.
   Dexametasona 10 mg EV a cada 6 horas por 4 dias (iniciar antes ou junto ao antibiótico).
   Dose pediátrica de ceftriaxona: 100 mg/kg/dia (máx. 4 g/dia).

2. Extremos de idade (risco de Listeria):
   Ceftriaxona 2 g IV a cada 12 horas, por 10–14 dias.
   + Ampicilina 2 g EV a cada 4 horas, por 14–21 dias.

3. Pós-TCE com solução de continuidade / neurocirurgia / DVP (risco de Staphylococcus):
   Ceftriaxona 2 g IV a cada 12 horas, por 10–14 dias.
   + Ampicilina 2 g EV a cada 4 horas, por 14–21 dias.
   + Vancomicina 15–20 mg/kg a cada 12 horas (dose usual: 1–2 g).

4. Encefalopatia herpética:
   Aciclovir 10 mg/kg EV a cada 8 horas, por 14–21 dias.

5. Neurossífilis:
   Penicilina Cristalina 4.000.000 UI EV a cada 4 horas, por 14 dias.

Profilaxia para N. meningitidis (comunicantes íntimos):
   1ª linha: Rifampicina 600 mg VO 1 vez ao dia por 4 dias.
   2ª linha: Ceftriaxona 250 mg dose única IM/EV (< 12 anos: 125 mg).
   3ª linha: Ciprofloxacino 500 mg dose única VO.`,
    notes: 'Profilaxia deve ser iniciada preferencialmente nas primeiras 48 horas após o contato. Vacinar comunicantes não imunizados. Dexametasona reduz mortalidade e sequelas neurológicas em adultos com meningite bacteriana — iniciar junto ao antibiótico.'
  },

  // Bloco 13
  {
    id: 'ps-crise-asmatica',
    category: 'Pronto Socorro',
    title: 'Crise Asmática — Leve/Moderada e Grave',
    content: `Crise leve / moderada:
1. Oxigenoterapia — alvo de saturação: 93–95% (CNO₂ ou máscara Hudson).

2. Salbutamol [Aerolin] 100 mcg/jato — via inalatória
   Spray com espaçador: 4 a 10 jatos a cada 20 minutos na 1ª hora.
   Nebulização: 5 mg (20 gotas) em 3–4 mL SF 0,9%, a cada 20 min por 1 hora.

3. Ipratrópio [Atrovent] — inalatório
   Nebulização: 500 mcg (40 gotas) a cada 20 minutos por 1 hora, associado ao Salbutamol.

4. Prednisolona 20 mg VO
   Tomar 2 comprimidos pela manhã por 5 dias.
   Dose pediátrica: 1–2 mg/kg/dia (máx. 40–60 mg/dia).

Crise grave (adicionar ao acima):
5. Metilprednisolona IV — 125 mg em bolus; manutenção: 40–60 mg/dia.
   OU Hidrocortisona IV — ataque: 200–300 mg; manutenção: 100 mg a cada 6–8h.
   OU Prednisona VO — 40–80 mg ao dia.

6. Sulfato de Magnésio 50% IV (refratariedade)
   Realizar 2 g diluídos em 100 mL SF 0,9%, infundido em 20–30 minutos.
   Dose pediátrica: 25–50 mg/kg (máx. 2 g) em 100 mL salina, em 20–30 min.`,
    notes: 'Em broncoespasmo grave, as doses de salbutamol podem ser amplamente excedidas — manter monitorização contínua e avaliar potássio sérico. A oxigenoterapia deve ser ajustada para manter saturação-alvo sem hipercapnia induzida (DPOC: alvo 88–92%).'
  },

  // Bloco 14
  {
    id: 'ps-pac-oral',
    category: 'Pronto Socorro',
    title: 'Pneumonia Adquirida na Comunidade (PAC) — Tratamento Oral',
    content: `Sem comorbidades / sem uso recente de antibiótico:
1. Amoxicilina + Clavulanato [Clavulin] 875+125 mg
   Tomar 1 comprimido a cada 12 horas por 7 dias.

OU Amoxicilina + Clavulanato 500+125 mg
   Tomar 1 comprimido a cada 8 horas por 7 dias.

2. Azitromicina 500 mg — 1 comprimido a cada 24 horas por 5 dias.
   OU Claritromicina 500 mg — 1 comprimido a cada 12 horas por 7 dias.

3. Dipirona 1 g — 1 comprimido VO a cada 6 horas em caso de dor ou febre.

Com fatores de risco / doença mais grave / uso recente de antibiótico:
4. Amoxicilina + Clavulanato 875+125 mg a cada 12h por 7 dias.
   + Azitromicina 500 mg a cada 24h por 7 dias.
   OU + Claritromicina 500 mg a cada 12h por 7 dias.`,
    notes: 'Dose pediátrica de amoxicilina-clavulanato: 50 mg/kg/dia. Para PAC complicada pediátrica via EV: Ceftriaxona 50–100 mg/kg/dia a cada 12h; Penicilina Cristalina 200.000–250.000 UI/kg/dia a cada 4–6h; Vancomicina 40–60 mg/kg/dia a cada 6–8h.'
  },

  // Bloco 15
  {
    id: 'ps-tb-pulmonar',
    category: 'Pronto Socorro',
    title: 'Tuberculose Pulmonar — Esquema Básico (Adultos)',
    content: `Fase de ataque (2 meses):
1. Rifampicina + Isoniazida + Pirazinamida + Etambutol (RHZE) 150/75/400/275 mg
   - 20–35 kg: 2 comprimidos ao dia.
   - 36–50 kg: 3 comprimidos ao dia.
   - 51–70 kg: 4 comprimidos ao dia.
   - > 70 kg: 5 comprimidos ao dia.
   (Tomar em dose única diária, preferencialmente em jejum)

Fase de manutenção (4 meses):
2. Rifampicina + Isoniazida (RH) 300/150 mg ou 150/75 mg
   - 20–35 kg: 1 cp 300/150 mg OU 2 cp 150/75 mg.
   - 36–50 kg: 3 cp 150/75 mg.
   - 51–70 kg: 4 cp 150/75 mg.
   - > 70 kg: 5 cp 150/75 mg.`,
    notes: 'Tratamento supervisionado (Directly Observed Therapy — DOT) é recomendado para garantir adesão. Monitorar função hepática e visual durante o tratamento. Notificação compulsória obrigatória.'
  },

  // Bloco 16
  {
    id: 'ps-nauseas-vomitos',
    category: 'Pronto Socorro',
    title: 'Náuseas e Vômitos — Tratamento Farmacológico',
    content: `Via intravenosa:
1. Ondansetrona 4 mg/mL — 1 ampola
   Diluir em 100 mL SF 0,9%. Administrar em 20 minutos a cada 8 horas.
   Dose pediátrica: 0,1 mg/kg.

2. Metoclopramida 10 mg/2 mL — 1 ampola
   Diluir em 10 mL de água destilada e administrar EV lentamente a cada 8 horas.

3. Bromoprida 10 mg/2 mL — 1 ampola
   Diluir em 18 mL de água destilada. Administrar EV lentamente a cada 8 horas.

Via oral:
4. Ondansetrona 4 ou 8 mg — 1 comprimido a cada 8 horas.
5. Domperidona 10 mg — 1 comprimido a cada 8 horas.
6. Bromoprida 10 mg — 1 comprimido a cada 8 ou 12 horas.
7. Metoclopramida 10 mg — 1 comprimido a cada 8 hours.`,
    notes: 'A metoclopramida possui ação procinética, sendo útil quando associada a gastroparesia ou vômitos de origem digestiva alta. Ondansetrona é preferível em contexts oncológicos e pós-operatórios. Bromoprida tem perfil semelhante à metoclopramida com menor penetração de barreira hematoencefálica.'
  },

  // Bloco 17
  {
    id: 'ps-diarreia-infecciosa',
    category: 'Pronto Socorro',
    title: 'Diarreia Aguda Infecciosa',
    content: `Reidratação:
1. Soro de reidratação oral (SRO) — 1 envelope em 500 mL de água.
   Ingerir ao longo do dia associado a outros líquidos.
   Suspender após 24h sem episódios de diarreia.

Antibioticoterapia (forma infecciosa):
2. Ciprofloxacino 500 mg — 1 comprimido a cada 12 horas por 5 dias.
   + Metronidazol 400 mg — 1 comprimido a cada 8 horas por 7 dias.

Pediatria (até 10 anos / até 30 kg):
   Azitromicina: 10 mg/kg no 1º dia; 5 mg/kg por mais 4 dias VO.
   Ceftriaxona: 50–100 mg/kg IM ou EV.`,
    notes: 'Suspender cafeína, leite e medicamentos que possam desencadear diarreia. Monitorar sinais de desidratação e indicar internação em casos graves (depleção volêmica significativa, imunocomprometidos ou extremos de idade).'
  },

  // Bloco 18
  {
    id: 'ps-hda-inicial',
    category: 'Pronto Socorro',
    title: 'Hemorragia Digestiva Alta — Manejo Inicial',
    content: `1. Omeprazol 40 mg/10 mL — 1 ampola IV a cada 12 horas.
   Suspender após endoscopia digestiva alta (EDA) se não houver indicação de manutenção.

Varicosa (hipertensão portal):
2. Terlipressina 1 mg/mL — 2 ampolas (2 mg) EV em bolus + 1 ampola a cada 4 horas.
   OU Octreotide 0,5 mg/mL — diluir 1 ampola em 250 mL SF 0,9%.
      Fazer 50 mcg em bolus EV; manutenção: 50 mcg/h EV.

3. Ondansetrona 4 mg/mL — 1 ampola
   Diluir em 100 mL SF 0,9%. Administrar em 20 minutos a cada 8 horas.

Profilaxia de peritonite bacteriana espontânea (PBE):
4. Ceftriaxona 1 g EV a cada 24 horas por 7 dias.
   OU Ciprofloxacino 400 mg/200 mL — 1 bolsa EV a cada 12 horas por 7 dias.
   OU Norfloxacino 400 mg VO a cada 12 horas por 7 dias.

Profilaxia de encefalopatia hepática:
5. Lactulose 667 mg/mL — 20–40 mL a cada 12 horas.
   Ajustar para 2–3 evacuações diárias.`,
    notes: 'A estabilização hemodinâmica tem prioridade absoluta sobre qualquer procedimento. EDA nas primeiras 12–24h (varicosa) ou 24h (não varicosa) quando a estabilidade clínica permitir. Monitorar sinais de choque.'
  },

  // Bloco 19
  {
    id: 'ps-pancreatite-inicial',
    category: 'Pronto Socorro',
    title: 'Pancreatite Aguda — Manejo Inicial',
    content: `1. Dieta suspensa nas primeiras 48 horas (avaliar reintrodução oral conforme evolução).

2. Cloreto de sódio 0,9% — 3 mL/kg/h EV por 8 a 12 horas.
   Em hipotensão: Ringer Lactato 20–30 mL/kg EV em 30 minutos.

3. Dipirona 1 g/2 mL — 1 ampola EV em bolus lento a cada 6 horas.

4. Tramadol 100 mg/2 mL — 1 ampola
   Diluir em 100 mL SF 0,9%. Administrar IV em 30 minutos a cada 8 horas.

5. Morfina 10 mg/mL — 1 ampola
   Diluir em 10 mL de água bidestilada. Administrar 4–5 mL a cada 6 horas.

6. Ondansetrona 4 mg/mL — 1 ampola
   Diluir em 100 mL SF 0,9%. Administrar em 20 minutos a cada 8 horas.

7. Enoxaparina 40 mg SC — 1 ampola a cada 24 horas.

Em caso de infecção confirmada por imagem (TC):
8. Meropenem 1 g — diluir em 10 mL de ABD. Administrar EV a cada 8 horas.`,
    notes: 'Solicitar exames para cálculo do Escore de Ranson. Vigilância contínua de sinais infecciosos, choque e falência orgânica. Avaliar necessidade de terapia nutricional parenteral em casos prolongados.'
  },

  // Bloco 20
  {
    id: 'ps-drge-dup',
    category: 'Pronto Socorro',
    title: 'Refluxo Gastroesofágico e Doença Ulcerosa Péptica',
    content: `Refluxo gastroesofágico (tratamento empírico 4–12 semanas):
1. Omeprazol 20–40 mg VO
   1 comprimido pela manhã em jejum, 30 min antes de se alimentar.
   Pode ser fracionado a cada 12 horas.
   OU Esomeprazol 20–40 mg — mesma posologia.

2. Domperidona 10 mg — 1 comprimido a cada 8 horas.
   OU Bromoprida 10 mg — 1 comprimido a cada 8 horas.

Doença ulcerosa péptica:
3. Omeprazol 40 mg / Pantoprazol 40 mg / Esomeprazol 40 mg
   1 comprimido pela manhã em jejum por 8–12 semanas.

H. pylori positivo (terapia tripla):
4. Amoxicilina 500 mg — 2 comprimidos a cada 12 horas por 14 dias.
   + Claritromicina 500 mg — 1 comprimido a cada 12 horas por 14 dias.
   + Omeprazol 40 mg — 1 comprimido a cada 12 horas por 14 dias.`,
    notes: 'Orientações não farmacológicas: elevar cabeceira ao deitar, não se alimentar antes de dormir, evitar tabaco, álcool, refeições volumosas, chocolates, café e alimentos condimentados. Manutenção do peso adequado reduz sintomas de DRGE.'
  },

  // Bloco 21
  {
    id: 'ps-ascite-hepatica',
    category: 'Pronto Socorro',
    title: 'Ascite Hepática — Tratamento e Profilaxias',
    content: `1. Espironolactona 25 mg — Tomar 2 comprimidos (50 mg) pela manhã.
2. Furosemida 40 mg — Tomar 1 a 2 comprimidos pela manhã.

Ascite com peritonite bacteriana espontânea (PBE):
3. Ceftriaxona 1 g — Administrar 2 g IV a cada 8 horas por 7 dias.
   OU Piperacilina + Tazobactam 4/0,5 g — 4,5 g IV a cada 6 horas por 7 dias.

Profilaxia de PBE:
4. Norfloxacino 400 mg — 1 comprimido pela manhã.
   OU Sulfametoxazol + Trimetoprima 800/160 mg — 1 comprimido pela manhã.

Profilaxia de encefalopatia hepática:
5. Lactulose 667 mg/mL — Tomar 20 mL a cada 8 horas.
   Objetivo: 2 a 4 evacuações ao dia.`,
    notes: 'Dieta hipossódica é medida fundamental associada ao tratamento farmacológico. Suspender diuréticos em casos de PBE ativa. Monitorar função renal e eletrólitos durante o uso de diuréticos.'
  },

  // Bloco 22
  {
    id: 'ps-diverticulite-amb',
    category: 'Pronto Socorro',
    title: 'Diverticulite Aguda Não Complicada — Ambulatorial',
    content: `Antibióticos:
1. Ciprofloxacino 500 mg — 1 comprimido a cada 12 horas por 7 dias.
   + Metronidazol 400 mg — 1 comprimido a cada 8 horas por 7 dias.

   OU Amoxicilina + Clavulanato 875+125 mg — 1 comprimido a cada 12 horas por 10 dias.

Analgesia:
2. Dipirona 1 g — 1 comprimido VO a cada 6 horas (dor leve/moderada).
3. Ibuprofeno 400 mg — 1 comprimido a cada 6 horas por até 3 dias (dor moderada).
   OU Cetoprofeno 150 mg — 1 comprimido a cada 12 horas por até 3 dias.
4. Paracetamol + Codeína 500+30 mg — 1 comprimido a cada 6 horas (dor intensa sem resposta).

Antieméticos:
5. Domperidona 10 mg / Metoclopramida 10 mg / Ondansetrona 4–8 mg
   Tomar 1 comprimido a cada 8 horas conforme opção disponível.`,
    notes: 'O uso de antibióticos na diverticulite não complicada não demonstrou modificar a evolução da doença em todos os estudos; a decisão deve ser individualizada. Em caso de abscesso ou pneumoperitônio associado, trata-se de abdome agudo com indicação de procedimento cirúrgico ou drenagem.'
  },

  // Bloco 23
  {
    id: 'ps-sepse-pacote',
    category: 'Pronto Socorro',
    title: 'Sepse e Choque Séptico — Pacote de 1 Hora (Surviving Sepsis Campaign)',
    content: `PACOTE DE 1 HORA — Iniciar simultaneamente:

1. Coletar lactato sérico.
   (Se > 2,0 mmol/L: repetir em 2–4 horas)

2. Coletar 2 conjuntos de hemoculturas de sítios distintos ANTES de iniciar antibiótico.

3. Expansão volêmica:
   SF 0,9% ou Ringer Lactato — 30 mL/kg EV em bolus
   (se hipotensão ou lactato ≥ 4 mmol/L)

4. Antibioticoterapia empírica — via intravenosa:
   Foco pulmonar:
   Ceftriaxona 2 g EV a cada 12h + Azitromicina 500 mg VO/EV 1x/dia.
   OU Piperacilina + Tazobactam [Tazocin] 4,5 g EV a cada 6 horas.

   Com risco para Pseudomonas:
   Ceftazidima 2 g EV a cada 8h OU Cefepima 2 g EV a cada 8h OU Meropenem 1 g EV a cada 8h.

5. Vasopressor se PAM < 65 mmHg persistir após volume:
   Noradrenalina — iniciar em 0,1–0,2 mcg/kg/min em BIC; titular para PAM ≥ 65 mmHg.
   (Corticosteroide se dose de noradrenalina > 0,25 mcg/kg/min):
   Hidrocortisona 200 mg/dia EV divididos em 4 doses ou BIC.`,
    notes: 'O tempo de ação é o principal determinante do prognóstico. Hemoculturas devem ser coletadas ANTES do antibiótico. Controle do foco infeccioso (drenagem, desbridamento, remoção de cateter) é parte essencial do tratamento. Transferência para UTI indicada em choque séptico instalado.'
  },

  // Bloco 24
  {
    id: 'ps-anafilaxia-choque',
    category: 'Pronto Socorro',
    title: 'Anafilaxia e Choque Anafilático',
    content: `PRIMEIRA DROGA — IMEDIATO:
1. Adrenalina 1 mg/mL (solução pura)
   Aplicar 0,5 mg (0,5 mL) IM no vasto lateral da coxa.
   Pode repetir a cada 5–15 minutos conforme necessidade.

Adjuvantes (após estabilização):
2. Hidrocortisona 200–500 mg EV.
3. Difenidramina 50 mg EV OU Prometazina 25 mg IM.
4. Salbutamol spray — 4 a 10 jatos se broncoespasmo.
5. SF 0,9% — 20 mL/kg EV em bolus se hipotensão persistente.`,
    notes: 'A adrenalina IM é a única intervenção salvadora — não atrasar sua administração. A via IV só deve ser utilizada por especialista em caso de parada cardiorrespiratória ou choque refratário. Anti-histamínicos e corticoides são adjuvantes e não substituem a adrenalina. Manter observação mínima de 4–6 horas após a estabilização.'
  },

  // Bloco 25
  {
    id: 'ps-intox-alcoolica',
    category: 'Pronto Socorro',
    title: 'Intoxicação Alcoólica e Síndrome de Abstinência Alcoólica',
    content: `Abstinência alcoólica — CIWA > 10 (forma moderada/grave):
1. Diazepam 10 mg VO ou EV em bolus lento.
   Repetir a cada 1–2 horas se necessário até CIWA < 8.
   Manutenção: 5–10 mg a cada 6 horas nas primeiras 24–48h.

   OU Lorazepam 2 mg EV/IM — a cada 2 horas conforme escore.

2. Tiamina [Vitamina B1] 100 mg — 1 ampola EV ou IM imediatamente.
   Administrar ANTES de qualquer infusão de glicose.

3. Hidratação EV com SF 0,9% 500 mL — infundir a 125 mL/h.
   Acrescentar polivitamínico se disponível.

Intoxicação aguda:
4. Posição lateral de segurança.
5. Glicemia capilar — corrigir hipoglicemia se presente.
6. Tiamina 100 mg EV ou IM — antes de qualquer glicose.`,
    notes: 'A tiamina deve ser administrada ANTES do glicosado para prevenir encefalopatia de Wernicke. Monitorar nível de consciência, frequência respiratória e saturação. CIWA-Ar (Clinical Institute Withdrawal Assessment) orienta a intensidade do tratamento.'
  },

  // Extra system items that are helpful
  {
    id: 'ps-iop-analgesia',
    category: 'Pronto Socorro',
    title: 'Analgesia Potente (Cólica Nefrática/Dor Intensa)',
    content: `1. Dipirona 1g EV (se sem alergia).

2. Cetoprofeno 100mg IV
   Diluir em 100mL SF, correr em 20 min.

3. Opioides (Se dor refratária):
   - Morfina 10mg/mL: Diluir para 10mL. Fazer 2 a 4 mL (2-4mg) EV lento.
   OU
   - Tramadol 50-100mg IV diluído.

4. Hioscina (Buscopan) Composto
   1 ampola EV lento (se cólica).`,
    notes: 'Reavaliar dor em 30 minutos.'
  },
  {
    id: 'ps-iot-sec-rapida',
    category: 'Pronto Socorro',
    title: 'Sequência Rápida de Intubação (SRI)',
    content: `Pré-oxigenação + Preparo material.

1. INDUÇÃO (Sedativo):
   - Etomidato: 0,3 mg/kg EV (Cardioestável)
   OU
   - Cetamina: 1,5 a 2 mg/kg EV (Broncodilatador, aumenta PA)
   OU
   - Propofol: 1,5 a 2 mg/kg EV (Hipotensor)

2. PARALISIA (Bloqueador NM):
   - Rocurônio: 1,2 mg/kg EV (Ação 60s, dura 40min)
   OU
   - Succinilcolina: 1,5 mg/kg EV (Ação 45s, dura 5-10min).

*Pós-IOT: Iniciar sedação contínua imediatamente.`,
    notes: 'Checar via aérea difícil antes. Ter plano B pronto.'
  }
];
