import {getPlannerList as _getPlannerList} from 'src/apis/plannerApi';
import {db, Message, saveReadState, saveGroup, getGroup, getGroup2} from 'src/models/AppDatabase';
import { aesDecrypt0, decrypt, aesRsaEncrypt } from 'src/utils/key-utilts';

export const getPlannerList = async (key, _values) => {
	try {
		var values = await aesRsaEncrypt(_values, key.server);
		// values.public = key.public;

		var res = await _getPlannerList(values);
		console.log('pre res', res)

		if(res && res.data && res.data.success === true) {
			
			let _key2 = res.data.data.key;
			_key2 = await decrypt(_key2, key.private);
			let _data = res.data.data.data;
			_data = await aesDecrypt0(_data, _key2);
			_data = JSON.parse(_data);

			return {
				status: true,
				data: _data,
			}
		}else if(res && res.data && res.data.success === false && res.data.error) {
			return {
				status: false,
				error: res.data.error,
			}
		}
	} catch (error) {
		console.log('-------------------', error)
		return {
			status: false,
			error: 'Can\'t access server.',
		}
	}
	
}

