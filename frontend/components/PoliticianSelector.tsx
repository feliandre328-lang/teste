
import React from 'react';
import type { Politico } from '../types';
import { UserFocusIcon } from './icons/UserFocusIcon';

interface PoliticianSelectorProps {
  politicos: Politico[];
  selectedPoliticoId: string | null;
  onSelectPolitico: (politicoId: string | null) => void;
  isLoading: boolean;
}

export const PoliticianSelector: React.FC<PoliticianSelectorProps> = ({ politicos, selectedPoliticoId, onSelectPolitico, isLoading }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onSelectPolitico(value === 'geral' ? null : value);
  };
  
  return (
    <div className="mb-6">
      <label htmlFor="politician-select" className="flex items-center text-lg font-semibold text-gray-300 mb-2">
        <UserFocusIcon className="w-5 h-5 mr-2 text-cyan-400" />
        Contexto Político (Opcional)
      </label>
      <p className="text-sm text-gray-500 mb-3">Selecione um perfil para uma análise mais precisa e contextualizada.</p>
      <select
        id="politician-select"
        value={selectedPoliticoId ?? 'geral'}
        onChange={handleChange}
        disabled={isLoading}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200"
      >
        <option value="geral">Análise Geral (sem contexto)</option>
        {politicos.map((politico) => (
          <option key={politico.id} value={politico.id}>
            {politico.nome} ({politico.partido})
          </option>
        ))}
      </select>
    </div>
  );
};
