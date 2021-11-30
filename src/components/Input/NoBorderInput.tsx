import { FC, useState } from 'react';

import { $flexRow, $height, $itemCenter, $size, $style, $width } from 'src/utils/font-utilts';

import colors from 'src/constants/colors';
import images from 'src/constants/images';
import IconButton from '../Button/IconButton';

interface Props {
	placeholder?: string;
	inputStyle?: any;
	handleValueChange?: (str: string) => void;
}
const NoBorderInput: FC<Props> = (props) => {

	const [value, setValue] = useState('');

	const handleChange = (e) => {
		props.handleValueChange && props.handleValueChange(e.target.value);
		setValue(e.target.value);
	}
	return (
		<div
			style={$style([
				{
					paddingTop: 10,
					paddingBottom: 10,
					paddingLeft: '5%',
					paddingRight: '5%',
				}
			])}>
			<div
				style={$style([
					{						
						position: 'relative',
					},
					$height(40),
					$width('100%'),
					$flexRow(),
				])}>
				<input 
					type='text' 
					style={$style([
						{
							paddingLeft: '10px',
							border: 0,
							outline: 'none',
							flex: 1,
						},
						$height(38),
						props.inputStyle,
					])}
					onChange={(e) => handleChange(e)}
					value={value}
					placeholder={props.placeholder || ''}
				/>
			</div>
			
		</div>
	);
}

export default NoBorderInput;
