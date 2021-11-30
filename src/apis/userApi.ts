import axios from 'axios';

import { SOCKET_API_SERVER } from 'src/constants/constants';

axios.defaults.timeout = 20000;

export const getServerPublicKey = async () => {
	const res = await axios.post(SOCKET_API_SERVER + 'user/publicKey');
	return res.data;
}

export const addDeviceCode = async (values) => {
	const res = await axios.post(SOCKET_API_SERVER + 'device/addDeviceCode', {values});
	return res.data;
}

export const enableDeviceStatus = async (values) => {
	const res = await axios.post(SOCKET_API_SERVER + 'device/enableDeviceStatus', {values});
	return res.data;
}

