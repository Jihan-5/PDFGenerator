import React, { useState } from 'react';
import { generatePDF } from '../utils/pdfGenerator';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  elementId: string;
  filename?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  elementId, 
  filename = 'Nuqi-Ethosphere-Daily-News.pdf' 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState('');

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      setProgress('Initializing...');
      
      await generatePDF(elementId, filename, (progressMessage) => {
        setProgress(progressMessage);
      });
      
      setProgress('PDF downloaded successfully!');
      setTimeout(() => setProgress(''), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setProgress('Error generating PDF. Please try again.');
      setTimeout(() => setProgress(''), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 no-print">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg ${
          isGenerating 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#2d3748] hover:bg-[#1a202c] text-white hover:shadow-xl transform hover:scale-105'
        }`}
        title="Download PDF Report"
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Download size={18} />
            <span>Download PDF</span>
          </>
        )}
      </button>
      
      {progress && (
        <div className="mt-2 px-4 py-2 bg-white rounded-lg shadow-md border border-gray-200 text-sm text-gray-700 max-w-xs">
          {progress}
        </div>
      )}
    </div>
  );
};