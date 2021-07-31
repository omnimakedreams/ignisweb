
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: ({ myTheme }) => ({
        backgroundColor: myTheme.terteary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100vh'
    })
}));

export default function Loader({ theme }) {
    const classes = useStyles({ myTheme: theme});
    return (
        <div className={classes.root}>
            <CircularProgress/>
        </div>
    );
}