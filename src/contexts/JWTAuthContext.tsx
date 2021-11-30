import React, {
  createContext,
  useEffect,
  useReducer,
  useState
} from 'react';
import type { FC, ReactNode } from 'react';
import jwtDecode from 'jwt-decode';
import { io } from 'socket.io-client';

import type { User } from 'src/types/user';
import SplashScreen from 'src/components/Welcome/SplashScreen';

import { getServerPublicKey, addDeviceCode, enableDeviceStatus } from 'src/apis/userApi';
import { aesEncrypt0, encrypt, decrypt, generateRsaKey, aesDecrypt0, aesRsaEncrypt } from 'src/utils/key-utilts';
import { get as getData, save as saveData } from 'src/utils/data-utils';
import { SOCKET_SERVER } from 'src/constants/constants';

import {db, Message, saveReadState, saveMessage, savePendingMessage, updateGroup} from 'src/models/AppDatabase';

interface Key {
    public?: String;
    private?: String;
    server?: String;
    token?: String;
}
interface AuthState {
	key: Key | null;
	device: any | null;
	enableStatus: Boolean | null;
	token?: String | null;

    isInitialised: boolean;
    isAuthenticated: boolean;
    user: User | null;
}

interface AuthContextValue extends AuthState {
    method: 'JWT',
	newMessage: any,
	typingStatus: boolean,
	messageReadState: any,
	setKey: () => Promise<void>;
	addDevice: (rsa: any, _values: any) => Promise<void>;
	enableDevice: (rsa: any, _values: any) => Promise<void>;
	sendMessage: (message: any, groupInfo: any) => Promise<void>;
	sendTypingStatus: (contactInfo: any, status: boolean) => Promise<void>;
	sendReadByRequest: (_values: any, contactInfo: any) => Promise<void>;
    // login: (email: string, password: string) => Promise<void>;
    // logout: () => void;
    // register: (email: string, name: string, password: string) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

type InitialiseAction = {
    type: 'INITIALISE';
    payload: {
		isAuthenticated: boolean;
		user: User | null;
    };
};

type SetKeyAction = {
	type: 'SET_KEY';
	payload: {
		key: Key;
	};
};

type SetEnableAction = {
	type: 'SET_ENABLE';
	payload: {
		device: any;
		enableStatus: Boolean;
		token?: String;
	};
};

type LoginAction = {
	type: 'LOGIN';
	payload: {
		user: User;
	};
};

type LogoutAction = {
  	type: 'LOGOUT';
};

type RegisterAction = {
	type: 'REGISTER';
	payload: {
		user: User;
	};
};

type Action =
	| InitialiseAction
	| SetKeyAction
	| SetEnableAction
	| LoginAction
	| LogoutAction
	| RegisterAction;

const initialAuthState: AuthState = {
	key: getData('key'),
	token: getData('token'),
	device: getData('device'),
	enableStatus: getData('enableStatus') || false,
	isAuthenticated: false,
	isInitialised: false,
	user: null
};

const isValidToken = (accessToken: string): boolean => {
	if (!accessToken) {
		return false;
	}

	const decoded: any = jwtDecode(accessToken);
	const currentTime = Date.now() / 1000;

	return decoded.exp > currentTime;
};

const setSession = (accessToken: string | null): void => {
	if (accessToken) {
		localStorage.setItem('accessToken', accessToken);
		//axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
	} else {
		localStorage.removeItem('accessToken');
		//delete axios.defaults.headers.common.Authorization;
	}
};

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'INITIALISE': {
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      };
    }
	case 'SET_KEY': {
		const { key } = action.payload;
  
		return {
		  ...state,		  
		  key
		};
	}
	case 'SET_ENABLE': {
		const { device, enableStatus, token } = action.payload;
  
		return {
		  ...state,		  
		  device, enableStatus, token
		};
	}
    case 'LOGIN': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext<AuthContextValue>({
	...initialAuthState,
	method: 'JWT',
	newMessage: null,
	typingStatus: false,
	messageReadState: null,
	setKey: () => Promise.resolve(),
	addDevice: () => Promise.resolve(),
	enableDevice: () => Promise.resolve(),
	sendMessage: () => Promise.resolve(),
	sendTypingStatus: () => Promise.resolve(),
	sendReadByRequest: () => Promise.resolve(),
	// login: () => Promise.resolve(),
	// logout: () => { },
	// register: () => Promise.resolve()
});

