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

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      await generatePDF(elementId, filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="download-btn no-print"
      title="Download PDF Report"
    >
      {isGenerating ? (
        <>
          <div className="spinner"></div>
          <span>Generating PDF...</span>
        </>
      ) : (
        <>
          <Download size={18} />
          <span>Download PDF</span>
        </>
      )}
    </button>
  );
};