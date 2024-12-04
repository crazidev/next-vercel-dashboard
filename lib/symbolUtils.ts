const symbolConfig = [
  { one: "BTC", two: "ETH", symbol: "BTCETH" },
  { one: "BTC", two: "USD", symbol: "BTCUSD" },
  { one: "BTC", two: "USDT", symbol: "BTCUSDT" },

  { one: "ETH", two: "USD", symbol: "ETHUSD" },
  { one: "ETH", two: "USDT", symbol: "ETHUSDT" },

  { one: "USD", two: "USDT", symbol: "USDTUSD" },
  { one: "USD", two: "TESLA", symbol: "TSLA" },
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
      (entry.one === value2?.toUpperCase() && entry.two === value1?.toUpperCase())
  );

  // Return the found symbol, or if not found, return a default value or concatenate
  return config ? config.symbol : `${value1}${value2}`;
};
