import React from 'react';
import { AlertTriangle } from 'lucide-react';

export type DisclaimerType = 
  | 'home'
  | 'calculators'
  | 'medications'
  | 'guide'
  | 'prenatal'
  | 'puericultura'
  | 'prescriptions'
  | 'ai';

interface ClinicalDisclaimerProps {
  type: DisclaimerType;
}

const ClinicalDisclaimer: React.FC<ClinicalDisclaimerProps> = ({ type }) => {
  const getContextSpecificText = () => {
    switch (type) {
      case 'calculators':
        return 'Os resultados dos cálculos e escores são ferramentas de apoio e devem ser interpretados pelo médico no contexto clínico do paciente.';
      case 'medications':
        return 'Doses, apresentações e disponibilidades podem variar conforme atualização de bulas, protocolos institucionais e características individuais do paciente, devendo sempre ser confirmadas pelo prescritor.';
      case 'guide':
        return 'Os protocolos são baseados em diretrizes públicas e têm caráter orientativo, não sendo substitutos de protocolos institucionais específicos nem da avaliação clínica do profissional responsável.';
      case 'prenatal':
        return 'Pode haver variações nas recomendações conforme risco gestacional, comorbidades e critérios do obstetra assistente.';
      case 'puericultura':
        return 'As recomendações seguem o calendário e as diretrizes da Sociedade Brasileira de Pediatria, devendo ser adaptadas pelo pediatra conforme o desenvolvimento individual da criança.';
      case 'prescriptions':
        return 'Os modelos são apenas referência estrutural, devendo ser revisados, adaptados e assinados pelo médico responsável antes de qualquer utilização.';
      case 'ai':
        return 'A transcrição e os textos gerados por inteligência artificial estão sujeitos a erros de interpretação e devem ser obrigatoriamente revisados e validados pelo médico antes de qualquer uso clínico ou registro em prontuário.';
      case 'home':
      default:
        return '';
    }
  };

  const specificText = getContextSpecificText();

  return (
    <div className="mt-8 mb-4 max-w-7xl mx-auto px-4 sm:px-0">
      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4 md:p-5 flex flex-col sm:flex-row gap-3.5 items-start leading-relaxed transition-colors duration-200">
        <div className="p-1.5 rounded-lg bg-[var(--border)] text-[var(--text-secondary)] shrink-0">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="space-y-1.5">
          <h4 className="font-extrabold text-[var(--accent)] text-xs uppercase tracking-wider">
            Aviso Legal e Isenção de Responsabilidade
          </h4>
          <p className="text-xs text-[var(--text-secondary)]">
            As informações disponibilizadas nesta plataforma têm caráter exclusivamente educacional. 
            Não substituem a avaliação clínica individualizada, o julgamento do médico assistente 
            nem as condutas definidas com base na relação médico-paciente. 
            {specificText && <span className="font-semibold block sm:inline sm:ml-1 text-[var(--text-primary)]">{specificText}</span>}
            {' '}Toda decisão diagnóstica ou terapêutica deve ser tomada pelo profissional de saúde 
            responsável, considerando as particularidades de cada paciente. Os desenvolvedores 
            desta plataforma não se responsabilizam por decisões clínicas baseadas exclusivamente 
            no conteúdo aqui apresentado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClinicalDisclaimer;
