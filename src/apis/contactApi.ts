import axios from 'axios';
import { values } from 'lodash';

import { SOCKET_API_SERVER } from 'src/constants/constants';

axios.defaults.timeout = 20000;

export const getContactList = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'user/getContactList', {values});
    return res;
}

export const getGroupData = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'message/getGroupId', {values});
    return res;
}

export const getContactInfo = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'user/getContactInfo', {values});
    return res;
}
