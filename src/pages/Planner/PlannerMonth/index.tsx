import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';

import TopBar from './TopBar';

import type { Theme } from 'src/theme';
import SwitchPlannerTab from 'src/components/Planner/SwitchPlannerTab';
import useAuth from 'src/hooks/useAuth';
import { $flex, $flexCol, $flexRow, $font, $itemCenter, $size, $style, $textCenter } from 'src/utils/font-utilts';
import colors from 'src/constants/colors';
import fonts from 'src/constants/fonts';
import MonthScheduleItem from 'src/components/Planner/MonthScheduleItem';
import { getPlannerList } from 'src/actions/plannerAction';


const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.children1.default,
		height: '100%',
		// width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	container1: {
		flex: 1,
		overflowY: 'auto',
		display: 'flex',
		flexDirection: 'column',
	},
	container2: {
		flex: 1,
		overflowY: 'auto',
		padding: '5px 0px 5px 5px',
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		padding: 2,
		paddingRight: 10,
	},
}));

export const dayWeekList = [
    {
        dayWeek: 'S',
    },
    {
        dayWeek: 'M',
    },
    {
        dayWeek: 'T',
    },
    {
        dayWeek: 'W',
    },
    {
        dayWeek: 'T',
    },
    {
        dayWeek: 'F',
    },
    {
        dayWeek: 'S',
    },
];

const PlannerMonthView: FC = (props) => {
	
    const classes = useStyles();

	const { key } = useAuth();
	
	const [currentMonth, setCurrentMonth] = useState(null);
    const [monthList, setMonthList] = useState(null);
	const [eventList, setEventList] = useState(null);

	useEffect(() => {
		initialSet();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
        if(currentMonth) {
			handleLoadData();
		}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMonth])

	useEffect(() => {
        if(eventList) {         
            currentMonth !== null && getCurrentMonth();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventList])	

	const initialSet = () => {
        const currentDate = moment().format('YYYY-MM-DD');
        setCurrentMonth(currentDate);
    }

	const handleLoadData = async () => {

		const startOfMonth = moment(currentMonth, 'YYYY-MM-DD').startOf('month').format('YYYY-MM-DD');
        const endOfMonth   = moment(currentMonth, 'YYYY-MM-DD').endOf('month').format('YYYY-MM-DD');

        let startDate = moment(startOfMonth, 'YYYY-MM-DD').add(getDayOfWeek(startOfMonth) * -1, 'days').format('YYYY-MM-DD');
        let endDate = moment(endOfMonth, 'YYYY-MM-DD').add(6 - getDayOfWeek(endOfMonth), 'days').format('YYYY-MM-DD');
 
        var value = {
            startDate: startDate,
            endDate: endDate,
        };

        const res = await getPlannerList(key, value);

        if(res && res.status === true) {
            var data = res.data;
            setEventList(data);
        }else if(res && res.status === false && res.error) {
            setEventList([]);
        }
    }

	const getCurrentMonth = () => {

        const startOfMonth = moment(currentMonth).startOf('month').format('YYYY-MM-DD');
        let startDate = moment(startOfMonth, 'YYYY-MM-DD').add(getDayOfWeek(startOfMonth) * -1, 'days').format('YYYY-MM-DD');

        const monthArray = [];

        for(var i=0; i<5; i++) {
            const weekArray = [];
            for(var j=0; j<7; j++) {
                var l = i*7 + j;
                let d = moment(startDate, 'YYYY-MM-DD').add(l, 'days').format('YYYY-MM-DD');
                const _arrTT = [];
                for(var k = 0; k < eventList.length; k++){
                    var _t = eventList[k];
                    if(d === _t.startDate){
                        _arrTT.push(_t);
                    }
                }
                weekArray.push({
                    d: getDay(d),
                    date: d,
                    flag: getCurrentFlag(d),
                    schedule: _arrTT,
                })
            }
            monthArray.push(weekArray);
        }
        setMonthList(monthArray);        
    }

	const getDayOfWeek = (day) => {
        return moment(day).day();
    }

    const getDay = (day) => {
        return moment(day).date();
    }

    const getCurrentFlag = (date) => {
        const currentDate = moment().format('YYYY-MM-DD');        
        const compareDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');        
        return moment(currentDate).isSame(compareDate);
    }
	
    return (
		<div className={classes.root}>
			<TopBar />
			<div className={classes.container1}>
				<SwitchPlannerTab active={'Month'} />
				<div className={classes.container2}>
					<div
						style={$style([
							{
								borderBottom: 'solid 2px rgba(50, 84, 131, 0.5)',
							},
							$flexRow(),
						])}>
						{
							dayWeekList.map((s, i) => 
								<div 
									key={i.toString()} 
									style={$style([
											{
												paddingTop: 5,
												flex: 1,
												borderLeft: 'solid 1px ' + colors.$bubbles,												
											},
											$flexCol(),
											$itemCenter(),
									])}>
									<div
										style={$style([
											{
											},
											$size(22, 22),
											$itemCenter(),
											$textCenter(),
											$flex(),
										])}>
										<span style={$style([
											$font(fonts.rubikMedium, colors.$secondaryBlue, 14, 18), 
										])}>{s.dayWeek}</span>
									</div>
								</div>
							)
						}
					</div>
					<PerfectScrollbar
						style={$style([
							{
								flex: 1,
							},
							$flexCol(),
						])}>
						<></>
						{
							monthList && monthList.length > 0 &&
							monthList.map((schedule, index) => 
								<MonthScheduleItem 
									schedule={schedule} 
									key={index.toString()}                 
								/>
							
							)
						}    
					</PerfectScrollbar>
				</div>
			</div>
		</div>
	);
};

export default PlannerMonthView;
