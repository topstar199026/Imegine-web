import type { FC } from 'react';

import { $flex, $flexRow, $font, $itemCenter, $style } from 'src/utils/font-utilts';

import colors from 'src/constants/colors';
import ClickButton from '../Button/ClickButton';
import fonts from 'src/constants/fonts';
import { useHistory } from 'react-router-dom';
interface Props {
	active?: string;
}

const SwitchPlannerTab: FC<Props> = (props) => {
	const history = useHistory();

	console.log(props.active)

	const getTitle = (type) => {
        switch (type) {
            case 0:
                if(props.active === 'Today') return 'Month';
                else if(props.active === 'Week') return 'Today';
                else return 'Week';
            case 1:
                if(props.active === 'Today') return 'Today';
                else if(props.active === 'Week') return 'Week';
                else return 'Month';
            case 2:
                if(props.active === 'Today') return 'Week';
                else if(props.active === 'Week') return 'Month';
                else return 'Today';        
        }
    }

    const goPlannerPage = (type) => {
        switch (type) {
            case 'Today':
                history.push('/page/planner');
                break;
            case 'Month':
                history.push('/page/planner/month');
                break;
            case 'Week':   
				history.push('/page/planner/week');
                break;
        }
    }

	return (
		<div
            style={$style([
                {
					padding: '15px 0px'
				},
				$flex(),
				$itemCenter(),
				
            ])}>
			<div
				style={$style([
					{
						width: 300,
					},
					$flexRow(),
				])}>
				<div
					style={$style([
						{
							flex: 1,
						},
						$itemCenter(),
					])}>
					<ClickButton
							styleContainer={$style([
								{
									backgroundColor: colors.$transparent,	
								},
							])}
							styleShadow={$style([
								{
									padding: 5,							
								},
								$itemCenter(),
							])}
							onClick={() => goPlannerPage(getTitle(0))}>
						<span style={$style([
							$font(fonts.rubikMedium, colors.$secondaryBlue, 17, 20, 0.5), 
						])}>{getTitle(0)}</span>
					</ClickButton>
				</div>
				<div
					style={$style([
						{
							flex: 1,
						},
						$itemCenter(),
					])}>
					<ClickButton
							styleContainer={$style([
								{
									backgroundColor: colors.$transparent,	
								},
							])}
							styleShadow={$style([
								{
									padding: 5,							
								},
								$itemCenter(),
							])}
							onClick={() => goPlannerPage(getTitle(1))}>
						<span style={$style([
							$font(fonts.rubikMedium, colors.$secondaryBlue, 17, 20), 
						])}>{getTitle(1)}</span>
					</ClickButton>
				</div>
				<div
					style={$style([
						{
							flex: 1,
						},
						$itemCenter(),
					])}>
					<ClickButton
							styleContainer={$style([
								{
									backgroundColor: colors.$transparent,	
								},
							])}
							styleShadow={$style([
								{
									padding: 5,							
								},
								$itemCenter(),
							])}
							onClick={() => goPlannerPage(getTitle(2))}>
						<span style={$style([
							$font(fonts.rubikMedium, colors.$secondaryBlue, 17, 20, 0.5), 
						])}>{getTitle(2)}</span>
					</ClickButton>
				</div>
			</div>
		</div>
	);
}

export default SwitchPlannerTab;
