export interface SpecimenAnalysis {
  id: string;
  commonName: string;
  scientificName: string;
  confidence: number;
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  characteristics: string[];
  imageUrl: string;
  timestamp: string;
}

export interface AnalysisResult {
  status: 'processing' | 'complete' | 'error';
  data?: SpecimenAnalysis;
  error?: string;
}