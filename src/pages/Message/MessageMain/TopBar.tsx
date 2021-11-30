import type { FC } from 'react';
import { makeStyles } from '@material-ui/core';


import fonts from 'src/constants/fonts';
import colors from 'src/constants/colors';
import { BAR_HEIGHT_V, MessageTabs } from 'src/constants/constants';
import type { Theme } from 'src/theme';
import images from 'src/constants/images';
import { $font, $height, $itemCenterH, $itemCenterV, $size, $style } from 'src/utils/font-utilts';
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
    contactUserInfo?: any;
	handleActiveType?: (index) => void;
}

const TopBar: FC<Props> = (props) => {
    const classes = useStyles();
	const contactUserInfo = props.contactUserInfo;
	const useFullName = () => {
		return '';//capitalize(contactUserInfo.firstName) + ' ' + capitalize(contactUserInfo.lastName);
	}
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
					text={'Dr. ' + useFullName()}
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
				<SelectedTab 
					default={0}
					styleContainer={$style([
						{
							backgroundColor: colors.$tabBarBackgroundColor,
							borderRadius: 12,
						},
						$height(24),
					])}
					styleTab={$style([
						{
							borderRadius: 12,
						},
					])}
					selectColor={colors.$buttonGreen}
					selectTextColor={$font(fonts.rubikMedium, colors.$secondaryBlue, 13, 17, 1)}
					styleShadow={$style([
						{
							padding: 0,
							borderRadius: 12,
						},
						$height('100%'),
						$itemCenterV(),
					])}
					styleText={$style([
						{	
						},
						$font(fonts.rubikMedium, colors.$secondaryBlue, 13, 17, 0.4), 
					])}
					tabs={MessageTabs}
					onHandleClick={(index) => {props.handleActiveType && props.handleActiveType(index)}}
				/>
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
