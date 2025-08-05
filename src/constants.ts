import type { 
    MarketData, 
    SupportResistanceData, 
    FundFlowData,
    KeyEvent,
    NiftyTrendData,
    AdrData,
    SectorData,
    OptionChainData,
    IndexHighlight,
    DerivativeChange,
    LSRatioData,
    FutureIndexData,
    KeyNews,
    EventData,
    Nifty50Stock
} from './types';

export const indianMarkets: MarketData[] = [
    { name: 'NIFTY', closing: 24722.75, dailyChange: 0.64, ytdChange: 4.56 },
    { name: 'BANKNIFTY', closing: 55619.35, dailyChange: 0.00, ytdChange: 9.36 },
    { name: 'SENSEX', closing: 81018.72, dailyChange: 0.52, ytdChange: 3.69 },
    { name: 'USDINR', closing: 87.6525, dailyChange: -0.14, ytdChange: 5.39 },
    { name: 'INDIA VIX', closing: 11.97, dailyChange: -0.06, ytdChange: -17.17 },
    { name: 'GIFT NIFTY', closing: 24770, dailyChange: -0.09, ytdChange: 4.21 },
];

export const globalMarkets: MarketData[] = [
    { name: 'DOW', closing: 44173.64, dailyChange: 1.34, ytdChange: 3.83 },
    { name: 'S&P500', closing: 6329.94, dailyChange: 1.47, ytdChange: 7.62 },
    { name: 'NASDAQ', closing: 21053.58, dailyChange: 1.95, ytdChange: 9.02 },
    { name: 'NIKKEI', closing: 40505.83, dailyChange: 0.53, ytdChange: 1.53 },
    { name: 'HANGSENG', closing: 24715.3, dailyChange: -0.07, ytdChange: 23.21 },
];

export const commodities: MarketData[] = [
    { name: 'GOLD ($)', closing: 3433.9, dailyChange: 0.22, ytdChange: 29.67 },
    { name: 'BR. CRUDE ($)', closing: 68.71, dailyChange: -0.07, ytdChange: -8.25 },
    { name: 'COPPER ($)', closing: 4.4605, dailyChange: 0.52, ytdChange: 11.07 },
    { name: 'US 10YR (%)', closing: 4.1943, dailyChange: 0.05, ytdChange: -7.80 },
];

export const supportData: SupportResistanceData[] = [
    { index: 'Nifty', level1: 24620, level2: 24530 },
    { index: 'Bank Nifty', level1: 55350, level2: 55170 },
];

export const resistanceData: SupportResistanceData[] = [
    { index: 'Nifty', level1: 24780, level2: 24860 },
    { index: 'Bank Nifty', level1: 55750, level2: 56000 },
];

export const fundFlow: FundFlowData[] = [
    { participant: 'FII', cash: -2567, mtd: -5933.00, ytd: -176014.25 },
    { participant: 'DII', cash: 4386, mtd: 7572.00, ytd: 426158.56 },
];

export const keyEvents: KeyEvent[] = [
    { text: 'RBI interest rate decision', date: '06-08-2025' },
    { text: 'US Initial Jobless Claims', date: '07-08-2025' },
];

export const fnoBan: string[] = ['PNBHOUSING'];

export const technicalOutlookNiftyText: string[] = [
    "The index formed a bull candle that remained enclosed inside the previous session price range signaling pause in the last two sessions' corrective decline.",
    "Volatility is anticipated to remain elevated in the coming sessions driven by key macro triggers, including the progress of US-India tariff decision and the RBI rate decision.",
    "Index has key support around 24,500-24,400 levels, being the confluence of the prior swing low, the 100-day EMA, and key retracement level of the previous up move (23935-25669).",
    "Nifty is likely to extend consolidation in the range of 24,400-25,000. Only a breach below 24,400 will open downside towards 24,200 levels in the coming sessions.",
];

