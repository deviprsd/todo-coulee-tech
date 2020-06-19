import React, { useState } from 'react';
import { IconButton, Badge, Menu, MenuItem } from '@material-ui/core';
import { 
    FeaturedPlayListRounded, RadioButtonCheckedRounded, RadioButtonUncheckedRounded, 
    FilterListRounded, MoreVertRounded
} from '@material-ui/icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TaskMenuActions } from '../explicit-types';

interface TaskMenuProps {
    filter: (type: TaskMenuActions) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    disabled: {
        color: 'rgba(255, 255, 255, 0.6) !important',
        transition: 'color 0.5s'
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    sectionDesktopAndMobile: {
        display: 'flex'
    }
}));

const useMenu = (id: string): [string, null | HTMLElement, boolean, (event: React.MouseEvent<HTMLElement>) => void, (fn?: Function) => () => void] => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (fn?: Function) => {
        return () => {
            if(fn) {
                fn();
            }
            setAnchorEl(null);
        }
    };

    return [id, anchorEl, open, handleClick, handleClose];
}

const TaskMenu: React.FC<TaskMenuProps> = ({ filter }) => {
    const classes = useStyles();
    const [moreMenuId, moreEl, isMoreOpen, openMoreMenu, closeMoreMenu] = useMenu('task-misc-operations');
    const [filterMenuId, filterEl, isFilterOpen, openFilterMenu, closeFilterMenu] = useMenu('filtering-operations');

    const [disabled, setDisabled] = useState(1);
    const setDisabledAndQuery = (query: TaskMenuActions, index: number) => {
        setTimeout(() => {
            setDisabled(index);
        }, 400);
        filter(query);
    }

    return (
        <>
            <div className={classes.sectionDesktop}>
                <IconButton
                  classes={{disabled: classes.disabled}}
                  aria-label="show 0 tasks"
                  disabled={disabled === 1}
                  color="inherit"
                  onClick={() => setDisabledAndQuery('ALL', 1)}>
                    <Badge badgeContent={0} max={99} color="secondary" showZero>
                        <FeaturedPlayListRounded />
                    </Badge>
                </IconButton>
                <IconButton
                  classes={{disabled: classes.disabled}}
                  aria-label="show 0 completed tasks"
                  disabled={disabled === 2}
                  color="inherit"
                  onClick={() => setDisabledAndQuery('COMPLETED', 2)}>
                    <Badge badgeContent={0} max={99} overlap="circle" color="secondary">
                        <RadioButtonCheckedRounded />
                    </Badge>
                </IconButton>
                <IconButton
                  classes={{disabled: classes.disabled}}
                  aria-label="show 0 pending tasks" 
                  disabled={disabled === 3} 
                  color="inherit" 
                  onClick={() => setDisabledAndQuery("UNCOMPLETED", 3)}>
                    <Badge badgeContent={0} max={99} overlap="circle" color="secondary">
                        <RadioButtonUncheckedRounded />
                    </Badge>
                </IconButton>
            </div>
            <div className={classes.sectionMobile}>
                <IconButton 
                  aria-label="show filtering menu"
                  aria-controls={filterMenuId}
                  aria-haspopup="true"
                  onClick={openFilterMenu}
                  color="inherit">
                    <FilterListRounded />
                </IconButton>
            </div>
            <div className={classes.sectionDesktopAndMobile}>
                <IconButton
                  edge="end"
                  aria-label="show more"
                  aria-controls={moreMenuId}
                  aria-haspopup="true"
                  onClick={openMoreMenu}
                  color="inherit">
                    <MoreVertRounded />
                </IconButton>
            </div>
            <Menu 
              anchorEl={moreEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              id={moreMenuId}
              open={isMoreOpen}
              onClose={closeMoreMenu()}
              keepMounted>
                <MenuItem onClick={closeMoreMenu(() => { filter('REFRESH'); })}>Refresh List</MenuItem>
                <MenuItem onClick={closeMoreMenu(() => { filter('DELETE') })}>Delete Completed</MenuItem>
            </Menu>
            <Menu 
              anchorEl={filterEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              id={filterMenuId}
              open={isFilterOpen}
              onClose={closeFilterMenu()}
              keepMounted>
                <MenuItem onClick={closeFilterMenu(() => { filter('ALL'); })}>All Task</MenuItem>
                <MenuItem onClick={closeFilterMenu(() => { filter('UNCOMPLETED') })}>Active Task</MenuItem>
                <MenuItem onClick={closeFilterMenu(() => { filter('COMPLETED'); })}>Complete Tasks</MenuItem>
            </Menu>
        </>
    );
}

export default TaskMenu;