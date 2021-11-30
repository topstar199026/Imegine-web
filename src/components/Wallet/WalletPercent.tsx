import { FC, useState } from 'react';
import colors from 'src/constants/colors';
import moment from 'moment';
import Pie from 'paths-js/pie';


import { $flex, $flexCol, $flexRow, $font, $itemCenter, $itemCenterV, $size, $style, $width } from 'src/utils/font-utilts';

import ClickButton from 'src/components/Button/ClickButton';
import Avatar from 'src/components/Image/Avatar';
import images from 'src/constants/images';
import fonts from 'src/constants/fonts';

interface Props {
	message?: any;
}

var width = 350;

export const percents = [
    {
        id: 0,
        title: 'Food',
        percent: 67.45,
    },
    {
        id: 1,
        title: 'Transport',
        percent: 22.55,
    },
    {
        id: 2,
        title: 'Other',
        percent: 10,
    },
];

const WalletPercent: FC<Props> = (props) => {
	
	const [layoutFlag, setLayoutFlag] = useState(true)

    const stokeWidth = 30;
    const stokeProgressWidth = 15;
    const rD = (width / 2) * 0.8;
    
    const backgroundPie = () => {
        const r = rD - stokeWidth / 2;
        return Pie({
            r,
            R: r,
            center: [175, 175],
            data: [1, 0],
            accessor(x) {
                return x;
            }
        });
    }

	const generateColor = () => 
        'rgb(' + (256 - Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (256 - Math.floor(Math.random() * 256)) + ')';

	const progressList = () => {
	
		const _array = [];
		const r = rD - stokeProgressWidth / 2 - (stokeWidth - stokeProgressWidth) / 2;
		
		const d = stokeProgressWidth / (2 * 3.141592 * r);
		console.log('d', d)

		let sum  = 0;

		for(let i=0; i<percents.length; i++) {
			let _percent = percents[i].percent / 100;
			const _i = i > 0 ? 1 : 0;
			const _arrayValue = {
				i: i,
				l: percents[i].title,
				p: _percent,
				p2: percents[i].percent,
				c: generateColor(),
				t: 360 * (-percents[0].percent / 2 / 100+ sum + d),
				s: sum,
				pie: Pie({
					r,
					R: r,
					center: [175, 175],
					data: [_percent - d, 1 - _percent + d],
					accessor(x) {
						return x;
					}
				})
			};
			_array.push(_arrayValue);
			sum += _percent;
		}
		return _array;
	}
	
	const dataList = progressList();

	return (
		<div
			style={$style([
				{
					paddingLeft: 15,
					paddingRight: 15,
				},
				layoutFlag ? $flexRow() : $flexCol(),
			])}>
			<div
				style={$style([
					{
						position: 'absolute',
						height: width,
						width: width,
					},
					$flex(),
					$itemCenter(),
				])}>
				<div
					style={$style([
						{
							position: 'absolute',
							height: width,
							width: width,
						},
						$flexRow(),
						$itemCenter(),
					])}>
					<div
						style={{
							paddingRight: 15
						}}>
						<img src={images.wallet.prevGray} alt='' />
					</div>
					<div
						style={$style([
							{
							},
							$flexCol(),
							$itemCenter(),
						])}>
					<span style={$style([
							$font(fonts.rubikRegular, colors.$secondaryBlue, 44, 57), 
						])}>{'67.45%'}</span>
						<span style={$style([
							$font(fonts.rubikRegular, colors.$secondaryBlue, 15, 20), 
						])}>{'LAST 7 DAYS'}</span>
					</div>
					<div
						style={{
							paddingLeft: 10
						}}>
						<img src={images.wallet.nextGray} alt='' />
					</div>
				</div>
			</div>
			<svg
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'
				// x='0px'
				// y='0px'
				width={width}
				height={width}
				// viewBox='0 0 350 350'
				>
					{/* <g
						x={width/2}
						y={width/2}
						> */}
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d={backgroundPie().curves[0].sector.path.print()}
							strokeWidth={stokeWidth}
							stroke={
								'#F0F0F0'
							}
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d={backgroundPie().curves[0].sector.path.print()}
							strokeWidth={stokeWidth}
							stroke={
								'#F0F0F0'
							}
						/>
						<g
							transform={'translate(175 175)'}
							>
							{
								dataList.map((_p, i) => {
									return <path
										key={i.toString()}
										strokeLinecap="round"
										strokeLinejoin="round"
										d={_p.pie.curves[0].sector.path.print()}
										strokeWidth={stokeProgressWidth}
										stroke={
											_p.c
										}
										transform={'rotate('+ _p.t +') translate(-175 -175)'}
										// transform={'rotate('+ _p.t +')'}
									/>
								})
							}
						</g>
					{/* </g> */}
			</svg>
			<div
				style={$style([
					{
						width: 350,
						paddingLeft: 15,
						paddingBottom: 30,
						// padding: 50,
					},
					$flexCol(),
					$itemCenter(),
				])}>
				{
					dataList.map((data, i) => 
						<div
							key={i.toString()}
							style={$style([
								{
									width: 200,
									paddingTop: 3,
									paddingBottom: 3,
								},
								$flexRow(),
								$itemCenter(),
							])}>
							<div
								style={{
									width: 30,
								}}>
								<div style={$style([
									{
										borderRadius: 5.5,
										backgroundColor: data.c
									},
									$size(11, 11)
								])} />
							</div>
							<div
								style={{
									flex: 1,
								}}>
								<span style={$style([
									{
									},
									$font(fonts.rubikBold, colors.$secondaryBlue, 15, 16), 
								])}>{data.l}</span>
							</div>
							<div
								style={{
									width: 70,
									alignItems: 'center',
								}}>
								<span style={$style([
									{
									},
									$font(fonts.rubikRegular, colors.$secondaryBlue, 15, 16), 
								])}>{data.p2 + '%'}</span>
							</div>
						</div>                        
					)
				}
				
			</div>
		</div>
	);
}

export default WalletPercent;