export const niftyTrendData: NiftyTrendData[] = [
    { name: '07-Jul', Client: 10000, DII: 20000, FII: -10000, Pro: 5000 },
    { name: '10-Jul', Client: 12000, DII: 22000, FII: -12000, Pro: 6000 },
    { name: '15-Jul', Client: 50000, DII: 25000, FII: -50000, Pro: 10000 },
    { name: '20-Jul', Client: 80000, DII: 30000, FII: -100000, Pro: 12000 },
    { name: '25-Jul', Client: 100000, DII: 31000, FII: -120000, Pro: 15000 },
    { name: '30-Jul', Client: 110000, DII: 31500, FII: -150000, Pro: 12500 },
    { name: '04-Aug', Client: 112827, DII: 31693, FII: -156950, Pro: 12430 },
];

export const adrData: AdrData[] = [
    { name: 'Infosys', value: 0.43 },
    { name: 'Wipro', value: -0.37 },
    { name: 'HDFC Bank', value: -0.65 },
    { name: 'Dr. Reddy Lab.', value: -1.08 },
    { name: 'ICICI Bank', value: -1.34 },
];

export const sectorData: SectorData[] = [
    { name: 'Nifty FMCG', value: -0.10 },
    { name: 'Nifty Fin Services', value: -0.06 },
    { name: 'Nifty Bank', value: 0.00 },
    { name: 'Nifty Energy', value: 0.10 },
    { name: 'NIFTY Private Bank', value: 0.13 },
    { name: 'Nifty Healthcare PR', value: 0.57 },
    { name: 'Nifty Pharma', value: 0.65 },
    { name: 'Nifty PSU Bank', value: 1.26 },
    { name: 'Nifty Media', value: 1.51 },
    { name: 'Nifty IT', value: 1.60 },
    { name: 'Nifty Auto', value: 1.61 },
    { name: 'Nifty Realty', value: 1.77 },
    { name: 'Nifty Metal', value: 2.48 },
];

export const niftyOptionChainData: OptionChainData[] = [
  { strike: 24000, calls: 24986, puts: 49109 },
  { strike: 24200, calls: 48949, puts: 61996 },
  { strike: 24400, calls: 61034, puts: 109193 },
  { strike: 24500, calls: 37947, puts: 106854 },
  { strike: 24600, calls: 41037, puts: 96854 },
  { strike: 24700, calls: 85885, puts: 49591 },
  { strike: 24800, calls: 142496, puts: 37047 },
  { strike: 25000, calls: 94145, puts: 78530 },
  { strike: 25200, calls: 77528, puts: 30254 },
  { strike: 25500, calls: 117343, puts: 65708 },
  { strike: 25800, calls: 53746, puts: 15806 },
];

export const bankNiftyOptionChainData: OptionChainData[] = [
    { strike: 54500, calls: 13479, puts: 22977 },
    { strike: 55000, calls: 26701, puts: 17168 },
    { strike: 55500, calls: 49924, puts: 27943 },
    { strike: 55750, calls: 216, puts: 18030 },
    { strike: 56000, calls: 60987, puts: 4136 },
    { strike: 56500, calls: 9942, puts: 3045 },
    { strike: 57000, calls: 24115, puts: 14782 },
    { strike: 57500, calls: 25706, puts: 1846 },
    { strike: 58000, calls: 122, puts: 1851 },
];

export const optionChainNiftyText = [
    "Nifty with the highest Call OI at 25,000, acting as a key resistance zone. On the downside, strong Put writing at 23,500 signals a solid base at lower levels.",
    "Fresh Put writing has been observed at 24,500–24,600, indicating immediate support, while resistance is now seen at 24,800. This tight band of 24,500–24,800 will serve as a decisive range for the next directional move.",
    "In the previous session, there was a clear dominance of Put writers, while Call writers unwound their positions-indicating a positive bias.",
    "The Put-Call Ratio (PCR) also rose by 0.19, now placed at 0.94.",
];

