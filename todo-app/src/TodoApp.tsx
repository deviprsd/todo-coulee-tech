import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, LinearProgress } from '@material-ui/core';
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

    const [title, setTitle] = useState<null | string>(null);
    const handleTitleChanges = (title: string) => {
        document.title = `${title} | ToDo Coulee Tech`;
        setTitle(title);
    }

    const [menu, setMenu] = useState<React.ReactNode>(null);
    const handleMenuChanges = (menu: React.ReactNode) => {
        setMenu(menu);
    }

    const routeProps  = (props: any) => ({
        setNavTitle: handleTitleChanges,
        setMenu: handleMenuChanges,
        ...props
    });

    return (
        <Router>
            <Nav title={title} width={drawerWidth} children={menu} />
            <main className={classes.container}>
                <div className={classes.toolbar} />
                <Suspense fallback={<LinearProgress color="secondary" />}>
                    <Container maxWidth="xl">
                        <Switch>
                            <Route path="/" exact render={(props) => <Tasks {...routeProps(props)} />}/>
                            <Route path="/tasks" render={(props) => <Tasks {...routeProps(props)} />} />
                            <Route path="/task/add" render={(props) => <TaskDetail {...routeProps(props)} />} />
                            <Route path="/task/:id" render={(props) => <TaskDetail {...routeProps(props)} />} />
                            <Route path="/statistics" render={(props) => <Statistics {...routeProps(props)} />} />
                        </Switch>
                    </Container>
                </Suspense>
            </main>
        </Router>
    );
}

export default TodoApp;
