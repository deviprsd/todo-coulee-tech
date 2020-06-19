import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { RouteProps, TaskViewEditParams, Task } from '../explicit-types';
import TaskEditMenu from '../components/TaskAddEditMenu';
import TaskAddEditForm from '../components/TaskAddEditForm';

const TaskEdit: React.FC<RouteProps> = ({ setNavTitle, setMenu, setDrawerMenu }) => {
    const params = useParams<TaskViewEditParams>();
    const formEl = useRef<HTMLFormElement>(null);

    useEffect(() => {
        setNavTitle('Edit Task');
        setMenu(<TaskEditMenu form={formEl.current} />);
        setDrawerMenu(null);
    }, [setNavTitle, setMenu, setDrawerMenu]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, submit: Task) => {
        e.preventDefault();
        if(e.currentTarget.checkValidity()) {

        } else {
            console.log(e.currentTarget.getElementsByTagName('input'))
        }
    }
    
    return (
        <TaskAddEditForm id={params.id} title={params.id} description="" active="ACTIVE" handleSubmit={handleSubmit} formRef={formEl} />
    )
}

export default TaskEdit