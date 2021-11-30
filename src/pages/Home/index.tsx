import { useEffect } from 'react';
import type { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import WaveBackground from 'src/components/Welcome/WaveBackground';


import EmailGrayPng from 'src/assets/images/auth/email-gray.png';
import { $font, $size, $style, $textCenter } from 'src/utils/font-utilts';
import fonts from 'src/constants/fonts';
import colors from 'src/constants/colors';
import StandardButton from 'src/components/Button/StandardButton';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		width: '100%',
		backgroundImage: 'linear-gradient(#56DDF5, #D4EFFA)',
		display: 'flex',
		flexDirection: 'column',
	},
	container1: {
		position: 'relative',
		height: '60%',	
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'	,
		justifyContent: 'center',
		paddingTop: '10%',
	},
	container2: {
		position: 'relative',
		height: '40%',	
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'	,
		justifyContent: 'center',	
	},
	button: {
		backgroundColor: colors.$buttonGreen,
		borderRadius: 28,
		height: 56,
		padding: '15px 42px',
		fontFamily: fonts.rubikBold,
		fontSize: 22,
		color: 'white',
	}
}));

const HomeView: FC = () => {
    const classes = useStyles();	
	const { key, setKey } = useAuth();

	useEffect(() => {
		console.log('key', key);
		(async () => {
			if(key === null) {
				await setKey();
			}
		})();		
	});
	
    return (
		<div className={classes.root}>		
			<WaveBackground />
			<div className={classes.container1}>
				<div>
					<img src={EmailGrayPng} alt="" style={$size(115, 87)}/>
				</div>
				<div
					style={{
						paddingTop: 32,
					}}>
					<div 
						style={
							$style([
								$font(fonts.rubikBold, colors.$secondaryBlue, 28, 36), 
								$textCenter(),
								{padding: '0px 30px'},
							])
						}>
						{'Imegine Desktop'}
					</div>
				</div>
			</div>
			<div className={classes.container2}>
				<div>
					<div
						style={
							$style([
								$font(fonts.rubikRegular, colors.$secondaryBlue, 20, 26),
								$textCenter(),
								{padding: '0px 30px'},
							])
						}>
						{'Welcome to Imegine desktop app'}
					</div>
				</div>
				<div
					style={{
						paddingTop: 32,
					}}>
					<StandardButton link="/scan-qr" className={classes.button} title={'Start messaging'} />
				</div>
			</div>
		</div>
    );
};

export default HomeView;
