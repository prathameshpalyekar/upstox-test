import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CandleStickChart from '../candleStickChart/candleStickChart';
import { subscribeData } from '../../actions/subscribeData';
import { unsubscribeData } from '../../actions/unsubscribeData';

class Stock extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(subscribeData());
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(unsubscribeData());
    }

    render() {
        const presentData = [];
        const data = this.props.data.sort((a, b) => {
            return moment.utc(a.date).diff(moment.utc(b.date))
        }).filter((value) => {
            const dateString = moment(value.date).format('DD-MM-YY HH:mm:ss');
            const isPresent = presentData.find((datum) => datum === dateString);
            if (!isPresent) {
                presentData.push(dateString)
            }
            return !isPresent;
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
                <CandleStickChart data={data} width={width} interval="second" latest={30}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch,
});

export default connect(
    mapDispatchToProps,
)(Stock);
