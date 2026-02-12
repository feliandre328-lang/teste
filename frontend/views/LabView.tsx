
import React, { useState, useCallback } from 'react';
import { FlaskConicalIcon } from '../components/icons';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { testCustomPrompt } from '../services/geminiService';

const DEFAULT_PROMPT = `Você é um analista de comunicação. Analise os dados abaixo e identifique o sentimento predominante, os principais temas discutidos e o nível de risco para a imagem pública.`;

export const LabView: React.FC = () => {
    const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
    const [data, setData] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ prompt?: string; data?: string; api?: string }>({});

    const validate = () => {
        const newErrors: { prompt?: string; data?: string } = {};
        if (!prompt.trim()) {
            newErrors.prompt = "O campo de prompt é obrigatório.";
        }
        if (!data.trim()) {
            newErrors.data = "O campo de dados para análise é obrigatório.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRunTest = useCallback(async () => {
        if (!validate()) {
            return;
        }
        setIsLoading(true);
        setResult('');
        try {
            const response = await testCustomPrompt(prompt, data);
            setResult(response);
        } catch (e: any) {
            setErrors({ api: e.message || "Ocorreu um erro desconhecido." });
        } finally {
            setIsLoading(false);
        }
    }, [prompt, data]);

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
        if (errors.prompt && e.target.value.trim()) {
            setErrors(prev => ({ ...prev, prompt: undefined }));
        }
    };
    
    const handleDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData(e.target.value);
        if (errors.data && e.target.value.trim()) {
            setErrors(prev => ({ ...prev, data: undefined }));
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                    <FlaskConicalIcon className="w-8 h-8 mr-3 text-cyan-400" />
                    Laboratório IA
                </h1>
                <p className="text-gray-400">Teste prompts customizados e simule cenários diretamente com o modelo Gemini.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="prompt-textarea" className="block text-lg font-semibold text-gray-300 mb-2">
                          Prompt Customizado
                        </label>
                        <textarea
                          id="prompt-textarea"
                          className={`w-full h-48 bg-gray-800 border rounded-lg p-3 text-gray-200 focus:ring-2 transition-colors duration-200 ${
                              errors.prompt ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-cyan-500'
                          }`}
                          value={prompt}
                          onChange={handlePromptChange}
                          disabled={isLoading}
                        />
                        {errors.prompt && <p className="text-red-400 text-sm mt-1">{errors.prompt}</p>}
                    </div>
                     <div>
                        <label htmlFor="data-textarea" className="block text-lg font-semibold text-gray-300 mb-2">
                          Dados para Análise
                        </label>
                        <textarea
                          id="data-textarea"
                          className={`w-full h-48 bg-gray-800 border rounded-lg p-3 text-gray-200 focus:ring-2 transition-colors duration-200 ${
                              errors.data ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-cyan-500'
                          }`}
                          placeholder="Cole aqui os dados (comentários, notícias, etc.) para o modelo analisar..."
                          value={data}
                          onChange={handleDataChange}
                          disabled={isLoading}
                        />
                         {errors.data && <p className="text-red-400 text-sm mt-1">{errors.data}</p>}
                    </div>
                    <button
                        onClick={handleRunTest}
                        disabled={isLoading || !prompt.trim() || !data.trim()}
                        className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-500 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? <LoadingSpinner /> : 'Executar Teste'}
                    </button>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-cyan-400 mb-4">Resultado do Modelo</h2>
                    {isLoading && (
                        <div className="flex items-center justify-center h-full">
                            <LoadingSpinner />
                        </div>
                    )}
                    {errors.api && <div className="text-red-400 bg-red-900/50 p-3 rounded">{errors.api}</div>}
                    {result && (
                        <pre className="text-gray-300 whitespace-pre-wrap font-sans text-sm">{result}</pre>
                    )}
                     {!isLoading && !result && !errors.api && (
                        <div className="text-gray-500 text-center py-10">
                            O resultado da execução aparecerá aqui.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
