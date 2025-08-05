// @ts-ignore
import html2canvas from 'html2canvas';
// @ts-ignore
import jsPDF from 'jspdf';

export interface PDFGeneratorOptions {
  filename?: string;
  onProgress?: (progress: string) => void;
}

export class PDFGenerator {
  private onProgress?: (progress: string) => void;

  constructor(options: PDFGeneratorOptions = {}) {
    this.onProgress = options.onProgress;
  }

  private updateProgress(message: string) {
    if (this.onProgress) {
      this.onProgress(message);
    }
  }

  private async waitForChartsToRender(maxAttempts = 30): Promise<boolean> {
    this.updateProgress('Waiting for charts to render...');
    
    // Wait for all chart containers to be rendered
    const chartSelectors = [
      '.recharts-wrapper',
      'svg[role="img"]',
      'canvas'
    ];

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const allRendered = chartSelectors.every(selector => {
        const elements = document.querySelectorAll(selector);
        return elements.length > 0 && Array.from(elements).every(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        });
      });
      
      if (allRendered) {
        this.updateProgress('All charts rendered successfully');
        return true;
      }
      await new Promise(r => setTimeout(r, 1000));
    }
    console.warn('Some charts may not have rendered properly');
    return false;
  }

  private async captureElement(
    element: HTMLElement,
    scale: number
  ): Promise<string> {
    const canvas = await html2canvas(element, {
      scale,
      backgroundColor: '#fff',
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
      onclone: (clonedDoc) => {
        // Ensure all styles are applied to the cloned document
        const clonedElement = clonedDoc.getElementById(element.id);
        if (clonedElement) {
          clonedElement.style.transform = 'none';
        }
      }
    });
    return canvas.toDataURL('image/png');
  }

  async generatePDF(elementId: string, filename = 'nuqi-ethosphere-daily-news.pdf'): Promise<void> {
    try {
      this.updateProgress('Initializing PDF generation...');
      await this.waitForChartsToRender();
      await new Promise(r => setTimeout(r, 2000));

      const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const w = doc.internal.pageSize.getWidth();
      const h = doc.internal.pageSize.getHeight();
      const margin = 40;

      // Get the main content element
      const mainElement = document.getElementById(elementId);
      if (!mainElement) {
        throw new Error(`Element with id '${elementId}' not found`);
      }

      // Find all pages with the class 'print-page'
      const pages = mainElement.querySelectorAll('.print-page');
      
      this.updateProgress(`Found ${pages.length} pages to process...`);

      for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
        const pageElement = pages[pageIndex] as HTMLElement;
        
        this.updateProgress(`Capturing page ${pageIndex + 1} of ${pages.length}...`);

        // Add a new page for each page after the first
        if (pageIndex > 0) {
          doc.addPage();
        }

        const scale = (window.devicePixelRatio || 1) * 2;
        const img = await this.captureElement(pageElement, scale);
        
        // Calculate dimensions to fit the page
        const imgW = w - 2 * margin;
        const imgH = (pageElement.offsetHeight * imgW) / pageElement.offsetWidth;
        
        // If the image is too tall, scale it down to fit
        let finalW = imgW;
        let finalH = imgH;
        const maxHeight = h - 2 * margin;
        
        if (imgH > maxHeight) {
          finalH = maxHeight;
          finalW = (pageElement.offsetWidth * finalH) / pageElement.offsetHeight;
        }

        // Center the image on the page
        const x = (w - finalW) / 2;
        const y = margin;

        doc.addImage(img, 'PNG', x, y, finalW, finalH);

        // Add page number (except for cover page)
        if (pageIndex > 0) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(107, 114, 128);
          doc.text(`Page ${pageIndex + 1}`, w - margin - 50, h - 20);
        }
      }

      this.updateProgress('Saving PDF...');
      doc.setProperties({
        title: 'Nuqi Ethosphere - Daily News',
        subject: 'Daily Market Analysis and Financial News',
        author: 'Nuqi Ethosphere Research',
        keywords: 'Market Analysis, Financial News, Daily Report, Nuqi Ethosphere',
        creator: 'Nuqi Ethosphere Daily News Generator'
      });
      
      doc.save(filename);
      this.updateProgress('PDF generated successfully!');
    } catch (err) {
      console.error(err);
      throw new Error('Failed to generate PDF. Please try again.');
    }
  }
}

// Utility function to generate PDF
export const generatePDF = async (elementId: string, filename?: string, onProgress?: (progress: string) => void): Promise<void> => {
  const generator = new PDFGenerator({ filename, onProgress });
  await generator.generatePDF(elementId, filename);
};