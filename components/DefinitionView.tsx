
import React from 'react';
import type { WordMeaning } from '../types';

interface DefinitionViewProps {
  data: WordMeaning;
}

const DefinitionView: React.FC<DefinitionViewProps> = ({ data }) => {
  return (
    <div className="space-y-4 p-4">
      <div>
        <h3 className="font-semibold text-sm text-indigo-400 mb-1">DEFINITION</h3>
        <p className="text-gray-300">{data.definition}</p>
      </div>
      <div>
        <h3 className="font-semibold text-sm text-indigo-400 mb-1">EXAMPLE</h3>
        <p className="text-gray-300 italic">"{data.example}"</p>
      </div>
    </div>
  );
};

export default DefinitionView;
