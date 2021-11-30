import type { FC, ReactNode } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

interface Props {
    children?: ReactNode;
    _children?: Number;
    children1?: ReactNode;
    class1?: String;
    children2?: any;
    class2?: String;
    children3?: ReactNode;
    class3?: String;
    data?: any;
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
	},
    children: {
        flex: 1,
    }
}));

const ResponseLayout: FC<Props> = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={clsx(classes.children, props.class1)}>
                {props.children1}
            </div>
            {
                props.children2 &&
                <div className={clsx(classes.children, props.class2)}>
                    {
                        React.cloneElement(
                            props.children2,
                            {
                                data: props.data || null
                            }
                        )
                    }
                </div>
            }            
            {
                props.children3 &&
                <div className={clsx(classes.children, props.class3)}>
                    {props.children3}
                </div>
            }
            
        </div>
    );
};

ResponseLayout.propTypes = {
    children: PropTypes.node
};

export default ResponseLayout;
