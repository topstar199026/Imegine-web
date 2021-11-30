import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

import TopBar from './TopBar';

import type { Theme } from 'src/theme';
import MessageContactItem from 'src/components/Message/MessageContactItem';
import SwitchPlannerTab from 'src/components/Planner/SwitchPlannerTab';
import moment from 'moment';
import TodayScheduleItem from 'src/components/Planner/TodayScheduleItem';
import { $style } from 'src/utils/font-utilts';
import { getPlannerList } from 'src/actions/plannerAction';
import useAuth from 'src/hooks/useAuth';


const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.children1.default,
		height: '100%',
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
	},
	content: {
		padding: 2,
		paddingRight: 10,
	},
}));

export const dayEventList = [
    {
        id: 1, 
        time: '09:30',
        title: 'Meet with Friends',
    },
    {
        id: 2, 
        time: '10:10',
        title: 'Meet with Friends',
    },
    {
        id: 3, 
        time: '10:40',
        title: 'Meet with Friends',
    },
    {
        id: 4, 
        time: '12:40',
        title: 'Meet with Friends',
    },
    {
        id: 5, 
        time: '13:10',
        title: 'Meet with Friends',
    },
    {
        id: 6, 
        time: '14:10',
        title: 'Meet with Friends',
    },
    {
        id: 7, 
        time: '14:30',
        title: 'Meet with Friends',
    },
    {
        id: 8, 
        time: '16:30',
        title: 'Meet with Friends',
    },
    {
        id: 9, 
        time: '18:20',
        title: 'Meet with Friends',
    },
    {
        id: 10, 
        time: '19:20',
        title: 'Meet with Friends',
    },
];

const PlannerTodayView: FC = (props) => {
    const classes = useStyles();

    const { newMessage, typingStatus, messageReadState, device, key, sendReadByRequest, sendMessage, sendTypingStatus } = useAuth();
    
	const [scheduleList,setScheduleList] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [eventList, setEventList] = useState(null);
    
    useEffect(() => {        
        handleLoadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(eventList) {
            const arr = hourScheduleMake();
            setScheduleList(arr);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventList])

    const handleLoadData = async () => {
        let startDate = moment()
            .startOf('day')
            .format('YYYY-MM-DD');

        let endDate = moment()
            .startOf('day')
            .format('YYYY-MM-DD');

        console.log(startDate, endDate);

        var value = {
            startDate: startDate,
            endDate: endDate,
        };

        const res = await getPlannerList(key, value);

        if(res && res.status === true) {
            var data = res.data;
            console.log('data', data);
            setEventList(data);
        }else if(res && res.status === false && res.error) {
            setEventList([]);
        }
    }

    const getExpandedItemCount = (_scheduleList) => {
        let count = 0;
        for(let i=0; i<_scheduleList.length; i++){
            for(let j=0; j<_scheduleList[i].schedule.length; j++){
                if(_scheduleList[i].schedule[j].expanded === true) count++;
            }
        }
        return count;
    }

    const toggleExpanded = (i, j) => {
        // console.log(scheduleList[i].schedule[j], i, j);
        const _prev = [...scheduleList];        
        if(_prev[i].schedule[j].expanded === false && expanded === false) {
            _prev[i].schedule[j].expanded = !_prev[i].schedule[j].expanded;
            setExpanded(!expanded);
            setScheduleList(_prev);
        }else if(_prev[i].schedule[j].expanded === false && expanded === true) {
            _prev[i].schedule[j].expanded = !_prev[i].schedule[j].expanded;
            setScheduleList(_prev);
        }else if(_prev[i].schedule[j].expanded === true && expanded === true) {
            getExpandedItemCount(_prev) < 2 && setExpanded(!expanded);
            _prev[i].schedule[j].expanded = !_prev[i].schedule[j].expanded;
            setScheduleList(_prev);
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
            for(var j = 0; j < _arrExam.length; j++){
                var _t = _arrExam[j];
                var _tT = moment(_t.startTime, format);
                if(_tT.isBetween(_sT, _eT)){
                    _arrT.push({
                        expanded: false,
                        item: _t,
                    });
                }
            }
            _arr.push({
                id: i,
                time: (i < 10 ? '0' : '') + i.toString() + ':00',
                schedule: _arrT,
            })

        }
        return _arr;
    }
	
    return (
		<div className={classes.root}>
			<TopBar />
			<div className={classes.container1}>
				<SwitchPlannerTab active={'Today'} />
				<div className={classes.container2}>
					<PerfectScrollbar
                        style={$style([
                            {
                                padding: '0px 15px'
                            },
                        ])}>
                        {
                            scheduleList.length > 0 && scheduleList.map((schedule, index) =>
                                <TodayScheduleItem 
                                    key={index.toString()}
                                    index={index}
                                    // toggleMapWithModal={() => props.toggleMapWithModal()}
                                    toggleExpanded={(i, j) => toggleExpanded(i, j)} 
                                    expanded={expanded} 
                                    schedule={schedule}                    
                                />
                            )
                        }
					</PerfectScrollbar>
				</div>
			</div>
		</div>
	);
};

export default PlannerTodayView;
