import React from 'react';
import { 
    Paper, List, ListItem, ListItemIcon, Checkbox, ListItemText, 
    ListItemSecondaryAction, IconButton, Typography, Box 
} from '@material-ui/core';
import { CallMadeRounded } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { Task, Query, TaskMenuActions } from '../explicit-types';

interface TaskListProps {
    tasks: Task[],
    query: Query,
    handleToggle: (type: TaskMenuActions, idx?: string, active?: boolean) => void,
}

const useFilter = (query: Query) => {
    return (task: Task) => {
        switch (query) {
            case Query.DELETE:
            case Query.REFRESH:
            case Query.ALL: return true;

            case Query.CHECKED: return task.active === false;
            case Query.UNCHECKED: return task.active === true;
        }
    }
}

const TaskList: React.FC<TaskListProps> = ({ tasks, query, handleToggle }) => {
    const queryFilter = useFilter(query);
    const taskList = tasks.filter(queryFilter);

    return (
        <Paper elevation={2}>
            { taskList.length ? (
                <List>
                    {taskList.map((task, idx) => {
                        const labelId = `task-list-${idx}`;

                        return (
                            <ListItem key={task.id} button onClick={() => handleToggle('TOGGLE', task.id, task.active)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={!task.active}
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