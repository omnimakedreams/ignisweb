
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
    Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 100,
        paddingBottom: 20
    },
    tableContained:{
        maxWidth: 750,
        marginBottom: 5,
        marginTop: 50,
        borderRadius: 20,
        border: 'solid 3px',
        borderColor: theme.palette.primary.main
    },
    table: {
        maxWidth: 750
    },
}));

export default function PlansPage({ session }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>

            <Grid container style={{ padding: 5 }}>
                <Grid item xs={12} md={12} style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Typography variant="h3" color="secondary">
                        Planes adaptados a tu negocio
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12} style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <TableContainer component={Paper} className={classes.tableContained}>
                    <Table className={classes.table} size="medium" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell component="th"></TableCell>
                            <TableCell component="th"  align="center">
                                    <Typography variant="h5">
                                        Gratis
                                    </Typography>
                            </TableCell>
                            <TableCell component="th" align="center">
                                <Typography variant="h5">
                                        Regular
                                </Typography>
                            </TableCell>
                            <TableCell component="th" align="center">
                                <Typography variant="h5">
                                        Premium
                                </Typography>
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Notficaciones de venta vía Whatsapp
                                </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{ color: '#00ea3a' }} /> </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{ color: '#00ea3a' }} /> </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{ color: '#00ea3a' }} /> </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Reportes vía Whatsapp
                                </TableCell>
                                <TableCell align="center"><CancelIcon color="error" /> </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{ color: '#00ea3a' }} /> </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{ color: '#00ea3a' }} /> </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Gestión de Moderadores
                                </TableCell>
                                <TableCell align="center"><CancelIcon color="error" /> </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{ color: '#00ea3a' }} /> </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{ color: '#00ea3a' }} /> </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Personalización
                                </TableCell>
                                <TableCell align="center"><CancelIcon color="error" /> </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{ color: '#00ea3a' }} /> </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{ color: '#00ea3a' }} /> </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Soporte personalizado
                                </TableCell>
                                <TableCell align="center"><CancelIcon color="error" /> </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{ color: '#00ea3a' }} />  </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{ color: '#00ea3a' }} /> </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Gestión de categorías
                                </TableCell>
                                <TableCell align="center"><CancelIcon color="error" /> </TableCell>
                                <TableCell align="center"><CancelIcon color="error" /> </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{ color: '#00ea3a' }} /> </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Ventas ilimitadas
                                </TableCell>
                                <TableCell align="center">5/día </TableCell>
                                <TableCell align="center">20/día </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{ color: '#00ea3a' }} /> </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Productos ilimitados
                                </TableCell>
                                <TableCell align="center">max 10 </TableCell>
                                <TableCell align="center">max 50 </TableCell>
                                <TableCell align="center"><CheckCircleIcon style={{ color: '#00ea3a' }} /> </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Precios
                                </TableCell>
                                <TableCell align="center">
                                    <Card style={{ width: 150 }} variant="outlined">
                                        <CardContent>
                                            <Typography variant="h5">
                                                Gratis / 7 días
                                            </Typography>
                                            <Link to={(session)?"/newstore":"/login"} style={{textDecoration: 'none'}}>
                                                <Button variant="contained" color="primary" style={{ marginTop: 10 }}>
                                                    Probar
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>  
                                </TableCell>
                                <TableCell align="center">
                                    <Card style={{ width: 150 }} variant="outlined">
                                        <CardContent>
                                            <Typography variant="h5">
                                                $10 / mes
                                            </Typography>
                                            <Button variant="contained" color="primary" style={{ marginTop: 10 }}>
                                                Comprar
                                            </Button>
                                        </CardContent>
                                    </Card>  
                                </TableCell>
                                <TableCell align="center">
                                    <Card style={{ width: 150 }} variant="outlined">
                                        <CardContent>
                                            <Typography variant="h5">
                                                $20 / mes
                                            </Typography>
                                            <Button variant="contained" color="primary" style={{ marginTop: 10 }}>
                                                Comprar
                                            </Button>
                                        </CardContent>
                                    </Card> 
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
            </Grid>
            
        </div>
    );
}