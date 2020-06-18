import React, { useEffect } from 'react';
import { RouteProps } from '../explicit-types';

const Statistics: React.FC<RouteProps> = ({ setNavTitle }) => {
    useEffect(() => {
        setNavTitle('Statistics')
    }, [setNavTitle]);

    return <h1>Statistics</h1>
}

export default Statistics