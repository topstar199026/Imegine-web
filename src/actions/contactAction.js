import {getContactList as _getContactList, getGroupData as _getGroupData, getContactInfo as _getContactInfo} from 'src/apis/contactApi';
import {db, Message, saveReadState, saveGroup, getGroup, getGroup2} from 'src/models/AppDatabase';
import { aesDecrypt0, decrypt, aesRsaEncrypt } from 'src/utils/key-utilts';

export const getContactList = async (rsa, values, callback) => {
	try {
		var res = await _getContactList(values);

		let _key = res.data.data.key;
		_key = await decrypt(_key, rsa.private);
		let _data = res.data.data.data;
		_data = await aesDecrypt0(_data, _key);
		_data = JSON.parse(_data);	
		
		if(res && res.data && res.data.success === true) {
			return {
				status: true,
				data: _data,
			};
		}else if(res && res.data && res.data.success === false && res.data.error) {
			return {
				status: false,
				error: res.data.error,
			};
		}
	} catch (error) {
		return {
			status: false,
			error: 'Can\'t access server.',
		};
	}    
};

export const getGroupData = async (key, device, contactUserInfo) => {

	let _f = contactUserInfo.groupId ? true : false;
	if(_f) {
		let groupData = await getGroup(contactUserInfo.groupId);
		if(groupData) {
			return {
				status: true,
				data: groupData,
			};
		}else {
			const data = {
				sender: {
					id: device.UserId,
					userId: device.deviceUserId,
				},
				receiver: {
					id: contactUserInfo.contactUserId,
					contactId: contactUserInfo.contactId
				},
				groupId: contactUserInfo.groupId,
				private: !contactUserInfo.isGroup,
			}

			var values = await aesRsaEncrypt(data, key.server);

			values.public = key.public;

			var res = await _getGroupData(values);

			if(res && res.data && res.data.success === true) {

				let _key = res.data.data.key;
				_key = await decrypt(_key, key.private);
				let _data = res.data.data.data;
				_data = await aesDecrypt0(_data, _key);
				_data = JSON.parse(_data);
				
				console.log('data', _data);
				saveGroup(_data);
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
		}
	} else {
		let groupData = await getGroup2(device, contactUserInfo);
		if(groupData) {
			return {
				status: true,
				data: groupData,
			};
		}else{
			const data = {
				sender: {
					id: device.UserId,
					userId: device.deviceUserId,
				},
				receiver: {
					id: contactUserInfo.id,
					contactId: contactUserInfo.userId
				},
				groupId: contactUserInfo.groupId,
				private: true,
			}
	
			var values2 = await aesRsaEncrypt(data, key.server);
	
			values2.public = key.public;
	
			var res2 = await _getGroupData(values2);
	
			console.log('data', contactUserInfo, data, groupData, res2)
			if(res2 && res2.data && res2.data.success === true) {
	
				let _key = res2.data.data.key;
				_key = await decrypt(_key, key.private);
				let _data = res2.data.data.data;
				_data = await aesDecrypt0(_data, _key);
				_data = JSON.parse(_data);
				saveGroup(_data);
				return {
					status: true,
					data: _data,
				}
			}else if(res2 && res2.data && res2.data.success === false && res2.data.error) {
				return {
					status: false,
					error: res2.data.error,
				}
			}
		}
		
	}
}

export const getGroupData2 = async (key, groupId) => {

	const data = {
		sender: {
			id: null,
			userId: null,
		},
		receiver: {
			id: null,
			contactId: null
		},
		groupId: groupId,
		private: null,
	};

	var values = await aesRsaEncrypt(data, key.server);

	values.public = key.public;

	var res = await _getGroupData(values);

	if(res && res.data && res.data.success === true) {

		let _key = res.data.data.key;
		_key = await decrypt(_key, key.private);
		let _data = res.data.data.data;
		_data = await aesDecrypt0(_data, _key);
		_data = JSON.parse(_data);
		
		console.log('data', _data);
		await saveGroup(_data);
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
}

export const getGroupData3 = async (groupId) => {

	let groupData = await getGroup(groupId);
	if(groupData) {
		return {
			status: true,
			data: groupData,
		};
	}else{
		return {
			status: false,
			data: null,
		};
	}
}

export const getContactInfo = async (key, _values) => {
	try {
		var values = await aesRsaEncrypt(_values, key.server);
		values.public = key.public;

		var res = await _getContactInfo(values);

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

