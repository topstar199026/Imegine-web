import type { FC } from 'react';
import colors from 'src/constants/colors';
import moment from 'moment';
import { $flex, $flexCol, $flexRow, $font, $itemCenter, $itemCenterV, $size, $style, $width } from 'src/utils/font-utilts';

import ClickButton from 'src/components/Button/ClickButton';
import Avatar from 'src/components/Image/Avatar';
import images from 'src/constants/images';
import fonts from 'src/constants/fonts';

interface ItemProps {
	image?: string;
	title?: string;
	subTitle?: string;
	number?: number;
}

const Item: FC<ItemProps> = (props) => {
	return (
		<div
			style={$style([
				{
					flex: 1,
				},
			])}>
			<ClickButton
				styleContainer={$style([
					{
						boxShadow: '0px 0px 10px 0px '+ colors.$barPrimaryBoxShadowColor,
						minWidth: 50,
						border: '2px solid ' + colors.$bubbles,
						borderRadius: 15,
						backgroundColor: colors.$secondaryBlue,	
						height: 72,
					},
				])}
				styleShadow={$style([
					{
						padding: 0,
						borderRadius: 13,						
						alignItems: 'flex-start',
						justifyContent: 'center',
						paddingLeft: 15,
					},
					$size('100%', '100%'),
					$flexCol(),
				])}>
				<div
					style={$style([
						{

						},
						$flexRow(),
					])}>
					<img src={props.image && props.image} alt="" />
					{
						props.number &&
						<div
							style={$style([
								{
									borderRadius: 7.5,
									backgroundColor: colors.$buttonGreen,
									marginLeft: 7,
								},
								$size(15, 15),
								$flex(),
								$itemCenter(),
							])}>
							<span style={$style([
								{
									paddingTop: 1,
								},
								$font(fonts.rubikMedium, colors.$white, 8, 7), 
							])}>{props.number.toString()}</span>
						</div>
					}
				</div>
				<span style={$style([
					{
						paddingTop: 1,
					},
					$font(fonts.rubikBold, colors.$white, 16, 26), 
				])}>{'Warranties'}</span>
				<span style={$style([
					$font(fonts.rubikRegular, colors.$white, 11, 17), 
				])}>{'(2) This month'}</span>
			</ClickButton>	
		</div>
	);
}

interface Props {
	message?: any;
}

const WalletItemCard: FC<Props> = (props) => {
	
	return (
		<div
			style={$style([
				{
					paddingLeft: 15,
					paddingRight: 15,
				},
				$flexRow(),
			])}>
			<Item 
				image={images.wallet.walletItem1} 
				title={'Warranties'}
				subTitle={'(2) This month'}
			/>
			<div style={{width: 20}}></div>
			<Item 
				image={images.wallet.walletItem2} 
				title={'Contracts'}
				subTitle={'(1) This month'}
			/>
			<div style={{width: 20}}></div>
			<Item 
				image={images.wallet.walletItem3} 
				title={'Invoices'}
				subTitle={'(11) This month'}
				number={3}
			/>
			<div style={{width: 20}}></div>
			<Item 
				image={images.wallet.walletItem4} 
				title={'Boarding Pa.'}
				subTitle={'(2) This month'}
			/>
		</div>
	);
}

export default WalletItemCard;
