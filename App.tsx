
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Loader from './components/Loader';
import DefinitionView from './components/DefinitionView';
import SummaryView from './components/SummaryView';
import { getWordMeaning, getSummaries } from './services/geminiService';
import type { AnalysisResult } from './types';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const wordCount = inputText.trim().split(/\s+/).length;

      if (wordCount <= 3) {
        const meaning = await getWordMeaning(inputText.trim());
        setResult({ type: 'word', data: meaning });
      } else {
        const summaries = await getSummaries(inputText);
        setResult({ type: 'summary', data: summaries });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  const renderResult = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <div className="p-4 text-red-400 bg-red-900/50 rounded-b-lg">{error}</div>;
    }
    if (result) {
      if (result.type === 'word') {
        return <DefinitionView data={result.data} />;
      }
      if (result.type === 'summary') {
        return <SummaryView data={result.data} />;
      }
    }
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Paste a word or paragraph above and click Analyze to get started.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-2xl ring-1 ring-white/10">
        <Header />
        
        <div className="p-4 border-b border-t border-gray-700">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste text here to analyze..."
            className="w-full h-28 p-3 bg-gray-900/50 text-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition resize-none"
          />
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !inputText.trim()}
            className="mt-3 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-800/50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
        
        <div className="min-h-[150px]">
          {renderResult()}
        </div>
      </div>
    </div>
  );
};

export default App;
