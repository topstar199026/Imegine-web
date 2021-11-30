import type { FC } from 'react';
import { makeStyles } from '@material-ui/core';


import fonts from 'src/constants/fonts';
import colors from 'src/constants/colors';
import { BAR_HEIGHT_V } from 'src/constants/constants';
import type { Theme } from 'src/theme';
import images from 'src/constants/images';
import { $font, $itemCenterH, $style } from 'src/utils/font-utilts';
import IconButton from 'src/components/Button/IconButton';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.bar.default,
		height: BAR_HEIGHT_V,
		width: '100%',
		boxShadow: '0px 0px 10px 0px '+ colors.$barPrimaryBoxShadowColor,
		display: 'flex',
		flexDirection: 'row',
		padding: 0, 
	},
}));

interface Props {
}

const TopBar: FC<Props> = (props) => {
    const classes = useStyles();	

	const handleNewChat = () => {
		console.log('sdf')
	}

    return (
		<div className={classes.root}
			style={$style([
				$itemCenterH(),
			])}>
			<div
				style={{
					flex: 1,
					paddingLeft: 28,
				}}>
				<div>
					<span style={$style([
						$font(fonts.rubikMedium, colors.$secondaryBlue, 17, 20), 
					])}>{'June 21'}</span>
				</div>
			</div>
			<div
				style={{
					paddingTop: 2,
					paddingRight: 10,
				}}>
				<IconButton 
					img={images.message.searchBlue} 
					styleContainer={{
						backgroundColor: colors.$transparent,			
					}}
					to={'/page/planner/search'}
					onClick={() => handleNewChat()}
				/>
			</div>
		</div>
	);
};

export default TopBar;
