import socket from 'components/socket';

export const SUBSCRIBE_DATA_SUCCESS = 'SUBSCRIBE_DATA_SUCCESS';

export const subscribeData = () => {
    return (dispatch) => {
        socket.subscribeData((err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            dispatch({
                type: SUBSCRIBE_DATA_SUCCESS,
                data,
            });
        });
    }
}