import React, { useEffect, useState } from 'react';
import { RouteProps, TaskMenuCount } from '../explicit-types';
import StatisticsMenu from '../components/StatisticsMenu';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMoreRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        paddingTop: theme.spacing(2)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const stats = [
    {
        key: 'all',
        heading: 'All Tasks',
        secondaringHeading: (c: number) => {
            return `A total of ${c} tasks are being tracked`
        },
        desc: 'This statistic shows us the total number of tasks that are in storage and being tracked',
    },
    {
        key: 'completed',
        heading: 'Completed Tasks',
        secondaringHeading: (c: number) => {
            return `${c} tasks have been completed`
        },
        desc: 'This statistic shows us the number a tasks a user has completed',
    },
    {
        key: 'uncompleted',
        heading: 'Pending Tasks',
        secondaringHeading: (c: number) => {
            return `There are still ${c} tasks pending`
        },
        desc: 'This statistic shows us the number a tasks a user has yet to completed',
    }
]

const Statistics: React.FC<RouteProps> = ({ setNavTitle, setDrawerMenu, setMenu, db }) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [count, setCount] = useState<TaskMenuCount>({
        all: 0,
        completed: 0,
        uncompleted: 0
    });
    const classes = useStyles();

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        setNavTitle('Statistics');
        setDrawerMenu('Statistics');
        setMenu(<StatisticsMenu />);
    }, [setNavTitle, setDrawerMenu, setMenu]);

    useEffect(() => {
        db.transaction('rw', db.tasks, async () => {
            const countAll = await db.tasks.count();
            const countCompleted = await db.tasks.where({state: 'INACTIVE'}).count();

            setCount({
                all: countAll,
                completed: countCompleted,
                uncompleted: countAll - countCompleted
            });
        });
    }, [db, setCount]);

    return (
        <div className={classes.root}>
            {stats.map((stat) => {
                return (
                    <ExpansionPanel expanded={expanded === stat.key} onChange={handleChange(stat.key)}>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreRounded />}
                          aria-controls={`${stat.key}-content`}
                          id={`${stat.key}-header`}>
                            <Typography className={classes.heading}>{ stat.heading }</Typography>
                            <Typography className={classes.secondaryHeading}>{ stat.secondaringHeading(count[stat.key as keyof TaskMenuCount]) }</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                { stat.desc }
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            })}
        </div>
    )
}

export default Statistics