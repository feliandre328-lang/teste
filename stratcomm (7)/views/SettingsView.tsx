
import React, { useState, useEffect } from 'react';
import { SettingsIcon } from '../components/icons';
import { Integrations } from '../components/settings/Integrations';
import { PlaceholderView } from './PlaceholderView';
import { BrainCircuitIcon } from '../components/icons';
import { UserManagement } from '../components/settings/UserManagement';

type SettingsTab = 'integrations' | 'params' | 'users';

interface SettingsViewProps {
    onNavigate: (viewId: string) => void;
    subView?: string;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onNavigate, subView }) => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('integrations');

    useEffect(() => {
        switch (subView) {
            case 'integrations':
                setActiveTab('integrations');
                break;
            case 'params':
                setActiveTab('params');
                break;
            case 'users':
                setActiveTab('users');
                break;
            default:
                setActiveTab('integrations');
        }
    }, [subView]);
    
    const handleTabClick = (tab: SettingsTab, viewId: string) => {
        setActiveTab(tab);
        onNavigate(viewId);
    }

    const renderContent = () => {
        switch(activeTab) {
            case 'integrations':
                return <Integrations />;
            case 'params':
                return <PlaceholderView title="Parâmetros de Análise" icon={BrainCircuitIcon} />;
            case 'users':
                return <UserManagement />;
            default:
                return <Integrations />;
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                    <SettingsIcon className="w-8 h-8 mr-3 text-cyan-400" />
                    Configurações
                </h1>
                <p className="text-gray-400">Gerencie as integrações e parâmetros do sistema.</p>
            </div>
            
            <div className="flex border-b border-gray-700">
                <button 
                    onClick={() => handleTabClick('integrations', 'settings/integrations')}
                    className={`py-3 px-6 text-sm font-medium transition-colors ${activeTab === 'integrations' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                >
                    Integrações
                </button>
                <button 
                    onClick={() => handleTabClick('params', 'settings/params')}
                    className={`py-3 px-6 text-sm font-medium transition-colors ${activeTab === 'params' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                >
                    Parâmetros de Análise
                </button>
                 <button 
                    onClick={() => handleTabClick('users', 'settings/users')}
                    className={`py-3 px-6 text-sm font-medium transition-colors ${activeTab === 'users' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                >
                    Usuários e Permissões
                </button>
            </div>
            
            <div>
                {renderContent()}
            </div>
        </div>
    );
};
