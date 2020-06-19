import { v4 as uuidv4 } from 'uuid'
import { Task } from '../explicit-types';

export const tasks: Task[] = [
    {
        id: uuidv4(),
        title: 'Build Tower In Pisa',
        description: 'Pisa is a beautiful place to build a tower',
        active: false
    },
    {
        id: uuidv4(),
        title: 'Finish Bridge in Tacoma',
        description: 'Only 2 days of work is left',
        active: true
    }
];