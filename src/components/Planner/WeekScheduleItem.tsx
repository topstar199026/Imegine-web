import { FC, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import colors from 'src/constants/colors';
import fonts from 'src/constants/fonts';
import { $flexCol, $flexRow, $font, $itemCenter, $itemCenterH, $style, $width } from 'src/utils/font-utilts';
import ClickButton from '../Button/ClickButton';

interface Props2 {
    schedule?: any;
}

const ScheduleItem: FC<Props2> = (props) => {
    const item = props.schedule.item;
    return (
        <ClickButton
			styleContainer={$style([
				{
					padding: 0,
				},
                $width('100%'),
			])}
			styleShadow={$style([
				{
					padding: 0,	
                    borderRadius: 20,							
				},			
			])}
			onClick={() => {}}>
            <div
                style={$style([
                    {
                        backgroundColor: colors.$secondaryBlue,
                        borderRadius: 5,
                        marginBottom: 1,
                    },                    
                    $width('100%'),
                    $flexCol(),
                    $itemCenter(),
                ])}>
                <span style={$style([
                    $font(fonts.rubikMedium, colors.$white, 14, 18), 
                ])}>{item.title}</span>
            </div>
        </ClickButton>
    );
}

interface Props {
	index?: number;
	schedule?: any;
	weekList: any[];
}

const WeekScheduleItem: FC<Props> = (props) => {
	const history = useHistory();

    const schedule = props.schedule;
    const weekList = props.weekList;

	return (
		<div
            style={$style([
                {                    
                    borderBottom: 'solid 1px ' + colors.$bubbles,
                    minHeight: 40,
                },
                $flexRow(),
            ])}>
            <div
                style={{
                    width: 40,
                    paddingTop: 20,
                    paddingLeft: 10,
                }}>
                <span style={$style([
                    $font(fonts.rubikMedium, colors.$secondaryBlue, 14, 18), 
                ])}>{schedule.time}</span>
            </div>
            
            {
                schedule.schedule.map((s, i) => 
                    <div 
                        key={i.toString()} 
                        style={$style([
                            {
                                flex: 1,
                                padding: 1,
                                borderLeft: 'solid 1px ' + colors.$bubbles,
                                justifyContent: 'flex-end',
                            },
                            s.flag === true ?
                            {
                                backgroundColor: 'rgba(84, 229, 225, 0.25)',
                            } : {},
                            $flexCol(),
                            $itemCenterH(),
                        ])}>
                        {
                            s.item.map((data, j) =>
                                <ScheduleItem key={j.toString()} schedule={data} />
                            )
                        }
                        
                    </div>
                )
            }            
        </div>
	);
}

export default WeekScheduleItem;
