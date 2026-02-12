
import React, { useState, useContext, useCallback, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { generateReport } from '../services/geminiService';
import { FileTextIcon, DownloadIcon } from '../components/icons';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AnalysisDisplay } from '../components/AnalysisDisplay';

type ReportType = 'executive' | 'technical';
type DateRange = '24h' | '7d' | '30d';

interface ReportsViewProps {
    subView?: string;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ subView }) => {
    const { history } = useContext(AppContext);
    const [reportType, setReportType] = useState<ReportType>('executive');
    const [dateRange, setDateRange] = useState<DateRange>('7d');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedReport, setGeneratedReport] = useState<string | null>(null);

    useEffect(() => {
        if (subView === 'technical') {
            setReportType('technical');
        } else {
            setReportType('executive');
        }
    }, [subView]);

    const handleGenerateReport = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedReport(null);

        const now = Date.now();
        let cutoffTime: number;

        switch (dateRange) {
            case '24h':
                cutoffTime = now - 24 * 60 * 60 * 1000;
                break;
            case '7d':
                cutoffTime = now - 7 * 24 * 60 * 60 * 1000;
                break;
            case '30d':
                cutoffTime = now - 30 * 24 * 60 * 60 * 1000;
                break;
        }

        const filteredHistory = history.filter(entry => {
            const entryTimestamp = parseInt(entry.id.split('_')[1], 10);
            return entryTimestamp > cutoffTime;
        });

        if (filteredHistory.length === 0) {
            setError("Não há dados de análise no período selecionado para gerar o relatório.");
            setIsLoading(false);
            return;
        }

        try {
            const report = await generateReport(filteredHistory, reportType, dateRange);
            setGeneratedReport(report);
        } catch (e: any) {
            setError(e.message || "Ocorreu um erro ao gerar o relatório.");
        } finally {
            setIsLoading(false);
        }
    }, [history, reportType, dateRange]);

    const handleExportPDF = () => {
        window.print();
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                    <FileTextIcon className="w-8 h-8 mr-3 text-cyan-400" />
                    Geração de Relatórios com IA
                </h1>
                <p className="text-gray-400">Sintetize o histórico de análises em um relatório executivo ou técnico.</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4 md:flex md:items-end md:justify-between md:space-y-0 md:space-x-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Tipo de Relatório</label>
                    <select value={reportType} onChange={e => setReportType(e.target.value as ReportType)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white">
                        <option value="executive">Relatório Executivo</option>
                        <option value="technical">Relatório Técnico</option>
                    </select>
                </div>
                <div className="flex-1">
                     <label className="block text-sm font-medium text-gray-300 mb-1">Período</label>
                    <select value={dateRange} onChange={e => setDateRange(e.target.value as DateRange)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white">
                        <option value="24h">Últimas 24 horas</option>
                        <option value="7d">Últimos 7 dias</option>
                        <option value="30d">Últimos 30 dias</option>
                    </select>
                </div>
                <button
                    onClick={handleGenerateReport}
                    disabled={isLoading || history.length === 0}
                    className="w-full md:w-auto bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Gerando...' : 'Gerar Relatório'}
                </button>
            </div>
            
            <div id="report-output" className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 min-h-[400px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-cyan-400">Relatório Gerado</h2>
                    {generatedReport && (
                        <button
                            id="export-pdf-button"
                            onClick={handleExportPDF}
                            className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors flex items-center space-x-2"
                        >
                            <DownloadIcon className="w-5 h-5" />
                            <span>Exportar PDF</span>
                        </button>
                    )}
                </div>

                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full">
                        <LoadingSpinner />
                        <p className="mt-4 text-gray-400">A IA está sintetizando os dados. Isso pode levar um momento...</p>
                    </div>
                )}
                 {error && (
                    <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
                        {error}
                    </div>
                )}
                {generatedReport && (
                    <AnalysisDisplay analysisText={generatedReport} />
                )}
                 {!isLoading && !generatedReport && !error && (
                    <div className="flex flex-col items-center justify-center text-center text-gray-500 h-full min-h-[300px]">
                        <FileTextIcon className="w-16 h-16 mb-4"/>
                        <p className="text-lg">Seu relatório aparecerá aqui.</p>
                        <p>Selecione as opções e clique em "Gerar Relatório" para começar.</p>
                         {history.length === 0 && <p className="mt-4 text-yellow-400 text-sm bg-yellow-900/50 p-3 rounded-lg">Você precisa realizar pelo menos uma análise para gerar um relatório.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};
