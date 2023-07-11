export const fromATH = (ath: number, price: number) => {
  if (ath < 0 || price < 0) return NaN;
  return ((ath - price) / ath) * 100;
};

export const toATH = (ath: number, price: number) => {
  if (ath < 0 || price < 0) return NaN;
  return ((ath - price) / price) * 100;
};