var mySocket = io(SOCKET_SERVER, {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 2000,
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialAuthState);

	const enableStatus = state.enableStatus;
	const key = state.key;
	const device = state.device;

	const [newMessage, setNewMessage] = useState(null);
	const [typingStatus, setTypingStatus] = useState(false);
	const [messageReadState, setMessageReadState] = useState(null);

	useEffect(() => {
		const initialise = async () => {
			try {
				const accessToken = window.localStorage.getItem('accessToken');

				if (accessToken && isValidToken(accessToken)) {
				setSession(accessToken);

				// const response = await axios.get<{ user: User; }>('/api/account/me');
				// const { user } = response.data;

				// dispatch({
				//   type: 'INITIALISE',
				//   payload: {
				//     isAuthenticated: true,
				//     user
				//   }
				// });
				} else {
				dispatch({
					type: 'INITIALISE',
					payload: {
						isAuthenticated: false,
						user: null
					}
				});
				}
			} catch (err) {
				console.error(err);
				dispatch({
					type: 'INITIALISE',
					payload: {
						isAuthenticated: false,
						user: null
					}
				});
			}
		};

		initialise();
	}, []);
	
	useEffect(() => {
		enableStatus === true && socketConnect(state.device.id, state.device.deviceUserId);

		if(enableStatus) {
			//await db.delete();
        	//await db.open();
        	// Promise.all([db.messages.clear()]);
		}
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enableStatus]);

	

	const socketConnect = async (id, userId) => {
		mySocket.connect();
        
        mySocket.on('connect', () => {
			console.log('mySocket', mySocket.id)
            mySocket.emit("socket:info", {
                type: 'web',
				userId: userId,
				deviceId: id,
            });                      
        });

		mySocket.on('reconnect', () => {
            mySocket.emit("socket:info", {
                type: 'web',
                userId: userId,
				deviceId: id,
            });                      
        });        
    
        mySocket.on('disconnect', (reason) => {
            console.log('connection to server lost.', reason);            
        });

		mySocket.on('message:group:receive', async (message) => {
            let _key = message.key;
            _key = await decrypt(_key, key.private);
            let _data = message.data;
            _data = await aesDecrypt0(_data, _key);
            _data = JSON.parse(_data);
            _data['date'] = message.date;
            _data['messageId'] = message.messageId;
            console.log('message:receive', _data)

			saveMessage(_data);
            updateGroup(key, _data);
            setNewMessage(_data);

        });

		mySocket.on('message:read:request', async (message) => {
            let _key = message.key;
            _key = await decrypt(_key, key.private);
            let _data = message.data;
            _data = await aesDecrypt0(_data, _key);
            _data = JSON.parse(_data);
            _data['date'] = message.date; 
			console.log('message:read:request', _data)   
			if(device.UserId !== _data.sender.id) {               
                setMessageReadState(_data);
				saveReadState(_data, device);
            }    
        });

		mySocket.on('message:pending:load', async (message) => {
            console.log('message:pending:load', message);

			const list = message.data;

            var _temp = [];
            for(var i = 0; i < list.length; i++) {
                let message = list[i];        
                let _key = message.key;
                _key = await decrypt(_key, key.private);
                let _data = message.data;
                _data = await aesDecrypt0(_data, _key);
                _data = JSON.parse(_data);
                _data['date'] = message.date;
                _data['messageId'] = message.messageId;
                
                _temp.push(_data);
            }

			savePendingMessage(_temp);
        });

		mySocket.on('message:typing:start', (message) => {
            console.log('message:typing', message);
            setTypingStatus(message);
        });
	}

	const setKey = async () => {
		try {
			const serverKey = await getServerPublicKey();
			const _key = await generateRsaKey();
			dispatch({
				type: 'SET_KEY',
				payload: {
					key: {
						public: _key.public,
						private: _key.private,
						server: serverKey,
						token: null,
					}
				}
			});

			saveData('key', {
				public: _key.public,
				private: _key.private,
				server: serverKey,
				token: null,
			});
		} catch (error) {
			console.log(error)
		}	
	};

	const addDevice = async (rsa: any, _values: any) => {
		try {
			var values = await aesEncrypt0(JSON.stringify(_values));
			const _key = encrypt(values.key, rsa.server);
			values.key = _key;
			values['public'] = rsa.public;
			await addDeviceCode(values);
		} catch (error) {
		}
	};

	const enableDevice = async (rsa: any, _values: any) => {
		try {
			var values = await aesEncrypt0(JSON.stringify(_values));
			const _key = encrypt(values.key, rsa.server);
			values.key = _key;
			values['public'] = rsa.public;
			const res = await enableDeviceStatus(values);
			if(res.success === true){
				const _aesKey = await decrypt(res.data.key, rsa.private);
				let data = await aesDecrypt0(res.data.data, _aesKey);
				data = JSON.parse(data);
				console.log('enable device', data)
				await dispatch({
					type: 'SET_ENABLE',
					payload: {
						token: res.token,
						device: data,
						enableStatus: true,
					}
				});
				
				saveData('token', res.token);
				saveData('device', data);
				saveData('enableStatus', true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const sendMessage = async (message: any, groupInfo: any) => {

		console.log('--- *** **** sender groupInfo', groupInfo)

		const data = {
            sender: {
                id: device.UserId,
                userId: device.deviceUserId,
				deviceId: device.id,
				nickName: device.nickName,
				avatar: device.avatar,
            },
            group: {
                id: groupInfo.id,
            },
            senderType: 'web',
            messageType: 0,
            message:  message
        }

		var values = await aesRsaEncrypt(data, key.server);
        mySocket.emit("message:group:send", values);
    }

	const sendTypingStatus = async (groupInfo: any, status: boolean) => {
		const data = {
            sender: {
                id: device.UserId,
                userId: device.deviceUserId,
				deviceId: device.id,
            },
            group: {
                id: groupInfo.id,
            },
            status: status,
        }
        mySocket.emit("message:typing:start", data);

    }

	const sendReadByRequest = async (_values: any, groupInfo: any) => {
		console.log('_values', _values);
		const data = {
            sender: {
                id: device.UserId,
                userId: device.deviceUserId,
            },
            group: {
                id: groupInfo.id,
            },
            senderType: 'web',
            messageType: 99,
            messageId:  _values.messageId

        }
		var values = await aesEncrypt0(JSON.stringify(data));
		const _key = encrypt(values.key, key.server);
		values.key = _key;
        mySocket.emit("message:read:request", values);
    }
	
	// const login = async (email: string, password: string) => {
	// 	// const response = await axios.post<{ accessToken: string; user: User }>('/api/account/login', { email, password });
	// 	// const { accessToken, user } = response.data;

	// 	// setSession(accessToken);
	// 	// dispatch({
	// 	//   type: 'LOGIN',
	// 	//   payload: {
	// 	//     user
	// 	//   }
	// 	// });
	// };

	// const logout = () => {
	// 	setSession(null);
	// 	dispatch({ type: 'LOGOUT' });
	// };

	// const register = async (email: string, name: string, password: string) => {
	// 	// const response = await axios.post<{ accessToken: string; user: User }>('/api/account/register', {
	// 	//   email,
	// 	//   name,
	// 	//   password
	// 	// });
	// 	// const { accessToken, user } = response.data;

	// 	// window.localStorage.setItem('accessToken', accessToken);

	// 	// dispatch({
	// 	//   type: 'REGISTER',
	// 	//   payload: {
	// 	//     user
	// 	//   }
	// 	// });
	// };

	

	if (!state.isInitialised) {
		return <SplashScreen />;
	}

	return (
		<AuthContext.Provider
			value={{
				...state,
				method: 'JWT',
				newMessage,
				typingStatus,
				messageReadState,
				setKey,
				addDevice,
				enableDevice,
				sendMessage,
				sendTypingStatus,
				sendReadByRequest,
				// login,
				// logout,
				// register
			}}
		>
		{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;