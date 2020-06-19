import React, { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { RouteProps, TaskViewEditParams } from '../explicit-types';
import TaskDetailMenu from '../components/TaskDetailMenu';
import { Zoom, Fab } from '@material-ui/core';
import { EditRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => createStyles({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}))

const TaskDetail: React.FC<RouteProps> = ({ setNavTitle, setDrawerMenu, setMenu }) => {
    const params = useParams<TaskViewEditParams>();
    const classes = useStyles();

    useEffect(() => {
        setNavTitle('Tasks Detail');
        setDrawerMenu(null);
        setMenu(<TaskDetailMenu />);
    }, [setNavTitle, setDrawerMenu, setMenu])

    return (
        <Zoom in={true} style={{ transitionDelay: '100ms' }}>
            <Fab component={RouterLink} to={`/task/${params.id}/edit`} color="secondary" className={classes.fab}>
                <EditRounded />
            </Fab>
        </Zoom>
    )
}

export default TaskDetail