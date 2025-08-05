import type { 
  MarketData, 
  FundFlowData, 
  SupportResistanceData, 
  KeyEvent, 
  IndexHighlight,
  PriceGainer,
  OIGainer,
  PriceLoser,
  OILoser,
  KeyNews,
  EventData,
  Nifty50Stock
} from './types';

export const indianMarkets: MarketData[] = [
  { name: 'Nifty 50', closing: 24722.75, dailyChange: 0.64, ytdChange: 12.5 },
  { name: 'Sensex', closing: 81018.72, dailyChange: 0.52, ytdChange: 11.8 },
  { name: 'Nifty Bank', closing: 51245.30, dailyChange: 0.85, ytdChange: 8.2 },
  { name: 'Nifty IT', closing: 43156.90, dailyChange: 1.25, ytdChange: 15.6 },
  { name: 'Nifty Midcap', closing: 58742.15, dailyChange: 1.40, ytdChange: 18.3 }
];

export const globalMarkets: MarketData[] = [
  { name: 'Dow Jones', closing: 39411.21, dailyChange: 0.32, ytdChange: 8.7 },
  { name: 'S&P 500', closing: 5447.87, dailyChange: 0.28, ytdChange: 16.2 },
  { name: 'Nasdaq', closing: 17496.82, dailyChange: 0.40, ytdChange: 18.9 },
  { name: 'Nikkei 225', closing: 40063.79, dailyChange: -0.15, ytdChange: 19.4 },
  { name: 'Hang Seng', closing: 17727.10, dailyChange: -0.82, ytdChange: -8.5 }
];

export const commodities: MarketData[] = [
  { name: 'Gold (₹/10g)', closing: 73450, dailyChange: 0.15, ytdChange: 12.8 },
  { name: 'Silver (₹/kg)', closing: 91250, dailyChange: -0.25, ytdChange: 18.5 },
  { name: 'Crude Oil ($/bbl)', closing: 78.45, dailyChange: 1.20, ytdChange: -2.3 },
  { name: '10Y G-Sec (%)', closing: 6.85, dailyChange: 0.02, ytdChange: 0.25 }
];

export const supportData: SupportResistanceData[] = [
  { index: 'Nifty 50', level1: 24650, level2: 24580 },
  { index: 'Bank Nifty', level1: 51000, level2: 50800 },
  { index: 'Nifty IT', level1: 42800, level2: 42500 },
  { index: 'Nifty Pharma', level1: 22150, level2: 21900 }
];

export const resistanceData: SupportResistanceData[] = [
  { index: 'Nifty 50', level1: 24850, level2: 24950 },
  { index: 'Bank Nifty', level1: 51450, level2: 51650 },
  { index: 'Nifty IT', level1: 43400, level2: 43650 },
  { index: 'Nifty Pharma', level1: 22450, level2: 22650 }
];

export const fundFlow: FundFlowData[] = [
  { participant: 'FII', cash: -1250.50, mtd: -8456.75, ytd: 15420.30 },
  { participant: 'DII', cash: 2150.75, mtd: 12345.60, ytd: 85670.25 },
  { participant: 'Retail', cash: 850.25, mtd: 5678.90, ytd: 45230.80 },
  { participant: 'HNI', cash: -350.80, mtd: -1234.50, ytd: 8950.45 }
];

export const keyEvents: KeyEvent[] = [
  { text: 'FOMC Meeting Decision', date: 'Aug 15, 2024' },
  { text: 'RBI Monetary Policy', date: 'Aug 8, 2024' },
  { text: 'Q1 GDP Data Release', date: 'Aug 30, 2024' },
  { text: 'Jackson Hole Symposium', date: 'Aug 22-24, 2024' }
];

export const fnoBan: string[] = [
  'BALRAMCHIN',
  'GNFC',
  'HINDCOPPER',
  'RBLBANK'
];

export const technicalOutlookNiftyText: string[] = [
  'Nifty reclaimed the 24,700 mark with strong momentum, indicating a potential reversal from recent lows.',
  'The index is trading above its 20-day moving average, suggesting short-term bullish sentiment.',
  'Key resistance levels to watch are 24,850 and 24,950, while support lies at 24,650 and 24,580.',
  'RSI has moved above 50, indicating momentum shift towards bulls.',
  'Volume participation has been healthy, supporting the current upward move.'
];

export const optionChainNiftyText: string[] = [
  'Maximum Put OI is concentrated at 24,500 strike, acting as strong support.',
  'Call OI buildup is visible at 24,800 and 24,900 strikes, indicating resistance zones.',
  'Put-Call Ratio stands at 1.15, suggesting cautious optimism among traders.',
  'Implied volatility has decreased by 2.5% from previous session, indicating reduced fear.'
];

export const optionChainBankNiftyText: string[] = [
  'Bank Nifty shows strong Put base at 51,000 strike with significant OI.',
  'Call writing is evident at 51,500 and 52,000 strikes.',
  'PCR for Bank Nifty is at 1.08, indicating balanced sentiment.',
  'Banking sector specific news flow will be crucial for direction.'
];

