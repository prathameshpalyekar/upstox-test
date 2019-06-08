import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
} from '../actions/fetchData';

export const initialState = {
    data: [],
    loading: false,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {
                loading: true,
                error: null,
                data: state.data,
            };
        case FETCH_DATA_SUCCESS:
            const data = action.data.map((datum) => {
                const dataArray = datum.split(',');
                const date = parseInt(dataArray[0]);
                const open = parseFloat(dataArray[1]);
                const high = parseFloat(dataArray[2]);
                const low = parseFloat(dataArray[3]);
                const close = parseFloat(dataArray[4]);
                const volume = parseFloat(dataArray[5]);
                return Object.assign({}, {date, open, high, low, close, volume});
            });
            return {
                loading: false,
                data,
                error: null,
            };
        case FETCH_DATA_FAILURE:
            return {
                loading: false,
                error: action.message,
                data: state.data,
            };

        default:
            return state;
    }
}
