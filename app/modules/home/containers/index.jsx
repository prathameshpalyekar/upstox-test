import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetchData';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchData());
    }

    render() {
        const { Layout, data, liveData } = this.props;
        return (
            <div>
                <Layout data={data} liveData={liveData}/>
            </div>
        );
    };
}

const mapStateToProps = state => ({
    data: state.stocks.data || [],
    liveData: state.stocks.liveData || [],
});

const mapDispatchToProps = dispatch => ({
    dispatch,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
