import React, { useState } from 'react';
import { 
    Paper, List, ListItem, ListItemIcon, Checkbox, ListItemText, 
    ListItemSecondaryAction, IconButton, Typography, Box 
} from '@material-ui/core';
import { CallMadeRounded } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { Task, Query } from '../explicit-types';

interface TaskListProps {
    tasks: Task[],
    query: Query
}

const useFilter = (query: Query) => {
    return (task: Task) => {
        switch (query) {
            case Query.ALL: return true;
            case Query.CHECKED: return task.active === true;
            case Query.UNCHECKED: return task.active === false;
        }
    }
}

const TaskList: React.FC<TaskListProps> = ({ tasks, query }) => {
    const queryFilter = useFilter(query);

    const [taskList, setTaskList] = useState(tasks)
    const handleActiveToggle = (idx: number) => {
        const temp = tasks.slice();
        temp[idx].active = !temp[idx].active;
        setTaskList(temp);
    }

    const filteredTasks = taskList.filter(queryFilter);

    return (
        <Paper elevation={2}>
            { filteredTasks.length ? (
                <List>
                    {filteredTasks.map((task, idx) => {
                        const labelId = `task-list-${idx}`;

                        return (
                            <ListItem key={task.id} button onClick={() => handleActiveToggle(idx)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={task.active}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={task.title} />
                                <ListItemSecondaryAction>
                                    <IconButton component={RouterLink} to={`/task/${task.id}`} edge="end" aria-label="comments">
                                        <CallMadeRounded />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
            ) : (
                <Box p={2}>
                    <Typography variant="h6" align="center">Sorry, no task exists</Typography>
                </Box>
            )}
        </Paper>
    )
}

export default TaskList;