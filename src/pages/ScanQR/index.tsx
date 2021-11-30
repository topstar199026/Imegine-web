import { ReactNode, useEffect, useState } from 'react';
import type { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import QRCode from 'react-qr-code';
import WaveBackground from 'src/components/Welcome/WaveBackground';
import { $font, $style, $textCenter } from 'src/utils/font-utilts';
import fonts from 'src/constants/fonts';
import colors from 'src/constants/colors';
import { generateRandomDeviceId } from 'src/utils/key-utilts';
// import { addDevice, enableDevice } from 'src/slices/key';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		width: '100%',
		backgroundImage: 'linear-gradient(#56DDF5, #D4EFFA)',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'	,
		justifyContent: 'center',
	},
	container: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'	,
		justifyContent: 'center',
	},
}));

interface Props {
	children?: ReactNode;
  	history?: any;
}

const ScanQRView: FC<Props> = (props) => {
    
	const classes = useStyles();
	const { key, enableStatus, addDevice, enableDevice } = useAuth();
	
	const {history} = props;
	const [qrCode, setQrCode] = useState(generateRandomDeviceId(100));
	const [flag, setFlag] = useState(false);
	useEffect(() => {
		setTimeout(() => {			
			(async () => {
				!enableStatus && await handleLinkDevice();
			})();
		}, 200);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if(flag) {
			var timerID = setInterval( () => handleEnableDevice(), 3000 );
		}
		return () => {
			clearInterval(timerID);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [flag])

	useEffect(() => {	
		console.log('enableStatus', enableStatus)
		enableStatus && history.push('/page/message');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enableStatus])

	const handleLinkDevice = async () => {
		await addDevice(key, {
			deviceCode: qrCode
		})
		setFlag(true);
	}

	const handleEnableDevice = async () => {		
		enableStatus === false && enableDevice(key, {
			deviceCode: qrCode,
		});
	}

    return (
		<div className={classes.root}>
		
			<WaveBackground flag={1} />
			<div className={classes.container}>
				<div>
					{/* https://www.npmjs.com/package/react-qr-code */}
					<QRCode size={196} value={qrCode} />
				</div>
				<div
					style={{
						paddingTop: 34,
					}}>
					<div 
						style={
							$style([
								$font(fonts.rubikMedium, colors.$secondaryBlue, 25, 32), 
								$textCenter(),
								{padding: '0px 30px'},
							])
						}>
						{'Scan from Imegine mobile'}
					</div>
				</div>
				<div
					style={{
						paddingTop: 27,
					}}>
					<div
						style={
							$style([
								$font(fonts.rubikRegular, colors.$secondaryBlue, 22, 26),
								$textCenter(),
								{padding: '0px 30px'},
							])
						}>
						<span>{'1. Open Imegine app on your smartphone\n'}</span><br/>
						<span>{'2. Go to Profile Settings > Devices > Add\n'}</span><br/>
						<span>{'3. Scan this code with your phone\n'}</span><br/>
						<span>{'4.Start Imegine with the world\n'}</span>
					</div>
				</div>
			</div>			
		</div>
    );
};

export default ScanQRView;
