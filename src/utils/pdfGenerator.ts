import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface PDFContent {
  title: string;
  sections: PDFSection[];
}

interface PDFSection {
  title: string;
  content: string[];
  tables?: PDFTable[];
  charts?: PDFChart[];
}

interface PDFTable {
  headers: string[];
  rows: string[][];
  title?: string;
}

interface PDFChart {
  type: 'bar' | 'line' | 'pie';
  data: any[];
  title: string;
}

class PDFGenerator {
  private doc: jsPDF;
  private pageHeight: number;
  private pageWidth: number;
  private margin: number;
  private currentY: number;
  private lineHeight: number;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
    this.pageHeight = 297;
    this.pageWidth = 210;
    this.margin = 15;
    this.currentY = this.margin;
    this.lineHeight = 5;
  }

  private checkPageBreak(height: number): void {
    if (this.currentY + height > this.pageHeight - this.margin) {
      this.doc.addPage();
      this.currentY = this.margin;
    }
  }

  private addTitle(title: string, fontSize: number = 16): void {
    this.checkPageBreak(fontSize);
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += fontSize * 0.8;
  }

  private addSection(title: string, fontSize: number = 12): void {
    this.checkPageBreak(fontSize);
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += fontSize * 0.8;
  }

  private addText(text: string, fontSize: number = 10): void {
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'normal');
    
    const maxWidth = this.pageWidth - 2 * this.margin;
    const lines = this.doc.splitTextToSize(text, maxWidth);
    
    this.checkPageBreak(lines.length * this.lineHeight);
    
    lines.forEach((line: string) => {
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += this.lineHeight;
    });
  }

  private addTable(table: PDFTable): void {
    if (table.title) {
      this.addSection(table.title, 11);
    }

    const tableHeight = (table.rows.length + 1) * 8; // Estimate
    this.checkPageBreak(tableHeight);

    this.doc.autoTable({
      head: [table.headers],
      body: table.rows,
      startY: this.currentY,
      margin: { left: this.margin, right: this.margin },
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [45, 55, 72],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251],
      },
      didDrawPage: (data: any) => {
        this.currentY = data.cursor.y + 5;
      },
    });
  }

  private extractContentFromDOM(): PDFContent {
    const content: PDFContent = {
      title: 'Nuqi Ethosphere Daily News',
      sections: []
    };

    // Extract market outlook
    const marketSection: PDFSection = {
      title: 'Market Outlook',
      content: [
        'Indian benchmark indices concluded the session on a firm footing on August 4th with the Nifty reclaiming and settling above the 24,700 mark, indicating pullback after recent sharp decline.',
        'The Sensex was up 418.81 points or 0.52% at 81,018.72, and the Nifty was up 157.40 points or 0.64% at 24,722.75.',
        'All sectoral indices closed in positive territory, with broad-based participation led by PSU Banks, pharmaceuticals, realty, IT, metals, telecom, media, consumer durables, and auto stocks.',
      ],
      tables: [
        {
          title: 'Indian Markets',
          headers: ['Market', 'Closing', '% Daily Chg', '% YTD Change'],
          rows: [
            ['NIFTY', '24,722.75', '0.64', '4.56'],
            ['BANKNIFTY', '55,619.35', '0.00', '9.36'],
            ['SENSEX', '81,018.72', '0.52', '3.69'],
            ['USDINR', '87.653', '-0.14', '5.39'],
            ['INDIA VIX', '11.97', '-0.06', '-17.17'],
            ['GIFT NIFTY', '24,770', '-0.09', '4.21'],
          ]
        },
        {
          title: 'Global Markets',
          headers: ['Market', 'Closing', '% Daily Chg', '% YTD Change'],
          rows: [
            ['DOW', '44,173.64', '1.34', '3.83'],
            ['S&P500', '6,329.94', '1.47', '7.62'],
            ['NASDAQ', '21,053.58', '1.95', '9.02'],
            ['NIKKEI', '40,505.83', '0.53', '1.53'],
            ['HANGSENG', '24,715.3', '-0.07', '23.21'],
          ]
        },
        {
          title: 'Fund Flow Activity',
          headers: ['Participant', 'Cash (₹Cr)', 'MTD (₹Cr)', 'YTD (₹Cr)'],
          rows: [
            ['FII', '-2,567', '-5,933.00', '-176,014.25'],
            ['DII', '4,386', '7,572.00', '426,158.56'],
          ]
        }
      ]
    };

    // Technical Outlook Section
    const technicalSection: PDFSection = {
      title: 'Technical Outlook: Nifty',
      content: [
        'The index formed a bull candle that remained enclosed inside the previous session price range signaling pause in the last two sessions\' corrective decline.',
        'Volatility is anticipated to remain elevated in the coming sessions driven by key macro triggers, including the progress of US-India tariff decision and the RBI rate decision.',
        'Index has key support around 24,500-24,400 levels, being the confluence of the prior swing low, the 100-day EMA, and key retracement level.',
        'Nifty is likely to extend consolidation in the range of 24,400-25,000. Only a breach below 24,400 will open downside towards 24,200 levels.',
      ],
      tables: [
        {
          title: 'Support & Resistance',
          headers: ['Index', 'Support 1', 'Support 2', 'Resistance 1', 'Resistance 2'],
          rows: [
            ['Nifty', '24,620', '24,530', '24,780', '24,860'],
            ['Bank Nifty', '55,350', '55,170', '55,750', '56,000'],
          ]
        }
      ]
    };

    // Option Chain Analysis
    const optionChainSection: PDFSection = {
      title: 'Option Chain Analysis',
      content: [
        'Nifty with the highest Call OI at 25,000, acting as a key resistance zone. On the downside, strong Put writing at 23,500 signals a solid base.',
        'Fresh Put writing has been observed at 24,500–24,600, indicating immediate support, while resistance is now seen at 24,800.',
        'In Bank Nifty, both Call and Put writers remain active at the 57,000 strike, reflecting market participants\' confidence in limited downside.',
      ],
      tables: [
        {
          title: 'Index Highlights',
          headers: ['Index', 'CMP', 'Price Chg', 'Price %', 'VWAP', 'PCR OI'],
          rows: [
            ['Nifty', '24,793.10', '165.90', '0.67', '24,742', '0.94'],
            ['Bank Nifty', '55,860.00', '65.80', '0.12', '55,818', '0.90'],
          ]
        }
      ]
    };

    // Derivatives Analysis
    const derivativesSection: PDFSection = {
      title: 'Derivatives Analysis',
      content: [
        'Price gainers showed strong momentum with ABCAPITAL leading at 10.79%, followed by DELHIVERY at 7.91%.',
        'OI gainers indicate fresh positions with NUVAMA showing highest OI increase at 90.04%.',
      ],
      tables: [
        {
          title: 'Price Gainers',
          headers: ['Symbol', 'Price %', 'OI %', 'Analysis'],
          rows: [
            ['ABCAPITAL', '10.79', '-0.86', 'Short Covering'],
            ['DELHIVERY', '7.91', '15.06', 'Long Buildup'],
            ['CDSL', '6.45', '-1.91', 'Short Covering'],
            ['MANAPPURAM', '6.41', '8.03', 'Long Buildup'],
          ]
        },
        {
          title: 'Price Losers',
          headers: ['Symbol', 'Price %', 'OI %', 'Analysis'],
          rows: [
            ['ABB', '-5.13', '5.08', 'Short Buildup'],
            ['PNBHOUSING', '-3.91', '-7.39', 'Long Unwinding'],
            ['GODREJCP', '-1.52', '-2.54', 'Long Unwinding'],
            ['SUZLON', '-1.46', '33.35', 'Short Buildup'],
          ]
        }
      ]
    };

    // Key News
    const keyNewsSection: PDFSection = {
      title: 'Key News',
      content: [],
      tables: [
        {
          title: 'Top News for Today',
          headers: ['Company', 'News', 'Impact'],
          rows: [
            ['PAYTM', 'Antfin in its clean out trade, to sell 5.84% stake at Rs 1020 apiece. Block deal size is Rs 3,800 crore.', 'Neutral'],
            ['NTPC GREEN', 'Company\'s arm emerges as successful bidder in E-Reverse auction conducted by SECI for 70,000 MT/Annum capacity of green ammonia.', 'Positive'],
            ['BEML', 'Company has bagged order from Ministry of Defence for supply of HMV 8X8 with contract value of Rs 282 crores.', 'Positive'],
            ['GODFREY PHILIP', 'Company has approved the first bonus at the ratio of 2:1 with Sept. 16 as the record date.', 'Positive'],
            ['KAYNES TECH', 'Company\'s arm has signed MOU with Tamil Nadu Government. Proposes to invest Rs 4,995 crores over six years.', 'Positive'],
          ]
        }
      ]
    };

    // Event Calendar
    const eventCalendarSection: PDFSection = {
      title: 'Key Event Calendar',
      content: [],
      tables: [
        {
          headers: ['Date', 'Country', 'Event'],
          rows: [
            ['Friday, August 1, 2025', 'India', 'S&P Global Manufacturing PMI (Jul)'],
            ['Friday, August 1, 2025', 'United States', 'Nonfarm Payrolls (Jul)'],
            ['Tuesday, August 5, 2025', 'China', 'Caixin Services PMI (Jul)'],
            ['Tuesday, August 5, 2025', 'India', 'S&P Global Services PMI (Jul)'],
            ['Wednesday, August 6, 2025', 'India', 'Interest Rate Decision'],
            ['Thursday, August 7, 2025', 'United States', 'Initial Jobless Claims'],
          ]
        }
      ]
    };

    content.sections = [
      marketSection,
      technicalSection,
      optionChainSection,
      derivativesSection,
      keyNewsSection,
      eventCalendarSection
    ];

    return content;
  }

  private addCoverPage(): void {
    // Cover page with gradient background simulation
    this.doc.setFillColor(45, 55, 72);
    this.doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(48);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('NUQI ETHOSPHERE', this.pageWidth / 2, 80, { align: 'center' });
    
    this.doc.setFontSize(64);
    this.doc.text('Daily News', this.pageWidth / 2, 140, { align: 'center' });
    
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'normal');
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    this.doc.text(`Date: ${currentDate}`, this.pageWidth / 2, 160, { align: 'center' });
    
    this.doc.setFontSize(12);
    this.doc.text('nuqiethosphere.com', this.pageWidth / 2, 250, { align: 'center' });
    
    this.doc.addPage();
    this.currentY = this.margin;
    this.doc.setTextColor(0, 0, 0); // Reset text color
  }

  private addHeader(): void {
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('NUQI ETHOSPHERE', this.margin, 10);
    this.doc.text('Daily News', this.pageWidth - this.margin, 10, { align: 'right' });
    
    // Add line under header
    this.doc.setLineWidth(0.5);
    this.doc.line(this.margin, 12, this.pageWidth - this.margin, 12);
    
    this.currentY = 20;
  }

  private addFooter(): void {
    const pageNumber = this.doc.getNumberOfPages();
    this.doc.setFontSize(8);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Source: Bloomberg, NSE, NSDL, BSE, Nuqi Ethosphere Research', this.pageWidth - this.margin, this.pageHeight - 10, { align: 'right' });
    this.doc.text(`Page ${pageNumber}`, this.pageWidth / 2, this.pageHeight - 5, { align: 'center' });
  }

  public generatePDF(): jsPDF {
    const content = this.extractContentFromDOM();
    
    // Add cover page
    this.addCoverPage();
    
    // Add content pages
    content.sections.forEach((section, index) => {
      if (index > 0) {
        this.doc.addPage();
        this.currentY = this.margin;
      }
      
      this.addHeader();
      this.addTitle(section.title, 18);
      this.currentY += 5;
      
      // Add section content
      section.content.forEach(paragraph => {
        this.addText(`• ${paragraph}`);
        this.currentY += 3;
      });
      
      // Add tables
      if (section.tables) {
        section.tables.forEach(table => {
          this.currentY += 5;
          this.addTable(table);
          this.currentY += 5;
        });
      }
      
      this.addFooter();
    });
    
    return this.doc;
  }
}

export const generatePDF = async (elementId: string, filename: string): Promise<void> => {
  try {
    const generator = new PDFGenerator();
    const doc = generator.generatePDF();
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};

export const generatePDFBlob = async (elementId: string): Promise<Blob> => {
  try {
    const generator = new PDFGenerator();
    const doc = generator.generatePDF();
    return doc.output('blob');
  } catch (error) {
    console.error('Error generating PDF blob:', error);
    throw new Error('Failed to generate PDF blob');
  }
};