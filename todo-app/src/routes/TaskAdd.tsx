import React, { useEffect, useReducer } from 'react';
import { RouteProps } from '../explicit-types';
import TaskAddMenu from '../components/TaskAddMenu';
import { TextField, Paper, makeStyles, Theme, createStyles, MenuItem } from '@material-ui/core';

const status = [
    {
      value: 'ACTIVE',
      label: 'Completed',
    },
    {
      value: 'INACTIVE',
      label: 'Pending',
    },
  ];

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
    paper: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(1)
    }
}));

interface State {
    error: {
        title: boolean,
        titleErrMessage: string | null,
        description: boolean,
        descriptionErrMessage: string | null
    },
    title: string,
    description: string,
    active: string
}

// requires further strong typing 
interface Action {
    type: string,
    payload: any
}

const reducer = (state: State, action: Action) => {
    switch(action.type) {
        case 'TITLE': 
            return {...state, title: action.payload.title, error: {
                ...action.payload.error
            }};
        case 'DESCRIPTION': 
            return {...state, description: action.payload.description, error: {
                ...action.payload.error
            }};
        case 'ACTIVE': 
            return {...state, active: action.payload.active};
        case 'ERROR':
            return {...state, error: {
                ...action.payload.error
            }};
        default: return state;
    }
}

const useValidator = (): [State, (dispatchType: string) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void] => {
    const [state, dispatch] = useReducer(reducer, {
        error: {
            title: false,
            titleErrMessage: null,
            description: false,
            descriptionErrMessage: null,
        },
        title: '',
        description: '',
        active: 'INACTIVE'
    });

    const validator = (dispatchType: string) => {
        return (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const el = e.target;
            if (el.checkValidity && !el.checkValidity()) {
                if (dispatchType === 'TITLE') {
                    dispatch({
                        type: 'ERROR',
                        payload: {
                            error: {
                                title: true,
                                titleErrMessage: 'Title is required',
                            }
                        }
                    });
                } else if (dispatchType === 'DESCRIPTION') {
                    dispatch({
                        type: 'ERROR',
                        payload: {
                            error: {
                                description: true,
                                descriptionErrMessage: 'Description is required',
                            }
                        }
                    });
                }
            } else if (dispatchType === 'TITLE' || dispatchType === 'DESCRIPTION') {
                dispatch({
                    type: dispatchType,
                    payload: {
                        [dispatchType.toLowerCase()]: el.value,
                        error: {
                            [dispatchType.toLowerCase()]: false,
                            [`${dispatchType.toLowerCase()}ErrMessage`]: null
                        }
                    }
                });
            }
            
            dispatch({
                type: dispatchType,
                payload: {
                    [dispatchType.toLowerCase()]: el.value,
                }
            });
        }
    }

    return [state, validator];
}

const TaskAdd: React.FC<RouteProps> = ({ setNavTitle, setMenu, setDrawerMenu }) => {
    const classes = useStyles();
    const [state, validator] = useValidator();
    
    useEffect(() => {
        setNavTitle('Add New Task');
        setMenu(<TaskAddMenu />);
        setDrawerMenu(null);
    }, [setNavTitle, setMenu, setDrawerMenu]);
    
    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.paper}>
                <form noValidate autoComplete="off">
                    <div>
                        <TextField 
                          id="task-title"
                          label="Title"
                          variant="outlined"
                          fullWidth
                          required
                          error={state.error.title}
                          value={state.title}
                          onChange={validator('TITLE')}
                          margin="normal"/>
                        
                        <TextField 
                          id="task-description"
                          label="Description"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={4}
                          rowsMax={4}
                          required
                          error={state.error.description}
                          value={state.description}
                          onChange={validator('DESCRIPTION')}
                          margin="normal"/>
                        
                        <TextField 
                          id="task-status"
                          label="Status"
                          variant="outlined"
                          fullWidth
                          select
                          value={state.active}
                          onChange={validator('ACTIVE')}
                          margin="normal">
                            {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </form>
            </Paper>
        </div>
    )
}

export default TaskAdd