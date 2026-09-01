import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Pill, ArrowRight, BookOpen } from 'lucide-react';
import ClinicalDisclaimer from './ClinicalDisclaimer';
import { useAuth } from '../App';

const Home: React.FC = () => {
  const { hasPermission } = useAuth();
  
  return (
    <div className="px-4 py-8 sm:px-0">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-medical-900 via-medical-700 to-medical-600 rounded-3xl p-8 sm:p-12 mb-10 overflow-hidden text-left">

        {/* Grid pattern de fundo */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
               backgroundSize: '32px 32px'
             }} />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-white/15
                           backdrop-blur-sm text-white text-xs font-semibold
                           px-3 py-1.5 rounded-full mb-5 border border-white/20">
            <span className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse" />
            Ferramenta Clínica Beira-Leito
          </span>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white
                         leading-tight mb-3">
            Decisões mais rápidas.<br />
            <span className="text-accent-400">Atendimento mais seguro.</span>
          </h1>

          <p className="text-medical-100 max-w-lg text-sm sm:text-base
                        leading-relaxed mb-6">
            Calculadoras validadas, protocolos interativos e guia de medicações
            reunidos em uma ferramenta pensada para o médico brasileiro.
          </p>

          <div className="flex flex-wrap gap-3">
            {hasPermission('calculators') && (
              <Link to="/calculators"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white
                           text-medical-700 text-sm font-bold rounded-xl
                           hover:bg-medical-50 transition-colors shadow-sm">
                <Activity className="h-4 w-4" />
                Ver Calculadoras
              </Link>
            )}
            {hasPermission('protocols') && (
              <>
                <Link to="/special"
                  className="inline-flex items-center gap-2 px-4 py-2.5
                             bg-white/15 backdrop-blur-sm text-white text-sm
                             font-semibold rounded-xl border border-white/25
                             hover:bg-white/25 transition-colors">
                  <BookOpen className="h-4 w-4" />
                  Roteiros de Consultas
                </Link>
                <Link to="/guide"
                  className="inline-flex items-center gap-2 px-4 py-2.5
                             bg-white/15 backdrop-blur-sm text-white text-sm
                             font-semibold rounded-xl border border-white/25
                             hover:bg-white/25 transition-colors">
                  <BookOpen className="h-4 w-4" />
                  Protocolos Clínicos
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto text-left">
        {/* Calculators Card */}
        {hasPermission('calculators') && (
          <div className="bg-white rounded-2xl border border-slate-100
                          shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                          hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]
                          transition-all duration-200 group overflow-hidden">
            {/* Accent bar no topo do card */}
            <div className="h-1 bg-gradient-to-r from-medical-600 to-accent-500" />
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl
                              bg-medical-50 text-medical-600 mb-4
                              group-hover:bg-medical-600 group-hover:text-white
                              transition-all duration-200 shadow-sm">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-medical-600 mb-2 dark:text-medical-400">
                Calculadoras Médicas
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed dark:text-slate-400 mb-6 font-medium">
                Escores clínicos e calculadoras úteis para decisões rápidas do dia a dia.
              </p>
              <Link to="/calculators"
                className="inline-flex items-center text-medical-600 hover:text-medical-700 font-semibold text-sm group/link">
                Acessar calculadoras
                <ArrowRight className="ml-1.5 h-4 w-4 group-hover/link:translate-x-0.5
                                       transition-transform" />
              </Link>
            </div>
          </div>
        )}

        {/* Prescriptions Card */}
        {hasPermission('prescriptions') && (
          <div className="bg-white rounded-2xl border border-slate-100
                          shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                          hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]
                          transition-all duration-200 group overflow-hidden">
            {/* Accent bar no topo do card */}
            <div className="h-1 bg-gradient-to-r from-medical-600 to-accent-500" />
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl
                              bg-medical-50 text-medical-600 mb-4
                              group-hover:bg-medical-600 group-hover:text-white
                              transition-all duration-200 shadow-sm">
                <Pill className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-medical-600 mb-2 dark:text-medical-400">
                Modelos de Prescrição
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed dark:text-slate-400 mb-6 font-medium">
                Modelos prontos de prescrições estruturadas para pronto socorro e ambulatório.
              </p>
              <Link to="/prescriptions"
                className="inline-flex items-center text-medical-600 hover:text-medical-700 font-semibold text-sm group/link">
                Ver modelos
                <ArrowRight className="ml-1.5 h-4 w-4 group-hover/link:translate-x-0.5
                                       transition-transform" />
              </Link>
            </div>
          </div>
        )}

        {/* Medications Card */}
        {hasPermission('medications') && (
          <div className="bg-white rounded-2xl border border-slate-100
                          shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                          hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]
                          transition-all duration-200 group overflow-hidden">
            {/* Accent bar no topo do card */}
            <div className="h-1 bg-gradient-to-r from-medical-600 to-accent-500" />
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl
                              bg-medical-50 text-medical-600 mb-4
                              group-hover:bg-medical-600 group-hover:text-white
                              transition-all duration-200 shadow-sm">
                <Pill className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-medical-600 mb-2 dark:text-medical-400">
                Guia de Medicações
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed dark:text-slate-400 mb-6 font-medium">
                Guia rápido de referência com dosagens, apresentações, coberturas no SUS e custos.
              </p>
              <Link to="/medications"
                className="inline-flex items-center text-medical-600 hover:text-medical-700 font-semibold text-sm group/link">
                Consultar guia
                <ArrowRight className="ml-1.5 h-4 w-4 group-hover/link:translate-x-0.5
                                       transition-transform" />
              </Link>
            </div>
          </div>
        )}

        {/* Roteiros de Consultas Card */}
        {hasPermission('protocols') && (
          <div className="bg-white rounded-2xl border border-slate-100
                          shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                          hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]
                          transition-all duration-200 group overflow-hidden">
            {/* Accent bar no topo do card */}
            <div className="h-1 bg-gradient-to-r from-medical-600 to-accent-500" />
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl
                              bg-medical-50 text-medical-600 mb-4
                              group-hover:bg-medical-600 group-hover:text-white
                              transition-all duration-200 shadow-sm">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-medical-600 mb-2 dark:text-medical-400">
                Roteiros de Consultas
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed dark:text-slate-400 mb-6 font-medium">
                Puericultura, Pré-Natal, Geriatria e Hipertensão com acompanhamento estruturado.
              </p>
              <Link to="/special"
                className="inline-flex items-center text-medical-600 hover:text-medical-700 font-semibold text-sm group/link">
                Abrir roteiros
                <ArrowRight className="ml-1.5 h-4 w-4 group-hover/link:translate-x-0.5
                                       transition-transform" />
              </Link>
            </div>
          </div>
        )}

        {/* Protocolos Clínicos Card */}
        {hasPermission('protocols') && (
          <div className="bg-white rounded-2xl border border-slate-100
                          shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                          hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]
                          transition-all duration-200 group overflow-hidden">
            {/* Accent bar no topo do card */}
            <div className="h-1 bg-gradient-to-r from-medical-600 to-accent-500" />
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl
                              bg-medical-50 text-medical-600 mb-4
                              group-hover:bg-medical-600 group-hover:text-white
                              transition-all duration-200 shadow-sm">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-medical-600 mb-2 dark:text-medical-400">
                Protocolos Clínicos
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed dark:text-slate-400 mb-6 font-medium">
                Fluxogramas de conduta e suporte clínico à decisão rápida beira-leito.
              </p>
              <Link to="/guide"
                className="inline-flex items-center text-medical-600 hover:text-medical-700 font-semibold text-sm group/link">
                Abrir fluxogramas
                <ArrowRight className="ml-1.5 h-4 w-4 group-hover/link:translate-x-0.5
                                       transition-transform" />
              </Link>
            </div>
          </div>
        )}
      </div>

      <ClinicalDisclaimer type="home" />
    </div>
  );
};

export default Home;