import type { FC } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
}));

const TodoView: FC = (props) => {
	console.log('MessageView', props)
    const classes = useStyles();

    return (
		<div className={classes.root}>
			Todo
		</div>
	);
};

export default TodoView;
