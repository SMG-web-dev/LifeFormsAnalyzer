import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import type { AnalysisResult as AnalysisResultType } from '../types';

interface AnalysisResultProps {
  result: AnalysisResultType;
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  if (result.status === 'processing') {
    return (
      <div className="flex items-center justify-center p-8 bg-forest-900/50 rounded-xl
                    backdrop-blur-sm animate-pulse-soft">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-forest-400/20 animate-ping" />
          <Loader2 className="w-8 h-8 text-forest-400 animate-spin relative" />
        </div>
        <span className="ml-4 text-lg text-forest-200 font-medium">
          Analyzing specimen...
        </span>
      </div>
    );
  }

  if (result.status === 'error') {
    return (
      <div className="flex items-center justify-center p-8 bg-red-950/10 rounded-xl 
                    border border-red-900/20 backdrop-blur-sm animate-scale-in">
        <AlertCircle className="w-8 h-8 text-red-500 animate-pulse" />
        <span className="ml-4 text-lg text-red-200 font-medium">{result.error}</span>
      </div>
    );
  }

  if (!result.data) return null;

  return (
    <div className="relative bg-forest-900/80 rounded-xl shadow-xl p-8 max-w-3xl mx-auto 
                  border border-forest-800/50 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-forest-400/5 via-transparent to-forest-400/5" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="transform transition-all duration-300 hover:translate-x-2">
            <h2 className="text-3xl font-bold text-forest-100 hover:text-forest-50 
                         transition-colors duration-300">
              {result.data.commonName}
            </h2>
            <p className="text-xl italic text-forest-300 mt-1 hover:text-forest-200 
                       transition-colors duration-300">
              {result.data.scientificName}
            </p>
          </div>
          <div className="flex items-center bg-forest-800/50 px-4 py-2 rounded-full 
                       transform transition-all duration-300 hover:scale-105 
                       hover:bg-forest-800/70">
            <CheckCircle className="w-6 h-6 text-forest-400" />
            <span className="ml-2 font-medium text-forest-200">
              {Math.round(result.data.confidence * 100)}% confidence
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-forest-800/30 rounded-lg p-6 transform transition-all 
                       duration-300 hover:scale-[1.02] hover:bg-forest-800/40 group">
            <h3 className="text-xl font-semibold text-forest-100 mb-4 group-hover:text-forest-50
                        transition-colors duration-300">
              Classification
            </h3>
            <dl className="space-y-4">
              {['Kingdom', 'Phylum', 'Class', 'Order', 'Family'].map((term) => (
                <div key={term}
                  className="flex justify-between items-center transform transition-all 
                              duration-300 hover:translate-x-2">
                  <dt className="text-forest-300 transition-colors duration-300 
                              group-hover:text-forest-200">
                    {term}
                  </dt>
                  <dd className="text-forest-100 font-medium transition-colors duration-300 
                              group-hover:text-forest-50">
                    {result.data[term.toLowerCase()]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="bg-forest-800/30 rounded-lg p-6 transform transition-all 
                       duration-300 hover:scale-[1.02] hover:bg-forest-800/40 group">
            <h3 className="text-xl font-semibold text-forest-100 mb-4 group-hover:text-forest-50 
                        transition-colors duration-300">
              Key Characteristics
            </h3>
            <ul className="space-y-2">
              {result.data.characteristics.map((char, index) => (
                <li key={index}
                  className="flex items-start transform transition-all duration-300 
                             hover:translate-x-2">
                  <span className="text-forest-400 mr-2 transition-colors duration-300 
                                group-hover:text-forest-300">
                    •
                  </span>
                  <span className="text-forest-200 transition-colors duration-300 
                                group-hover:text-forest-100">
                    {char}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}