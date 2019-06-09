import React, { Component } from 'react';
import moment from 'moment';
import CandleStickChart from '../candleStickChart/candleStickChart';

class Stock extends Component {
    render() {
        const data = this.props.data.sort((a, b) => {
            return moment.utc(a.date).diff(moment.utc(b.date))
        }).map((value) => {
            const date = new Date(value.date);
            const updatedValue = Object.assign({}, value);
            updatedValue.date = date;
            return updatedValue;
        });

        const { stockContainer } = this.refs;
        const { stockTable } = this.props;
        const width = stockTable && stockTable.offsetWidth;

        return (
            <div className="-stock" ref="stockContainer">
                <CandleStickChart data={data} width={width} interval="day" />
            </div>
        );
    }
}

export default Stock;