export const optionChainBankNiftyText = [
    "In Bank Nifty, both Call and Put writers remain active at the 57,000 strike, reflecting market participants' confidence in limited downside and hinting at a neutral-to-positive stance.",
    "Further Put accumulation at the 56,000 strike points to a straddle formation, and a sustained move above 56,000 could trigger a rally toward 57,000. Additionally, activity from 55,500 to 55,700 strikes by both Call and Put writers indicates a consolidation zone.",
    "The deciding range as per the option chain lies between 55,500 and 56,000. A breakout on either side could lead to a directional move.",
    "However, the PCR for Bank Nifty dipped slightly by 0.03 to 0.90, suggesting a wait-and-watch approach by some participant.",
];

export const indexHighlights: IndexHighlight[] = [
    { index: 'Nifty', cmp: '24,793.10', priceChange: '165.90', pricePercentChange: 0.67, vwap: '24,742', basis: '70.35', volumeFutures: '62,517', cumOpenInterest: '-3,55,275', oiPercent: -1.99, atmIvs: '12.25', pcrOi: '0.94' },
    { index: 'Bank Nifty', cmp: '55,860.00', priceChange: '65.80', pricePercentChange: 0.12, vwap: '55,818', basis: '240.65', volumeFutures: '22,011', cumOpenInterest: '1,24,600', oiPercent: 5.47, atmIvs: '12.35', pcrOi: '0.90' }
];

export const priceGainers: DerivativeChange[] = [
    { symbol: 'ABCAPITAL', pricePercent: 10.79, oiPercent: -0.86, longshort: 'Short_Covering' },
    { symbol: 'DELHIVERY', pricePercent: 7.91, oiPercent: 15.06, longshort: 'Long_Buildup' },
    { symbol: 'CDSL', pricePercent: 6.45, oiPercent: -1.91, longshort: 'Short_Covering' },
    { symbol: 'MANAPPURAM', pricePercent: 6.41, oiPercent: 8.03, longshort: 'Long_Buildup' }
];

export const oiGainers: DerivativeChange[] = [
    { symbol: 'NUVAMA', pricePercent: -0.63, oiPercent: 90.04, longshort: 'Short_Buildup' },
    { symbol: 'SUZLON', pricePercent: -1.46, oiPercent: 33.35, longshort: 'Short_Buildup' },
    { symbol: 'DELHIVERY', pricePercent: 7.91, oiPercent: 15.06, longshort: 'Long_Buildup' },
    { symbol: 'KEI', pricePercent: 2.12, oiPercent: 12.38, longshort: 'Long_Buildup' }
];

export const priceLosers: DerivativeChange[] = [
    { symbol: 'ABB', pricePercent: -5.13, oiPercent: 5.08, longshort: 'Short_Buildup' },
    { symbol: 'PNBHOUSING', pricePercent: -3.91, oiPercent: -7.39, longshort: 'Long_Unwinding' },
    { symbol: 'GODREJCP', pricePercent: -1.52, oiPercent: -2.54, longshort: 'Long_Unwinding' },
    { symbol: 'SUZLON', pricePercent: -1.46, oiPercent: 33.35, longshort: 'Short_Buildup' }
];

export const oiLosers: DerivativeChange[] = [
    { symbol: 'CESC', pricePercent: -1.11, oiPercent: -8.03, longshort: 'Long_Unwinding' },
    { symbol: 'JSWENERGY', pricePercent: 5.29, oiPercent: -7.75, longshort: 'Short_Covering' },
    { symbol: 'PNBHOUSING', pricePercent: -3.91, oiPercent: -7.39, longshort: 'Long_Unwinding' },
    { symbol: 'BLUESTARCO', pricePercent: 2.70, oiPercent: -6.88, longshort: 'Short_Covering' }
];

export const lsRatioData: LSRatioData[] = [
    { name: 'Client', value: 2.31 },
    { name: 'DII', value: 2.02 },
    { name: 'FII', value: 0.10 },
    { name: 'Pro', value: 1.44 },
];

export const futureIndexLongData: FutureIndexData[] = [
    { name: 'Client', value: 62 },
    { name: 'DII', value: 20 },
    { name: 'FII', value: 5 },
    { name: 'Pro', value: 13 }
];

export const futureIndexShortData: FutureIndexData[] = [
    { name: 'Client', value: 54 },
    { name: 'DII', value: 10 },
    { name: 'FII', value: 27 },
    { name: 'Pro', value: 9 }
];

