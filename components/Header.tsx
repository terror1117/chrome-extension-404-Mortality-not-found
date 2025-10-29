
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-t-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-indigo-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
      <h1 className="text-xl font-bold text-gray-100">Context IQ</h1>
    </div>
  );
};

export default Header;
