import { useState, useCallback } from 'react';
import { ImageUpload } from '../components/ImageUpload';
import { AnalysisResult } from '../components/AnalysisResult';
import type { AnalysisResult as AnalysisResultType } from '../types';
import { GeminiService } from '../services/geminiService';

// Initialize the service
const geminiService = new GeminiService({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || ''
});

function Home() {
    const [result, setResult] = useState<AnalysisResultType | null>(null);

    const handleImageSelect = useCallback(async (file: File) => {
        try {
            const analysisResult = await geminiService.analyzeImage(file);
            setResult(analysisResult);
        } catch (error) {
            console.error('Error analyzing image:', error);
            // Handle error (e.g., show error message to user)
        }
    }, []);

    return (
        <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto transform transition-all duration-500 
                    hover:scale-[1.02]">
                <h2 className="text-2xl font-semibold text-forest-100">
                    Upload Specimen Image
                </h2>
                <p className="mt-2 text-forest-300">
                    Upload a clear image of your specimen for identification.
                    We support JPEG and PNG formats.
                </p>
            </div>

            <ImageUpload onImageSelect={handleImageSelect} />

            {result && (
                <div className="mt-12 animate-scale-in">
                    <AnalysisResult result={result} />
                </div>
            )}
        </div>
    );
}

export default Home;

