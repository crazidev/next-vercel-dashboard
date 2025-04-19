const symbolConfig = [
  { one: "BTC", two: "USD", symbol: "BTCUSD" },
  { one: "BTC", two: "ETH", symbol: "BTCETH" },
  { one: "BTC", two: "USDT", symbol: "BTCUSDT" },
  { one: "BTC", two: "LTC", symbol: "BTCLTC" },

  { one: "ETH", two: "USD", symbol: "ETHUSD" },
  { one: "ETH", two: "BTC", symbol: "ETHBTC" },
  { one: "ETH", two: "USDT", symbol: "ETHUSDT" },
  { one: "ETH", two: "LTC", symbol: "ETHLTC" },

  { one: "DOGE", two: "USD", symbol: "DOGEUSD" },
  { one: "DOGE", two: "USDT", symbol: "DOGEUSDT" },
  { one: "DOGE", two: "BTC", symbol: "DOGEBTC" },
  { one: "DOGE", two: "ETH", symbol: "DOGEETH" },

  { one: "LTC", two: "USD", symbol: "LTCUSD" },
  { one: "LTC", two: "BTC", symbol: "LTCBTC" },
  { one: "LTC", two: "USDT", symbol: "LTCUSDT" },
  { one: "LTC", two: "ETH", symbol: "LTCETH" },

  { one: "USDT", two: "USD", symbol: "USDTUSD" },
  { one: "USDT", two: "BTC", symbol: "USDTBTC" },
  { one: "USDT", two: "ETH", symbol: "USDTETH.P" },
  { one: "USDT", two: "DOGE", symbol: "USDTDOGE.P" },
];

// Function to find the correct symbol based on two values
export const getFormattedSymbol = (value1: string, value2: string) => {
  // Look for a match where either:
  // - one = value1 and two = value2
  // - or one = value2 and two = value1 (reverse order)
  const config = symbolConfig.find(
    (entry) =>
      (entry.one === value1?.toUpperCase() &&
        entry.two === value2?.toUpperCase()) ||
      (entry.one === value2?.toUpperCase() &&
        entry.two === value1?.toUpperCase())
  );

  // Return the found symbol, or if not found, return a default value or concatenate
  return config ? config.symbol : `${value1}${value2}`;
};
