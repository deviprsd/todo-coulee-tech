import React, { useReducer, useRef, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Paper, TextField, MenuItem } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../explicit-types';

const status = [
    {
      value: 'ACTIVE',
      label: 'Pending',
    },
    {
      value: 'INACTIVE',
      label: 'Completed',
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
            return {...state, title: action.payload.title};
        case 'DESCRIPTION': 
            return {...state, description: action.payload.description};
        case 'ACTIVE': 
            return {...state, active: action.payload.active};
        case 'ERROR':
            return {...state, error: {
                ...state.error,
                ...action.payload.error
            }};
        default: return {...state, ...action.payload};
    }
}

const useValidator = (): 
    [State, (dispatchType: string) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void, React.Dispatch<Action>] => {
    const [state, dispatch] = useReducer(reducer, {
        error: {
            title: false,
            titleErrMessage: null,
            description: false,
            descriptionErrMessage: null,
        },
        title: '',
        description: '',
        active: 'ACTIVE'
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
                    type: 'ERROR',
                    payload: {
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

    return [state, validator, dispatch];
}

interface TaskAddEditFormProps {
    id?: string,
    title?: string,
    description?: string,
    active?: 'ACTIVE' | 'INACTIVE',
    formRef: React.RefObject<HTMLFormElement>,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>, submit: Task) => void
}

const TaskAddEditForm: React.FC<TaskAddEditFormProps> = ({ title, description, active, id, handleSubmit, formRef }) => {
    const classes = useStyles();
    const [state, validator, setState] = useValidator();
    const titleInputRef = useRef<HTMLElement>(null);
    const descriptionInputRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setState({type: 'RESET', payload: {title, description, active}});
    }, [setState, active, title, description]);

    const handleAddEditSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
        // change event doesn't trigger so using blur to workaround force validation for better feedback to the user
        const evt = new Event('blur', { bubbles: true })
        titleInputRef.current!.dispatchEvent(evt);
        descriptionInputRef.current!.dispatchEvent(evt);

        handleSubmit(e, {
            id: id ? id : uuidv4(),
            title: state.title,
            description: state.description,
            active: state.active === 'ACTIVE'
        });
    }

    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.paper}>
                <form 
                  ref={formRef}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleAddEditSubmit}>
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
                          onBlur={validator('TITLE')}
                          helperText={state.error.titleErrMessage}
                          inputRef={titleInputRef}
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
                          onBlur={validator('DESCRIPTION')}
                          inputRef={descriptionInputRef}
                          helperText={state.error.descriptionErrMessage}
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

export default TaskAddEditForm