export const indexHighlights: IndexHighlight[] = [
  {
    index: 'Nifty 50',
    cmp: '24,722.75',
    priceChange: '+157.40',
    pricePercentChange: 0.64,
    vwap: '24,698.50',
    basis: '-12.30',
    volumeFutures: '2.5L',
    cumOpenInterest: '1.8Cr',
    oiPercent: 2.5,
    atmIvs: '14.25%',
    pcrOi: '1.15'
  },
  {
    index: 'Bank Nifty',
    cmp: '51,245.30',
    priceChange: '+432.15',
    pricePercentChange: 0.85,
    vwap: '51,180.75',
    basis: '-18.50',
    volumeFutures: '1.8L',
    cumOpenInterest: '95K',
    oiPercent: 3.2,
    atmIvs: '16.80%',
    pcrOi: '1.08'
  }
];

export const priceGainers: PriceGainer[] = [
  { symbol: 'RELIANCE', pricePercent: 3.2, oiPercent: 15.5, longshort: 'long_buildup' },
  { symbol: 'TCS', pricePercent: 2.8, oiPercent: -8.2, longshort: 'short_covering' },
  { symbol: 'INFY', pricePercent: 2.1, oiPercent: 12.3, longshort: 'long_buildup' },
  { symbol: 'HDFC', pricePercent: 1.9, oiPercent: -5.1, longshort: 'short_covering' }
];

export const oiGainers: OIGainer[] = [
  { symbol: 'SBIN', pricePercent: 0.5, oiPercent: 25.8, longshort: 'long_buildup' },
  { symbol: 'ICICIBANK', pricePercent: -0.3, oiPercent: 18.7, longshort: 'short_buildup' },
  { symbol: 'AXISBANK', pricePercent: 1.2, oiPercent: 22.1, longshort: 'long_buildup' },
  { symbol: 'KOTAKBANK', pricePercent: -0.8, oiPercent: 16.4, longshort: 'short_buildup' }
];

export const priceLosers: PriceLoser[] = [
  { symbol: 'BHARTIARTL', pricePercent: -2.1, oiPercent: 8.5, longshort: 'short_buildup' },
  { symbol: 'HCLTECH', pricePercent: -1.8, oiPercent: -12.3, longshort: 'long_unwinding' },
  { symbol: 'WIPRO', pricePercent: -1.5, oiPercent: 5.2, longshort: 'short_buildup' },
  { symbol: 'LT', pricePercent: -1.2, oiPercent: -8.7, longshort: 'long_unwinding' }
];

export const oiLosers: OILoser[] = [
  { symbol: 'MARUTI', pricePercent: 0.8, oiPercent: -15.2, longshort: 'short_covering' },
  { symbol: 'BAJFINANCE', pricePercent: -0.5, oiPercent: -18.7, longshort: 'long_unwinding' },
  { symbol: 'HDFCBANK', pricePercent: 0.3, oiPercent: -12.8, longshort: 'short_covering' },
  { symbol: 'ASIANPAINT', pricePercent: -1.1, oiPercent: -20.5, longshort: 'long_unwinding' }
];

export const keyNews: KeyNews[] = [
  {
    company: 'Reliance Industries',
    news: 'RIL announces expansion of petrochemical capacity with ₹50,000 crore investment over next 3 years.',
    impact: 'positive'
  },
  {
    company: 'TCS',
    news: 'Tata Consultancy Services wins multi-year digital transformation deal worth $2.5 billion from European bank.',
    impact: 'positive'
  },
  {
    company: 'HDFC Bank',
    news: 'HDFC Bank reports strong Q1 results with 20% YoY growth in net profit, beats estimates.',
    impact: 'positive'
  },
  {
    company: 'Infosys',
    news: 'Infosys raises FY25 revenue guidance to 3-4% from earlier 1-3% on strong demand visibility.',
    impact: 'positive'
  },
  {
    company: 'Banking Sector',
    news: 'RBI maintains repo rate at 6.50%, focuses on withdrawal of accommodation stance.',
    impact: 'neutral'
  }
];

export const eventCalendar: EventData[] = [
  { date: '5-Aug-24', country: 'US', event: 'Non-Farm Payrolls' },
  { date: '5-Aug-24', country: 'US', event: 'Unemployment Rate' },
  { date: '6-Aug-24', country: 'India', event: 'RBI Monetary Policy Decision' },
  { date: '7-Aug-24', country: 'China', event: 'Trade Balance' },
  { date: '8-Aug-24', country: 'Germany', event: 'Industrial Production' },
  { date: '8-Aug-24', country: 'UK', event: 'GDP (QoQ)' },
  { date: '9-Aug-24', country: 'US', event: 'Consumer Price Index' },
  { date: '9-Aug-24', country: 'India', event: 'Industrial Production' }
];

