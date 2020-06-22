import React from 'react';
import { IconButton } from '@material-ui/core';
import { DeleteRounded, ArrowBackRounded } from '@material-ui/icons';
import { TaskDatabase } from '../db/TaskDatabase';
import { useHistory } from 'react-router-dom';

interface TaskDetailMenuProps {
    id: string,
    db: TaskDatabase
}

const TaskDetailMenu: React.FC<TaskDetailMenuProps> = ({ db, id }) => {
    const history = useHistory(); 

    const handleDelete = () => {
        db.tasks.delete(id).then(() => {
            history.goBack();
        })
    }

    return (
        <div style={{display: 'flex'}}>
            <IconButton color="inherit" onClick={() => history.goBack()}>
                <ArrowBackRounded />
            </IconButton>
            <IconButton color="inherit" onClick={handleDelete}>
                <DeleteRounded />
            </IconButton>
        </div>
    )
}

export default TaskDetailMenu;