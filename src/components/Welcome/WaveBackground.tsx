import type { FC } from 'react';
import {
	makeStyles
} from '@material-ui/core';

import WavePng0 from 'src/assets/images/auth/welcome-wave.png';
import WavePng1 from 'src/assets/images/auth/welcome-wave-2.png';

const useStyles = makeStyles(() => ({
	waveBackground0: {
		position: 'absolute',
		left: 0,
		top: 0,
		width: '100%',
		height: '60%',
		// background: `url(${WavePng})`,
		// backgroundRepeat: 'no-repeat',
		// backgroundSize: '100% 100%',
	},
	waveBackground1: {
		position: 'absolute',
		left: 0,
		top: '40%',
		width: '100%',
		height: '60%',
	},
	waveSvg: {
		width: '100%',
		height: '100%',
	},
	emailGrayPng: {

	}
}));

interface Props  {
	flag?: number;
}

const WaveBackground: FC<Props> = (props) => {
	const classes = useStyles();

	return (
		<>
			{
				props.flag ?
				<div className={classes.waveBackground1}>
					<img className={classes.waveSvg} src={WavePng1} alt="" />
				</div>
				:
				<div className={classes.waveBackground0}>
					<img className={classes.waveSvg} src={WavePng0} alt="" />
				</div>
			}
		</>
		
	);
}

export default WaveBackground;
