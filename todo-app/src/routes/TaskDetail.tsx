import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { RouteProps, TaskViewEditParams } from '../explicit-types';
import TaskDetailMenu from '../components/TaskDetailMenu';
import { Zoom, Fab, Card, CardContent, Typography, CardActionArea, CardMedia, Checkbox } from '@material-ui/core';
import { EditRounded } from '@material-ui/icons';
import { ITask } from '../db/TaskDatabase';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),

        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
            paddingRight: theme.spacing(3),
            paddingLeft: theme.spacing(3),
        }
    },
    flex: {
        display: 'flex',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const TaskDetail: React.FC<RouteProps> = ({ setNavTitle, setDrawerMenu, setMenu, db }) => {
    console.log("tdmd");
    const params = useParams<TaskViewEditParams>();
    const classes = useStyles();

    const [task, setTask] = useState<ITask>({
        id: params.id,
        title: '',
        description: '',
        active: false,
        sync: false,
        state: 'ACTIVE'
    });

    useEffect(() => {
        setNavTitle('Tasks Detail');
        setDrawerMenu(null);
        setMenu(<TaskDetailMenu id={params.id} db={db} />);

        db.transaction('r', db.tasks, async () => {
            const taskFromId = await db.tasks.get(params.id);

            if(taskFromId) {
                setTask(taskFromId)
            }
        });
    }, [setNavTitle, setDrawerMenu, setMenu, db, params.id]);

    const handleActiveToggle = async () => {
        await db.tasks.update(task.id, {
            active: !task.active,
            state: !task.active ? 'ACTIVE' : 'INACTIVE'
        });
        const taskFromId = await db.tasks.get(task.id);

        if(taskFromId) {
            setTask(taskFromId)
        }
    }

    return (
        <div className={classes.root}>
            <Card onClick={handleActiveToggle}>
                <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={task.title}
                      height="400"
                      image={`https://source.unsplash.com/1600x900/?${task.title.split(' ').join(',')}`}
                      title={task.title}/>
                    <CardContent className={classes.flex}>
                        <div style={{flexGrow: 1}}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {task.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {task.description}
                            </Typography>
                        </div>
                        <Checkbox
                            edge="end"
                            checked={!task.active}
                            tabIndex={-1}
                            disableRipple />
                    </CardContent>
                </CardActionArea>
            </Card>
            <Zoom in={true} style={{ transitionDelay: '100ms' }}>
                <Fab component={RouterLink} to={`/task/${params.id}/edit`} color="secondary" className={classes.fab}>
                    <EditRounded />
                </Fab>
            </Zoom>
        </div>
    )
}

export default TaskDetail