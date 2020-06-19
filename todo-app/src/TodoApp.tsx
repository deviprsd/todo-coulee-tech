import React, { Suspense, lazy, useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, LinearProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Nav from './components/Nav';
import { NullProps, DrawerMenuActions } from './explicit-types';

const Tasks = lazy(() => import('./routes/Tasks'));
const TaskDetail = lazy(() => import('./routes/TaskDetail'));
const TaskAdd = lazy(() => import('./routes/TaskAdd'));
const TaskEdit = lazy(() => import('./routes/TaskEdit'));
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

const useNav = () => {
    const [title, setTitle] = useState<null | string>(null);
    const handleTitleChanges = useCallback((title: string) => {
        document.title = `${title} | ToDo Coulee Tech`;
        setTitle(title);
    }, []);

    const [menu, setMenu] = useState<React.ReactNode>(null);
    const handleMenuChanges = useCallback((menu: React.ReactNode) => {
        setMenu(menu);
    }, []);

    const [drawerSelected, setDrawerSelected] = useState<DrawerMenuActions>(null);
    const handleDrawerSelectedChanges = useCallback((selected: DrawerMenuActions) => {
        setDrawerSelected(selected);
    }, []);

    return {
        routeProps: (props: any) => ({
            setNavTitle: handleTitleChanges,
            setMenu: handleMenuChanges,
            setDrawerMenu: handleDrawerSelectedChanges,
            ...props
        }),
        title: title,
        menu: menu,
        selected: drawerSelected,
    }
}

const TodoApp: React.FC<NullProps> = () => {
    const classes = useStyle();
    const nav = useNav();

    return (
        <Router>
            <Nav title={nav.title} width={drawerWidth} children={nav.menu} selected={nav.selected} />
            <main className={classes.container}>
                <div className={classes.toolbar} />
                <Suspense fallback={<LinearProgress color="secondary" />}>
                    <Container maxWidth="xl">
                        <Switch>
                            <Route path="/" render={(props) => <Tasks {...nav.routeProps(props)} />} exact/>
                            <Route path="/tasks" render={(props) => <Tasks {...nav.routeProps(props)} />} />
                            <Route path="/task/add" render={(props) => <TaskAdd {...nav.routeProps(props)} />} />
                            <Route path="/task/:id" render={(props) => <TaskDetail {...nav.routeProps(props)} />} exact/>
                            <Route path="/task/:id/edit" render={(props) => <TaskEdit {...nav.routeProps(props)} />} />
                            <Route path="/statistics" render={(props) => <Statistics {...nav.routeProps(props)} />} />
                        </Switch>
                    </Container>
                </Suspense>
            </main>
        </Router>
    );
}

export default TodoApp;
