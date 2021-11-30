import type { FC } from 'react';
import {
	makeStyles
} from '@material-ui/core';
import { LEFT_BAR_WIDTH, MAIN_LEFT_MENU } from 'src/constants/constants';
import type { Theme } from 'src/theme';
import colors from 'src/constants/colors';
import IconBarTab from './IconBarTab';
import { $flex, $itemCenterH, $style, $width } from 'src/utils/font-utilts';


const useStyles = makeStyles((theme: Theme) => ({
	sideBar: {
		width: LEFT_BAR_WIDTH,
		minWidth: LEFT_BAR_WIDTH,
		maxWidth: LEFT_BAR_WIDTH,
		zIndex: 1,
		height: '100vh',
		backgroundColor: theme.palette.bar.default,
		boxShadow: '0px 0px 10px 0px '+ colors.$barPrimaryBoxShadowColor,
	},
}));

interface Props {
	className?: any;
	pathname?: any;
}
const MainSideBar: FC<Props> = (props) => {

	const classes = useStyles();

	return (
		<div
			className={classes.sideBar}			
			style={
				$style([
					$flex(),
					$itemCenterH(),
				])
			}>
			<div
				style={
					$style([
						$width('100%'),
					])
				}>
				{
					MAIN_LEFT_MENU.left.map((menu, index) => 
						<IconBarTab key={index.toString()} menu={menu} path={props.pathname} />
					)
				}
			</div>
			
		</div>
	);
}

export default MainSideBar;
