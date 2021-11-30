import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import fonts from 'src/constants/fonts';
import colors from 'src/constants/colors';
import images from 'src/constants/images';
import { $flex, $flexCol, $font, $itemCenter, $itemCenterH, $size, $style, $width } from 'src/utils/font-utilts';
import IconButton from 'src/components/Button/IconButton';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles(() => ({
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


var delayTimer = null;

interface Props {
    contactInfo?: any;
	groupInfo?: any;
}

const BottomBar: FC<Props> = (props) => {
    const classes = useStyles();

	const { key, device, sendMessage, sendTypingStatus } = useAuth();

	const contactInfo = props.contactInfo;
	const groupInfo = props.groupInfo;

	const [message, setMessage] = useState('');
	const [myTypingStatus, setMyTypingStatus] = useState(false);
	const [rows, setRows] = useState(1);
	useEffect(() => {
        groupInfo && sendTypingStatus(groupInfo, myTypingStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myTypingStatus])
	
	function handleDelay(){
		if (delayTimer) {
			clearInterval(delayTimer);
		}
		
		delayTimer = setTimeout(function(){
			handleTyping(false)
		}, 1000);
	}


	// const handleChange = (e) => {
	// 	if(EditableInput.current) {
	// 		var _ref = EditableInput.current;
	// 		var html = _ref['innerHTML'];
	// 		setMessage(html);
	// 		handleTyping(true);
	// 		handleDelay();
	// 	}
	// }

	const handleChange = (e) => {
		var value = e.target.value;
		let numberOfLineBreaks = (value.match(/\n/g) || []).length + 1;
		setRows(numberOfLineBreaks > 5 ? 5 : numberOfLineBreaks);
		setMessage(value)
		handleTyping(true);
		handleDelay();
	}

	const handleTyping = (_state) => {        
        setMyTypingStatus(_state);
    }

	const handleSendClick = () => {
		if(message.replace(/ /g, '') !== ''){
			groupInfo && sendMessage(message, groupInfo);
			groupInfo && setMessage('');
		}
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
					$flex(),
				])}>
				{/* <PerfectScrollbar style={$style([
						{
							borderRadius: 20,
							// padding: '8px 10px',
							border: '2px solid ' + colors.$secondaryBlue,
							outline: 'none',
							maxHeight: 100,
						},
					])}> */}
					<textarea  
						style={$style([
							{
								borderRadius: 20,
								border: '2px solid ' + colors.$secondaryBlue,
								outline: 'none',
								padding: '8px 10px',
								flex: 1,
								resize: 'none',
							},
							$font(fonts.rubikRegular, colors.$black, 14, 15), 
						])}
						rows={rows}
						spellCheck={false}
						onChange={(e) => handleChange(e)}
						value={message}
					/>
					{/* <div contentEditable 
						ref={EditableInput}
						style={$style([
							{
								outline: 'none',
							},
							$font(fonts.rubikRegular, colors.$black, 14, 20), 
						])} 
						dangerouslySetInnerHTML={{__html: message}}
						onInput={(e) => handleChange(e)}
					/> */}
				{/* </PerfectScrollbar> */}
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
