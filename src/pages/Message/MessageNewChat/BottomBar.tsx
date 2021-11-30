import { FC, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

import fonts from 'src/constants/fonts';
import colors from 'src/constants/colors';
import { BAR_HEIGHT_V, MessageTabs } from 'src/constants/constants';
import type { Theme } from 'src/theme';
import Avatar from 'src/components/Image/Avatar';
import images from 'src/constants/images';
import { $flexCol, $font, $height, $itemCenter, $itemCenterH, $itemCenterV, $size, $style, $textCenter, $width } from 'src/utils/font-utilts';
import IconButton from 'src/components/Button/IconButton';
import AvatarText from 'src/components/Image/AvatarText';
import SelectedTab from 'src/components/Button/SelectedTab';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: colors.$white,
		minHeight: 38,
		width: '100%',
		boxShadow: '0px 0px 10px 0px '+ colors.$barPrimaryBoxShadowColor,
		display: 'flex',
		flexDirection: 'row',
		padding: '18px 0px', 
	},
}));

const BottomBar: FC = (props) => {
    const classes = useStyles();

	const EditableInput = useRef();
	const { key, device, enableStatus, sendMessage } = useAuth();

	const contactInfo = {
		id: 3,
		contactId: 'RUTIS801FSJ',
		firstName: 'abc',
		lastName: 'def',
		contactUserId: 2,
		userId: 1,
	}

	const [message, setMessage] = useState(null);
	
	const handleChange = (e) => {
		if(EditableInput.current) {
			var _ref = EditableInput.current;
			var html = _ref['innerHTML'];
			setMessage(html);
		}
	}

	const handleSendClick = () => {
		sendMessage(message, contactInfo);
	}

    return (
		<div className={classes.root}
			style={$style([
				$itemCenterH(),
			])}>
			<div
				style={$style([
					$width(60),
					$flexCol(),
					$itemCenter(),
				])}>
				<IconButton 
					img={images.message.plusBlue2} 
					styleContainer={$style([
						{
							backgroundColor: colors.$transparent,	
						},
						$size(40, 40),
					])}
					styleShadow={$style([
						{
							padding: 0,
						},
						$itemCenter(),
						$size(40, 40),
					])}
				/>
			</div>
			<div
				style={$style([
					{
						flex: 1,
					},
				])}>
				<PerfectScrollbar style={$style([
						{
							borderRadius: 20,
							padding: '8px 10px',
							border: '2px solid ' + colors.$secondaryBlue,
							outline: 'none',
							maxHeight: 100,
						},
					])}>
					<div contentEditable 
						ref={EditableInput}
						style={$style([
							{
								outline: 'none',
							},
							$font(fonts.rubikRegular, colors.$black, 14, 20), 
						])} 
						// dangerouslySetInnerHTML={{__html: message}}
						onInput={(e) => handleChange(e)}
					/>
				</PerfectScrollbar>
			</div>
			<div
				style={$style([
					$width(60),
					$flexCol(),
					$itemCenter(),
				])}>
				<IconButton 
					onClick={() => handleSendClick()}
					img={images.message.senderWhite} 
					styleContainer={$style([
						{
							backgroundColor: colors.$transparent,	
						},
						$size(40, 40),
					])}
					styleShadow={$style([
						{
							padding: 0,
							backgroundColor: colors.$buttonGreen,	
							borderRadius: '50%',
							boxShadow: '0px 0px 10px 0px '+ colors.$barPrimaryBoxShadowColor,
						},
						$itemCenter(),
						$size(40, 40),
					])}
					styleImage={$style([
						{
							marginLeft: 3,
						},
						$size(15.5, 14.5),
					])}
				/>
			</div>
		</div>
	);
};

export default BottomBar;
