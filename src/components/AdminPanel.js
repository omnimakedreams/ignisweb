
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';

import {
    Link
} from "react-router-dom";
import LocalMallIcon from '@material-ui/icons/LocalMall';
const useStyles = makeStyles(() => ({
    root: {
        marginBottom: 10,
        height: 800
    },
}));
export default function AdminPanel() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container style={{ margin: 5 }}>
                <Grid item xs={12} md={6}>
                    <Link to="/panel/products/add" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            elevation={0}
                            className={classes.button}
                            startIcon={<LocalMallIcon />}
                            style={{ width: '98%' }}
                        >
                            Agregar nuevo producto
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Link to="/admin/panel/users" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            elevation={0}
                            className={classes.button}
                            startIcon={<PersonIcon />}
                            style={{ width: '98%' }}
                        >
                            Gestión de usuarios
                        </Button>
                    </Link>
                </Grid>
            </Grid>
            
        </div>
    );
}
