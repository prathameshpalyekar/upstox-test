import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
} from '../actions/fetchData';
import { SUBSCRIBE_DATA_SUCCESS } from '../actions/subscribeData';

export const initialState = {
    data: [],
    loading: false,
    error: null,
    liveData: [],
};

function getParsedData(datum) {
    const dataArray = datum.split(',');
    const date = parseInt(dataArray[0]);
    const open = parseFloat(dataArray[1]);
    const high = parseFloat(dataArray[2]);
    const low = parseFloat(dataArray[3]);
    const close = parseFloat(dataArray[4]);
    const volume = parseFloat(dataArray[5]);
    return Object.assign({}, {date, open, high, low, close, volume});
}

export default function (state = initialState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            newState.loading = true;
            newState.error = null;
            return newState;
        case FETCH_DATA_SUCCESS:
            const data = action.data.map((datum) => {
                return getParsedData(datum);
            });
            newState.loading = false;
            newState.error = null;
            newState.data = data;
            return newState;
        case FETCH_DATA_FAILURE:
            newState.loading = false;
            newState.error = action.message;
            return newState;

        case SUBSCRIBE_DATA_SUCCESS:
            const subscribedata = getParsedData(action.data);
            const updatedLiveData = state.liveData.map((datum) => Object.assign({}, datum));
            updatedLiveData.push(subscribedata);
            newState.liveData = updatedLiveData;
            return newState;

        default:
            return state;
    }
}
