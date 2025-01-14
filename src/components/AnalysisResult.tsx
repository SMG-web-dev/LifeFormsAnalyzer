import React from 'react';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import type { AnalysisResult } from '../types';

interface AnalysisResultProps {
  result: AnalysisResult;
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  if (result.status === 'processing') {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        <span className="ml-3 text-lg text-gray-600">Analyzing specimen...</span>
      </div>
    );
  }

  if (result.status === 'error') {
    return (
      <div className="flex items-center justify-center p-8 bg-red-50 rounded-lg">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <span className="ml-3 text-lg text-red-700">{result.error}</span>
      </div>
    );
  }

  if (!result.data) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {result.data.commonName}
          </h2>
          <p className="text-lg italic text-gray-600">
            {result.data.scientificName}
          </p>
        </div>
        <div className="flex items-center">
          <CheckCircle className="w-6 h-6 text-emerald-500" />
          <span className="ml-2 text-sm text-gray-600">
            {Math.round(result.data.confidence * 100)}% confidence
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Classification</h3>
          <dl className="mt-2 space-y-2">
            <div>
              <dt className="text-sm text-gray-500">Kingdom</dt>
              <dd className="text-sm font-medium text-gray-900">
                {result.data.kingdom}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Phylum</dt>
              <dd className="text-sm font-medium text-gray-900">
                {result.data.phylum}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Class</dt>
              <dd className="text-sm font-medium text-gray-900">
                {result.data.class}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Order</dt>
              <dd className="text-sm font-medium text-gray-900">
                {result.data.order}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Family</dt>
              <dd className="text-sm font-medium text-gray-900">
                {result.data.family}
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Key Characteristics
          </h3>
          <ul className="mt-2 space-y-1">
            {result.data.characteristics.map((char, index) => (
              <li key={index} className="text-sm text-gray-600">
                • {char}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}