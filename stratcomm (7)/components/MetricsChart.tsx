
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Metrics } from '../types';
import { ChartIcon } from './icons/ChartIcon';

interface MetricsChartProps {
  data: Metrics;
}

const COLORS = {
  apoio: '#22c55e', // green-500
  critica: '#f97316', // orange-500
  ataque: '#ef4444', // red-500
  duvida: '#3b82f6', // blue-500
  ironia: '#a855f7', // purple-500
  informacao_falsa: '#f43f5e', // rose-500
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 p-2 border border-gray-600 rounded-md shadow-lg">
        <p className="label text-white">{`${payload[0].name} : ${payload[0].value.toFixed(2)}%`}</p>
      </div>
    );
  }

  return null;
};

export const MetricsChart: React.FC<MetricsChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Apoio', value: data.apoio_percentual },
    { name: 'Crítica', value: data.critica_percentual },
    { name: 'Ataque', value: data.ataque_percentual },
    { name: 'Dúvida', value: data.duvida_percentual },
    { name: 'Ironia', value: data.ironia_percentual ?? 0 },
    { name: 'Info Falsa', value: data.informacao_falsa_percentual },
  ].filter(item => item.value > 0);

  const colorMapping = [
    COLORS.apoio,
    COLORS.critica,
    COLORS.ataque,
    COLORS.duvida,
    COLORS.ironia,
    COLORS.informacao_falsa
  ];

  if (chartData.length === 0) {
      return null;
  }

  return (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 mb-6">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center"><ChartIcon className="w-6 h-6 mr-2" /> Métricas Visuais</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                return (
                  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {chartData.map((entry, index) => {
                  let colorKey = 'apoio';
                  if(entry.name === 'Crítica') colorKey = 'critica';
                  if(entry.name === 'Ataque') colorKey = 'ataque';
                  if(entry.name === 'Dúvida') colorKey = 'duvida';
                  if(entry.name === 'Ironia') colorKey = 'ironia';
                  if(entry.name === 'Info Falsa') colorKey = 'informacao_falsa';
                  return <Cell key={`cell-${index}`} fill={COLORS[colorKey as keyof typeof COLORS]} />;
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#9ca3af' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
