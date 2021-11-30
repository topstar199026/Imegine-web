import type { FC } from 'react';

import { $flexRow, $height, $itemCenter, $size, $style, $width } from 'src/utils/font-utilts';

import colors from 'src/constants/colors';
import images from 'src/constants/images';
import IconButton from '../Button/IconButton';

interface Props {
	searchString?: string;
	placeholder?: string;
	handleSearchStringChange?: (str: string) => void;
}
const SearchData2: FC<Props> = (props) => {

	const handleChange = (e) => {
		props.handleSearchStringChange(e.target.value);
	}
	return (
		<div
			style={$style([
				{
					paddingTop: 10,
					paddingBottom: 10,
					paddingLeft: 15, //'5%',
					paddingRight: 15, //'5%',
				}
			])}>
			<div
				style={$style([
					{						
						position: 'relative',							
						borderRadius: 16,
						// border: '3px solid ' + colors.$secondaryBlue,
						backgroundColor: colors.$backgroundGrey,
					},
					$height(40),
					$width('100%'),
					$flexRow(),
				])}>
				<input 
					type='text' 
					placeholder={props.placeholder || ''}
					style={$style([
						{
							backgroundColor: colors.$transparent,
							paddingLeft: '10px',
							border: 0,
							borderRadius: 16,
							outline: 'none',
							flex: 1,
						},
						$height(38),
					])}
					onChange={(e) => handleChange(e)}
					value={props.searchString || ''}
				/>
				<IconButton 
					img={images.message.searchBlue} 
					styleContainer={$style([
						{
							borderRadius: 16,
							backgroundColor: colors.$transparent,	
						},
						$size(40, 40),
					])}
					styleShadow={$style([
						{
							padding: 0,
							borderRadius: '0px 13px 13px 0px',
						},
						$itemCenter(),
						$size(40, 40),
					])}
				/>
			</div>
			
		</div>
	);
}

export default SearchData2;
