import type { FC } from 'react';
import {
	Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { $flex, $itemCenter, $size, $style, $width } from 'src/utils/font-utilts';
import colors from 'src/constants/colors';
import images from 'src/constants/images';
import ClickButton from './ClickButton';
interface Props {
	className?: any;
	data?: any;
	link?: string;
	onClick?: () => void;
}
const PlusButton: FC<Props> = (props) => {
		
	return (
		<div
			style={$style([
				{
					position: 'absolute',
					bottom: 25,
					right: '40%',					
				},
				
			])}>
				<ClickButton
					onClick={() => props.onClick && props.onClick()}
					styleContainer={$style([
						{
							boxShadow: '0px 0px 10px 0px '+ colors.$buttonGreen,
							borderRadius: 25,
						},
					])}
					styleShadow={$style([
						{
							padding: 0,
							borderRadius: 25,
							backgroundColor: colors.$transparent,								
						},
					])}>
					<div
						style={$style([
							{
								borderRadius: 25,
								backgroundColor: colors.$buttonGreen,
							},
							$size(50, 50),
							$flex(),
							$itemCenter(),
						])}>
						<img src={images.planner.plannerPlusWhite} alt='' />
					</div>
				</ClickButton>			
		</div>
	);
}

export default PlusButton;
