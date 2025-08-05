# Nuqi Ethosphere Daily News Report

A React-based application for generating professional daily news reports with proper A4 formatting and PDF export functionality using jsPDF.

## Features

- **Proper A4 Layout**: All content is precisely sized to fit within A4 paper dimensions (210mm x 297mm)
- **Professional Design**: Clean, modern UI with consistent typography and spacing
- **PDF Generation**: High-quality PDF export using jsPDF (no html2canvas dependency)
- **Responsive Charts**: Interactive charts using Recharts library
- **Market Data Display**: Comprehensive market outlook, technical analysis, and derivatives data
- **Print-Ready**: Optimized for both screen viewing and printing

## Key Improvements

### 1. Alignment and Layout
- Fixed content overflow issues
- Properly sized components for A4 paper
- Consistent margins and spacing
- Responsive grid layouts
- Page break optimization

### 2. PDF Generation
- Replaced html2canvas with pure jsPDF implementation
- Structured content extraction
- Professional table formatting with jsPDF-AutoTable
- Proper page breaks and headers/footers
- Consistent typography in PDF output

### 3. Visual Design
- Professional color scheme
- Consistent font sizing
- Proper spacing and margins
- Clean table designs
- Modern chart styling

## Project Structure

```
src/
├── components/
│   ├── charts.tsx          # Chart components (Recharts)
│   ├── common.tsx          # Common UI components
│   └── download.tsx        # PDF download functionality
├── utils/
│   └── pdfGenerator.ts     # jsPDF implementation
├── App.tsx                 # Main application component
├── App.css                 # Styling and A4 layout
├── constants.ts            # Data constants
└── types.ts               # TypeScript interfaces
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Dependencies

- **React 18**: Modern React with hooks
- **TypeScript**: Type safety and better development experience
- **jsPDF**: PDF generation without canvas dependency
- **jsPDF-AutoTable**: Professional table formatting in PDFs
- **Recharts**: Responsive chart library
- **Lucide React**: Modern icon library

## Usage

1. The application displays a comprehensive daily news report
2. All content is properly formatted for A4 paper size
3. Click the "Download PDF" button to generate a professional PDF report
4. The PDF maintains the same visual quality as the web interface

## PDF Generation Features

- **Cover Page**: Professional branded cover with gradient background
- **Structured Content**: Organized sections with proper hierarchy
- **Data Tables**: Clean, formatted tables with alternating row colors
- **Headers/Footers**: Consistent branding and page numbering
- **Proper Typography**: Professional fonts and sizing
- **Page Breaks**: Intelligent content flow across pages

## Technical Highlights

### A4 Layout System
- CSS variables for precise A4 dimensions
- Proper margin calculations
- Content overflow prevention
- Print-optimized styling

### jsPDF Implementation
- Custom PDFGenerator class
- Structured content extraction
- Professional table formatting
- Automatic page break handling
- Consistent styling across all elements

### Component Architecture
- Reusable UI components
- Type-safe data handling
- Modular chart components
- Clean separation of concerns

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Optimized bundle size
- Efficient PDF generation
- Responsive chart rendering
- Minimal re-renders

## Contributing

1. Follow the existing code style
2. Ensure all content fits within A4 dimensions
3. Test PDF generation thoroughly
4. Maintain TypeScript type safety
5. Update documentation as needed

## License

Private - Nuqi Ethosphere Limited