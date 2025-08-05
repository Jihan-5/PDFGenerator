import React from 'react';
import { DownloadButton } from './components/download';
import { 
    Page, 
    Header, 
    Footer, 
    SectionTitle, 
    ListItem,
    NuqiEthosphereLogo,
    PlayStoreIcon,
    AppStoreIcon,
    ImpactIconUp,
    ImpactIconNeutral,
    SocialIcons,
    CandleStickChartSVG
} from './components/common';
import { 
    NiftyTrendChart, 
    AdrChart, 
    SectorIndicesChart, 
    NiftyOptionChainChart, 
    BankNiftyOptionChainChart,
    ParticipantLSRatioChart,
    FutureIndexLongChart,
    FutureIndexShortChart
} from './components/charts';
import {
    indianMarkets,
    globalMarkets,
    commodities,
    supportData,
    resistanceData,
    fundFlow,
    keyEvents,
    fnoBan,
    technicalOutlookNiftyText,
    optionChainNiftyText,
    optionChainBankNiftyText,
    indexHighlights,
    priceGainers,
    priceLosers,
    oiGainers,
    oiLosers,
    keyNews,
    eventCalendar,
    nifty50stocks
} from './constants';
import type { MarketData, FundFlowData, SupportResistanceData, KeyNews, EventData, Nifty50Stock } from './types';
import './styles/pdf.css';

// Helper to format numbers
const formatNum = (num: number) => new Intl.NumberFormat('en-IN').format(num);

// --- Reusable Table Components ---

const DataTableCell: React.FC<{ children: React.ReactNode, className?: string, rowSpan?: number }> = ({ children, className, rowSpan }) => (
  <td className={`px-4 py-3 text-sm whitespace-nowrap ${className || ''}`} rowSpan={rowSpan}>{children}</td>
);

const DataTableHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <th className={`px-4 py-3 text-xs font-bold text-[#2d3748] bg-gray-50 text-left uppercase tracking-wider border-b-2 border-gray-200 ${className}`}>{children}</th>
);

