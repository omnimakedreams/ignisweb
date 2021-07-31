
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    root: {
        marginBottom: 10
    }
}));
export default function BreadsLine({ categories, theme }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Breadcrumbs separator={<NavigateNextIcon style={{ color: theme.terteary.contrastText }} fontSize="small" />} aria-label="breadcrumb">
                {
                    Array.from(categories).map((item, index) => (
                        <Typography style={{ textAlign: 'center', color: theme.terteary.contrastText }}>
                            { item.name }
                        </Typography>
                    )) 
                }
            </Breadcrumbs>
        </div>
    );
}