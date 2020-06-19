import React from 'react';
import { NullProps } from "../explicit-types";
import { IconButton } from '@material-ui/core';
import { DoneRounded } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const TaskAddMenu: React.FC<NullProps> = () => {
    const history = useHistory();

    return (
        <div style={{display: 'flex'}}>
            <IconButton color="inherit" onClick={() => history.goBack()}>
                <DoneRounded />
            </IconButton>
        </div>
    )
}

export default TaskAddMenu;