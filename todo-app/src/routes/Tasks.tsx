import React, { useEffect, useReducer, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Fab, Zoom } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { RouteProps, TaskMenuActions, Query, Task, TaskMenuCount } from '../explicit-types';
import TaskMenu from '../components/TaskMenu';
import TaskList from '../components/TaskList';
import axios from 'axios';
import { ITask } from '../db/TaskDatabase';

type State = {
    query: Query,
    task: {
        idx: string | null,
        active: boolean
    }
}

type Action = {
    query: TaskMenuActions,
    idx?: string,
    active?: boolean
}

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
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

const reducer = (state: State, action: Action) => {
    switch (action.query) {
        case 'ALL':
            return { query: Query.ALL, task: { idx: null, active: false }};
        case 'COMPLETED':
            return { query: Query.CHECKED, task: { idx: null, active: false }};
        case 'UNCOMPLETED':
            return { query: Query.UNCHECKED, task: { idx: null, active: false }};
        case 'DELETE':
            return { query: Query.DELETE, task: { idx: null, active: false }};
        case 'REFRESH':
                return { query: Query.REFRESH, task: { idx: null, active: false }};
        default:
            return { ...state, task: { idx: action.idx!, active: action.active! } }
    }
}

const Tasks: React.FC<RouteProps> = ({ setNavTitle, setMenu, setDrawerMenu, db }) => {
    const [state, dispatch] = useReducer(reducer, { query: Query.ALL, task: {
        idx: null,
        active: false
    }});
    const handleFilterDispatch = (type: TaskMenuActions, idx?: string, active?: boolean) => {
        dispatch({ query: type, idx: idx, active: active });
    };

    const [tasks, setTasks] = useState<Task[]>([]);
    const [count, setCount] = useState<TaskMenuCount>({
        all: 0,
        completed: 0,
        uncompleted: 0
    });

    useEffect(() => {
        setNavTitle('Tasks');
        setDrawerMenu('Tasks');
    }, [setNavTitle,  setDrawerMenu]);

    useEffect(() => {
        setMenu(<TaskMenu filter={handleFilterDispatch} count={count} />);
    }, [setMenu, count]);

    useEffect(() => {
        db.transaction('rw', db.tasks, async () => {
            if (state.query === Query.DELETE) {
                await db.tasks.where({state: 'INACTIVE'}).delete();
            } else if (state.task.idx !== null) {
                await db.tasks.update(state.task.idx, {
                    active: !state.task.active,
                    state: !state.task.active ? 'ACTIVE' : 'INACTIVE'
                });
            }

            const allTasks = await db.tasks.toArray();

            if (allTasks) {
                setTasks(allTasks as Task[]);
            }

            const countAll = await db.tasks.count();
            const countCompleted = await db.tasks.where({state: 'INACTIVE'}).count();

            setCount({
                all: countAll,
                completed: countCompleted,
                uncompleted: countAll - countCompleted
            });
        });
    }, [db, state]);
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TaskList tasks={tasks} query={state.query} handleToggle={handleFilterDispatch} />

            <Zoom in={true} style={{ transitionDelay: '100ms' }}>
                <Fab component={RouterLink} to="/task/add" color="secondary" className={classes.fab}>
                    <AddRounded />
                </Fab>
            </Zoom>
        </div>
    )
}

export default Tasks