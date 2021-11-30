import type { FC } from 'react';
import {
	ListItem,
	makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import type { Theme } from 'src/theme';
import colors from 'src/constants/colors';
import { $flexCol, $font, $itemCenter, $style } from 'src/utils/font-utilts';
import fonts from 'src/constants/fonts';


const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		height: 65,
	}
}));

interface Props {
	className?: any;
	menu?: any;
	path?: any;
}
const IconBarTab: FC<Props> = (props) => {
	const {menu, path} = props;
	const _current = path === menu.action;
	// const basic = useSelector((state) => state.basic);

	const classes = useStyles();

	return (
		<ListItem component={Link} to={menu.action} className={classes.root} button>
			<div 
				className={classes.root}
				style={
					$style([
						$flexCol(),
						$itemCenter(),
					])
				}>
					
				<div>
					<img src={_current ? menu.icon[1] : menu.icon[0]} alt="" />
				</div>
				<div
					style={
						$style([
							$font(fonts.rubikRegular, _current ? colors.$buttonGreen : colors.$secondaryBlue, 11, 16), 
						])
					}>
					{menu.title}
				</div>
			</div>
		</ListItem>
	);
}

export default IconBarTab;
