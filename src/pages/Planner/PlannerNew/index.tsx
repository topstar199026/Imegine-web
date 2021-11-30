import { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';


import fonts from 'src/constants/fonts';
import colors from 'src/constants/colors';
import TopBar from './TopBar';

import type { Theme } from 'src/theme';
import NoBorderInput from 'src/components/Input/NoBorderInput';
import { $font, $style } from 'src/utils/font-utilts';
import PlannerDateTimePicker from 'src/components/Planner/PlannerDateTimePicker';
import PlannerSetOffice from 'src/components/Planner/PlannerSetOffice';
import PlannerRemind from 'src/components/Planner/PlannerRemind';
import PlannerRepeat from 'src/components/Planner/PlannerRepeat';
import PlannerAttach from 'src/components/Planner/PlannerAttach';
import PlannerNote from 'src/components/Planner/PlannerNote';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		borderLeft: '1px solid ' + colors.$containerBorderColor,
	},
	container: {
		flex: 1,
		overflowY: 'auto',
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		padding: 2,
	},
}));

interface Props {
    handleClose?: () => void;
}

var scrollRef;

const PlannerNew: FC<Props> = (props) => {
    const classes = useStyles();
	
	const [title, setTitle] = useState(null);
	const [officeFlag, setOfficeFlag] = useState(false);

	const handleTitleChange = (v) => {
		setTitle(v);
	}

	const handleOfficeFlagChange = (v) => {
		setOfficeFlag(v);
	}

    return (
		<div className={classes.root}>
			<TopBar handleClose={() => props.handleClose && props.handleClose()} />
			<div className={classes.container}>
				<PerfectScrollbar 
					option={{suppressScrollX: true}}
					
					containerRef={(ref) => scrollRef = ref}>
					<div className={classes.content}>
						<NoBorderInput 
							placeholder={'Title'}
							handleValueChange={handleTitleChange}
							inputStyle={$style([
								{

								},
								$font(fonts.rubikMedium, colors.$secondaryBlue, 27, 30, 0.8), 
							])}
						/>
						<PlannerDateTimePicker title={'Start date'} />
						<PlannerDateTimePicker title={'Finish date'} />
						<PlannerSetOffice 
							classes={{}} title={'Set out of office'} 
							handleValueChange={handleOfficeFlagChange}
						/>
						<PlannerRemind title={'Remind me'} />
						<PlannerRepeat title={'Repeat'} />
						<PlannerAttach title={'Attach'} />
						<PlannerNote title={'Note'} />
					</div>
				</PerfectScrollbar>
			</div>
		</div>
	);
};

export default PlannerNew;
