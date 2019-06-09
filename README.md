# Upstox Frontend Assignment
Shows 
1. Real time stock data with graphical representation
2. Historical stock data with graphical representation

## Running Project on Local

### Run node.js

- `cd upstox-test` - Project folder
- `npm install`
- `npm start`
- Open at http://localhost:9000

### Assumption
 
- Historical chart shows complete data which is fetched on componentDidMount
- Live chart shows recent 30 data instance for recent 30 seconds
- Even though live chart receives data every 100ms, data on chart is updated for every 1 second
- For showing OHLC data, candlestick chart is used

### Live demo

Live demo can be found at http://upstox-stocks-app.herokuapp.com/
