import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Hidden, Drawer, IconButton, CssBaseline } from '@material-ui/core';
import { MenuRounded } from '@material-ui/icons';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import TodoDrawer from './Drawer';

interface TodoNavProps {
    title: string | null,
    width: number,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    appBar: (prop: TodoNavProps) => ({
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${prop.width}px)`,
            marginLeft: prop.width,
        },
    }),
    drawer: (props: TodoNavProps) => ({
        [theme.breakpoints.up('sm')]: {
            width: props.width,
            flexShrink: 0,
        },
    }),
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    drawerPaper: (props: TodoNavProps) => ({
        width: `${props.width}px`,
    }),
}));

const TodoNav: React.FC<TodoNavProps> = (props) => {
    const classes = useStyles(props);
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                      aria-label={drawerOpen ? 'clode drawer' : 'open drawer'}
                      className={classes.menuButton}
                      color='inherit'
                      onClick={handleDrawerToggle}>
                        <MenuRounded />
                    </IconButton>
                    <Typography variant='h6' noWrap>
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label='drawer with menus'>
                <Hidden smUp implementation='css'>
                    <Drawer
                      anchor={theme.direction === 'rtl' ? 'right': 'left'}
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                      open={drawerOpen}
                      variant='temporary'
                      onClose={handleDrawerToggle}
                      ModalProps={{keepMounted: true}}>
                        <TodoDrawer />
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation='css'>
                    <Drawer
                      anchor={theme.direction === 'rtl' ? 'right': 'left'}
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                      variant='permanent'>
                        <TodoDrawer />
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    )
}

export default TodoNav;