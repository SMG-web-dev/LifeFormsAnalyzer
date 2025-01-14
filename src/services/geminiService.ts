import type { AnalysisResult, SpecimenAnalysis } from '../types';

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface GeminiConfig {
  apiKey: string;
}

export class GeminiService {
  private apiKey: string;

  constructor(config: GeminiConfig) {
    this.apiKey = config.apiKey;
  }

  private async makeRequest(imageBase64: string): Promise<Response> {
    const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze this biological specimen image and provide a detailed response in the following JSON format:
            {
              "commonName": "Common name of the specimen",
              "scientificName": "Scientific name of the specimen",
              "confidence": 0.95,
              "kingdom": "Taxonomic kingdom",
              "phylum": "Taxonomic phylum",
              "class": "Taxonomic class",
              "order": "Taxonomic order",
              "family": "Taxonomic family",
              "characteristics": ["Key characteristic 1", "Key characteristic 2", "Key characteristic 3"]
            }`
          }, {
            inline_data: {
              mime_type: "image/jpeg",
              data: imageBase64
            }
          }]
        }],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error?.message || `API request failed: ${response.statusText}`);
    }

    return response;
  }

  private parseResponse(data: any): SpecimenAnalysis {
    try {
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid API response format');
      }

      const text = data.candidates[0].content.parts[0].text;
      
      // Try to extract JSON from the response text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const parsedData = JSON.parse(jsonMatch[0]);
      
      return {
        id: crypto.randomUUID(),
        commonName: parsedData.commonName || 'Unknown Species',
        scientificName: parsedData.scientificName || 'Species incertae sedis',
        confidence: parsedData.confidence || 0.7,
        kingdom: parsedData.kingdom || 'Unknown',
        phylum: parsedData.phylum || 'Unknown',
        class: parsedData.class || 'Unknown',
        order: parsedData.order || 'Unknown',
        family: parsedData.family || 'Unknown',
        characteristics: parsedData.characteristics || ['No characteristics available'],
        imageUrl: '',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Response parsing error:', error);
      throw new Error('Failed to parse API response');
    }
  }

  public async analyzeImage(file: File): Promise<AnalysisResult> {
    try {
      if (!this.apiKey) {
        throw new Error('API key is not configured');
      }

      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String.split(',')[1]); // Remove data URL prefix
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const response = await this.makeRequest(base64);
      const data = await response.json();
      const analysis = this.parseResponse(data);

      return {
        status: 'complete',
        data: {
          ...analysis,
          imageUrl: URL.createObjectURL(file)
        }
      };
    } catch (error) {
      console.error('Analysis failed:', error);
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to analyze image. Please try again.'
      };
    }
  }
}