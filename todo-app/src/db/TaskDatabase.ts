import Dexie from "dexie";
import { Task } from "../explicit-types";

export interface ITask extends Task {
    sync: boolean,
    state: 'ACTIVE' | 'INACTIVE' // For faster indexing
}

export class TaskDatabase extends Dexie {
    tasks: Dexie.Table<ITask, string>;

    constructor() { 
        super('TaskDatabase');

        this.version(1).stores({
            tasks: 'id,title,description,active,sync,state'
        });

        this.tasks = this.table('tasks');
    }
}