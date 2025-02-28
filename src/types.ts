export interface PlantAnalysis {
  disease: string;
  confidence: number;
  fertilizer: string;
  treatment: string;
}

export interface AnalysisReport {
  imageUrl: string;
  date: Date;
  analysis: PlantAnalysis;
}