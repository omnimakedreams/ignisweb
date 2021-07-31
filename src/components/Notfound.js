
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '80vh'
    },
    gatitos: {
        width: 600,
        opacity: 0.8
    }
}));

export default function Notfound({ theme }) {
    const classes = useStyles({ myTheme: theme});
    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                    <Grid item xs={12} md={12} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <img src={"./gatitos.svg"} className={classes.gatitos}/>
                    </Grid>
                    <Grid item xs={12} md={12} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Typography variant="h5" align="center" style={{ color: theme.terteary.contrastText }}>
                            PÁGINA NO ENCONTRADA
                        </Typography>
                    </Grid>
                    
            </Grid>
        </div>
    );
}