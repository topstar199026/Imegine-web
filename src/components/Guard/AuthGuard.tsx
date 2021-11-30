import React from 'react';
import type { FC, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from 'src/hooks/useAuth';

interface AuthGuardProps {
  children?: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { enableStatus } = useAuth();

  if (!enableStatus) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {children}
    </>
  );
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
