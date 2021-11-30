import { ReactNode } from 'react';
import type { FC } from 'react';
import {
	ListItem,
	makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import colors from 'src/constants/colors';

const useStyles = makeStyles(() => ({
	root: {
		backgroundColor: colors.$transparent,
	},
	img: {

	},
}));

interface Props {
	className?: any;
	styleContainer?: any;
	styleShadow?: any;
	to?: String;
	children?: ReactNode;
	onClick?: () => void;
}
const ClickButton: FC<Props> = (props) => {
	const classes = useStyles();

	return (
		
		<div className={classes.root} style={props.styleContainer}>
			{
				props.to ?
				<ListItem component={Link} to={props.to.toString()} style={props.styleShadow} button onClick={() => props.onClick && props.onClick()}>
					{props.children}
				</ListItem>
				:
				<ListItem style={props.styleShadow} button onClick={() => props.onClick && props.onClick()}>
					{props.children}
				</ListItem>				
			}
			
		</div>
	);
}

export default ClickButton;
