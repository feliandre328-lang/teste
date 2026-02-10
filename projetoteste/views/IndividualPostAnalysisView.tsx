
import React, { useState, useCallback, useContext, useEffect } from 'react';
import { InputSection } from '../components/InputSection';
import { AnalysisDisplay } from '../components/AnalysisDisplay';
import { MetricsChart } from '../components/MetricsChart';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { analyzeComments, parseAnalysisResponse } from '../services/geminiService';
import type { Metrics, AnalysisHistoryEntry, AnalysisPreset } from '../types';
import { ChartIcon } from '../components/icons/ChartIcon';
import { AppContext } from '../contexts/AppContext';

interface AppError {
  comments?: string;
  postTheme?: string;
  general?: string;
}

export const IndividualPostAnalysisView: React.FC = () => {
  const { 
    history, 
    addHistoryEntry, 
    politicians, 
    importedData, 
    clearImportedData,
    isElectionModeActive,
    addAlert
  } = useContext(AppContext);
  
  const [comments, setComments] = useState('');
  const [postTheme, setPostTheme] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [selectedPoliticoId, setSelectedPoliticoId] = useState<string | null>(null);

  useEffect(() => {
    if (importedData) {
      setComments(importedData.comments);
      setPostTheme(importedData.postTheme);
      clearImportedData();
    }
  }, [importedData, clearImportedData]);

  const handleLoadPreset = useCallback((preset: AnalysisPreset) => {
      setSelectedPoliticoId(preset.selectedPoliticoId);
      setPostTheme(preset.postTheme);
  }, []);

  const handleAnalyze = useCallback(async () => {
    setError(null);

    const validationErrors: AppError = {};
    if (!comments.trim()) {
      validationErrors.comments = 'O campo de comentários não pode estar vazio.';
    } else if (comments.length > 10000) {
      validationErrors.comments = 'O limite de 10.000 caracteres para os comentários foi excedido.';
    }

    if (postTheme.length > 200) {
      validationErrors.postTheme = 'O limite de 200 caracteres para o tema do post foi excedido.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setIsLoading(true);
    setAnalysis(null);
    setMetrics(null);

    try {
      const selectedPolitico = politicians.find(p => p.id === selectedPoliticoId) || null;
      const responseText = await analyzeComments(comments, politicians, selectedPolitico, postTheme, isElectionModeActive);
      const { metrics, analysisText } = parseAnalysisResponse(responseText);
      
      const classificationMatch = analysisText.match(/\*\*CLASSIFICAÇÃO:\*\*\s*(.*)/);
      const classificationText = classificationMatch ? classificationMatch[1].trim() : "N/D";
      
      setAnalysis(analysisText);
      setMetrics(metrics);

      if (metrics) {
        const newHistoryEntry: AnalysisHistoryEntry = {
          id: `analysis_${new Date().getTime()}`,
          timestamp: new Date().toLocaleString('pt-BR'),
          score: metrics.crisis_score,
          classification: metrics.nivel_risco_geral,
          postTheme: postTheme || 'Análise Avulsa',
          metrics: metrics
        };
        addHistoryEntry(newHistoryEntry);

        // Auto-generate alert if risk is high
        if (metrics.crisis_score > 40 && (classificationText === "Alerta" || classificationText === "Crise" || classificationText === "Crise Grave")) {
            addAlert({
                score: metrics.crisis_score,
                classification: classificationText as "Alerta" | "Crise" | "Crise Grave",
                postTheme: postTheme || 'Análise Avulsa',
            });
        }
      }

    } catch (e) {
      console.error(e);
      setError({ general: 'Ocorreu um erro ao analisar os comentários. Por favor, tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  }, [comments, selectedPoliticoId, postTheme, addHistoryEntry, politicians, isElectionModeActive, addAlert]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <InputSection
        comments={comments}
        setComments={setComments}
        postTheme={postTheme}
        setPostTheme={setPostTheme}
        onAnalyze={handleAnalyze}
        isLoading={isLoading}
        selectedPoliticoId={selectedPoliticoId}
        onSelectPolitico={setSelectedPoliticoId}
        history={history}
        error={error}
        onLoadPreset={handleLoadPreset}
      />

      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Resultados da Análise</h2>
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
            <LoadingSpinner />
            <p className="mt-4 text-gray-400">Analisando... Isso pode levar alguns segundos.</p>
          </div>
        )}
        {error?.general && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">{error.general}</div>}
        
        {!isLoading && !analysis && !error?.comments && !error?.postTheme && (
           <div className="flex flex-col items-center justify-center text-center text-gray-500 h-full min-h-[300px]">
                <ChartIcon className="w-16 h-16 mb-4"/>
                <p className="text-lg">Os resultados da sua análise aparecerão aqui.</p>
                <p>Preencha os dados e clique em "Analisar" para começar.</p>
            </div>
        )}
        
        {analysis && (
          <div className="space-y-6">
            {metrics && <MetricsChart data={metrics} />}
            <AnalysisDisplay analysisText={analysis} />
          </div>
        )}
      </div>
    </div>
  );
};
