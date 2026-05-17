export default {
  name: 'CandlestickChart',
  category: 'Charts',
  description: 'OHLC candlestick chart for financial data. Green/red candles, wick lines, hover OHLC tooltip.',
  variants: [
    { label: 'Default', props: {} },
    {
      label: 'Bullish Trend', props: {
        data: [
          { label: 'W1', open: 80, high: 95, low: 75, close: 92 },
          { label: 'W2', open: 92, high: 108, low: 88, close: 104 },
          { label: 'W3', open: 104, high: 118, low: 100, close: 115 },
          { label: 'W4', open: 115, high: 132, low: 112, close: 128 },
          { label: 'W5', open: 128, high: 145, low: 124, close: 140 },
        ]
      }
    },
  ]
}
