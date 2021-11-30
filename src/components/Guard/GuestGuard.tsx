import React from 'react';
import type { FC, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from 'src/hooks/useAuth';

interface GuestGuardProps {
  children?: ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
	const { enableStatus } = useAuth();

	if (enableStatus) {
		return <Redirect to="/page/message" />;
	}

	return (
		<>
			{children}
		</>
	);
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
