import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { RouteProps, TaskViewEditParams, Task } from '../explicit-types';
import TaskEditMenu from '../components/TaskAddEditMenu';
import TaskAddEditForm from '../components/TaskAddEditForm';
import { ITask } from '../db/TaskDatabase';

const TaskEdit: React.FC<RouteProps> = ({ setNavTitle, setMenu, setDrawerMenu, db }) => {
    const params = useParams<TaskViewEditParams>();
    const formEl = useRef<HTMLFormElement>(null);
    const history = useHistory();

    const [task, setTask] = useState<ITask>({
        id: params.id,
        title: '',
        description: '',
        active: false,
        sync: false,
        state: 'INACTIVE'
    });

    useEffect(() => {
        setNavTitle('Edit Task');
        setMenu(<TaskEditMenu form={formEl.current} />);
        setDrawerMenu(null);

        db.transaction('r', db.tasks, async () => {
            const taskFromId = await db.tasks.get(params.id);

            if(taskFromId) {
                setTask(taskFromId)
            }
        });
    }, [setNavTitle, setMenu, setDrawerMenu, db, params.id]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, submit: Task) => {
        e.preventDefault();
        if(e.currentTarget.checkValidity()) {
            db.tasks.put({
                ...submit,
                sync: task.sync,
                state: submit.active ? 'ACTIVE' : 'INACTIVE'
            }, submit.id).then(() => {
                history.goBack();
            })
        }
    }
    
    return (
        <TaskAddEditForm 
          id={task.id} 
          title={task.title} 
          description={task.description} 
          active={task.active ? 'ACTIVE' : 'INACTIVE' } 
          handleSubmit={handleSubmit} formRef={formEl} />
    )
}

export default TaskEdit