import type { FC } from 'react';
import { makeStyles } from '@material-ui/core';


import fonts from 'src/constants/fonts';
import colors from 'src/constants/colors';
import { BAR_HEIGHT_V, MessageTabs } from 'src/constants/constants';
import type { Theme } from 'src/theme';
import Avatar from 'src/components/Image/Avatar';
import images from 'src/constants/images';
import { $flex, $font, $height, $itemCenter, $itemCenterH, $itemCenterV, $size, $style, $textCenter } from 'src/utils/font-utilts';
import IconButton from 'src/components/Button/IconButton';
import AvatarText from 'src/components/Image/AvatarText';
import SelectedTab from 'src/components/Button/SelectedTab';
import { capitalize } from 'src/utils/string-utilts';

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
    handleClose?: () => void;
}

const TopBar: FC<Props> = (props) => {
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
						paddingLeft: 15,
					}
				])}>
				<IconButton 
					img={images.message.closeBlue} 
					styleContainer={$style([
						{
							backgroundColor: colors.$transparent,	
						},
						$size(24, 24),
					])}
					styleShadow={$style([
						{
							
						},
						$itemCenter(),
						$size(24, 24),
					])}
					styleImage={$style([
						{
						},
						$itemCenter(),
						$size(12, 12),
					])}
					onClick={() => props.handleClose && props.handleClose()}
				/>
			</div>
			<div
				style={$style([
					{
						flex: 1,
					},
					$flex(),
					$itemCenter(),
				])}>
				<span style={$style([
					$font(fonts.rubikMedium, colors.$secondaryBlue, 14, 18), 
				])}>{'New Event'}</span>
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
