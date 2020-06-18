import React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import { 
    FeaturedPlayListRounded, RadioButtonCheckedRounded, RadioButtonUncheckedRounded, 
    FilterListRounded, MoreVertRounded
} from '@material-ui/icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface TaskMenuProps {
    filter: (type: 'ALL' | 'COMPLETED' | 'UNCOMPLETED') => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
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
}));

const TaskMenu: React.FC<TaskMenuProps> = ({ filter }) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 0 tasks" color="inherit">
                    <Badge badgeContent={0} max={99} color="secondary" showZero>
                        <FeaturedPlayListRounded />
                    </Badge>
                </IconButton>
                <IconButton aria-label="show 0 completed tasks" color="inherit">
                    <Badge badgeContent={0} max={99} overlap="circle" color="secondary">
                        <RadioButtonCheckedRounded />
                    </Badge>
                </IconButton>
                <IconButton aria-label="show 0 pending tasks" color="inherit">
                    <Badge badgeContent={0} max={99} overlap="circle" color="secondary">
                        <RadioButtonUncheckedRounded />
                    </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  color="inherit">
                    <MoreVertRounded />
                </IconButton>
            </div>
            <div className={classes.sectionMobile}>
                <IconButton aria-label="show filtering menu" color="inherit">
                    <FilterListRounded />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  color="inherit">
                    <MoreVertRounded />
                </IconButton>
            </div>
        </>
    );
}

export default TaskMenu;