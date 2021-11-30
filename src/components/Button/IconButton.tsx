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
	styleImage?: any;
	img?: any;
	to?: String;
	onClick?: () => void;
}
const IconButton: FC<Props> = (props) => {
	const classes = useStyles();

	return (
		
		<div className={classes.root} style={props.styleContainer}>
			{
				props.to ?
				<ListItem component={Link} to={props.to.toString()} style={props.styleShadow} button onClick={() => props.onClick && props.onClick()}>
					<img className={classes.img} style={props.styleImage} src={props.img} alt="" />
				</ListItem>
				:
				<ListItem style={props.styleShadow} button onClick={() => props.onClick && props.onClick()}>
					<img className={classes.img} style={props.styleImage} src={props.img} alt="" />
				</ListItem>				
			}
			
		</div>
	);
}

export default IconButton;
