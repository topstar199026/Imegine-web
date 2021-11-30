import { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useLocation, useParams } from 'react-router-dom';

import ResponseLayout from 'src/layouts/ResponseLayout';
import PlannerToday from './PlannerToday';
import PlannerWeek from './PlannerWeek';
import PlannerMonth from './PlannerMonth';
import PlannerNew from './PlannerNew';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	class1: {
		flex: 1,
	},
	class2: {
		flex: 2,
	},
	class3: {
		flex: 1,
	},
	classNew: {
		flex: 0.5,
		// transition: 'flex 3s',
	},
}));

const PlannerView: FC = (props) => {
    const classes = useStyles();
	let  { plannerId } = useParams<{ plannerId: string }>();
	let  { action } = useParams<{ action: string }>();
	const location = useLocation();
	console.log('location', plannerId, action, location);

	const [newPlannerView, setNewPlannerView] = useState(false);

	const handleNewPlanerView = () => {
		setNewPlannerView(!newPlannerView);
	}

	const renderChild = () => 
	{
		switch (plannerId) {
			case undefined:
				return (
					<ResponseLayout 
						_children={1} 
						children1={<PlannerToday />}
						class1={classes.class1}
					/>
				);	
			case 'week':
				return (
					<ResponseLayout 
						_children={1} 
						children1={<PlannerWeek handleNewPlanerView={() => handleNewPlanerView()}/>}
						class1={classes.class1}
						children2={
							newPlannerView ?
							<PlannerNew handleClose={() => handleNewPlanerView()}/>
							:
							null
						}
						class2={classes.classNew}
					/>
				);
			case 'month':
				return (
					<ResponseLayout 
						_children={1} 
						children1={<PlannerMonth />}
						class1={classes.class1}
					/>
				);
			default:
				return (
					<ResponseLayout 
						_children={2} 
						children1={<PlannerToday />}
						class1={classes.class1}
						children2={<PlannerToday />}
						class2={classes.class2}
						// children3={<></>}
						// class3={classes.class3}
					/>
				);
		}
	}	

    return (
		<div className={classes.root}>
			{
				renderChild()
			}
		</div>
	);
};

export default PlannerView;
