import type { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { useLocation, useParams } from 'react-router-dom';

import ResponseLayout from 'src/layouts/ResponseLayout';
import MessageListView from './MessageList';
import MessageMainView from './MessageMain';
import MessageWelcomeView from './MessageWelcome';
import MessageNewChatView from './MessageNewChat';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	class1: {
		flex: 1,
	},
	class2: {
		flex: 2,
	},
	class3: {
		flex: 1,
	},
}));

const MessageView: FC = (props) => {
    const classes = useStyles();
	let  { messageId } = useParams<{ messageId: string }>();
	const location = useLocation();
	console.log('location', location);
	console.log(messageId)
	const renderChild = () => 
	{
		switch (messageId) {
			case undefined:
				return (
					<ResponseLayout 
						_children={2} 
						children1={<MessageListView />}
						class1={classes.class1}
						children2={<MessageWelcomeView />}
						class2={classes.class2}
					/>
				);	
			case 'new-chat'	:
				return (
					<ResponseLayout 
						_children={2} 
						children1={<MessageListView />}
						class1={classes.class1}
						children2={<MessageNewChatView />}
						class2={classes.class2}
					/>
				);
			case 'chat'	:
				return (
					<ResponseLayout 
						_children={2} 
						children1={<MessageListView />}
						class1={classes.class1}
						children2={<MessageMainView />}
						class2={classes.class2}
						data={location.state}
						// children3={<></>}
						// class3={classes.class3}
					/>
				);
			default:
				return (
					<ResponseLayout 
						_children={2} 
						children1={<MessageListView />}
						class1={classes.class1}
						children2={<MessageMainView />}
						class2={classes.class2}
						// children3={<></>}
						// class3={classes.class3}
					/>
				);
		}
	}	

    return (
		<div className={classes.root}>
			{
				renderChild()
			}
		</div>
	);
};

export default MessageView;
