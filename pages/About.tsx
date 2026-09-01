import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0 py-8">
      <h1 className="text-3xl font-bold text-medical-600 mb-6 dark:text-medical-400">Sobre o MedAssist</h1>
      
      <div className="bg-white shadow rounded-lg p-6 space-y-4 text-gray-600">
        <p>
          O <strong>MedAssist</strong> foi desenvolvido para otimizar a prática clínica diária, oferecendo acesso rápido a ferramentas essenciais para a tomada de decisão médica.
        </p>
        
        <h2 className="text-xl font-semibold text-medical-600 pt-4 dark:text-medical-400">Funcionalidades Atuais</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Calculadoras Médicas:</strong> Algoritmos validados (CKD-EPI, Framingham, Wells, etc.) que realizam cálculos complexos instantaneamente.
          </li>
          <li>
            <strong>Modelos de Prescrição:</strong> Um banco de dados editável com prescrições padrão para as patologias mais comuns.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-medical-600 pt-4 dark:text-medical-400">Tecnologia e Futuro</h2>
        <p>
          Construído com tecnologias modernas (React, TypeScript), o sistema foi desenhado para ser escalável e seguro.
        </p>
        <p>
          A arquitetura já está preparada para integração futura com Inteligência Artificial, permitindo que o médico, em breve, possa tirar dúvidas clínicas complexas.
        </p>

        <div className="bg-blue-50 border-l-4 border-medical-500 p-4 mt-6">
          <p className="text-sm text-blue-700">
            <strong>Aviso Legal:</strong> Este software é uma ferramenta de auxílio e não substitui o julgamento clínico profissional. Sempre verifique as doses e condutas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;