import type { FC } from 'react';
import { makeStyles } from '@material-ui/core';


import fonts from 'src/constants/fonts';
import colors from 'src/constants/colors';

import type { Theme } from 'src/theme';
import { $flexCol, $font, $itemCenter, $size, $style, $textCenter } from 'src/utils/font-utilts';
import images from 'src/constants/images';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		// width: '100%',
		display: 'flex',
		flexDirection: 'column',
		borderLeft: '1px solid ' + colors.$containerBorderColor,
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

const MessageWelcomeView: FC = (props) => {
    const classes = useStyles();

    return (
		<div className={classes.root}>
			<div>
				<div>
					<span style={$style([
						$font(fonts.rubikMedium, colors.$secondaryBlue, 28, 37), 
					])}>{'Welcome to Desktop Version'}</span>
				</div>
				<div
					style={$style([
						{
							marginTop: 35,
						},
						$flexCol(),
						$itemCenter(),
					])} >
					<img src={images.message.robot} alt="" style={$style([
						{

						},
						$size(180, 166),
					])} />
				</div>
				<div
					style={$style([
						{
							marginTop: 35,
						},
						$flexCol(),
						$itemCenter(),
					])} >
					<span style={$style([
						{
							maxWidth: 280,
						},
						$textCenter(),
						$font(fonts.rubikRegular, colors.$secondaryBlue, 22, 29), 
					])}>{'You always can manage your active devices on your smartphone!'}</span>
				</div>
			</div>
		</div>
	);
};

export default MessageWelcomeView;
