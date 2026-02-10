
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUpIcon } from '../icons';

interface DashboardChartProps {
    data: { name: string; score: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 p-3 border border-gray-600 rounded-lg shadow-lg">
        <p className="label text-gray-300">{`Hora: ${label}`}</p>
        <p className="intro text-cyan-400 font-bold">{`Score: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export const DashboardChart: React.FC<DashboardChartProps> = ({ data }) => {
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 h-[400px]">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <TrendingUpIcon className="w-6 h-6 mr-2 text-cyan-400" />
                Linha do Tempo do Risco
            </h3>
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                        <XAxis dataKey="name" stroke="#a0aec0" angle={-45} textAnchor="end" height={60} />
                        <YAxis stroke="#a0aec0" domain={[0, 100]}/>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ color: '#a0aec0', paddingTop: '20px' }}/>
                        <Line type="monotone" dataKey="score" name="Score de Risco" stroke="#22d3ee" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                    <p>Nenhum dado de análise para exibir.</p>
                </div>
            )}
        </div>
    );
};