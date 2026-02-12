
import React, { useState } from 'react';
import type { MonitoredPost } from '../../types';
import { MessageSquareIcon, ChevronDownIcon } from '../icons';
import { LoadingSpinner } from '../LoadingSpinner';
import { AnalysisDisplay } from '../AnalysisDisplay';
import { MetricsChart } from '../MetricsChart';

interface PostCardProps {
    post: MonitoredPost;
    onAnalyze: () => void;
}

const StatusBadge: React.FC<{ status: MonitoredPost['analysisStatus'] }> = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
    switch (status) {
        case 'pending':
            return <span className={`${baseClasses} bg-gray-600/50 text-gray-300`}>Não Analisado</span>;
        case 'analyzing':
            return <span className={`${baseClasses} bg-blue-500/20 text-blue-300`}>Analisando...</span>;
        case 'completed':
            return <span className={`${baseClasses} bg-green-500/20 text-green-300`}>Analisado</span>;
        case 'error':
            return <span className={`${baseClasses} bg-red-500/20 text-red-300`}>Erro</span>;
    }
};


export const PostCard: React.FC<PostCardProps> = ({ post, onAnalyze }) => {
    const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);

    const handleToggleAnalysis = () => {
        if (post.analysisStatus === 'completed') {
            setIsAnalysisVisible(prev => !prev);
        }
    };

    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 flex items-center space-x-3 bg-gray-800/60">
                <img src={post.userAvatarUrl} alt={post.username} className="w-10 h-10 rounded-full" />
                <div>
                    <p className="font-bold text-white">{post.username}</p>
                    <p className="text-xs text-gray-400">{post.timestamp}</p>
                </div>
            </div>

            {/* Image */}
            <img src={post.imageUrl} alt="Post media" className="w-full h-64 object-cover" />

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <p className="text-gray-300 text-sm mb-4">{post.caption}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-1">
                            <MessageSquareIcon className="w-4 h-4" />
                            <span>{post.commentCount} comentários</span>
                        </div>
                        <StatusBadge status={post.analysisStatus} />
                    </div>
                </div>

                <div className="mt-auto pt-4">
                    {post.analysisStatus === 'pending' && (
                        <button onClick={onAnalyze} className="w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-500 transition-colors">
                            Analisar Comentários
                        </button>
                    )}
                     {post.analysisStatus === 'analyzing' && (
                        <button disabled className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center cursor-not-allowed">
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Analisando...</span>
                        </button>
                    )}
                     {post.analysisStatus === 'completed' && (
                        <button onClick={handleToggleAnalysis} className="w-full bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center">
                            <span>{isAnalysisVisible ? 'Ocultar Análise' : 'Ver Análise'}</span>
                             <ChevronDownIcon className={`w-5 h-5 ml-2 transition-transform ${isAnalysisVisible ? 'rotate-180' : ''}`} />
                        </button>
                    )}
                     {post.analysisStatus === 'error' && (
                         <button onClick={onAnalyze} className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-500 transition-colors">
                            Tentar Novamente
                        </button>
                    )}
                </div>
            </div>

            {/* Analysis Section */}
            {isAnalysisVisible && post.analysis && (
                <div className="p-4 border-t border-gray-700 bg-gray-900/50">
                     <h3 className="text-xl font-bold text-cyan-400 mb-4">Resultados da Análise</h3>
                     <div className="space-y-6">
                        {post.analysis.metrics && <MetricsChart data={post.analysis.metrics} />}
                        <AnalysisDisplay analysisText={post.analysis.text} />
                    </div>
                </div>
            )}
        </div>
    );
};
