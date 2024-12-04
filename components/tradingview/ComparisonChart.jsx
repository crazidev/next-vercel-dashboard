import React, { useEffect, useRef, memo } from 'react';

function ComparisonChart() {
  const container = useRef();

  useEffect(() => {
    // Check if the script has already been added to avoid adding it again
    if (!document.getElementById("tradingview-widget-script")) {
      const script = document.createElement("script");
      script.id = "tradingview-widget-script"; // Unique id for the script
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
      {
        "symbols": [
          [
            "Apple",
            "AAPL|1D"
          ]
        ],
        "chartOnly": true,
        "width":300,
        "height": 200,
        "locale": "en",
        "colorTheme": "dark",
        "autosize": false,
        "showVolume": true,
        "showMA": false,
        "hideDateRanges": false,
        "hideMarketStatus": true,
        "hideSymbolLogo": false,
        "scalePosition": "right",
        "scaleMode": "Percentage",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "1",
        "changeMode": "price-only",
        "chartType": "line",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "maLength": 9,
        "lineWidth": 2,
        "lineType": 0,
        "compareSymbol": {
          "symbol": "NASDAQ:NVDA",
          "lineColor": "rgba(41, 98, 255, 1)",
          "lineWidth": 2
        },
        "dateRanges": [
          "1w|15",
          "1m|60",
          "3m|60",
          "12m|1D"
        ],
        "bottomColor": "rgba(255, 255, 255, 0)",
        "dateFormat": "MMM dd, yyyy",
        "timeHoursFormat": "12-hours"
      } `;
      
      // Append the script to the container
      container.current.appendChild(script);
    }

    // Cleanup function to remove the script when the component unmounts
    return () => {
      const script = document.getElementById("tradingview-widget-script");
      if (script) {
        script.remove();
      }
    };
  }, []); // Empty dependency array ensures this runs only once (on mount)

  return (
    <div className="tradingview-widget-container" ref={container}>
      {/* The TradingView widget will be injected here */}
    </div>
  );
}

export default memo(ComparisonChart);
