import type { FC } from 'react';
import { makeStyles } from '@material-ui/core';


import colors from 'src/constants/colors';
import { BAR_HEIGHT_V } from 'src/constants/constants';
import type { Theme } from 'src/theme';
import Avatar from 'src/components/Image/Avatar';
import images from 'src/constants/images';
import { $itemCenterH, $size, $style } from 'src/utils/font-utilts';
import IconButton from 'src/components/Button/IconButton';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.bar.default,
		height: BAR_HEIGHT_V,
		width: '100%',
		boxShadow: '0px 0px 10px 0px '+ colors.$barPrimaryBoxShadowColor,
		display: 'flex',
		flexDirection: 'row',
		padding: 0, 
	},
}));

interface Props {
}

const TopBar: FC<Props> = (props) => {
    const classes = useStyles();	

	const handleNewChat = () => {
		console.log('sdf')
	}

    return (
		<div className={classes.root}
			style={$style([
				$itemCenterH(),
			])}>
			<div
				style={{
					flex: 1,
					paddingLeft: 28,
				}}>
				<Avatar 
					img={images.avatar.userAvatar2} 
					styleContainer={$style([
						{
							backgroundColor: colors.$transparent,
							borderRadius: '50%',
							border: '3px solid ' + colors.$buttonGreen,					
						},
						$size(40, 40),
					])}
					styleImage={$style([
						{
							borderRadius: 19,
						},
						$size(40, 40),
					])}
				/>
			</div>
			<div
				style={{
					paddingTop: 2,
				}}>
				<IconButton 
					img={images.message.qrBlue} 
					styleContainer={{
						backgroundColor: colors.$transparent,			
					}}
				/>
			</div>
			<div
				style={{
					paddingTop: 2,
					paddingRight: 10,
				}}>
				<IconButton 
					img={images.message.penBlue} 
					styleContainer={{
						backgroundColor: colors.$transparent,			
					}}
					to={'/page/message/new-chat'}
					onClick={() => handleNewChat()}
				/>
			</div>
		</div>
	);
};

export default TopBar;
