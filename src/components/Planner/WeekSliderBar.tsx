import { FC, useEffect, useState } from 'react';
import {
	Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Slider from '@material-ui/core/Slider';

import { $size, $style, $width } from 'src/utils/font-utilts';
import colors from 'src/constants/colors';

interface Props {
	className?: any;
	handleChange?: (value) => void;
}

const marks = [
	{
	  value: 0,
	  label: '2 days',
	},
	{
	  value: 1,
	  label: '7 days',
	},
	{
	  value: 2,
	  label: '14 days',
	},
  ];

const WeekSliderBar: FC<Props> = (props) => {
	
	const [value, setValue] = useState(1);

	useEffect(() => {
		props.handleChange && props.handleChange(value);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value])

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div
			style={$style([
				{
					position: 'absolute',
					bottom: 15,
					right: 35,					
				},
				$width('25%'),
			])}>
			<Slider
				color={'primary'}
				value={value} 
				max={2}
				min={0}
				onChange={handleChange}
				marks={marks}
				step={1}
				aria-labelledby="input-slider"
			/>
		</div>
	);
}

export default WeekSliderBar;
