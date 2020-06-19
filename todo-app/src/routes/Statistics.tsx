import React, { useEffect } from 'react';
import { RouteProps } from '../explicit-types';
import StatisticsMenu from '../components/StatisticsMenu';


const Statistics: React.FC<RouteProps> = ({ setNavTitle, setDrawerMenu, setMenu }) => {
    useEffect(() => {
        setNavTitle('Statistics');
        setDrawerMenu('Statistics');
        setMenu(<StatisticsMenu />);
    }, [setNavTitle, setDrawerMenu, setMenu]);

    return <h1>Statistics</h1>
}

export default Statistics