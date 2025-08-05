export interface MarketData {
  name: string;
  closing: number;
  dailyChange: number;
  ytdChange: number;
}

export interface FundFlowData {
  participant: string;
  cash: number;
  mtd: number;
  ytd: number;
}

export interface SupportResistanceData {
  index: string;
  level1: number;
  level2: number;
}

export interface KeyEvent {
  text: string;
  date: string;
}

export interface IndexHighlight {
  index: string;
  cmp: string;
  priceChange: string;
  pricePercentChange: number;
  vwap: string;
  basis: string;
  volumeFutures: string;
  cumOpenInterest: string;
  oiPercent: number;
  atmIvs: string;
  pcrOi: string;
}

export interface PriceGainer {
  symbol: string;
  pricePercent: number;
  oiPercent: number;
  longshort: string;
}

export interface OIGainer {
  symbol: string;
  pricePercent: number;
  oiPercent: number;
  longshort: string;
}

export interface PriceLoser {
  symbol: string;
  pricePercent: number;
  oiPercent: number;
  longshort: string;
}

export interface OILoser {
  symbol: string;
  pricePercent: number;
  oiPercent: number;
  longshort: string;
}

export interface KeyNews {
  company: string;
  news: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface EventData {
  date: string;
  country: string;
  event: string;
}

export interface Nifty50Stock {
  name: string;
  support2: number;
  support1: number;
  close: number;
  resistance1: number;
  resistance2: number;
}