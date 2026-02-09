
import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { PostCard } from './PostCard';
import { InstagramIcon } from '../icons';

export const MonitoredPosts: React.FC = () => {
    const { monitoredPosts, analyzePost, isApiConnected, targetProfile } = useContext(AppContext);

    if (!isApiConnected) {
        return (
            <div className="text-center py-20 bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-700">
                <InstagramIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <h2 className="text-xl font-bold text-gray-400">Nenhum perfil conectado</h2>
                <p className="text-gray-500 mt-2">
                    Por favor, vá para a aba "Integração API" para buscar os posts de um perfil do Instagram.
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                 <div>
                    <h2 className="text-2xl font-bold text-white flex items-center">
                       <InstagramIcon className="w-7 h-7 mr-3 text-cyan-400" />
                       Posts Monitorados de: <span className="text-cyan-400 ml-2">{targetProfile}</span>
                    </h2>
                    <p className="text-gray-400">Analise individualmente os posts capturados do perfil alvo.</p>
                </div>
            </div>
             {monitoredPosts.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {monitoredPosts.map(post => (
                        <PostCard 
                            key={post.id}
                            post={post}
                            onAnalyze={() => analyzePost(post.id)}
                        />
                    ))}
                </div>
             ) : (
                <div className="text-center py-20 bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-700">
                    <p className="text-gray-500">Nenhum post encontrado para este perfil.</p>
                    <p className="text-gray-600">O sistema utiliza dados de exemplo. Em uma implementação real, os posts do perfil alvo seriam exibidos aqui.</p>
                </div>
             )}
        </div>
    );
};
