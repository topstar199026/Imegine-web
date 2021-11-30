import { useState } from 'react';
import type { FC } from 'react';
import {
	ListItem,
	makeStyles
} from '@material-ui/core';
import colors from 'src/constants/colors';
import { $style } from 'src/utils/font-utilts';

const useStyles = makeStyles(() => ({
	root: {
		backgroundColor: colors.$transparent,
		display: 'flex',
		flexDirection: 'row',
	},
	img: {

	},
}));

interface Props {
	default?: Number;
	styleContainer?: any;
	styleTab?: any;
	selectColor?: any;
	styleShadow?: any;
	styleText?: any;
	selectTextColor?: any;
	tabs?: any[];
	onHandleClick?: (index: Number) => void;
}
const SelectedTab: FC<Props> = (props) => {
	const classes = useStyles();

	const [selected, setSelected] = useState(props.default);

	const handleClick = (index) => {
		setSelected(index);
		props.onHandleClick && props.onHandleClick(index);
	}

	return (
		
		<div className={classes.root} style={props.styleContainer}>
			{
				props.tabs && props.tabs.length > 0 &&
				props.tabs.map((tab, index: Number) => 
					<div
						key={index.toString()}
						style={$style([
							{
								flex: tab.flex,
								backgroundColor: selected.toString() === index.toString() ? props.selectColor : colors.$transparent,
							},
							props.styleTab,
						])}>
						<ListItem style={props.styleShadow} button onClick={() => handleClick(index)}>
							<span style={$style([
								props.styleText,
								selected.toString() === index.toString() ? props.selectTextColor:{}					
							])}>
								{tab.text}
							</span>
						</ListItem>
					</div>
				)
			}			
		</div>
	);
}

export default SelectedTab;
