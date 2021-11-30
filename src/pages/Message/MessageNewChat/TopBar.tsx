import type { FC } from 'react';
import { makeStyles } from '@material-ui/core';


import fonts from 'src/constants/fonts';
import colors from 'src/constants/colors';
import { BAR_HEIGHT_V } from 'src/constants/constants';
import type { Theme } from 'src/theme';
import images from 'src/constants/images';
import { $font, $itemCenterH, $size, $style } from 'src/utils/font-utilts';
import AvatarText from 'src/components/Image/AvatarText';

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

const TopBar: FC = (props) => {
    const classes = useStyles();

    return (
		<div className={classes.root}
			style={$style([
				$itemCenterH(),
			])}>
			<div
				style={$style([
					{
						flex: 1,
						paddingLeft: 28,
					}
				])}>
				<AvatarText 
					img={images.avatar.userAvatar2} 
					text={'New Chat'}
					style={$style([

					])}
					styleContainer={$style([
						{
							backgroundColor: colors.$transparent,
							borderRadius: '50%',
							border: '3px solid ' + colors.$buttonGreen,					
						},
						$size(40, 40),
					])}
					styleImage={$style([
						{
							borderRadius: 19,
						},
						$size(40, 40),
					])}
					styleText={$style([
						{
							paddingLeft: 17,
						},
						$font(fonts.rubikMedium, colors.$secondaryBlue, 16), 
					])}
				/>
			</div>
			<div
				style={$style([
					{
						flex: 1,
					}
				])}>
				
			</div>
			<div
				style={$style([
					{
						flex: 1,
					}
				])}>

			</div>
		</div>
	);
};

export default TopBar;
