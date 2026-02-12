
import React from 'react';
import { ArrowUpRightIcon, ArrowDownRightIcon, MinusIcon } from '../icons';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    valueColor?: string;
    trend?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, valueColor = "text-white", trend }) => {

    const renderTrend = () => {
        if (trend === undefined) return null;

        const isUp = trend > 0;
        const isDown = trend < 0;
        const trendColor = isUp ? "text-red-500" : isDown ? "text-green-500" : "text-gray-500";
        const TrendIcon = isUp ? ArrowUpRightIcon : isDown ? ArrowDownRightIcon : MinusIcon;
        
        return (
            <span className={`flex items-center text-xs font-semibold ${trendColor}`}>
                <TrendIcon className="w-4 h-4 mr-1" />
                {isUp ? '+' : ''}{trend.toFixed(0)}
            </span>
        );
    }
    
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-400">{title}</p>
                <p className={`text-3xl font-bold mt-2 ${valueColor}`}>{value}</p>
                 {trend !== undefined && <div className="mt-2">{renderTrend()}</div>}
            </div>
            <div className="bg-gray-700/50 p-3 rounded-full">
                <Icon className="w-6 h-6 text-cyan-400" />
            </div>
        </div>
    );
};