
import React, { useContext } from 'react';
import type { Politico, AnalysisHistoryEntry, AnalysisPreset } from '../types';
import { PoliticianSelector } from './PoliticianSelector';
import { AnalysisHistory } from './AnalysisHistory';
import { MessageSquareIcon } from './icons/MessageSquareIcon';
import { AppContext } from '../contexts/AppContext';
import { PresetManager } from './PresetManager';

interface InputSectionProps {
  comments: string;
  setComments: (comments: string) => void;
  postTheme: string;
  setPostTheme: (theme: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  selectedPoliticoId: string | null;
  onSelectPolitico: (politicoId: string | null) => void;
  history: AnalysisHistoryEntry[];
  error: { comments?: string; postTheme?: string; } | null;
  onLoadPreset: (preset: AnalysisPreset) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({ 
  comments, 
  setComments, 
  postTheme,
  setPostTheme,
  onAnalyze, 
  isLoading,
  selectedPoliticoId,
  onSelectPolitico,
  history,
  error,
  onLoadPreset,
}) => {
  const { politicians, presets, addPreset, deletePreset } = useContext(AppContext);

  const handleSavePreset = (name: string) => {
      addPreset({
          name,
          selectedPoliticoId,
          postTheme,
      });
  };
  
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sticky top-24">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">Entrada de Dados</h2>
      
      <PoliticianSelector
        politicos={politicians}
        selectedPoliticoId={selectedPoliticoId}
        onSelectPolitico={onSelectPolitico}
        isLoading={isLoading}
      />

      <div className="mb-6">
        <label htmlFor="post-theme-input" className="flex items-center text-lg font-semibold text-gray-300 mb-2">
            <MessageSquareIcon className="w-5 h-5 mr-2 text-cyan-400" />
            Tema do Post (Opcional)
        </label>
        <p className="text-sm text-gray-500 mb-3">Forneça o tema ou título do post para uma análise mais precisa.</p>
        <input
            id="post-theme-input"
            type="text"
            className={`w-full bg-gray-700 border rounded-lg p-3 text-gray-200 focus:ring-2 transition-colors duration-200 ${
              error?.postTheme
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
            }`}
            placeholder="Ex: Anúncio de novo projeto de lei de educação"
            value={postTheme}
            onChange={(e) => setPostTheme(e.target.value)}
            disabled={isLoading}
            aria-invalid={!!error?.postTheme}
            aria-describedby="post-theme-error"
        />
        {error?.postTheme && <p id="post-theme-error" className="mt-2 text-sm text-red-400">{error.postTheme}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="comments-textarea" className="block text-lg font-semibold text-gray-300 mb-2">
          Comentários para Análise
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Cole os comentários que deseja analisar no campo abaixo, um por linha.
        </p>
        <textarea
          id="comments-textarea"
          className={`w-full h-80 bg-gray-900 border rounded-lg p-3 text-gray-200 focus:ring-2 transition-colors duration-200 resize-none ${
            error?.comments
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
          }`}
          placeholder="Exemplo:
Comentário 1: Ótima iniciativa, parabéns!
Comentário 2: Não concordo com essa proposta, faltou transparência.
Comentário 3: Quando teremos mais informações sobre o projeto?"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          disabled={isLoading}
          aria-invalid={!!error?.comments}
          aria-describedby="comments-error"
        />
        {error?.comments && <p id="comments-error" className="mt-2 text-sm text-red-400">{error.comments}</p>}
      </div>
      <button
        onClick={onAnalyze}
        disabled={isLoading || !comments.trim()}
        className={`w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-500 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none ${
          isLoading ? 'animate-pulse' : ''
        }`}
      >
        {isLoading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analisando...</span>
            </>
        ) : (
          <span>Analisar Comentários</span>
        )}
      </button>

      <PresetManager
          presets={presets}
          currentConfig={{ selectedPoliticoId, postTheme }}
          onSave={handleSavePreset}
          onLoad={onLoadPreset}
          onDelete={deletePreset}
      />

      <AnalysisHistory history={history} />
    </div>
  );
};
