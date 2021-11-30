import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

import TopBar from './TopBar';

import type { Theme } from 'src/theme';
import MessageContactItem from 'src/components/Message/MessageContactItem';
import { loadGroupList } from 'src/models/AppDatabase';
import { useHistory } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.children1.default,
		height: '100%',
		// width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	container: {
		flex: 1,
		padding: '5px 0px 5px 5px',
		overflowY: 'auto',
		// height: 'calc(100% - ' + BAR_HEIGHT_V + 'px - 10px)',
		// maxHeight: 'calc(100% - ' + BAR_HEIGHT_V + 'px - 10px)',
	},
	content: {
		padding: 2,
		paddingRight: 10,
	},
}));

const MessageListView: FC = (props) => {
    const classes = useStyles();
	const history = useHistory();

	const { newMessage, typingStatus, messageReadState, device, key, sendReadByRequest, sendMessage, sendTypingStatus } = useAuth();
	
	const [list, setList] = useState([]);
    const [historyList, setHistoryList] = useState(null);

	useEffect(() => {
		handleLoadHistory();
		return () => {
		
		}
	}, [])

	useEffect(() => {
        (async () => {
            newMessage  && Object.keys(newMessage).length > 0 && 
            setTimeout(() => {
                handleLoadHistory();
            }, 200);

        })();
    }, [newMessage]);

	const handleLoadHistory = async () => {
		const groupList = await loadGroupList();
		console.log('group list', groupList)
		setList(groupList);
	}

    return (
		<div className={classes.root}>
			<TopBar />
			<div className={classes.container}>
				<PerfectScrollbar>
					<div className={classes.content}>
						{
							list && list.length > 0 &&
							list.map((item, index) =>
								<MessageContactItem 
									key={index.toString()}
									item={item}
									onClick={(contactInfo) => {
										console.log('click history', item, contactInfo)
										history.push({
											pathname: '/page/message/chat',
											state: {
												contact: contactInfo,
												groupId: item.id,
											}
										})
									}}
								/>
							)
						}
					</div>
				</PerfectScrollbar>
			</div>
		</div>
	);
};

export default MessageListView;
