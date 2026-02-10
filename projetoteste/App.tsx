
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { IndividualPostAnalysisView } from './views/IndividualPostAnalysisView';
import { PlaceholderView } from './views/PlaceholderView';
import {
  LayoutDashboardIcon,
  DatabaseZapIcon,
  ShieldAlertIcon,
  LandmarkIcon,
  GavelIcon,
  FileTextIcon,
  BellRingIcon,
  SettingsIcon,
  FlaskConicalIcon,
  BrainCircuitIcon,
} from './components/icons';
import { AppProvider } from './contexts/AppContext';
import { DashboardView } from './views/DashboardView';
import { PoliticalContextView } from './views/PoliticalContextView';
import { LabView } from './views/LabView';
import { DataCaptureView } from './views/DataCaptureView';
import { ComparePostsView } from './views/ComparePostsView';
import { CoordinatedAttackView } from './views/CoordinatedAttackView';
import { ElectionModeView } from './views/ElectionModeView';
import { RiskCrisisView } from './views/RiskCrisisView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';
import { AlertsView } from './views/AlertsView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard/today');

  const renderActiveView = () => {
    const [mainView, subView] = activeView.split('/');

    switch (mainView) {
      case 'dashboard':
        return <DashboardView />;
      case 'analysis':
        if (subView === 'compare') return <ComparePostsView />;
        if (subView === 'coordinated') return <CoordinatedAttackView />;
        // Default to individual analysis
        return <IndividualPostAnalysisView />;
      case 'context':
        return <PoliticalContextView />;
      case 'lab':
        return <LabView />;
      case 'capture':
        return <DataCaptureView onNavigate={setActiveView} subView={subView} />;
      case 'risk':
        return <RiskCrisisView />;
      case 'election':
        return <ElectionModeView />;
      case 'reports':
        return <ReportsView subView={subView} />;
      case 'alerts':
        return <AlertsView />;
      case 'settings':
        return <SettingsView onNavigate={setActiveView} subView={subView} />;
      default:
        return <PlaceholderView title="Página não encontrada" icon={BrainCircuitIcon} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-900 text-gray-200 flex">
        <Sidebar activeView={activeView} onNavigate={setActiveView} />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Added min-w-0 to prevent content overflow */}
          <Header />
          <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-900/50">
            {renderActiveView()}
          </main>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;