export const keyNews: KeyNews[] = [
    { company: 'PAYTM', news: 'Antfin in its clean out trade, to sell 5.84% stake at Rs 1020 apiece. The block deal size is Rs 3,800 crore.', impact: 'neutral' },
    { company: 'NTPC GREEN', news: 'The company\'s arm emerges as successful bidder in E-Reverse auction conducted by SECI for 70,000 MT/Annum capacity of green ammonia.', impact: 'positive' },
    { company: 'BEML', news: 'The company has bagged order from the Ministry of Defence for supply of HMV 8X8 with contract value of Rs 282 crores. Additionally, the board has informed regarding non-binding MoU between BEML and Hyperloop.', impact: 'positive' },
    { company: 'GODFREY PHILIP', news: 'The company has approved the first bonus at the ratio of 2:1 with Sept. 16 as the record date.', impact: 'positive' },
    { company: 'KAYNES TECH', news: 'The company\'s arm has signed MOU with Tamil Nadu Government. Under the MoU, company proposes to invest Rs 4,995 crores over a period of six years for the establishment of manufacturing facilities', impact: 'positive' },
    { company: 'QUALITY POWER', news: 'The company has secured an export order valued at Rs 11.5 crore for the supply of oil-filled current limiting reactors to the US.', impact: 'positive' }
];

export const eventCalendar: EventData[] = [
    { date: 'Friday, August 1, 2025', country: 'India', event: 'S&P Global Manufacturing PMI (Jul)' },
    { date: 'Friday, August 1, 2025', country: 'United States', event: 'Nonfarm Payrolls (Jul)' },
    { date: 'Tuesday, August 5, 2025', country: 'China', event: 'Caixin Services PMI (Jul)' },
    { date: 'Tuesday, August 5, 2025', country: 'India', event: 'S&P Global Services PMI (Jul)' },
    { date: 'Wednesday, August 6, 2025', country: 'India', event: 'Interest Rate Decision' },
    { date: 'Thursday, August 7, 2025', country: 'United States', event: 'Initial Jobless Claims' },
];

export const nifty50stocks: Nifty50Stock[] = [
    { name: 'ADANIENT', support2: 2322.33, support1: 2342.97, close: 2363.60, resistance1: 2379.47, resistance2: 2395.33 },
    { name: 'ADANIPORTS', support2: 1325.23, support1: 1357.07, close: 1388.90, resistance1: 1408.87, resistance2: 1428.83 },
    { name: 'APOLLOHOSP', support2: 7237.33, support1: 7272.67, close: 7308.00, resistance1: 7365.67, resistance2: 7423.33 },
    { name: 'ASIANPAINT', support2: 2424.73, support1: 2437.27, close: 2449.80, resistance1: 2464.67, resistance2: 2479.53 },
    { name: 'AXISBANK', support2: 1054.87, support1: 1061.73, close: 1068.60, resistance1: 1072.73, resistance2: 1076.87 },
    { name: 'BAJAJ-AUTO', support2: 7985.17, support1: 8086.33, close: 8187.50, resistance1: 8246.83, resistance2: 8306.17 },
    { name: 'RELIANCE', support2: 1382.03, support1: 1396.77, close: 1411.50, resistance1: 1421.17, resistance2: 1430.83 },
    { name: 'HDFCBANK', support2: 1969.13, support1: 1980.57, close: 1992.00, resistance1: 2010.97, resistance2: 2029.93 },
    { name: 'ICICIBANK', support2: 1450.27, support1: 1456.73, close: 1463.20, resistance1: 1474.23, resistance2: 1485.27 },
    { name: 'INFY', support2: 1439.63, support1: 1460.07, close: 1480.50, resistance1: 1491.87, resistance2: 1503.23 },
    { name: 'TCS', support2: 2960.67, support1: 3017.53, close: 3074.40, resistance1: 3105.33, resistance2: 3136.27 },
    { name: 'LT', support2: 3555.17, support1: 3593.13, close: 3631.10, resistance1: 3652.93, resistance2: 3674.77 },
];