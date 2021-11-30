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

const WalletUpcoming: FC<Props> = (props) => {
	
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
					}
				])}>
				<span style={$style([
					{
						paddingTop: 1,
					},
					$font(fonts.rubikRegular, colors.$secondaryBlue, 12, 16, 0.8), 
				])}>{'Upcoming events'}</span>
			</div>
			<div
				style={$style([
					{
						flex: 1,
					},
				])}>
				<ClickButton
					styleContainer={$style([
						{
							boxShadow: '0px 0px 10px 0px '+ colors.$buttonGray,
							minWidth: 50,
							border: '2px solid ' + colors.$white,
							borderRadius: 15,
							backgroundColor: colors.$white,	
							height: 56,
						},
					])}
					styleShadow={$style([
						{
							padding: 0,
							borderRadius: 13,			
							paddingLeft: 15,
						},
						$size('100%', '100%'),
						$flexRow(),
					])}>
					<div
						style={$style([
							{
								marginRight: 7,
							},
							$flexRow(),
						])}>
						<img src={images.wallet.starBlue} alt="" />
					</div>
					<div
						style={$style([
							{},
							$flexCol(),
						])}>
						<span style={$style([
							{
								paddingTop: 1,
							},
							$font(fonts.rubikRegular, colors.$secondaryBlue, 11, 18), 
						])}>{'Boarding pass'}</span>
						<span style={$style([
							{
								paddingTop: 1,
							},
							$font(fonts.rubikRegular, colors.$secondaryBlue, 14, 18), 
						])}>{'Train to France'}</span>
					</div>
				</ClickButton>	
			</div>
		</div>
	);
}

export default WalletUpcoming;
