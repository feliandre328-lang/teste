
import React from 'react';

interface CrisisScoreGaugeProps {
    score: number;
}

const getStatusInfo = (score: number): { status: string; color: string; needleRotation: number } => {
    const rotation = -90 + (score / 100) * 180;
    if (score <= 20) return { status: "Seguro", color: "text-green-400", needleRotation: rotation };
    if (score <= 40) return { status: "Atenção", color: "text-yellow-400", needleRotation: rotation };
    if (score <= 60) return { status: "Alerta", color: "text-orange-400", needleRotation: rotation };
    if (score <= 80) return { status: "Crise", color: "text-red-500", needleRotation: rotation };
    return { status: "Crise Grave", color: "text-red-400", needleRotation: rotation };
};

export const CrisisScoreGauge: React.FC<CrisisScoreGaugeProps> = ({ score }) => {
    const { status, color, needleRotation } = getStatusInfo(score);
    
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Score de Crise Atual</h3>
            <div className="relative w-64 h-32 mx-auto mb-4">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute left-0 top-0 w-full h-[200%] rounded-[50%] border-[20px] border-solid border-transparent border-t-green-500 border-l-green-500 rotate-[135deg]"></div>
                    <div className="absolute left-0 top-0 w-full h-[200%] rounded-[50%] border-[20px] border-solid border-transparent border-t-yellow-500 border-l-yellow-500 rotate-[135deg] [clip-path:polygon(50%_0,100%_0,100%_100%,50%_100%)]"></div>
                    <div className="absolute left-0 top-0 w-full h-[200%] rounded-[50%] border-[20px] border-solid border-transparent border-t-orange-500 border-l-orange-500 rotate-[135deg] [clip-path:polygon(50%_0,100%_0,100%_100%,50%_100%)] [transform:rotate(135deg)_rotateY(180deg)_rotateZ(90deg)]"></div>
                    <div className="absolute left-0 top-0 w-full h-[200%] rounded-[50%] border-[20px] border-solid border-transparent border-t-red-500 border-l-red-500 rotate-[-45deg] [clip-path:polygon(0_0,50%_0,50%_100%,0_100%)]"></div>
                </div>
                <div 
                    className="absolute bottom-0 left-1/2 w-1 h-28 bg-white origin-bottom transition-transform duration-500 ease-in-out" 
                    style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
                >
                    <div className="absolute top-0 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
            </div>
            <p className={`text-5xl font-bold ${color}`}>{score}</p>
            <p className={`text-xl font-semibold mt-2 ${color}`}>{status}</p>
        </div>
    );
};
