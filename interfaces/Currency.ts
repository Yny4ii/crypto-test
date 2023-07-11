export interface CurrencyResponse {
  data: Currency[];
}

export interface Currency {
  rank: number;
  key: string;
  name: string;
  type: string;
  athMarketCap: AthMarketCap;
  category: string;
  availableSupply: number;
  marketCap: number;
  price: Price;
  athPrice: AthPrice;
}

export interface AthMarketCap {
  USD: number;
  dateUSD: string;
}

export interface Price {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface AthPrice {
  BTC: number;
  ETH: number;
  USD: number;
  date: string;
  dateBTC: string;
  dateETH: string;
}