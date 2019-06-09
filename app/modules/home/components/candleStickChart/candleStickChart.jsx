import React, { Component } from 'react';

import { scaleTime } from "d3-scale";
import { utcDay, utcMinute, utcHour } from "d3-time";

import { ChartCanvas, Chart, ZoomButtons } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from 'react-stockcharts/lib/utils';
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";

import './candleStickChart.less';

const xAccessor = d => d && d.date;
const margin = {
    left: 50,
    right: 30,
    top: 75,
    bottom: 30
};

const candleWidth = {
    hour: utcHour,
    minute: utcMinute,
    day: utcDay,
};

class CandleStickChart extends Component {
    componentWillMount() {
        this.setState({
            suffix: 1
        });
    }

    handleReset() {
        this.setState({
            suffix: this.state.suffix + 1
        });
    }

    render() {
        const { width, data, interval } = this.props;
        const xExtents = [
            xAccessor(last(data)),
            xAccessor(data[0])
        ];

        return (
            <div className="-candle-stick-chart" ref="stockContainer">
                <ChartCanvas
                    width={width || 600}
                    height={500}
                    margin={margin}
                    type="svg"
                    seriesName={`MSFT_${this.state.suffix}`}
                    data={data}
                    xScale={scaleTime()}
                    xAccessor={xAccessor}
                    xExtents={xExtents}
                    displayXAccessor={xAccessor}
                    zoomEvent={true}
                    ratio={1}>
                    <Chart id={1} yExtents={d => [d.high, d.low]}>
                        <XAxis axisAt="bottom" orient="bottom" ticks={6} zoomEnabled={true}/>
                        <YAxis axisAt="left" orient="left" ticks={5} zoomEnabled={true}/>
                        <CandlestickSeries width={timeIntervalBarWidth(candleWidth[interval])} />
                        <OHLCTooltip origin={[-40, -25]} className="-ohlc-tooltip"/>
                        <ZoomButtons onReset={this.handleReset} />
                    </Chart>
                </ChartCanvas>
            </div>
        );
    }
}

CandleStickChart = fitWidth(CandleStickChart);

export default CandleStickChart;