const MarketDataTable: React.FC<{ title: string; data: MarketData[] }> = ({ title, data }) => (
    <div className="mb-6 print-avoid-break">
        <h3 className="text-lg font-bold font-heading text-[#2d3748] mb-3">{title}</h3>
        <table className="w-full border-collapse">
            <thead>
                <tr>
                    <DataTableHeader>Market</DataTableHeader>
                    <DataTableHeader className="text-right">Closing</DataTableHeader>
                    <DataTableHeader className="text-right">% Daily Chg</DataTableHeader>
                    <DataTableHeader className="text-right">% YTD Change</DataTableHeader>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 bg-white hover:bg-gray-50">
                        <DataTableCell className="font-bold text-gray-800">{item.name}</DataTableCell>
                        <DataTableCell className="text-right font-numeric">{formatNum(item.closing)}</DataTableCell>
                        <DataTableCell className={`text-right font-numeric ${item.dailyChange > 0 ? 'text-[#38A169]' : 'text-[#E53E3E]'}`}>{item.dailyChange.toFixed(2)}</DataTableCell>
                        <DataTableCell className={`text-right font-numeric ${item.ytdChange > 0 ? 'text-[#38A169]' : 'text-[#E53E3E]'}`}>{item.ytdChange.toFixed(2)}</DataTableCell>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const SupportResistanceTable: React.FC<{ title: string; data: SupportResistanceData[] }> = ({ title, data }) => (
    <div className="mb-6 print-avoid-break">
        <h3 className="text-lg font-bold font-heading text-center text-white bg-[#2d3748] py-2">{title}</h3>
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-50">
                    <DataTableHeader>Index</DataTableHeader>
                    <DataTableHeader className="text-right">{title === 'Support' ? 'S1' : 'R1'}</DataTableHeader>
                    <DataTableHeader className="text-right">{title === 'Support' ? 'S2' : 'R2'}</DataTableHeader>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 bg-white hover:bg-gray-50">
                        <DataTableCell className="font-bold text-gray-800">{item.index}</DataTableCell>
                        <DataTableCell className="text-right font-numeric">{formatNum(item.level1)}</DataTableCell>
                        <DataTableCell className="text-right font-numeric">{formatNum(item.level2)}</DataTableCell>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const App: React.FC = () => {
    const currentDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="bg-[#f7fafc] py-8 px-4 page-container">
            <DownloadButton elementId="pdf-content" filename={`Nuqi-Ethosphere-Daily-News-${new Date().toISOString().split('T')[0]}.pdf`} />
            
            <div id="pdf-content" className="pdf-content">
                {/* Page 1: Cover */}
                <div className="w-[800px] h-[1120px] bg-gradient-to-br from-[#2d3748] to-[#1a202c] shadow-xl text-white flex flex-col justify-center items-center p-8 mx-auto mb-8 rounded-lg print-page">
                    <div className="flex items-center space-x-4 mb-10">
                        <NuqiEthosphereLogo className="w-16 h-16" />
                        <span className="text-4xl font-light tracking-widest font-heading">NUQI ETHOSPHERE</span>
                    </div>
                    
                    <h1 className="text-8xl font-bold font-heading">Daily News</h1>
                    <p className="mt-4 text-xl text-gray-300">Date: {currentDate}</p>

                    <div className="absolute bottom-10 flex items-center justify-center space-x-3 border border-gray-600 rounded-full px-4 py-2 text-sm text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <span>nuqiethosphere.com</span>
                        <PlayStoreIcon />
                        <AppStoreIcon />
                    </div>
                </div>
                
                {/* Page 2: Market Outlook */}
                <Page>
                    <Header />
                    <h2 className="text-center text-3xl font-bold font-heading text-[#2d3748] py-2 mb-6">Market Outlook</h2>
                    <div className="flex space-x-8">
                        {/* Left Column */}
                        <div className="w-2/3">
                            <SectionTitle>Market Commentary</SectionTitle>
                            <ListItem>Indian benchmark indices concluded the session on a firm footing on August 4th with the Nifty reclaiming and settling above the 24,700 mark, indicating pullback after recent sharp decline. Market participants brushed aside headwinds from newly imposed US tariffs, as a weaker-than-anticipated US payrolls print bolstered dovish Fed bets, fueling speculation of a potential rate cut in the forthcoming FOMC meeting.</ListItem>
                            <ListItem>The Sensex was up 418.81 points or 0.52% at 81,018.72, and the Nifty was up 157.40 points or 0.64% at 24,722.75.</ListItem>
                            <ListItem>All sectoral indices closed in positive territory, with broad-based participation led by PSU Banks, pharmaceuticals, realty, IT, metals, telecom, media, consumer durables, and auto stocks, which registered gains in the range of 0.5% to 2.5%, reflecting robust sectoral breadth and risk-on sentiment. The midcap index advanced 1.40%, while the small-cap index posted a gain of 1.27%.</ListItem>
                            <ListItem>Gift Nifty suggests a negative opening for the Indian market. Nifty spot in today's session is likely to consolidate in the range of 24500-24850</ListItem>
                            
                            <SectionTitle>Global Updates</SectionTitle>
                            <ListItem>The S&P 500 closed higher on Monday, rebounding from Friday's big sell off, underpinning by growing expectations for a sooner Federal Fed rate cut and an ongoing climb in big tech following recent upbeat earnings.</ListItem>
                            <ListItem>Recent weak data fueled economic worries, prompting markets to assign roughly 84% odds to a September rate cut by the Fed, according to the CME FedWatch.</ListItem>

                            <SectionTitle>Key Events</SectionTitle>
                            <div className="print-avoid-break">
                                {keyEvents.map(event => <ListItem key={event.text}><strong>{event.text}</strong> on {event.date}</ListItem>)}
                            </div>

                            <SectionTitle>Fund Flow Activity (NSE, BSE, MSEI)</SectionTitle>
                             <table className="w-full border-collapse mb-4">
                                <thead>
                                    <tr>
                                        <DataTableHeader>Participant</DataTableHeader>
                                        <DataTableHeader className="text-right">Cash (in Cr)</DataTableHeader>
                                        <DataTableHeader className="text-right">MTD (in Cr)</DataTableHeader>
                                        <DataTableHeader className="text-right">YTD (in Cr)</DataTableHeader>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fundFlow.map((item, index) => (
                                        <tr key={index} className="bg-white hover:bg-gray-50 border-b border-gray-100">
                                            <DataTableCell className="font-bold text-gray-800">{item.participant}</DataTableCell>
                                            <DataTableCell className={`text-right font-numeric ${item.cash < 0 ? 'text-[#E53E3E]' : 'text-gray-800'}`}>{formatNum(item.cash)}</DataTableCell>
                                            <DataTableCell className={`text-right font-numeric ${item.mtd < 0 ? 'text-[#E53E3E]' : 'text-gray-800'}`}>{item.mtd.toFixed(2)}</DataTableCell>
                                            <DataTableCell className={`text-right font-numeric ${item.ytd < 0 ? 'text-[#E53E3E]' : 'text-gray-800'}`}>{item.ytd.toFixed(2)}</DataTableCell>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                        {/* Right Column */}
                        <div className="w-1/3">
                            <MarketDataTable title="Indian Markets" data={indianMarkets} />
                            <MarketDataTable title="Global Markets" data={globalMarkets} />
                            <p className="text-xs text-gray-500 mb-4 italic">*Gift Nifty and Asian market as of 8:10 am</p>
                            <MarketDataTable title="Commodity & GSec" data={commodities} />
                            <SupportResistanceTable title="Support" data={supportData} />
                            <SupportResistanceTable title="Resistance" data={resistanceData} />

                            <div className="mb-4 print-avoid-break">
                                <h3 className="text-lg font-bold font-heading text-center text-white bg-[#2d3748] py-2">Stocks in F&O Ban</h3>
                                 <div className="bg-white p-4 text-center text-md font-semibold text-gray-700">
                                    {fnoBan.map(stock => <p key={stock}>{stock}</p>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </Page>

                {/* Page 3: Technical Outlook */}
                <Page>
                    <Header />
                    <h2 className="text-center text-3xl font-bold font-heading text-[#2d3748] py-2 mb-6">Technical Outlook: Nifty</h2>
                    <div className="print-avoid-break">
                        <div className="flex space-x-8 mb-6 items-center">
                            <div className="w-1/2">
                                 <CandleStickChartSVG />
                                 <p className="text-xs text-gray-400 text-center mt-1">Source: www.SpiderSoftwareIndia.Com</p>
                            </div>
                            <div className="w-1/2 text-base space-y-4">
                                {technicalOutlookNiftyText.map((p, i) => <p key={i}>{p}</p>)}
                            </div>
                        </div>
                        <div className="mb-6">
                            <SectionTitle>Trend in Index Long / Short Futures</SectionTitle>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <NiftyTrendChart />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 print-avoid-break">
                        <div>
                            <SectionTitle>Indian ADR % Change</SectionTitle>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                               <AdrChart />
                            </div>
                        </div>
                        <div>
                            <SectionTitle>Sector Indices % Change</SectionTitle>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <SectorIndicesChart />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </Page>

                {/* Page 4: Option Chain Analysis */}
                <Page>
                    <Header />
                    <h2 className="text-center text-3xl font-bold font-heading text-[#2d3748] py-2 mb-6">Option Chain Analysis</h2>
                    <div className="mb-8 p-4 border rounded-lg shadow-sm print-avoid-break">
                        <h3 className="text-xl font-bold font-heading text-gray-800 mb-3">Nifty Option Chain</h3>
                        <div className="h-[250px] mb-4">
                            <NiftyOptionChainChart />
                        </div>
                         <div className="mt-4 text-base space-y-3">
                            {optionChainNiftyText.map((text, i) => <ListItem key={i}>{text}</ListItem>)}
                        </div>
                    </div>
                    <div className="p-4 border rounded-lg shadow-sm print-avoid-break">
                        <h3 className="text-xl font-bold font-heading text-gray-800 mb-3">Bank Nifty Option Chain</h3>
                        <div className="h-[250px] mb-4">
                            <BankNiftyOptionChainChart />
                        </div>
                        <div className="mt-4 text-base space-y-3">
                            {optionChainBankNiftyText.map((text, i) => <ListItem key={i}>{text}</ListItem>)}
                        </div>
                    </div>
                    <Footer />
                </Page>

                {/* Page 5: Derivatives Analysis */}
                <Page>
                    <Header />
                    <h2 className="text-center text-3xl font-bold font-heading text-[#2d3748] py-2 mb-6">Derivatives Analysis</h2>
                    <div className="mb-8 print-avoid-break">
                        <SectionTitle>Index Highlights</SectionTitle>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        {['Index', 'CMP', 'Price Chg', 'Price %', 'VWAP', 'Basis', 'Vol Fut', 'Open Int', 'OI%', 'ATM IV\'s', 'PCR OI'].map(h => <DataTableHeader key={h} className="px-2 py-2 text-xs">{h}</DataTableHeader>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {indexHighlights.map((item, index) => (
                                        <tr key={index} className="bg-white hover:bg-gray-50 border-b border-gray-100">
                                            <DataTableCell className="font-bold text-gray-800 px-2 py-2 text-xs">{item.index}</DataTableCell>
                                            <DataTableCell className="font-numeric px-2 py-2 text-xs">{item.cmp}</DataTableCell>
                                            <DataTableCell className="font-numeric px-2 py-2 text-xs">{item.priceChange}</DataTableCell>
                                            <DataTableCell className={`font-numeric px-2 py-2 text-xs ${item.pricePercentChange > 0 ? 'text-[#38A169]' : 'text-[#E53E3E]'}`}>{item.pricePercentChange.toFixed(2)}%</DataTableCell>
                                            <DataTableCell className="font-numeric px-2 py-2 text-xs">{item.vwap}</DataTableCell>
                                            <DataTableCell className="font-numeric px-2 py-2 text-xs">{item.basis}</DataTableCell>
                                            <DataTableCell className="font-numeric px-2 py-2 text-xs">{item.volumeFutures}</DataTableCell>
                                            <DataTableCell className="font-numeric px-2 py-2 text-xs">{item.cumOpenInterest}</DataTableCell>
                                            <DataTableCell className={`font-numeric px-2 py-2 text-xs ${item.oiPercent < 0 ? 'text-[#E53E3E]' : 'text-[#38A169]'}`}>{item.oiPercent.toFixed(2)}%</DataTableCell>
                                            <DataTableCell className="font-numeric px-2 py-2 text-xs">{item.atmIvs}</DataTableCell>
                                            <DataTableCell className="font-numeric px-2 py-2 text-xs">{item.pcrOi}</DataTableCell>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-8 print-avoid-break">
                        <div>
                            <SectionTitle>Price Gainers</SectionTitle>
                             <table className="w-full border-collapse">
                                <thead><tr><DataTableHeader>Symbol</DataTableHeader><DataTableHeader>Price %</DataTableHeader><DataTableHeader>OI %</DataTableHeader><DataTableHeader>Analysis</DataTableHeader></tr></thead>
                                <tbody>
                                    {priceGainers.map((item, i) => (
                                        <tr key={i} className="bg-white hover:bg-gray-50 border-b border-gray-100">
                                            <DataTableCell className="font-bold">{item.symbol}</DataTableCell>
                                            <DataTableCell className="font-numeric text-[#38A169]">{item.pricePercent}%</DataTableCell>
                                            <DataTableCell className={`font-numeric ${item.oiPercent < 0 ? 'text-[#E53E3E]' : 'text-[#38A169]'}`}>{item.oiPercent}%</DataTableCell>
                                            <DataTableCell>{item.longshort.replace('_', ' ')}</DataTableCell>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <SectionTitle>OI Gainers</SectionTitle>
                             <table className="w-full border-collapse">
                                <thead><tr><DataTableHeader>Symbol</DataTableHeader><DataTableHeader>Price %</DataTableHeader><DataTableHeader>OI %</DataTableHeader><DataTableHeader>Analysis</DataTableHeader></tr></thead>
                                <tbody>
                                    {oiGainers.map((item, i) => (
                                        <tr key={i} className="bg-white hover:bg-gray-50 border-b border-gray-100">
                                            <DataTableCell className="font-bold">{item.symbol}</DataTableCell>
                                            <DataTableCell className={`font-numeric ${item.pricePercent < 0 ? 'text-[#E53E3E]' : 'text-[#38A169]'}`}>{item.pricePercent}%</DataTableCell>
                                            <DataTableCell className="font-numeric text-[#38A169]">{item.oiPercent}%</DataTableCell>
                                            <DataTableCell>{item.longshort.replace('_', ' ')}</DataTableCell>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                         <div>
                            <SectionTitle>Price Losers</SectionTitle>
                             <table className="w-full border-collapse">
                                <thead><tr><DataTableHeader>Symbol</DataTableHeader><DataTableHeader>Price %</DataTableHeader><DataTableHeader>OI %</DataTableHeader><DataTableHeader>Analysis</DataTableHeader></tr></thead>
                                <tbody>
                                    {priceLosers.map((item, i) => (
                                        <tr key={i} className="bg-white hover:bg-gray-50 border-b border-gray-100">
                                            <DataTableCell className="font-bold">{item.symbol}</DataTableCell>
                                            <DataTableCell className="font-numeric text-[#E53E3E]">{item.pricePercent}%</DataTableCell>
                                            <DataTableCell className={`font-numeric ${item.oiPercent < 0 ? 'text-[#E53E3E]' : 'text-[#38A169]'}`}>{item.oiPercent}%</DataTableCell>
                                            <DataTableCell>{item.longshort.replace('_', ' ')}</DataTableCell>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <SectionTitle>OI Losers</SectionTitle>
                             <table className="w-full border-collapse">
                                <thead><tr><DataTableHeader>Symbol</DataTableHeader><DataTableHeader>Price %</DataTableHeader><DataTableHeader>OI %</DataTableHeader><DataTableHeader>Analysis</DataTableHeader></tr></thead>
                                <tbody>
                                    {oiLosers.map((item, i) => (
                                        <tr key={i} className="bg-white hover:bg-gray-50 border-b border-gray-100">
                                            <DataTableCell className="font-bold">{item.symbol}</DataTableCell>
                                            <DataTableCell className={`font-numeric ${item.pricePercent < 0 ? 'text-[#E53E3E]' : 'text-[#38A169]'}`}>{item.pricePercent}%</DataTableCell>
                                            <DataTableCell className="font-numeric text-[#E53E3E]">{item.oiPercent}%</DataTableCell>
                                            <DataTableCell>{item.longshort.replace('_', ' ')}</DataTableCell>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 items-center print-avoid-break">
                        <div className="text-center">
                            <SectionTitle>Participant L/S Ratio</SectionTitle>
                            <div className="bg-white p-2 rounded-lg shadow-sm h-[220px]">
                                <ParticipantLSRatioChart />
                            </div>
                        </div>
                        <div className="text-center">
                            <SectionTitle>Future Index Long</SectionTitle>
                             <div className="bg-white p-2 rounded-lg shadow-sm h-[220px]">
                                <FutureIndexLongChart />
                            </div>
                        </div>
                        <div className="text-center">
                            <SectionTitle>Future Index Short</SectionTitle>
                             <div className="bg-white p-2 rounded-lg shadow-sm h-[220px]">
                                <FutureIndexShortChart />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </Page>

                 {/* Page 6: Key News */}
                <Page>
                    <Header />
                    <h2 className="text-center text-3xl font-bold font-heading text-[#2d3748] py-2 mb-6">Key News</h2>
                    <div className="mb-4">
                         <h3 className="text-xl font-bold font-heading text-[#2d3748] mb-3">Top News for Today</h3>
                         <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="p-3 text-left text-xs font-bold text-[#2d3748] uppercase tracking-wider w-1/5">Company/Industry</th>
                                    <th className="p-3 text-left text-xs font-bold text-[#2d3748] uppercase tracking-wider w-3/5">News</th>
                                    <th className="p-3 text-center text-xs font-bold text-[#2d3748] uppercase tracking-wider w-1/5">Impact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {keyNews.map((newsItem: KeyNews, index: number) => (
                                    <tr key={index} className="border-b border-gray-100 bg-white hover:bg-gray-50 align-top">
                                        <DataTableCell className="font-bold text-gray-800">{newsItem.company}</DataTableCell>
                                        <DataTableCell>{newsItem.news}</DataTableCell>
                                        <td className="px-4 py-3 text-sm whitespace-nowrap text-center">
                                            <div className="flex justify-center items-center h-full">
                                                {newsItem.impact === 'positive' && <ImpactIconUp />}
                                                {newsItem.impact === 'neutral' && <ImpactIconNeutral />}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                         </table>
                    </div>
                    <Footer />
                </Page>

                {/* Page 7: Key Event Calendar */}
                <Page>
                    <Header />
                    <h2 className="text-center text-3xl font-bold font-heading text-[#2d3748] py-2 mb-6">Key Event Calendar</h2>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <DataTableHeader className="w-1/3">Date</DataTableHeader>
                                <DataTableHeader className="w-1/3">Country</DataTableHeader>
                                <DataTableHeader className="w-1/3">Event</DataTableHeader>
                            </tr>
                        </thead>
                         <tbody>
                            {eventCalendar.map((event: EventData, index: number) => {
                                const isFirstOfDate = index === 0 || event.date !== eventCalendar[index-1].date;
                                const dateRows = eventCalendar.filter(e => e.date === event.date).length;
                                return (
                                    <tr key={index} className="bg-white hover:bg-gray-50 border-b border-gray-100">
                                        {isFirstOfDate && (
                                            <DataTableCell className="font-bold bg-gray-50" rowSpan={dateRows}>
                                                {event.date}
                                            </DataTableCell>
                                        )}
                                        <DataTableCell>{event.country}</DataTableCell>
                                        <DataTableCell>{event.event}</DataTableCell>
                                    </tr>
                                )
                            })}
                         </tbody>
                    </table>
                     <Footer />
                </Page>

                 {/* Page 8: Nifty 50 Stocks */}
                <Page>
                    <Header />
                    <h2 className="text-center text-3xl font-bold font-heading text-[#2d3748] py-2 mb-6">Nifty 50: Support & Resistance</h2>
                     <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <DataTableHeader>Stock Name</DataTableHeader>
                                <DataTableHeader className="text-right">Support 2</DataTableHeader>
                                <DataTableHeader className="text-right">Support 1</DataTableHeader>
                                <DataTableHeader className="text-right bg-gray-100">Close</DataTableHeader>
                                <DataTableHeader className="text-right">Resistance 1</DataTableHeader>
                                <DataTableHeader className="text-right">Resistance 2</DataTableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {nifty50stocks.map((stock: Nifty50Stock, index: number) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 border-b border-gray-100`}>
                                    <DataTableCell className="font-bold text-gray-800">{stock.name}</DataTableCell>
                                    <DataTableCell className="text-right font-numeric">{stock.support2.toFixed(2)}</DataTableCell>
                                    <DataTableCell className="text-right font-numeric">{stock.support1.toFixed(2)}</DataTableCell>
                                    <DataTableCell className="text-right font-numeric font-bold bg-gray-100 text-gray-900">{stock.close.toFixed(2)}</DataTableCell>
                                    <DataTableCell className="text-right font-numeric">{stock.resistance1.toFixed(2)}</DataTableCell>
                                    <DataTableCell className="text-right font-numeric">{stock.resistance2.toFixed(2)}</DataTableCell>
                                </tr>
                            ))}
                        </tbody>
                     </table>
                    <Footer />
                </Page>

                {/* Page 9: Disclaimer */}
                <Page>
                    <Header />
                    <h2 className="text-center text-3xl font-bold font-heading text-[#2d3748] py-2 mb-6">Disclaimer</h2>
                    <div className="text-xs text-gray-600 space-y-3 leading-relaxed bg-gray-50 p-6 rounded-lg">
                        <p className="font-bold text-gray-800">Investments in the securities market are subject to market risk, read all related documents carefully before investing.</p>
                        <p>Reg Office: Nuqi Ethosphere Limited Complex, Mumbai-Pune Road, Pune 411035. Corp. Office: Nuqi Ethosphere Securities Ltd., 1st Floor, Mantri IT Park, Tower B, Unit No 9, Viman Nagar, Pune, Maharashtra 411014...</p>
                        <p className="font-bold mt-4 text-gray-800">Disclosures:</p>
                        <p>Disclosures under the provisions of SEBI (Research Analysts) Regulations 2014 (Regulations) | Nuqi Ethosphere Securities Limited ("NESL" or "Research Entity") is regulated by the Securities and Exchange Board of India ("SEBI") and is licensed to carry on the business of broking, depository services and related activities...</p>
                        <p>This information is strictly confidential and is being furnished to you solely for your information. This information should not be reproduced or redistributed or passed on directly or indirectly in any form to any other person or published, copied, in whole or in part, for any purpose...</p>
                        <p>Analyst Certification: The analyst for this report certifies that all of the views expressed in this report accurately reflect his or her personal views about the subject company or companies and its or their securities, and no part of his or her compensation was, is or will be, directly or indirectly related to specific recommendations or views expressed in this report.</p>
                    </div>
                     <Footer />
                </Page>

                {/* Page 10: Contact */}
                <Page>
                    <Header />
                    <div className="text-center py-12">
                        <p className="text-xl font-heading text-gray-700">For more queries, reach out to:</p>
                        <p className="text-xl font-bold font-heading text-[#2d3748]">Nuqi Ethosphere Research Team</p>
                        <p className="text-lg text-[#D69E2E]">researchdesk@nuqiethosphere.com</p>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-8 my-16">
                         <div className="flex items-center justify-center space-x-2 border border-gray-300 rounded-full px-6 py-3 text-lg text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <span>nuqiethosphere.com</span>
                        </div>
                        <p className="text-6xl font-extrabold text-[#2d3748] tracking-wider font-heading">NUQI ETHOSPHERE</p>
                    </div>
                    <div className="text-center space-y-4">
                        <p className="text-xl font-bold font-heading">Stay ahead in the game!</p>
                        <p className="text-md text-gray-600">Follow our Social Media Channels for exclusive market insights, research, and updates.</p>
                        <SocialIcons />
                    </div>
                    <div className="mt-16 pt-8 border-t-2 border-gray-200">
                        <h3 className="text-center font-bold text-xl mb-6 font-heading text-[#2d3748]">Research Analysts</h3>
                        <div className="grid grid-cols-4 gap-x-4 gap-y-6 text-center text-sm">
                            <div><p className="font-bold text-gray-800">Anand Shendge</p><p className="text-xs text-gray-500">(DVP Derivative Analyst)</p></div>
                            <div><p className="font-bold text-gray-800">Pabitro Mukherjee</p><p className="text-xs text-gray-500">(AVP Technical Analyst)</p></div>
                            <div><p className="font-bold text-gray-800">Nisarg Shah</p><p className="text-xs text-gray-500">(Fundamental Analyst)</p></div>
                            <div><p className="font-bold text-gray-800">Vikas Vyas</p><p className="text-xs text-gray-500">(Derivative Analyst)</p></div>
                            <div><p className="font-bold text-gray-800">Harsh Parekh</p><p className="text-xs text-gray-500">(Technical Analyst)</p></div>
                            <div><p className="font-bold text-gray-800">Raunaq Murarka</p><p className="text-xs text-gray-500">(Derivative Analyst)</p></div>
                            <div><p className="font-bold text-gray-800">Shashwat Singh</p><p className="text-xs text-gray-500">(Fundamental Analyst)</p></div>
                        </div>
                    </div>
                     <Footer />
                </Page>
            </div>
        </div>
    );
};

export default App;