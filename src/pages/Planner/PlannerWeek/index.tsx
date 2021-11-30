import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import { useHistory } from "react-router-dom";

import TopBar from './TopBar';

import type { Theme } from 'src/theme';
import SwitchPlannerTab from 'src/components/Planner/SwitchPlannerTab';
import { $flex, $flexCol, $flexRow, $font, $itemCenter, $size, $style, $textCenter } from 'src/utils/font-utilts';
import fonts from 'src/constants/fonts';
import colors from 'src/constants/colors';
import WeekScheduleItem from 'src/components/Planner/WeekScheduleItem';
import { getPlannerList } from 'src/actions/plannerAction';
import useAuth from 'src/hooks/useAuth';
import WeekSliderBar from 'src/components/Planner/WeekSliderBar';
import PlusButton from 'src/components/Button/PlusButton';


const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.children1.default,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
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

export const _weekList = [    
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S',
];

interface Props {
    handleNewPlanerView?: () => void;
}

const PlannerWeekView: FC<Props> = (props) => {
    const classes = useStyles();
	const history = useHistory();
	const { key } = useAuth();
	
	const [weekViewFlag, setWeekViewFlag] = useState(1);
	const [currentDate, setCurrentDate] = useState(null);
	const [dayList, setDayList] = useState([]);
	const [weekList, setWeekList] = useState(null);
	const [scheduleList,setScheduleList] = useState([]);
	const [eventList, setEventList] = useState(null);

	useEffect(() => {
		initialSet();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
        currentDate && getCurrentWeek();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDate])

	useEffect(() => {
		if(weekList) handleLoadData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [weekList])

	useEffect(() => {
		currentDate && getCurrentWeek();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [weekViewFlag])

	useEffect(() => {
		if(eventList) {
			const arr = hourScheduleMake();
			setScheduleList(arr);  
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventList])
	
	const initialSet = () => {
		const currentDate = moment().format('YYYY-MM-DD');
        setCurrentDate(currentDate);
	}

	const handleLoadData = async () => {

		const startDate = weekList[0]._data;
        const endDate   = weekList[weekList.length - 1]._data;

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

	const hourScheduleMake = () => {
		const _arr = [];
        const _arrExam = eventList;
        for(var i = 0; i <= 23; i++) {
            var format = 'HH:mm:ss';
            var _s = (i < 10 ? '0' : '') + i.toString() + ':00:00';
            var _e = (i < 10 ? '0' : '') + i.toString() + ':59:59';
            var _sT = moment(_s, format);
            var _eT = moment(_e, format);
            const _arrT = [];
            for(var j = 0; j < weekList.length; j++) {
                const _weekDayC = weekList[j]._data;
                const _arrTT = [];
                for(var k = 0; k < _arrExam.length; k++){
                    var _t = _arrExam[k];
                    // var _tT = moment(_t.time + ':00', format);
                    var _tT = moment(_t.startTime, format);
                    if(_weekDayC === _t.startDate &&  _tT.isBetween(_sT, _eT)){
                        // console.log('-------', _t)
                        _arrTT.push({
                            item: _t,
                        });
                    }
                }
                _arrT.push({
                    item: _arrTT,
                    flag: getCurrentFlag(_weekDayC),
                });
            }

            _arr.push({
                id: i,
                // time: (i < 10 ? '0' : '') + i.toString() + ':00',
                time: (i < 10 ? '0' : '') + i.toString() + 'h',
                schedule: _arrT,
            })

        }
        return _arr;
    }

	const getCurrentWeek = () => {

        const startOfWeek = moment(currentDate, 'YYYY-MM-DD').startOf('week').format('YYYY-MM-DD');
        const endOfWeek   = moment(currentDate, 'YYYY-MM-DD').endOf('week').format('YYYY-MM-DD');
        makeWeekList(startOfWeek);
    }

	const getDayOfWeek = (_day) => {
        return moment(_day, 'YYYY-MM-DD').day();
    }

    const getDay = (_day) => {
        return moment(_day, 'YYYY-MM-DD').date();
    }

    const getCurrentFlag = (_date) => {
        const currentDate = moment().format('YYYY-MM-DD');
        const compareDate = moment(_date, 'YYYY-MM-DD').format('YYYY-MM-DD');
        return moment(currentDate).isSame(compareDate);
    }

	const makeWeekList = (startOfWeek) => {
		let startDay = weekViewFlag === 0 ? moment().format('YYYY-MM-DD') : startOfWeek;
		let dayLength = weekViewFlag === 0 ? 2 : 7 * weekViewFlag;

        const arr = [];
        for(var i = 0; i < dayLength; i++) {
            const _cD = moment(startDay, 'YYYY-MM-DD').add(i,'days').format('YYYY-MM-DD');
            arr.push(
                {
                    dayWeek: _weekList[getDayOfWeek(_cD)],
                    date: getDay(_cD),
					_data: _cD,
                    flag:  getCurrentFlag(_cD
                        // moment(startOfWeek, 'YYYY-MM-DD').format('YYYY-MM') + '-' + ( getDay(_cD) < 9 ? '0' : '') + getDay(_cD).toString()
                    ),
                }
            );
        }
        setWeekList(arr);
    }

	const handleChange = (v) => {
		console.log(v)
		setWeekViewFlag(v);
	}

	const handleNewPlanner = () => {
		props.handleNewPlanerView && props.handleNewPlanerView();
		// history.push({
		// 	pathname: '/page/planner/week',
		// 	// state: {
		// 	// 	contact: contact.item,
		// 	// 	groupId: null,
		// 	// }
		// })	
	}

    return (
		<div className={classes.root}>
			<TopBar />
			<div className={classes.container1}>
				<SwitchPlannerTab active={'Week'} />
				<div className={classes.container2}>
					<div
						style={$style([
							{
								borderBottom: 'solid 2px rgba(50, 84, 131, 0.5)',
							},
							$flexRow(),
						])}>
						<div style={{width: 50,}}>
							
						</div>
						{
							weekList && weekList.length > 0 &&
							weekList.map((s, i) => 
								<div 
									key={i.toString()} 
									style={$style([
											{
												paddingTop: 5,
												flex: 1,
												borderLeft: 'solid 1px ' + colors.$bubbles,												
											},
											s.flag === true ?
											{
												backgroundColor: 'rgba(84, 229, 225, 0.25)',
												borderRadius: '10px 10px 0px 0px'
											} : {},
											$flexCol(),
											$itemCenter(),
									])}>
									<div
										style={$style([
											{
											},
											s.flag === true ?
											{
												borderRadius: 11,
												backgroundColor: '#54E5FF',
											} : {},
											$size(22, 22),
											$itemCenter(),
											$textCenter(),
											$flex(),
										])}>
										<span style={$style([
											$font(fonts.rubikMedium, colors.$secondaryBlue, 14, 18), 
										])}>{s.dayWeek}</span>
									</div>
									<div
										style={$style([
											$size(22, 22),
											$textCenter(),
										])}>
										<span style={$style([
											$font(fonts.rubikMedium, colors.$secondaryBlue, 14, 18), 
										])}>{s.date}</span>
									</div>
								</div>
							)
						}
					</div>
					<PerfectScrollbar
						style={$style([
							{
								flex: 1,
							}
						])}>
						<></>
						{
							weekList && weekList.length > 0 &&
							scheduleList.map((schedule, index) => 
								<WeekScheduleItem 
									schedule={schedule} 
									weekList={weekList} 
									key={index.toString()}                 
								/>
							
							)
						}    
					</PerfectScrollbar>
				</div>
			</div>
			<PlusButton 
				data={
					{
						view: 'planner',
						subView: 'week',
						action: 'new',
					}
				} 
				onClick={() => handleNewPlanner()}
			/>
			<WeekSliderBar 
				handleChange={(v) => handleChange(v)}
			/>
		</div>
	);
};

export default PlannerWeekView;
