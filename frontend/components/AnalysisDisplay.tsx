
import React from 'react';

interface AnalysisDisplayProps {
  analysisText: string;
}

// A parser to format the response text with new markdown-like rules
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, index) => {
        // Main headers like ### AVALIAÇÃO DE RISCO
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold text-cyan-400 mt-6 mb-3 pt-4 border-t border-gray-700">{line.substring(4)}</h3>;
        }

        // Key-value pairs like **SCORE DE RISCO:** 85
        const boldMatch = line.match(/^\*\*(.*?):\*\*\s*(.*)/);
        if (boldMatch) {
          const [, title, content] = boldMatch;
          return (
            <div key={index} className="mt-4">
              <span className="font-semibold text-gray-100">{title}:</span>
              <span className="text-gray-300 ml-2">{content}</span>
            </div>
          );
        }

        // List items like - Item 1
        if (line.trim().startsWith('- ')) {
          const nestedBoldMatch = line.trim().match(/-\s+\*\*(.*?):\*\*\s*(.*)/);
          if (nestedBoldMatch) {
            const [, title, content] = nestedBoldMatch;
            return (
               <div key={index} className="ml-4 text-gray-300 mt-2">
                 <span className="font-semibold text-gray-200">{title}:</span>
                 <span className="ml-2">{content}</span>
               </div>
            )
          }
          return <p key={index} className="ml-4 text-gray-300">{line}</p>;
        }

        // Regular paragraphs
        return <p key={index} className="text-gray-300 leading-relaxed">{line || '\u00A0'}</p>;
      })}
    </>
  );
};

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysisText }) => {
  return (
    <div className="prose prose-invert max-w-none text-gray-300">
        <FormattedText text={analysisText} />
    </div>
  );
};
