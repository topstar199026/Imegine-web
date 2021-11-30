import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

import type { Theme } from 'src/theme';
import MainSideBar from 'src/components/Bar/MainSideBar';

interface Props {
  	children?: ReactNode;
	path?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		display: 'flex',
		height: '100%',
		width: '100%'
	},
}));

const DashboardLayout: FC<Props> = (props) => {

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<MainSideBar {...props.path}/>
			{
				props.children
			}
		</div>
	);
};

DashboardLayout.propTypes = {
  	children: PropTypes.node
};

export default DashboardLayout;
