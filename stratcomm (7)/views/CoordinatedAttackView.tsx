
import React, { useState } from 'react';
import { ShieldAlertIcon } from '../components/icons';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const CoordinatedAttackView: React.FC = () => {
    const [comments, setComments] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState('');

    const handleDetect = () => {
        if (!comments.trim()) {
            setError('O campo de comentários é obrigatório.');
            return;
        }
        setError('');
        setIsLoading(true);
        setResult(null);
        // Simulate API call
        setTimeout(() => {
            setResult("### Detecção de Ataque Coordenado\n\n**Probabilidade de Ataque:** 78% (Alta)\n\n**Padrões Identificados:**\n- **Frases Repetidas:** A frase 'isso é um absurdo, queremos respostas' aparece em 17 comentários de contas criadas recentemente.\n- **Sincronia:** Pico de 45 comentários negativos em um intervalo de 5 minutos.\n- **Contas Suspeitas:** 23 contas sem foto de perfil e com nomes de usuário alfanuméricos postaram críticas idênticas.\n\n**Recomendação:** Monitorar as contas suspeitas e considerar a limitação de comentários temporariamente.");
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                    <ShieldAlertIcon className="w-8 h-8 mr-3 text-cyan-400" />
                    Detecção de Ataque Coordenado
                </h1>
                <p className="text-gray-400">Analise grandes volumes de comentários para identificar padrões de ataques e desinformação.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4">
                     <h3 className="text-xl font-bold text-cyan-400">Dados para Análise</h3>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Comentários em Massa</label>
                        <textarea 
                            value={comments} 
                            onChange={e => setComments(e.target.value)} 
                            rows={15} 
                            className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white resize-none"
                            placeholder="Cole um grande volume de comentários aqui para detectar padrões..."
                        ></textarea>
                    </div>
                     <button 
                        onClick={handleDetect} 
                        disabled={isLoading || !comments.trim()}
                        className="w-full bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Detectando...' : 'Detectar Padrões'}
                    </button>
                    {error && <div className="text-center text-red-400 bg-red-900/50 p-2 rounded-lg text-sm">{error}</div>}
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-cyan-400 mb-4">Relatório de Detecção</h2>
                     {isLoading && (
                         <div className="flex flex-col items-center justify-center h-64">
                            <LoadingSpinner />
                            <p className="mt-4 text-gray-400">Analisando padrões...</p>
                         </div>
                     )}
                    {result && <pre className="text-gray-300 whitespace-pre-wrap font-sans text-sm">{result}</pre>}
                    {!isLoading && !result && (
                        <div className="text-gray-500 text-center py-20">
                           O resultado da detecção aparecerá aqui.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
