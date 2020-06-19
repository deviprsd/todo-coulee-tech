import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Avatar } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import { FormatListBulletedRounded, EqualizerRounded, AssignmentRounded } from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { DrawerMenuActions } from '../explicit-types';

const useStyles = makeStyles((theme: Theme) => createStyles({
    toolbar: {
        ...theme.mixins.toolbar,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
    },
}));

interface DrawerProps {
    toggle?: () => void,
    selected: DrawerMenuActions
}

const TodoDrawer: React.FC<DrawerProps> = ({ toggle, selected }) => {
    const classes = useStyles();
    const drawerActions: DrawerMenuActions[] = ['Tasks', 'Statistics'];

    return (
        <div>
            <div className={classes.toolbar}>
                <Avatar component={ RouterLink } to="/" variant="rounded" className={classes.pink}>
                    <AssignmentRounded />
                </Avatar>
            </div>
            <Divider />
            <List>
                {drawerActions.map((text, index) => (
                    <ListItem
                      selected={ selected === text }
                      button
                      component={ RouterLink }
                      to={text === 'Statistics' ? '/statistics' : '/tasks'}
                      onClick={() => toggle && toggle()}
                      key={`${text}-${index}`}>
                        <ListItemIcon>{text === 'Statistics' ? <EqualizerRounded /> : <FormatListBulletedRounded />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default TodoDrawer;