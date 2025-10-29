
import React, { useState } from 'react';
import type { Summaries, AgeGroup } from '../types';

interface SummaryViewProps {
  data: Summaries;
}

const ageGroups: { id: AgeGroup; label: string }[] = [
  { id: 'child', label: 'Child' },
  { id: 'teen', label: 'Teen' },
  { id: 'adult', label: 'Adult' },
];

const SummaryView: React.FC<SummaryViewProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<AgeGroup>('adult');

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex border-b border-gray-700">
          {ageGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveTab(group.id)}
              className={`-mb-px flex-1 py-2 px-1 text-center text-sm font-medium border-b-2 transition-colors duration-200
                ${
                  activeTab === group.id
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                }`}
            >
              {group.label}
            </button>
          ))}
        </div>
      </div>
      <div className="text-gray-300">
        <p>{data[activeTab]}</p>
      </div>
    </div>
  );
};

export default SummaryView;
