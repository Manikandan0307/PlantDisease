import React, { useState } from 'react';
import { Plane as Plant, Download } from 'lucide-react';
import { usePDF } from 'react-to-pdf';
import { ImageUpload } from './components/ImageUpload';
import { AnalysisResult } from './components/AnalysisResult';
import type { AnalysisReport } from './types';

function App() {
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const { toPDF, targetRef } = usePDF({
    filename: `plant-analysis-${new Date().toISOString().split('T')[0]}.pdf`,
    page: { margin: 20 }
  });

  // Simulated analysis function with multiple possible diseases and treatments
  const analyzeImage = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    
    // Array of possible plant diseases and their treatments
    const diseases = [
      {
        disease: "Early Blight",
        confidence: 0.89,
        fertilizer: "Calcium nitrate (15.5-0-0) enriched fertilizer",
        treatment: "Remove infected leaves, apply fungicide containing chlorothalonil or copper. Maintain proper plant spacing for air circulation."
      },
      {
        disease: "Powdery Mildew",
        confidence: 0.95,
        fertilizer: "Potassium silicate based fertilizer (0-0-3)",
        treatment: "Apply sulfur-based fungicide, increase air circulation, and avoid overhead watering. Remove severely infected plants."
      },
      {
        disease: "Bacterial Spot",
        confidence: 0.78,
        fertilizer: "Low nitrogen, high phosphorus fertilizer (5-10-5)",
        treatment: "Apply copper-based bactericide, practice crop rotation, and remove infected plant debris. Avoid working with wet plants."
      },
      {
        disease: "Septoria Leaf Spot",
        confidence: 0.92,
        fertilizer: "Balanced organic fertilizer (5-5-5) with added calcium",
        treatment: "Remove infected leaves, apply fungicide containing chlorothalonil. Mulch around plants to prevent soil splash."
      },
      {
        disease: "Root Rot",
        confidence: 0.85,
        fertilizer: "Phosphorus-rich fertilizer (3-15-3) with mycorrhizal fungi",
        treatment: "Improve soil drainage, reduce watering frequency, apply fungicide containing fosetyl-aluminum. Remove severely affected plants."
      }
    ];

    // Randomly select a disease for demonstration
    const randomAnalysis = diseases[Math.floor(Math.random() * diseases.length)];

    const mockReport: AnalysisReport = {
      imageUrl,
      date: new Date(),
      analysis: randomAnalysis
    };

    setReport(mockReport);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Plant className="h-8 w-8 text-green-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              Plant Disease Detection
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Upload Plant Image
            </h2>
            <ImageUpload onImageUpload={analyzeImage} />
          </div>

          {report && (
            <div ref={targetRef}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Analysis Report
                </h2>
                <button
                  onClick={() => toPDF()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
              </div>
              <AnalysisResult report={report} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;