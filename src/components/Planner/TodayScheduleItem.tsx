import moment from 'moment';
import { FC, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import colors from 'src/constants/colors';
import fonts from 'src/constants/fonts';
import { $font, $style, $width } from 'src/utils/font-utilts';
import ClickButton from '../Button/ClickButton';

interface Props2 {
	index?: number;
	schedule?: any;
	expanded: boolean;
	i?: number;
	j?: number;
	item?: any;
	toggleExpanded?: (i, j) => void;
	toggleMapWithModal?: () => void;
}

const ScheduleItem: FC<Props2> = (props) => {

    console.log('props', props)
    const [visible, setVisible] = useState(false);

    const toggleExpanded = () => {
        // setVisible(!visible);
        props.toggleExpanded(props.i, props.j);
    }

    useEffect(() => {
        // props.toggleExpanded();
    }, [visible])

    return (
        <ClickButton
			styleContainer={$style([
				{
					padding: 0,
				},
			])}
			styleShadow={$style([
				{
					padding: 0,	
                    borderRadius: 20,							
				},				
			])}
			onClick={() => toggleExpanded()}>
            <div
                style={$style([
                    {
                        width: '100%',
                        borderRadius: 20,
                        minHeight: 40,
                        backgroundColor: colors.$secondaryBlue,
                        marginTop: 1,
                        marginBottom: 1,
                        paddingLeft: props.schedule.expanded ? 20 : 15,
                        paddingRight: props.schedule.expanded ? 20 : 15,
                        paddingTop: props.schedule.expanded ? 20 : 4,
                        paddingBottom: props.schedule.expanded ? 20 : 4,
                    }
                ])}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                    <div
                        style={{
                            flex: 1,
                        }}>
                        <div>
							<span style={$style([
								$font(fonts.rubikMedium, colors.$white, 11, 20), 
							])}>{moment(props.schedule.item.startTime, 'HH:mm:ss').format('HH:mm')}{' hrs'}</span>
                        </div>
                        <div>
                            <span style={$style([
								$font(fonts.rubikRegular, colors.$white, 11, 20), 
							])}>{props.schedule.item.title}</span>
                        </div>
                    </div>
                    {
                        props.schedule.expanded &&
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                            <ClickButton>
                                <div
                                    style={{
                                        width: 22,
                                    }}>
                                    {/* <Image source={images.editWhitePlanner} /> */}
                                </div>
                            </ClickButton>
                            <div style={{width: 10}} />
                            <ClickButton>
                                <div
                                    style={{
                                        width: 22,
                                    }}>
                                    {/* <Image source={images.plusCircleWhitePlanner} /> */}
                                </div>
                            </ClickButton>
                        </div>  
                    }
                                      
                </div>
                {
                    props.schedule.expanded === true &&
                    <div
                        style={{
                            marginTop: 32,
                        }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                            <div
                                style={{
                                    width: 40,
                                }}>
                                {/* <Image source={images.contactWhite} /> */}
                            </div>
                            <div>
                                {/* <span
                                    style={{
                                        width: 185,
                                        fontFamily: fonts.$rubikBold,
                                        color: colors.$white,
                                        fontSize: 13,
                                        lineHeight: 16,
                                    }}>
                                    {'Pablo Zehle, Alexander Ehm, Jorge Martínez'}
                                </span> */}
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: 15,
                                width: '100%',
                            }}>
                            <ClickButton onClick={() => props.toggleMapWithModal()}>
                                {/* <Image 
                                    source={images.mapdiv} 
                                    style={{
                                        width: '100%',
                                        borderRadius: 15,
                                    }}    
                             	/>  */}
                            </ClickButton>
                        </div>
                        <div
                            style={{
                                marginTop: 10,
                                width: '100%',
                            }}>
                            {/* <span
                                style={{
                                    width: 185,
                                    fontFamily: fonts.$rubikRegular,
                                    color: colors.$white,
                                    fontSize: 13,
                                    lineHeight: 16,
                                }}>
                                {'143 Wolfsgangstraße Fráncfort del Meno, Hesse'}
                            </span> */}
                        </div>
                    </div>
                }
            </div>
        </ClickButton>
    );
}

interface Props {
	index?: number;
	schedule?: any;
	expanded: boolean;
	toggleExpanded?: (i, j) => void;
}

const TodayScheduleItem: FC<Props> = (props) => {
	console.log(props.schedule)
	return (
		<div
			style={$style([
				{

				},
			])}>
			<div
				style={$style([
					{
						display: 'flex',
						flexDirection: props.expanded === true ? 'column' : 'row',
						minHeight: 40,
					}
				])}>
				<div
					style={$style([
						{
							width: 80,
							paddingTop: 10,
						}
					])}>
					<span style={$style([
						$font(fonts.rubikRegular, colors.$secondaryBlue, 11, 17), 
					])}>{props.schedule.time}{' hrs'}</span>
				</div>
				
				<div
					style={$style([
						{
							flex: 1,
							padding: 1,
						}
					])}>
					{
						props.schedule.schedule.map((schedule, index2) => 
							<ScheduleItem 
								// toggleMapWithModal={() => props.toggleMapWithModal()}
								expanded={props.expanded} 
								key={index2.toString()} 
								i={props.index} 
								j={index2} 
								schedule={schedule}
								toggleExpanded={(i, j) => props.toggleExpanded(i, j)} 
							/>
						)
					}
				</div>
				{/* <div
					style={{
						width: 50,
					}}>

				</div> */}
			</div>
			<div
				style={$style([
					{
						height: 1,
						background: colors.$bubbles
					}
				])} 
			/> 			
		</div>
	);
}

export default TodayScheduleItem;
