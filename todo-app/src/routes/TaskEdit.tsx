import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RouteProps, TaskViewEditParams } from '../explicit-types';

const TaskEdit: React.FC<RouteProps> = ({ setNavTitle }) => {
    const params = useParams<TaskViewEditParams>();

    useEffect(() => {
        setNavTitle('Edit Task');
    }, [setNavTitle])
    
    return <h1>{params.id}</h1>
}

export default TaskEdit