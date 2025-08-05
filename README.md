# Nuqi Ethosphere - Daily News PDF Generator

A React TypeScript application that generates professional PDF reports from financial market data and news. The application creates a multi-page PDF that exactly matches the UI layout.

## Features

- **Professional PDF Generation**: Creates high-quality PDFs that match the UI exactly
- **Multi-page Layout**: 10 pages including cover, market analysis, technical outlook, options analysis, derivatives, news, calendar, and contact information
- **Interactive Charts**: Recharts-powered visualizations that render properly in PDFs
- **Progress Tracking**: Real-time progress updates during PDF generation
- **Responsive Design**: Works on desktop and mobile devices
- **Print-friendly**: Optimized for both screen viewing and PDF export

## Pages Included

1. **Cover Page**: Professional cover with company branding
2. **Market Outlook**: Market commentary, global updates, fund flows
3. **Technical Outlook**: Nifty analysis with charts and technical indicators
4. **Option Chain Analysis**: Nifty and Bank Nifty option chain data
5. **Derivatives Analysis**: Index highlights, gainers/losers, participant data
6. **Key News**: Important market news with impact indicators
7. **Event Calendar**: Upcoming economic events and announcements
8. **Nifty 50 Stocks**: Support and resistance levels for all Nifty 50 stocks
9. **Disclaimer**: Legal disclaimers and regulatory information
10. **Contact**: Company information and analyst details

## Installation

1. **Clone or create the project directory**:
   ```bash
   mkdir nuqi-ethosphere-daily-news
   cd nuqi-ethosphere-daily-news
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### Generating PDFs

1. **View the Report**: The application displays a comprehensive financial report with all sections
2. **Download PDF**: Click the "Download PDF" button in the top-right corner
3. **Progress Tracking**: Watch the progress messages as the PDF is generated
4. **Automatic Download**: The PDF will automatically download once generation is complete

### Customizing Data

The application uses sample data located in `src/constants.ts`. You can modify this file to update:

- Market data and prices
- News items and events
- Chart data
- Company information
- Support/resistance levels

### PDF Generation Process

1. **Chart Rendering**: Waits for all charts to fully render
2. **Page Capture**: Captures each page as a high-resolution image
3. **PDF Assembly**: Combines all pages into a single PDF document
4. **Metadata**: Adds proper PDF metadata and properties
5. **Download**: Automatically downloads the completed PDF

## Technical Details

### Dependencies

- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Recharts**: Professional chart library
- **html2canvas**: HTML to canvas conversion for PDF generation
- **jsPDF**: PDF generation library
- **Lucide React**: Modern icon library
- **Tailwind CSS**: Utility-first CSS framework

### PDF Generation Logic

The PDF generator:
- Automatically detects all pages with the `print-page` class
- Captures each page at high resolution (2x device pixel ratio)
- Scales images to fit A4 page dimensions
- Maintains aspect ratios and quality
- Adds page numbers and metadata

### File Structure

```
src/
├── components/
│   ├── charts.tsx          # Chart components using Recharts
│   ├── common.tsx          # Reusable UI components
│   └── download.tsx        # PDF download button component
├── styles/
│   └── pdf.css            # PDF-specific styling
├── utils/
│   └── pdfGenerator.ts    # PDF generation logic
├── constants.ts           # Sample data and constants
├── types.ts              # TypeScript type definitions
├── App.tsx               # Main application component
└── index.tsx             # Application entry point
```

## Customization

### Styling

The application uses Tailwind CSS for styling. Key customizations:
- Custom color palette matching Nuqi Ethosphere branding
- Print-specific CSS for PDF generation
- Responsive design for different screen sizes

### Data Sources

Replace the sample data in `src/constants.ts` with real data from:
- Market data APIs
- News feeds
- Financial databases
- Real-time market data

### Charts

Charts are built with Recharts and can be customized:
- Colors and themes
- Data formatting
- Chart types and layouts
- Animation and interactions

## Browser Support

- **Chrome/Edge**: Full support with optimal PDF quality
- **Firefox**: Good support with minor rendering differences
- **Safari**: Good support, may require additional testing

## Performance

- **Chart Rendering**: Waits for all charts to load before PDF generation
- **Memory Usage**: Optimized for large datasets and multiple pages
- **Generation Speed**: Typically 10-15 seconds for full 10-page PDF

## Troubleshooting

### PDF Generation Issues

1. **Charts not rendering**: Ensure all chart data is loaded before clicking download
2. **Poor quality**: Check browser zoom level (should be 100%)
3. **Missing pages**: Verify all elements have the `print-page` class

### Development Issues

1. **TypeScript errors**: Run `npm run build` to check for type issues
2. **Missing dependencies**: Run `npm install` to ensure all packages are installed
3. **Port conflicts**: Change the port in package.json if 3000 is in use

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test PDF generation thoroughly
5. Submit a pull request

## License

This project is proprietary to Nuqi Ethosphere. All rights reserved.

## Support

For technical support or questions:
- Email: researchdesk@nuqiethosphere.com
- Internal documentation: Check company wiki
- Development team: Contact the frontend team lead

---

**Note**: This application is designed for internal use at Nuqi Ethosphere. Ensure all market data and news content is properly licensed and compliant with regulatory requirements before distribution.