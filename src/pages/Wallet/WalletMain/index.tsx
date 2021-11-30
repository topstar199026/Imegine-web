import { FC, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';


import fonts from 'src/constants/fonts';
import colors from 'src/constants/colors';
import ResponseLayout from 'src/layouts/ResponseLayout';
import TopBar from './TopBar';

import type { Theme } from 'src/theme';
import MessageItem from 'src/components/Message/MessageItem';
import useAuth from 'src/hooks/useAuth';
import SearchData2 from 'src/components/Search/SearchData2';
import WalletItemCard from 'src/components/Wallet/WalletItemCard';
import WalletFavoriteButton from 'src/components/Wallet/WalletFavoriteButton';
import WalletUpcoming from 'src/components/Wallet/WalletUpcoming';
import WalletPercent from 'src/components/Wallet/WalletPercent';
import WalletRecent from 'src/components/Wallet/WalletRecent';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		borderLeft: '1px solid ' + colors.$containerBorderColor,
	},
	container: {
		flex: 1,
		overflowY: 'auto',
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		padding: 2,
		paddingRight: 10,
	},
}));

interface Props {
    data?: any;
}

var scrollRef;

const WalletMainView: FC<Props> = (props) => {
    const classes = useStyles();
	const { key, newMessage, typingStatus, device, enableStatus, addDevice, enableDevice } = useAuth();

	const handleYReachEnd = () => {
	  }

    return (
		<div className={classes.root}>
			<TopBar />
			<div className={classes.container}>
				<SearchData2 placeholder={'Search Documents'} handleSearchStringChange={() => {}} searchString={''} />
				<PerfectScrollbar 
					option={{suppressScrollX: true}}
					onYReachEnd={handleYReachEnd}
					containerRef={(ref) => scrollRef = ref}>
					<div className={classes.content}>
						<WalletItemCard />
						<WalletFavoriteButton />
						<WalletUpcoming />
						<WalletRecent />
						<WalletPercent />
					</div>
				</PerfectScrollbar>
			</div>
		</div>
	);
};

export default WalletMainView;
