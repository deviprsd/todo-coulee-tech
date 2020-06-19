import React from 'react';
import { IconButton } from '@material-ui/core';
import { DoneRounded } from '@material-ui/icons';

interface TaskAddEditMenuProps {
    form: HTMLFormElement | null
}

const TaskAddEditMenu: React.FC<TaskAddEditMenuProps> = ({ form }) => {
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
            <IconButton color="inherit" onClick={handleFormSubmit}>
                <DoneRounded />
            </IconButton>
        </div>
    )
}

export default TaskAddEditMenu;