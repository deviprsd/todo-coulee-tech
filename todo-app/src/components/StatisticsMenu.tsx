import React from 'react';
import { useHistory } from 'react-router-dom'
import { NullProps } from "../explicit-types";
import { IconButton } from '@material-ui/core';
import { ArrowBackRounded } from '@material-ui/icons';

const StatisticsMenu: React.FC<NullProps> = () => {
    const history = useHistory();

    return (
        <div style={{display: 'flex'}}>
            <IconButton color="inherit" onClick={() => history.goBack()}>
                <ArrowBackRounded />
            </IconButton>
        </div>
    )
}

export default StatisticsMenu;