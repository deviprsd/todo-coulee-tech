import React, { useEffect } from 'react';
import { RouteProps } from '../explicit-types';

const Tasks: React.FC<RouteProps> = ({ setNavTitle }) => {
    useEffect(() => {
        setNavTitle('Tasks')
    }, [setNavTitle])

    return <h1>Tasks</h1>
}

export default Tasks