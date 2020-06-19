import React, { useEffect } from 'react';
import { RouteProps } from '../explicit-types';
import TaskAddMenu from '../components/TaskAddEditMenu';
import TaskAddEditForm from '../components/TaskAddEditForm';

const TaskAdd: React.FC<RouteProps> = ({ setNavTitle, setMenu, setDrawerMenu }) => {    
    useEffect(() => {
        setNavTitle('Add New Task');
        setMenu(<TaskAddMenu />);
        setDrawerMenu(null);
    }, [setNavTitle, setMenu, setDrawerMenu]);
    
    return (
        <TaskAddEditForm />
    )
}

export default TaskAdd