export const nifty50stocks: Nifty50Stock[] = [
  { name: 'RELIANCE', support2: 2890.50, support1: 2925.75, close: 2956.80, resistance1: 2985.20, resistance2: 3015.45 },
  { name: 'TCS', support2: 4125.30, support1: 4156.80, close: 4185.65, resistance1: 4215.90, resistance2: 4245.20 },
  { name: 'HDFCBANK', support2: 1685.40, support1: 1698.75, close: 1712.30, resistance1: 1725.85, resistance2: 1739.60 },
  { name: 'INFY', support2: 1845.20, support1: 1862.45, close: 1878.90, resistance1: 1895.75, resistance2: 1912.80 },
  { name: 'ICICIBANK', support2: 1245.60, support1: 1258.30, close: 1271.45, resistance1: 1284.70, resistance2: 1298.20 },
  { name: 'HINDUNILVR', support2: 2685.40, support1: 2712.80, close: 2738.95, resistance1: 2765.20, resistance2: 2791.65 },
  { name: 'ITC', support2: 485.30, support1: 492.75, close: 499.85, resistance1: 507.20, resistance2: 514.60 },
  { name: 'SBIN', support2: 825.40, support1: 834.70, close: 843.85, resistance1: 853.20, resistance2: 862.75 },
  { name: 'BHARTIARTL', support2: 1485.20, support1: 1502.65, close: 1519.30, resistance1: 1536.80, resistance2: 1554.45 },
  { name: 'KOTAKBANK', support2: 1785.60, support1: 1804.25, close: 1822.40, resistance1: 1841.70, resistance2: 1861.20 },
  { name: 'LT', support2: 3685.40, support1: 3718.90, close: 3751.25, resistance1: 3784.80, resistance2: 3818.65 },
  { name: 'AXISBANK', support2: 1145.30, support1: 1158.75, close: 1171.85, resistance1: 1185.40, resistance2: 1199.20 },
  { name: 'ASIANPAINT', support2: 3285.60, support1: 3318.45, close: 3350.80, resistance1: 3383.90, resistance2: 3417.25 },
  { name: 'MARUTI', support2: 12845.20, support1: 12956.80, close: 13065.45, resistance1: 13175.90, resistance2: 13286.75 },
  { name: 'NTPC', support2: 385.40, support1: 392.75, close: 399.85, resistance1: 407.20, resistance2: 414.80 },
  { name: 'SUNPHARMA', support2: 1685.30, support1: 1704.65, close: 1723.40, resistance1: 1742.80, resistance2: 1762.45 },
  { name: 'ULTRACEMCO', support2: 11245.60, support1: 11356.80, close: 11465.25, resistance1: 11575.90, resistance2: 11686.75 },
  { name: 'TITAN', support2: 3485.40, support1: 3518.75, close: 3551.20, resistance1: 3584.90, resistance2: 3618.65 },
  { name: 'BAJFINANCE', support2: 6845.30, support1: 6912.65, close: 6978.40, resistance1: 7045.80, resistance2: 7113.25 }
];

// Chart data exports
export const niftyTrendData = [
  { name: 'Client', Client: 15000, DII: 12000, FII: 8000, Pro: 5000 },
  { name: 'DII', Client: 18000, DII: 14000, FII: 9000, Pro: 6000 },
  { name: 'FII', Client: 16000, DII: 13000, FII: 10000, Pro: 5500 },
  { name: 'Pro', Client: 17000, DII: 15000, FII: 8500, Pro: 7000 }
];

export const adrData = [
  { name: 'INFOSYS', value: 1.2 },
  { name: 'TCS', value: -0.8 },
  { name: 'WIPRO', value: 0.5 },
  { name: 'HCL TECH', value: -1.1 },
  { name: 'TECH MAHINDRA', value: 0.9 }
];

export const sectorData = [
  { name: 'IT', value: 1.5 },
  { name: 'Banking', value: -0.3 },
  { name: 'Pharma', value: 2.1 },
  { name: 'Auto', value: -1.2 },
  { name: 'FMCG', value: 0.8 },
  { name: 'Metals', value: 1.8 },
  { name: 'Oil & Gas', value: -0.5 },
  { name: 'Realty', value: 2.3 }
];

export const niftyOptionChainData = [
  { strike: '24500', puts: 15000, calls: 8000 },
  { strike: '24600', puts: 12000, calls: 10000 },
  { strike: '24700', puts: 8000, calls: 15000 },
  { strike: '24800', puts: 5000, calls: 18000 },
  { strike: '24900', puts: 3000, calls: 12000 }
];

export const bankNiftyOptionChainData = [
  { strike: '50000', puts: 8000, calls: 4000 },
  { strike: '50500', puts: 6000, calls: 5000 },
  { strike: '51000', puts: 4000, calls: 7500 },
  { strike: '51500', puts: 2500, calls: 9000 },
  { strike: '52000', puts: 1500, calls: 6000 }
];

export const lsRatioData = [
  { name: 'Client', value: 1.2 },
  { name: 'DII', value: 0.8 },
  { name: 'FII', value: 1.5 },
  { name: 'Pro', value: 0.9 }
];

export const futureIndexLongData = [
  { name: 'Client', value: 35 },
  { name: 'DII', value: 25 },
  { name: 'FII', value: 20 },
  { name: 'Pro', value: 20 }
];

export const futureIndexShortData = [
  { name: 'Client', value: 30 },
  { name: 'DII', value: 30 },
  { name: 'FII', value: 25 },
  { name: 'Pro', value: 15 }
];