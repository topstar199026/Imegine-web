import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';

interface Props {
    children?: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {

    return (
        <>{children}</>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node
};

export default MainLayout;
