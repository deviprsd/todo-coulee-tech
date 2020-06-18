import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Nav from './components/Nav';
import { NullProps } from './explicit-types';

const Tasks = lazy(() => import('./routes/Tasks'));
const TaskDetail = lazy(() => import('./routes/TaskDetail'));
const Statistics = lazy(() => import('./routes/Statistics'));

const drawerWidth = 200;
const useStyle = makeStyles((theme: Theme) => createStyles({
    toolbar: theme.mixins.toolbar,
    container: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
        }
    }
}));

const TodoApp: React.FC<NullProps> = () => {
    const classes = useStyle();
    const [title, setTitle] = useState('');
    const handleTitleChanges = (title: string) => {
        document.title = `${title} | ToDo Coulee Tech`;
        setTitle(title);
    }

    return (
        <Router>
            <Nav title={title} width={drawerWidth} />
            <main className={classes.container}>
                <Container maxWidth="xl">
                    <div className={classes.toolbar} />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                        <Route path="/" exact render={(props) => <Tasks setNavTitle={handleTitleChanges} {...props} />}/>
                        <Route path="/tasks" render={(props) => <Tasks setNavTitle={handleTitleChanges} {...props} />} />
                        <Route path="/task/add" render={(props) => <TaskDetail setNavTitle={handleTitleChanges} {...props} />} />
                        <Route path="/task/:id" render={(props) => <TaskDetail setNavTitle={handleTitleChanges} {...props} />} />
                        <Route path="/statistics" render={(props) => <Statistics setNavTitle={handleTitleChanges} {...props} />} />
                        </Switch>
                    </Suspense>
                </Container>
            </main>
        </Router>
    );
}

export default TodoApp;
