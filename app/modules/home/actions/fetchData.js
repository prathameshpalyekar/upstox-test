import axiosApi from 'components/axiosApi';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export function fetchData() {
    return (dispatch) => {
        dispatch({
            type: FETCH_DATA_REQUEST,
        });

        return axiosApi.request({
            url: 'historical',
            method: 'GET',
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            dispatch({
                type: FETCH_DATA_SUCCESS,
                data: response,
            });
        }).catch((xhrResponse) => {
            console.log(xhrResponse);
            const response = xhrResponse.data;
            const error = (response && response.message) || 'Failed to fetch historical data. API failure.';
            dispatch({
                type: FETCH_DATA_FAILURE,
                message: error,
            });
        });
    }
};