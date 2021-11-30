import { FC, useEffect, useState } from 'react';

import colors from 'src/constants/colors';
import { $style } from 'src/utils/font-utilts';

interface Props {
	
}

const TypingIndicator: FC<Props> = (props) => {

	const [i, setI] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setI(prev => (prev+1) % 3);
        }, 300);
        return () => clearInterval(interval);
	}, []);

	return (
		<div style={{
				width: 35,
				height: 7,
				backgroundColor: colors.$transparent,
				display: 'flex',
				flexDirection: 'row'
			}}>
            <div style={{flex: 1}}>
                <div style={$style([{
					width: 6,
					height: 6,
					borderRadius: 3,
					backgroundColor: colors.$textSecondary,
					flex: 1
				}, i === 0 ? {backgroundColor: colors.$white} : {}])} />
            </div>
            <div style={{flex: 1}}>
				<div style={$style([{
					width: 6,
					height: 6,
					borderRadius: 3,
					backgroundColor: colors.$textSecondary,
					flex: 1
				}, i === 1 ? {backgroundColor: colors.$white} : {}])} />
            </div>
            <div style={{flex: 1}}>
				<div style={$style([{
					width: 6,
					height: 6,
					borderRadius: 3,
					backgroundColor: colors.$textSecondary,
					flex: 1
				}, i === 2 ? {backgroundColor: colors.$white} : {}])} />
            </div>
        </div>
	);
}

export default TypingIndicator;
