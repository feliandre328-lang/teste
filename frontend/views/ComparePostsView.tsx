
import React, { useState } from 'react';
import { BrainCircuitIcon } from '../components/icons';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const ComparePostsView: React.FC = () => {
    const [post1, setPost1] = useState({ theme: '', comments: '' });
    const [post2, setPost2] = useState({ theme: '', comments: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState('');

    const handleCompare = () => {
        if (!post1.comments.trim() || !post2.comments.trim()) {
            setError('Ambos os campos de comentários são obrigatórios.');
            return;
        }
        setError('');
        setIsLoading(true);
        setResult(null);
        // Simulate API call
        setTimeout(() => {
            setResult("### Análise Comparativa\n\n**Post 1:** Apresenta um sentimento predominantemente positivo, com foco em apoio à iniciativa. O risco é baixo.\n\n**Post 2:** Mostra uma recepção mista, com críticas construtivas e dúvidas. O risco é moderado devido ao potencial de desinformação.\n\n**Conclusão:** A estratégia de comunicação do Post 1 foi mais eficaz.");
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                    <BrainCircuitIcon className="w-8 h-8 mr-3 text-cyan-400" />
                    Análise Comparativa de Posts
                </h1>
                <p className="text-gray-400">Compare a recepção e o risco de dois conjuntos de comentários lado a lado.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Post 1 Input */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4">
                    <h3 className="text-xl font-bold text-cyan-400">Post 1</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Tema do Post 1 (Opcional)</label>
                        <input type="text" value={post1.theme} onChange={e => setPost1({...post1, theme: e.target.value})} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Comentários do Post 1</label>
                        <textarea value={post1.comments} onChange={e => setPost1({...post1, comments: e.target.value})} rows={8} className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white resize-none"></textarea>
                    </div>
                </div>

                {/* Post 2 Input */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4">
                    <h3 className="text-xl font-bold text-cyan-400">Post 2</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Tema do Post 2 (Opcional)</label>
                        <input type="text" value={post2.theme} onChange={e => setPost2({...post2, theme: e.target.value})} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Comentários do Post 2</label>
                        <textarea value={post2.comments} onChange={e => setPost2({...post2, comments: e.target.value})} rows={8} className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white resize-none"></textarea>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button 
                    onClick={handleCompare} 
                    disabled={isLoading || !post1.comments.trim() || !post2.comments.trim()}
                    className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Comparando...' : 'Comparar Posts'}
                </button>
            </div>
            
             {error && <div className="text-center text-red-400 bg-red-900/50 p-3 rounded-lg max-w-lg mx-auto">{error}</div>}

            {(isLoading || result) && (
                 <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mt-8">
                     <h2 className="text-2xl font-bold text-cyan-400 mb-4">Resultado da Comparação</h2>
                     {isLoading && (
                         <div className="flex flex-col items-center justify-center h-48">
                            <LoadingSpinner />
                            <p className="mt-4 text-gray-400">Gerando análise comparativa...</p>
                         </div>
                     )}
                     {result && <pre className="text-gray-300 whitespace-pre-wrap font-sans text-sm">{result}</pre>}
                 </div>
            )}
        </div>
    );
};
