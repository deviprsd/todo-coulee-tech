import React from 'react';
import { NullProps } from "../explicit-types";
import { IconButton } from '@material-ui/core';
import { DeleteRounded } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const TaskDetailMenu: React.FC<NullProps> = () => {
    const history = useHistory();

    return (
        <div style={{display: 'flex'}}>
            <IconButton color="inherit" onClick={() => history.goBack()}>
                <DeleteRounded />
            </IconButton>
        </div>
    )
}

export default TaskDetailMenu;