import type { FC } from 'react';
import {
	makeStyles
} from '@material-ui/core';
import colors from 'src/constants/colors';
import Avatar from './Avatar';

const useStyles = makeStyles(() => ({
	root: {
		backgroundColor: colors.$transparent,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	img: {

	},
}));

interface Props {
	className?: any;
	style?: any;
	styleContainer?: any;
	styleImage?: any;
	styleText?: any;
	img?: any;
	text?: String;
}
const AvatarText: FC<Props> = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root} style={props.style}>
			<Avatar 
				img={props.img} 
				styleContainer={props.styleContainer}
				styleImage={props.styleImage}
			/>
			<span style={props.styleText}>{props.text}</span>
		</div>
	);
}

export default AvatarText;
