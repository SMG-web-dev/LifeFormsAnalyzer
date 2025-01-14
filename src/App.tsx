import React, { useState, useCallback } from 'react';
import { Microscope } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { AnalysisResult as AnalysisResultComponent } from './components/AnalysisResult';
import type { AnalysisResult } from './types';
import { GeminiService } from './services/geminiService';

// Initialize the service
const geminiService = new GeminiService({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || ''
});

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageSelect = useCallback(async (file: File) => {
    setResult({ status: 'processing' });
    
    try {
      const analysisResult = await geminiService.analyzeImage(file);
      setResult(analysisResult);
    } catch (error) {
      setResult({
        status: 'error',
        error: 'Failed to analyze image. Please try again.'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Microscope className="w-8 h-8 text-emerald-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              Specimen Identifier
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Upload Specimen Image
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Upload a clear image of your specimen for identification. Supported formats: JPEG, PNG
            </p>
          </div>

          <ImageUpload onImageSelect={handleImageSelect} />

          {result && <AnalysisResultComponent result={result} />}
        </div>
      </main>
    </div>
  );
}

export default App;