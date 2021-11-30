import type { FC } from 'react';
import {
	makeStyles
} from '@material-ui/core';
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
	styleImage?: any;
	img?: any;
}
const Avatar: FC<Props> = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root} style={props.styleContainer}>
			<img className={classes.img} style={props.styleImage} src={props.img} alt="" />
		</div>
	);
}

export default Avatar;
