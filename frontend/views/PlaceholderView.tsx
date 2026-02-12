
import React from 'react';

interface PlaceholderViewProps {
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 bg-gray-800/30 rounded-2xl border-2 border-dashed border-gray-700">
      <Icon className="w-20 h-20 mb-6 text-gray-700" />
      <h1 className="text-3xl font-bold text-gray-500">{title}</h1>
      <p className="mt-2 text-lg text-gray-600">Funcionalidade em desenvolvimento.</p>
    </div>
  );
};
