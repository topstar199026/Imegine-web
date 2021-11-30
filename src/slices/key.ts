import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from 'src/store';
import { getServerPublicKey, addDeviceCode, enableDeviceStatus } from 'src/apis/userApi';
import { aesEncrypt0, encrypt, decrypt, generateRsaKey, aesDecrypt0 } from 'src/utils/key-utilts';
import { get as getData, save as saveData } from 'src/utils/data-utils';

interface Key {
	public?: String;
	private?: String;
	server?: String;
	token?: String;
}

interface KeyState {
	key: Key;
	device: any;
	enableStatus: Boolean;
	token?: String;
	response: any;
};

const initialState: KeyState = {
	key: getData('key'),
	token: getData('token'),
	device: getData('device'),
	enableStatus: getData('enableStatus'),
	response: null
};

const slice = createSlice({
	name: 'key',
	initialState,
	reducers: {
		setKey(state: KeyState, action: PayloadAction<{ key: Key; }>) {
			const { key } = action.payload;
			state.key = key;
		},
		setToken(state: KeyState, action: PayloadAction<{ token: String; }>) {
			const { token } = action.payload;
			state.token = token;
		},
		setDevice(state: KeyState, action: PayloadAction<{ device: any; }>) {
			const { device } = action.payload;
			state.device = device;
		},
		setEnableStatus(state: KeyState, action: PayloadAction<{ enableStatus: Boolean; }>) {
			const { enableStatus } = action.payload;
			state.enableStatus = enableStatus;
		},
		addData(state: KeyState, action: PayloadAction<{ data: any; }>) {
			const { data } = action.payload;
			state.response = data;
		},
		setStatus(state: KeyState, action: PayloadAction<{ token: String; device: any; enableStatus: Boolean; }>) {
			const { token, device, enableStatus } = action.payload;
			state.token = token;
			state.device = device;
			state.enableStatus = enableStatus;
		},

	}
});

export const reducer = slice.reducer;

export const setKey = (): AppThunk => async (dispatch) => {
	try {
		const serverKey = await getServerPublicKey();
		const _key = await generateRsaKey();
		await dispatch(slice.actions.setKey({
			key: {
				public: _key.public,
				private: _key.private,
				server: serverKey,
				token: null,
			},
		}));
		saveData('key', {
			public: _key.public,
			private: _key.private,
			server: serverKey,
			token: null,
		});
		return true;
	} catch (error) {
		console.log(error)
		return null;
	}	
};

export const addDevice = (rsa: any, _values: any): AppThunk => async (dispatch) => {
	try {
		var values = await aesEncrypt0(JSON.stringify(_values));
		const _key = encrypt(values.key, rsa.server);
		values.key = _key;
		await addDeviceCode(values);
		return true;
	} catch (error) {
		return false;
	}
};

export const enableDevice = (rsa: any, _values: any): AppThunk => async (dispatch) => {
	try {
		var values = await aesEncrypt0(JSON.stringify(_values));
		const _key = encrypt(values.key, rsa.server);
		values.key = _key;
		values['public'] = rsa.public;
		const res = await enableDeviceStatus(values);
		if(res.success === true){
			const _aesKey = await decrypt(res.data.key, rsa.private);
			const data = await aesDecrypt0(res.data.data, _aesKey);
			await dispatch(slice.actions.setStatus({
				token: res.token,
				device: data,
				enableStatus: true,
			}));

			// await dispatch(slice.actions.setEnableStatus({
			// 	enableStatus: true,
			// }));
			// await dispatch(slice.actions.setToken({
			// 	token: res.token,
			// }));
			// await dispatch(slice.actions.setDevice({
			// 	device: data,
			// }));
			
			saveData('token', res.token);
			saveData('device', data);
			saveData('enableStatus', true);
			return true;
		}
			
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export default slice;

