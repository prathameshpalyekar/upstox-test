import React from 'react';
import cx from 'classnames';
import Stock from './stock/stock';
import LiveStock from './liveStock';
import './home.less';

const CHARTS = {
    HISTORICAL: 'historical',
    LIVE: 'live',
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChart: CHARTS.LIVE
        };
    }

    toggleChart(value) {
        this.setState({
            currentChart: value
        });
    }

    render() {
        const { data, liveData } = this.props;
        const { HISTORICAL, LIVE } = CHARTS;
        const { currentChart } = this.state;
        const isHistorical = currentChart === HISTORICAL;
        const label = isHistorical ? 'Historical Data' : 'Live Data';
        const { stockTable } = this.refs;

        const histClass = cx('-section', {
            active: isHistorical,
        });
        const livClass = cx('-section', {
            active: !isHistorical,
        });

        return (
            <div className="home-dashboard">
                <div className="-section-container">
                    <div className={histClass} onClick={this.toggleChart.bind(this, HISTORICAL)}>
                        Historical Stock Chart
                    </div>
                    <div className={livClass} onClick={this.toggleChart.bind(this, LIVE)}>
                        Live Stock Chart
                    </div>
                </div>
                <div className="-stock-table" ref="stockTable">
                    {isHistorical ?
                        <Stock data={data} stockTable={stockTable}/> :
                        <LiveStock data={liveData} stockTable={stockTable}/>
                    }
                </div>
            </div>
        );
    }
}

export default Home;
