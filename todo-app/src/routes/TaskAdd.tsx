import React, { useEffect, useRef } from 'react';
import { RouteProps, Task } from '../explicit-types';
import TaskAddMenu from '../components/TaskAddEditMenu';
import TaskAddEditForm from '../components/TaskAddEditForm';
import { useHistory } from 'react-router-dom';

const TaskAdd: React.FC<RouteProps> = ({ setNavTitle, setMenu, setDrawerMenu, db }) => {   
    const formEl = useRef<HTMLFormElement>(null);
    const history = useHistory();

    useEffect(() => {
        setNavTitle('Add New Task');
        setMenu(<TaskAddMenu form={formEl.current} />);
        setDrawerMenu(null);
    }, [setNavTitle, setMenu, setDrawerMenu]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, submit: Task) => {
        e.preventDefault();
        if(e.currentTarget.checkValidity()) {
            db.tasks.add({
                ...submit,
                sync: false,
                state: submit.active ? 'ACTIVE' : 'INACTIVE'
            }, submit.id).then(() => {
                history.goBack();
            });
        } 
    }
    
    return (
        <TaskAddEditForm handleSubmit={handleSubmit} active="ACTIVE" formRef={formEl} />
    )
}

export default TaskAdd