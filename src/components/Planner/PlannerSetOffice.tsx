import { FC, useState } from 'react';
import { createStyles, FormControlLabel, Switch, SwitchClassKey, SwitchProps, Theme, withStyles } from '@material-ui/core';

import { $flex, $flexRow, $font, $itemCenterH, $size, $style } from 'src/utils/font-utilts';

import colors from 'src/constants/colors';
import images from 'src/constants/images';
import fonts from 'src/constants/fonts';
import ClickButton from '../Button/ClickButton';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
	focusVisible?: string;
}

interface Props extends SwitchProps {
	classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
	createStyles({
		root: {
			width: 42,
			height: 26,
			padding: 0,
			// margin: theme.spacing(1),
		},
		switchBase: {
			padding: 1,
			'&$checked': {
				transform: 'translateX(16px)',
				color: theme.palette.common.white,
				'& + $track': {
					backgroundColor: colors.$buttonGreen,
					opacity: 1,
					border: 'none',
				},
			},
			'&$focusVisible $thumb': {
				color: colors.$buttonGreen,
				border: '6px solid #fff',
			},
		},
		thumb: {
			width: 24,
			height: 24,
		},
		track: {
			borderRadius: 26 / 2,
			border: `0px solid ${theme.palette.grey[400]}`,
			backgroundColor: colors.$searchFilter,
			opacity: 1,
			transition: theme.transitions.create(['background-color', 'border']),
		},
		checked: {},
		focusVisible: {},
	}),
)(({ classes, ...props }: Props) => {
	return (
		<Switch
			focusVisibleClassName={classes.focusVisible}
			disableRipple
			classes={{
				root: classes.root,
				switchBase: classes.switchBase,
				thumb: classes.thumb,
				track: classes.track,
				checked: classes.checked,
			}}
			{...props}
		/>
	);
});


interface Props {
	title?: string;
	classes: Styles;
	handleValueChange?: (v) => void;
}
const PlannerSetOffice: FC<Props> = (props) => {

	const [value, setValue] = useState(false);

	const handleChange = () => {
		setValue(!value);
		props.handleValueChange && props.handleValueChange(!value);
	};

	return (
		<div
			style={$style([
				{
					borderBottom: '1px solid rgba(50, 84, 131, 0.5)',
				},
				
			])}>
			<ClickButton
				styleContainer={$style([
					{
						backgroundColor: colors.$transparent,	
					},
				])}
				styleShadow={$style([
					{
						padding: '0px 25px',
						height: 56,						
					},
					$flexRow(),
					$itemCenterH(),
				])}>
				<div
					style={$style([
						{
							
						},
						$flex(),
						$itemCenterH(),
					])}>
					<img 
						style={$style([$size(22, 18)])} 
						src={images.planner.plannerOfficeBlue4x} alt='' 
					/>
				</div>
				<div
					style={$style([
						{
							flex: 1,
							paddingLeft: 15,
						},
						$flex(),
						$itemCenterH(),
					])}>
					<span style={$style([
						$font(fonts.rubikRegular, colors.$secondaryBlue, 14, 18), 
					])}>{props.title || 'Set out of office'}</span>
				</div>
				<div
					style={$style([
						{
						},
						$flex(),
						$itemCenterH(),
					])}>
					<FormControlLabel
						control={<IOSSwitch checked={value} onChange={handleChange} />}
						label={''}
						style={$style([
							{
								margin: 0,
							}
						])}
					/>
				</div>
			</ClickButton>
		</div>
	);
}

export default PlannerSetOffice;
