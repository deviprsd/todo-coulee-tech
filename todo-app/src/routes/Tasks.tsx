import React, { useEffect, useReducer } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Fab, Zoom } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { RouteProps, TaskMenuActions } from '../explicit-types';
import TaskMenu from '../components/TaskMenu';

enum Query {
    ALL, CHECKED, UNCHECKED, DELETE, REFRESH
}

type State = {
    query: Query
}

type Action = {
    query: TaskMenuActions
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {},
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
            return { query: Query.ALL };
        case 'COMPLETED':
            return { query: Query.CHECKED };
        case 'UNCOMPLETED':
            return { query: Query.UNCHECKED };
        case 'DELETE':
            return { query: Query.DELETE };
        case 'REFRESH':
                return { query: Query.REFRESH };
        default:
            return state
    }
}

const Tasks: React.FC<RouteProps> = ({ setNavTitle, setMenu, setDrawerMenu }) => {
    const [state, dispatch] = useReducer(reducer, { query: Query.ALL });
    const handleFilterDispatch = (type: TaskMenuActions) => {
        dispatch({ query: type })
    };

    useEffect(() => {
        setNavTitle('Tasks');
        setDrawerMenu('Tasks');
        setMenu(<TaskMenu filter={handleFilterDispatch} />);
    }, [setNavTitle, setMenu, setDrawerMenu]);
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Zoom in={true} style={{ transitionDelay: '100ms' }}>
                <Fab component={RouterLink} to="/task/add" color="secondary" className={classes.fab}>
                    <Add />
                </Fab>
            </Zoom>
        </div>
    )
}

export default Tasks