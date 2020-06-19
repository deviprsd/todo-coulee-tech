import React, { useEffect, useRef } from 'react';
import { RouteProps, Task } from '../explicit-types';
import TaskAddMenu from '../components/TaskAddEditMenu';
import TaskAddEditForm from '../components/TaskAddEditForm';

const TaskAdd: React.FC<RouteProps> = ({ setNavTitle, setMenu, setDrawerMenu }) => {   
    const formEl = useRef<HTMLFormElement>(null);

    useEffect(() => {
        setNavTitle('Add New Task');
        setMenu(<TaskAddMenu form={formEl.current} />);
        setDrawerMenu(null);
    }, [setNavTitle, setMenu, setDrawerMenu]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, submit: Task) => {
        e.preventDefault();
        if(e.currentTarget.checkValidity()) {

        } 
    }
    
    return (
        <TaskAddEditForm handleSubmit={handleSubmit} formRef={formEl} />
    )
}

export default TaskAdd