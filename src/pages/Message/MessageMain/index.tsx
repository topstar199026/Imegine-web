import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useLiveQuery } from "dexie-react-hooks";

import colors from 'src/constants/colors';
import TopBar from './TopBar';

import type { Theme } from 'src/theme';
import BottomBar from './BottomBar';
import MessageItem from 'src/components/Message/MessageItem';
import useAuth from 'src/hooks/useAuth';

import {db, getMessageList, Message} from 'src/models/AppDatabase';
import { getGroupData, getGroupData3 } from 'src/actions/contactAction';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		borderLeft: '1px solid ' + colors.$containerBorderColor,
	},
	container: {
		flex: 1,
		overflowY: 'auto',
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		padding: 2,
		paddingRight: 10,
	},
}));

interface Props {
    data?: any;
}

var scrollRef;

const MessageMainView: FC<Props> = (props) => {
    const classes = useStyles();

	const contactUserInfo = props.data.contact;
	const groupId = props.data.groupId;

	console.log('contactUserInfo', contactUserInfo, groupId);

	const { newMessage, typingStatus, messageReadState, device, key, sendReadByRequest, sendMessage, sendTypingStatus } = useAuth();
		
	const [messages, setMessages] = useState([]);
	const [groupInfo, setGroupInfo] = useState(null);
	const [activeType, setActiveType] = useState(0);

	useEffect(() => {
		handleGroupData();	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contactUserInfo, groupId]);

	// useEffect(() => {
	// 	(async () => {
	// 		contactUserInfo && handleGroupData();
	// 	})();
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [contactUserInfo])

	// useEffect(() => {
	// 	(async () => {
	// 		if(groupInfo) await handleLoadHistory();
	// 	})();
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [groupInfo])

	useEffect(() => {
		console.log('activeType', activeType)
        if(activeType === 2) {
            // setChats(DATA_Email);
            groupInfo && groupInfo.id && handleLoadHistory();
        }else{
            groupInfo && groupInfo.id && handleLoadHistory();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeType, groupInfo])


	useEffect(() => {
		console.log('-----sdf---', newMessage, contactUserInfo, device)
		if(groupInfo && newMessage) {
			(async () => {
				if(groupInfo.id === newMessage.group.id) {
                    var _newMessage = newMessage;

                    // newMessage.receiverId === device.UserId && 
					// // @ts-ignore
					// socket.messageReadStateSend(_newMessage, user, contactInfo);
					
					await handleNewMessage(_newMessage);
					// @ts-ignore
					// socket.emptyNewMessage();
                }
			})();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newMessage])

	useEffect(() => {
        handleTypingStatus(typingStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typingStatus])

	useEffect(() => {
		if(scrollRef) scrollRef.scrollTop = scrollRef.scrollHeight;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages])

	useEffect(() => {
		if(messageReadState && Object.keys(messageReadState).length > 0 && groupInfo) {
            
            if(messageReadState.group.id === groupInfo.id) {
                console.log('messageReadState', messageReadState)
                handleReadState(messageReadState);
            }
        }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messageReadState])

	const handleLoadHistory = async () => {
		

		let history = await getMessageList({
			query: '',
			activeType: activeType,
			groupId: groupInfo.id,
		});
		console.log('history------------', history)

		loadHistory(history);
	}

	const handleGroupData = async () => {
		if(groupId) {
			const groupData = await getGroupData3(groupId);
			groupData && groupData.status === true && setGroupInfo(groupData.data);
			console.log('groupData', groupData)
		}else{
			const groupData = await getGroupData(key, device, contactUserInfo);
			console.log('groupData', groupData)
			groupData && groupData.status === true && setGroupInfo(groupData.data);
		}
	}

	const getMessageType = (item) => {
		console.log(item, device)
		if(activeType === 2) {
            return '11';
        } else
            if(item.messageType.toString() === '0') {
                if(item.sender.id === device.UserId) {
                    return '1';
                }else{
                    return '2';
                }
            } else if(item.messageType.toString() === '5') {
                if(item.sender.id === device.UserId) {
                    return '7';
                }else{
                    return '7';
                }
            }
    }
	
	const handleNewMessage = async (newMessage) => {
		var _type = getMessageType(newMessage);
        var _temp = [...messages];
        var _item =  {
            id: _temp.length,
			messageId: newMessage.messageId,
            message: newMessage.message,
            type: _type,
            date: newMessage.date,
			readBy: false,
            readAt: newMessage.date,
        };
		if(typingStatus && typingStatus['status'] === true) {
			_temp.splice(_temp.length - 1, 0, _item)
		}else{
			_temp.push(_item);
		}
        setMessages(_temp);
		if(_type === '2') {
			groupInfo && sendReadByRequest(newMessage, groupInfo);
		}		
    }

	const handleReadState = (messageReadState) => {
        const _temp = [...messages];
        for(var i=0; i<messages.length; i++) {
            var _t = _temp[i];
            if(_t.messageId && _t.messageId > messageReadState.messageId) {
                break;
            }

            if(_t.type === '1') {
                _t.readBy = true;
            }
        }
        setMessages(_temp);
    }

	const makeHistoryItem = (index, item) => {
        return {
            id: index,
			messageId: item.messageId,
            name: 'Steve Williams',
            title: 'App Patent Registration',
            message: item.message,
            type: getMessageType(item),
			messageType: item.messageType,
            mailTo: item.mailTo,
            subject: item.subject,
            date: item.createdAt,
			readBy: item.readBy || false,
            readAt: item.readAt,
        };
    }

	const loadHistory = (messageList) => {
        var _temp = [];
        var me = device;
        var you = contactUserInfo;
        var history = messageList;
        for(var i = 0; i < history.length; i++) {
            var _item = makeHistoryItem(i, history[i]);
            _temp.push(_item);

			if(i === history.length - 1) {
                sendReadByRequest(history[i], groupInfo);
            }
        }
		console.log('_temp', _temp)
        setMessages(_temp);
    };

	const handleTypingStatus = (typingStatus) => {
        console.log('typingStatus', typingStatus)
		if(typingStatus && groupInfo && typingStatus.group.id === groupInfo.id && typingStatus.sender.id !== device.UserId) {
			var _temp = [...messages];
			if(typingStatus && typingStatus.status) {
				let _item = {
					id: _temp.length,
					type: '20',
				}
				_temp.push(_item);
				setMessages(_temp);
			}else{
				if(_temp.length > 0) {                
					let _item = _temp[_temp.length - 1];
					if(_item.type === '20') {
						_temp.splice(_temp.length - 1, 1);
					}
					
					setMessages(_temp);
				}
			}	
		}
        
    }

	const handleYReachEnd = () => {
	}

	const handleActiveType = (index) => {
		setActiveType(index);
	}

    return (
		<div className={classes.root}>
			<TopBar contactUserInfo={contactUserInfo} handleActiveType={(index) => handleActiveType(index)} />
			<div className={classes.container}>
				<PerfectScrollbar 
					option={{suppressScrollX: true}}
					onYReachEnd={handleYReachEnd}
					containerRef={(ref) => scrollRef = ref}>
					<div className={classes.content}>
						{
							messages.length > 0 && messages.map((message, index) =>
								<MessageItem 
									key={index.toString()}
									message={message}
								/>
							)
						}
					</div>
				</PerfectScrollbar>
			</div>
			<BottomBar contactInfo={contactUserInfo} groupInfo={groupInfo} />
		</div>
	);
};

export default MessageMainView;
