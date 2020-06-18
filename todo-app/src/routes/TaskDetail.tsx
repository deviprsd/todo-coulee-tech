import React, { useEffect } from 'react';
import { RouteProps } from '../explicit-types';

const Task: React.FC<RouteProps> = ({ setNavTitle }) => {
    useEffect(() => {
        setNavTitle('Tasks Detail')
    }, [setNavTitle])

    return <h1>Task Detail</h1>
}

export default Task