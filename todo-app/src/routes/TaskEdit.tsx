import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RouteProps, TaskViewEditParams } from '../explicit-types';
import TaskEditMenu from '../components/TaskAddEditMenu';
import TaskAddEditForm from '../components/TaskAddEditForm';

const TaskEdit: React.FC<RouteProps> = ({ setNavTitle, setMenu, setDrawerMenu }) => {
    const params = useParams<TaskViewEditParams>();

    useEffect(() => {
        setNavTitle('Edit Task');
        setMenu(<TaskEditMenu />);
        setDrawerMenu(null);
    }, [setNavTitle, setMenu, setDrawerMenu]);
    
    return (
        <TaskAddEditForm title={params.id} description="" active="ACTIVE" />
    )
}

export default TaskEdit