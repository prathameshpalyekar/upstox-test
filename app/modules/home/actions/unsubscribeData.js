import socket from 'components/socket';

export const unsubscribeData = () => {
	return (dispatch) => {
        socket.unSubscribeData();
    }
}