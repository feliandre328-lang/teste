import React, { useContext } from 'react';
import { RobotIcon } from './icons/RobotIcon';
import { AppContext } from '../contexts/AppContext';
import { GavelIcon } from './icons';
import { useAuth } from '../contexts/AuthContext'; // ✅ NOVO

export const Header: React.FC = () => {
  const { isElectionModeActive, toggleElectionMode } = useContext(AppContext);

  // ✅ pega logout do AuthContext
  const { logout, username } = useAuth();

  return (
    <header className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-3">
        <div className="flex items-center justify-between">

          {/* LADO ESQUERDO */}
          <div className="flex items-center space-x-3">
            <RobotIcon className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Análise Estratégica de Comunicação
              </h1>
              <p className="text-xs text-gray-400">Powered by Gemini AI</p>
            </div>
          </div>

          {/* LADO DIREITO */}
          <div className="flex items-center space-x-3">

            {/* BOTÃO MODO ELEIÇÃO */}
            <button
              onClick={toggleElectionMode}
              title="Ativar/Desativar regras de conformidade para período eleitoral."
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                isElectionModeActive
                  ? 'bg-green-500/20 text-green-300 border border-green-500/50 hover:bg-green-500/30'
                  : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
              }`}
            >
              <GavelIcon className="w-5 h-5" />
              <span>Modo Eleição:</span>
              <span className="font-bold">
                {isElectionModeActive ? 'Ativado' : 'Desativado'}
              </span>
            </button>

            {/* ✅ NOVO BOTÃO SAIR */}
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500/20 text-red-300 border border-red-500/50 hover:bg-red-500/30 transition-all"
            >
              Sair
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
