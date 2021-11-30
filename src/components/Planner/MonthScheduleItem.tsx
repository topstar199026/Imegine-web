import { FC } from 'react';

import colors from 'src/constants/colors';
import fonts from 'src/constants/fonts';
import { $flexCol, $flexRow, $font, $itemCenter, $itemCenterH, $style, $width } from 'src/utils/font-utilts';
import ClickButton from '../Button/ClickButton';

interface Props2 {
    item?: any,
}

const ScheduleItem: FC<Props2> = (props) => {

    const item = props.item;

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
}

const MonthScheduleItem: FC<Props> = (props) => {
	
    const schedule = props.schedule;

	return (
		<div
            style={$style([
                {                    
                    borderBottom: 'solid 1px ' + colors.$bubbles,
                    minHeight: 40,
                    flex: 1,
                },
                $flexRow(),
            ])}>
            
            {
                schedule.map((s, i) => 
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
                        <div
                            style={$style([
                                {
                                },
                            ])}>
                            <span style={$style([
                                $font(fonts.rubikMedium, colors.$secondaryBlue, 14, 18), 
                            ])}>{s.d}</span>
                        </div>
                        <div
                            style={$style([
                                {
                                    flex: 1,
                                    width: '100%',
                                },        
                                $flexCol(),                        
                                $itemCenterH(),
                            ])}>
                            <div style={{flex: 1,}}></div>
                            {
                                s.schedule.map((item, j) => 
                                    <ScheduleItem key={j.toString()} item={item} />
                                )
                            }
                        </div>
                    </div>
                )
            }            
        </div>
	);
}

export default MonthScheduleItem;
