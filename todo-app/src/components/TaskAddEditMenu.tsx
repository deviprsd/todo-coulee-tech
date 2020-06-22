import React from 'react';
import { IconButton } from '@material-ui/core';
import { DoneRounded, ArrowBackRounded } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

interface TaskAddEditMenuProps {
    form: HTMLFormElement | null
}

const TaskAddEditMenu: React.FC<TaskAddEditMenuProps> = ({ form }) => {
    const history = useHistory(); 

    const handleFormSubmit = () => {
        if (form) {
            if (typeof form.requestSubmit === 'function') {
                form.requestSubmit();
            } else {
                form.dispatchEvent(new Event('submit', {cancelable: true}));
            }
        }
    }

    return (
        <div style={{display: 'flex'}}>
            <IconButton color="inherit" onClick={() => history.goBack()}>
                <ArrowBackRounded />
            </IconButton>
            <IconButton color="inherit" onClick={handleFormSubmit}>
                <DoneRounded />
            </IconButton>
        </div>
    )
}

export default TaskAddEditMenu;