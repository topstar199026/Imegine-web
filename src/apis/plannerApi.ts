import axios from 'axios';
import { values } from 'lodash';

import { SOCKET_API_SERVER } from 'src/constants/constants';

axios.defaults.timeout = 20000;

export const getPlannerList = async (values) => {
    const res = await axios.post(SOCKET_API_SERVER + 'planner/getPlanner', {values});
    return res;
}