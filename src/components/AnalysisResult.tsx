import React from 'react';
import { format } from 'date-fns';
import { AlertCircle, Leaf, TestTube } from 'lucide-react';
import type { AnalysisReport } from '../types';

interface AnalysisResultProps {
  report: AnalysisReport;
}

export function AnalysisResult({ report }: AnalysisResultProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Analysis Results</h2>
        <span className="text-sm text-gray-500">
          {format(report.date, 'PPP')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src={report.imageUrl}
            alt="Analyzed plant"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Detected Disease</h3>
              <p className="text-gray-600">{report.analysis.disease}</p>
              <p className="text-sm text-gray-500">
                Confidence: {(report.analysis.confidence * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <TestTube className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Recommended Fertilizer</h3>
              <p className="text-gray-600">{report.analysis.fertilizer}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Leaf className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Treatment Plan</h3>
              <p className="text-gray-600">{report.analysis.treatment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}