
import React, { useState, useEffect } from 'react';
import { DatabaseZapIcon } from '../components/icons';
import { ApiIntegration } from '../components/data-capture/ApiIntegration';
import { ManualImport } from '../components/data-capture/ManualImport';
import { MonitoredPosts } from '../components/data-capture/MonitoredPosts';

type CaptureTab = 'api' | 'manual' | 'posts';

interface DataCaptureViewProps {
    onNavigate: (viewId: string) => void;
    subView?: string;
}

export const DataCaptureView: React.FC<DataCaptureViewProps> = ({ onNavigate, subView }) => {
    const [activeTab, setActiveTab] = useState<CaptureTab>('api');

    useEffect(() => {
        switch (subView) {
            case 'meta':
                setActiveTab('api');
                break;
            case 'manual':
                setActiveTab('manual');
                break;
            case 'posts':
                setActiveTab('posts');
                break;
            default:
                setActiveTab('api');
        }
    }, [subView]);
    
    const handleTabClick = (tab: CaptureTab, viewId: string) => {
        setActiveTab(tab);
        onNavigate(viewId);
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                    <DatabaseZapIcon className="w-8 h-8 mr-3 text-cyan-400" />
                    Captura de Dados
                </h1>
                <p className="text-gray-400">Conecte fontes de dados ou importe manualmente para análise.</p>
            </div>
            
            <div className="flex border-b border-gray-700">
                <button 
                    onClick={() => handleTabClick('api', 'capture/meta')}
                    className={`py-3 px-6 text-sm font-medium transition-colors ${activeTab === 'api' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                >
                    Integração API
                </button>
                <button 
                    onClick={() => handleTabClick('manual', 'capture/manual')}
                    className={`py-3 px-6 text-sm font-medium transition-colors ${activeTab === 'manual' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                >
                    Importação Manual
                </button>
                 <button 
                    onClick={() => handleTabClick('posts', 'capture/posts')}
                    className={`py-3 px-6 text-sm font-medium transition-colors ${activeTab === 'posts' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                >
                    Posts Monitorados
                </button>
            </div>
            
            <div>
                {activeTab === 'api' && <ApiIntegration />}
                {activeTab === 'manual' && <ManualImport onNavigate={onNavigate} />}
                {activeTab === 'posts' && <MonitoredPosts />}
            </div>
        </div>
    );
};
