import type { FC } from 'react';
import colors from 'src/constants/colors';
import moment from 'moment';
import { $flex, $flexCol, $flexRow, $font, $itemCenter, $itemCenterV, $size, $style, $width } from 'src/utils/font-utilts';

import ClickButton from 'src/components/Button/ClickButton';
import Avatar from 'src/components/Image/Avatar';
import images from 'src/constants/images';
import fonts from 'src/constants/fonts';

interface Props {
	message?: any;
}

const PlannerItem: FC<Props> = (props) => {
	
	const message = props.message;

	const formatTime = (date) => {
		return moment(date).format('HH:mm');
	}

	const SendItem = ({message}) => {
		return (
			<div			
				style={
					$style([{
							padding: '15px 15px 15px 15px',
						},
						// $width('100%'),	
						$flexRow(),
					])
				}>	
				<div			
					style={
						$style([{
							},
						])
					}>
				</div>			
				<div			
					style={
						$style([{
								flex: 1,
								paddingRight: 5,
							},
							$flexRow(),
						])
					}>
					<div			
						style={
							$style([{
									flex: 1,
								},
							])
						}>

					</div>
					<ClickButton
						styleContainer={$style([
							{
								boxShadow: '0px 0px 10px 0px '+ colors.$barPrimaryBoxShadowColor,
								maxWidth: '40%',
								minWidth: 50,
								border: '2px solid ' + colors.$bubbles,
								borderRadius: 15,
								borderTopRightRadius: 0,
								backgroundColor: colors.$bubbles,	
							},
						])}
						styleShadow={$style([
							{
								padding: 0,
								borderRadius: 13,
								borderTopRightRadius: 0,								
							},
							$size('100%', '100%'),
							$flexCol(),
						])}>
						<div			
							style={
								$style([{
										padding: '5px 10px 0px 10px',
										width: 'calc(100% - 20px)',
									},
								])
							}>
							<span style={$style([
								{
									width: '100%',
									wordWrap: 'break-word',
									display: 'inline-block',
									whiteSpace: 'pre-wrap',
								},
								$font(fonts.rubikRegular, colors.$secondaryBlue, 14, 22), 
							])}>{message.message}</span>
						</div>
						<div 
							style={$style([
								{
									padding: '0px 10px 5px 10px',
									width: 'calc(100% - 20px)',
									
								},
								$flex(),
								$itemCenter(),
							])}>
							<span style={{flex: 1}}></span>
							<span
								style={$style([
									{

									},
									$font(fonts.rubikRegular, colors.$secondaryBlue, 11, 17, 0.5), 
								])}>
								{
									formatTime(message.date).toString()
								}
							</span>
							{
								message.readBy === true &&
								<div
									style={$style([
										{
											borderRadius: 10,
											backgroundColor: colors.$checkboxBackgroundColor,
											marginLeft: 5,
										},
										$size(20, 20),
										$flex(),
										$itemCenter(),
									])}>
									<img src={images.message.checkGreen} alt='' />
								</div>
							}
							
						</div>
					</ClickButton>					
				</div>
				<div			
					style={
						$style([{
							},
							$width(50),
							$flex(),
							$itemCenterV(),
						])
					}>
					<ClickButton
						styleContainer={$style([
							{
								backgroundColor: colors.$transparent,	
							},
							$size(40, 40),
						])}
						styleShadow={$style([
							{
								padding: 0,
								borderRadius: '50%',
							},
							$itemCenterV(),
							$size(40, 40),
						])}>
						<Avatar 
							img={images.avatar.userAvatar2} 
							styleContainer={$style([
								{
									backgroundColor: colors.$transparent,
									borderRadius: '50%',
									border: '2px solid ' + colors.$buttonGreen,					
								},
								$size(40, 40),
							])}
							styleImage={$style([
								{
									borderRadius: 19,
								},
								$size(40, 40),
							])}
						/>
					</ClickButton>					
				</div>
			</div>
		);
	}

	const ReceiveItem = ({message}) => {
		return (
			<div			
				style={
					$style([{
							padding: '15px 15px 15px 15px',
						},
						// $width('100%'),	
						$flexRow(),
					])
				}>
				<div			
					style={
						$style([{
							},
							$width(50),
							$flex(),
							$itemCenterV(),
						])
					}>
					<ClickButton
						styleContainer={$style([
							{
								backgroundColor: colors.$transparent,	
							},
							$size(40, 40),
						])}
						styleShadow={$style([
							{
								padding: 0,
								borderRadius: '50%',
							},
							$itemCenterV(),
							$size(40, 40),
						])}>
						<Avatar 
							img={images.avatar.userAvatar2} 
							styleContainer={$style([
								{
									backgroundColor: colors.$transparent,
									borderRadius: '50%',
									border: '2px solid ' + colors.$buttonGreen,					
								},
								$size(40, 40),
							])}
							styleImage={$style([
								{
									borderRadius: 19,
								},
								$size(40, 40),
							])}
						/>
					</ClickButton>					
				</div>
				<div			
					style={
						$style([{
								flex: 1,
								paddingLeft: 5,
							},
							$flexRow(),
						])
					}>
					<ClickButton
						styleContainer={$style([
							{
								boxShadow: '0px 0px 10px 0px '+ colors.$barPrimaryBoxShadowColor,
								maxWidth: '40%',
								minWidth: 50,
								border: '2px solid ' + colors.$buttonGreen,
								borderRadius: 15,
								borderTopLeftRadius: 0,
								backgroundColor: colors.$transparent,	
							},
						])}
						styleShadow={$style([
							{
								padding: 0,
								borderRadius: 13,
								borderTopLeftRadius: 0,								
							},
							$size('100%', '100%'),
							$flexCol(),
						])}>
						<div			
							style={
								$style([{
										padding: '5px 10px 0px 10px',
										width: 'calc(100% - 20px)',
									},
								])
							}>
							<span style={$style([
								{
									width: '100%',
									wordWrap: 'break-word',
									display: 'inline-block',
									whiteSpace: 'pre-wrap',
								},
								$font(fonts.rubikRegular, colors.$secondaryBlue, 14, 22), 
							])}>{message.message}</span>
						</div>
						<div 
							style={$style([
								{
									padding: '0px 10px 5px 10px',
									width: 'calc(100% - 20px)',
									
								},
								$flex(),
								$itemCenter(),
							])}>
							<span style={{flex: 1}}></span>
							<span
								style={$style([
									{

									},
									$font(fonts.rubikRegular, colors.$secondaryBlue, 11, 17, 0.8), 
								])}>
								{
									formatTime(message.date).toString()
								}
							</span>
						</div>
					</ClickButton>
					
					<div			
						style={
							$style([{
									flex: 1,
								},
							])
						}>

					</div>
					
				</div>
				<div			
					style={
						$style([{
							},
						])
					}>
					
				</div>
			</div>
		);
	}

	const TypingItem = ({message}) => {
		return (
			<div			
				style={
					$style([{
							padding: '15px 15px 15px 15px',
						},
						// $width('100%'),	
						$flexRow(),
					])
				}>
				<div			
					style={
						$style([{
							},
							$width(50),
							$flex(),
							$itemCenter(),
						])
					}>
					<ClickButton
						styleContainer={$style([
							{
								backgroundColor: colors.$transparent,	
							},
							$size(40, 40),
						])}
						styleShadow={$style([
							{
								padding: 0,
								borderRadius: '50%',
							},
							$itemCenter(),
							$size(40, 40),
						])}>
						<Avatar 
							img={images.avatar.userAvatar2} 
							styleContainer={$style([
								{
									backgroundColor: colors.$transparent,
									borderRadius: '50%',
									border: '2px solid ' + colors.$buttonGreen,					
								},
								$size(40, 40),
							])}
							styleImage={$style([
								{
									borderRadius: 19,
								},
								$size(40, 40),
							])}
						/>
					</ClickButton>					
				</div>
				<div			
					style={
						$style([{
								flex: 1,
								paddingLeft: 5,
							},
							$flexRow(),
						])
					}>
					<ClickButton
						styleContainer={$style([
							{
								boxShadow: '0px 0px 10px 0px '+ colors.$barPrimaryBoxShadowColor,
								maxWidth: '40%',
								minWidth: 50,
								border: '2px solid ' + colors.$transparent,
								borderRadius: 15,
								borderTopLeftRadius: 0,
								backgroundColor: colors.$backgroundGray,	
							},
						])}
						styleShadow={$style([
							{
								padding: 0,
								borderRadius: 13,
								borderTopLeftRadius: 0,								
							},
							$size('100%', '100%'),
						])}>
						<div			
							style={
								$style([{
									padding: '0px 10px',
									},
								])
							}>
						</div>
					</ClickButton>
					
					<div			
						style={
							$style([{
									flex: 1,
								},
							])
						}>

					</div>
					
				</div>
				<div			
					style={
						$style([{
							},
						])
					}>
					
				</div>
			</div>
		);
	}
	

	const renderItem = (message) => {
		if(message.type === '1') 
			return (
				<SendItem 
					message={message}
				/>
			);
		else if(message.type === '2') 
			return (
				<ReceiveItem 
					message={message}
				/>
			);
		else if(message.type === '3') 
			return ;
		else if(message.type === '4') 
			return ;
		else if(message.type === '5') 
			return ;
		else if(message.type === '20') 
			return (
				<TypingItem 
					message={message}
				/>
			);
	}

	return (
		<div			
			style={
				$style([{
					},
					$width('100%'),	
				])
			}>
			{renderItem(message)}
		</div>		
	);
}

export default PlannerItem;
