import { useState, useEffect } from 'react';

export interface PreNatalCalcResult {
  weeks: number;
  days: number;
  dpp: Date;
  trimester: string;
  rawDays: number;
}

export function usePreNatalCalculator() {
  const [calcMode, setCalcMode] = useState<'dum' | 'usg'>('dum');
  const [dumDate, setDumDate] = useState<string>(() => sessionStorage.getItem('medassist_pn_dum') || '');
  const [usgDate, setUsgDate] = useState<string>(() => sessionStorage.getItem('medassist_pn_usg_date') || '');
  const [usgWeeks, setUsgWeeks] = useState<string>(() => sessionStorage.getItem('medassist_pn_usg_w') || '');
  const [usgDays, setUsgDays] = useState<string>(() => sessionStorage.getItem('medassist_pn_usg_d') || '');

  // Persistent saving of calculator state across session
  useEffect(() => {
    sessionStorage.setItem('medassist_pn_dum', dumDate);
    sessionStorage.setItem('medassist_pn_usg_date', usgDate);
    sessionStorage.setItem('medassist_pn_usg_w', usgWeeks);
    sessionStorage.setItem('medassist_pn_usg_d', usgDays);
  }, [dumDate, usgDate, usgWeeks, usgDays]);

  const calculatePregnancy = (): PreNatalCalcResult | null => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (calcMode === 'dum' && dumDate) {
      const dum = new Date(dumDate);
      dum.setHours(12, 0, 0, 0); // avoid timezone wrap
      if (dum > today) return null;

      const diffMs = today.getTime() - dum.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(diffDays / 7);
      const days = diffDays % 7;

      // DPP Regra de Naegele
      const dpp = new Date(dum);
      dpp.setDate(dum.getDate() + 280);

      const trimester = weeks < 14 ? '1º Trimester' : weeks < 28 ? '2º Trimester' : '3º Trimester';
      return { weeks, days, dpp, trimester, rawDays: diffDays };
    }

    if (calcMode === 'usg' && usgDate && usgWeeks) {
      const usg = new Date(usgDate);
      usg.setHours(12, 0, 0, 0);
      if (usg > today) return null;

      const diffMs = today.getTime() - usg.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      const initialWeeks = parseInt(usgWeeks) || 0;
      const initialDays = parseInt(usgDays) || 0;
      const totalInitialDays = initialWeeks * 7 + initialDays;

      const currentTotalDays = totalInitialDays + diffDays;
      const weeks = Math.floor(currentTotalDays / 7);
      const days = currentTotalDays % 7;

      // DPP (Date of USG - USG days + 280 days)
      const dpp = new Date(usg);
      dpp.setDate(usg.getDate() - totalInitialDays + 280);

      const trimester = weeks < 14 ? '1º Trimester' : weeks < 28 ? '2º Trimester' : '3º Trimester';
      return { weeks, days, dpp, trimester, rawDays: currentTotalDays };
    }

    return null;
  };

  const calcResult = calculatePregnancy();

  return {
    calcMode,
    setCalcMode,
    dumDate,
    setDumDate,
    usgDate,
    setUsgDate,
    usgWeeks,
    setUsgWeeks,
    usgDays,
    setUsgDays,
    calcResult,
    calculatePregnancy,
  };
}
