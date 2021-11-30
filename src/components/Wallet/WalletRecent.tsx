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

const WalletRecent: FC<Props> = (props) => {
	
	return (
		<div
			style={$style([
				{
					marginTop: 15,
					paddingLeft: 15,
					paddingRight: 15,
				},
				$flexCol(),
			])}>
			<div
				style={$style([
					{
						marginBottom: 10,
					},
					$flexRow(),
				])}>
				<span style={$style([
					{
						paddingTop: 1,
						flex: 1,
					},
					$font(fonts.rubikRegular, colors.$secondaryBlue, 12, 16, 0.8), 
				])}>{'Recent'}</span>
				<span style={$style([
					{
						paddingTop: 1,
					},
					$font(fonts.rubikBold, colors.$secondaryBlue, 11, 19.5, 0.8), 
				])}>{'Show more'}</span>
			</div>
			<div
				style={$style([
					{
						boxShadow: '0px 0px 10px 0px '+ colors.$backgroundGrey,
						minWidth: 50,
						border: '1px solid ' + colors.$backgroundGrey,
						borderRadius: 15,
						backgroundColor: colors.$backgroundGrey,	
						padding: 15,						
					},
				])}>
				<div
					style={$style([
						{
							width: '100%',
						},
						$flexRow(),
						$itemCenter(),
					])}>
					<div
						style={$style([
							{
								marginRight: 7,

							},
							$flexRow(),
							$itemCenter(),
						])}>
						<img src={images.wallet.walletRecent1} alt="" />
					</div>
					<div
						style={$style([
							{								
								flex: 1,
							},
							$flexCol(),
						])}>
						<span style={$style([
							{
								paddingTop: 1,
							},
							$font(fonts.rubikRegular, colors.$secondaryBlue, 18, 24), 
						])}>{'Train Pass'}</span>
					</div>
					<div
						style={$style([
							{
							},
							$flexCol(),
						])}>
						<span style={$style([
							{
								paddingTop: 1,
							},
							$font(fonts.rubikRegular, colors.$secondaryBlue, 11, 17, 0.4), 
						])}>{'JUN. 22'}</span>
					</div>
				</div>
				<div
					style={$style([
						{
							marginTop: 5,
							width: '100%',
						},
						$flexRow(),
						$itemCenter(),
					])}>
					<div
						style={$style([
							{
								marginRight: 7,

							},
							$flexRow(),
							$itemCenter(),
						])}>
						<img src={images.wallet.walletRecent2} alt="" />
					</div>
					<div
						style={$style([
							{								
								flex: 1,
							},
							$flexCol(),
						])}>
						<span style={$style([
							{
								paddingTop: 1,
							},
							$font(fonts.rubikRegular, colors.$secondaryBlue, 18, 24), 
						])}>{'Dinner ticket'}</span>
					</div>
					<div
						style={$style([
							{
							},
							$flexCol(),
						])}>
						<span style={$style([
							{
								paddingTop: 1,
							},
							$font(fonts.rubikRegular, colors.$secondaryBlue, 11, 17, 0.4), 
						])}>{'JUN. 22'}</span>
					</div>
				</div>
				<div
					style={$style([
						{
							marginTop: 5,
							width: '100%',
						},
						$flexRow(),
						$itemCenter(),
					])}>
					<div
						style={$style([
							{
								marginRight: 7,

							},
							$flexRow(),
							$itemCenter(),
						])}>
						<img src={images.wallet.walletRecent3} alt="" />
					</div>
					<div
						style={$style([
							{								
								flex: 1,
							},
							$flexCol(),
						])}>
						<span style={$style([
							{
								paddingTop: 1,
							},
							$font(fonts.rubikRegular, colors.$secondaryBlue, 18, 24), 
						])}>{'Movie discount'}</span>
					</div>
					<div
						style={$style([
							{
							},
							$flexCol(),
						])}>
						<span style={$style([
							{
								paddingTop: 1,
							},
							$font(fonts.rubikRegular, colors.$secondaryBlue, 11, 17, 0.4), 
						])}>{'JUN. 22'}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WalletRecent;
