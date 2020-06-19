import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { RouteProps } from '../explicit-types';
import { IconButton } from '@material-ui/core';
import { ArrowBackRounded } from '@material-ui/icons';

const Statistics: React.FC<RouteProps> = ({ setNavTitle, setDrawerMenu, setMenu }) => {
    const history = useHistory();

    useEffect(() => {
        setNavTitle('Statistics');
        setDrawerMenu('Statistics');
        setMenu(
            <div style={{display: 'flex'}}>
                <IconButton color="inherit" onClick={() => history.goBack()}>
                    <ArrowBackRounded />
                </IconButton>
            </div>
        );
    }, [setNavTitle, setDrawerMenu, setMenu, history]);

    return <h1>Statistics</h1>
}

export default Statistics