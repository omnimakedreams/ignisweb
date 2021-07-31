
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Skeleton from '@material-ui/lab/Skeleton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import API from './common/Axios';
import urls from "./common/variables";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    useHistory
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 10
    },
    paper: {
        padding: theme.spacing(2),
        marginBottom: 10,
        minWidth: 200,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));
export default function CarList({ session, car, setCar }) {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [productsQuantity, setProductsQuantity] = useState(0);
    const [productsPrice, setProductsPrice] = useState(0);
    const [data, setData] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const factureThis = () => {
        history.push('/buy');
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        if(data){
            let countArt = 0;
            let totalPrice = 0;
            data.forEach(art=>{
                countArt = countArt+art.quantity;
                totalPrice = totalPrice+(art.price*art.quantity);
            })
            setProductsQuantity(countArt);
            setProductsPrice(totalPrice);
        }
    }, [loading])
    useEffect(() => {
        if(!data){
            setData(car)
        }
        const getCar = () => {
            if(!session){
                setTimeout(() => {
                    if(!session){
                        history.push('/login');
                    }
                }, 1000); 
            }else{
                setLoading(true);
                const request = {
                    access: urls.access,
                    id_user : session.id_user
                }
                API.post(`/car/products/get`, request)
                    .then(res => {
                        if (res.data.status === "success") {
                            setData(res.data.data)
                            setCar(res.data.data)
                        } else {
                            setLoading(false);
                            console.log(res.data.message);
                        }
                    })
            }
        };

        getCar();
    }, [])
    const deleteFromCar = (id) => {
        if(!session){
            setTimeout(() => {
                if(!session){
                    history.push('/login');
                }
            }, 1000); 
        }else{
            setLoading(true);
            const request = {
                access: urls.access,
                id_user : session.id_user,
                id_product : id
            }
            API.post(`/car/products/delete`, request)
                .then(res => {
                    if (res.data.status === "success") {
                        setData(res.data.data)
                        setCar(res.data.data)
                    } else {
                        setLoading(false);
                        console.log(res.data.message);
                    }
                })
        }
    };
    const deleteAllCar = () => {
        if(!session){
            setTimeout(() => {
                if(!session){
                    history.push('/login');
                }
            }, 1000); 
        }else{
            setLoading(true);
            const request = {
                access: urls.access,
                id_user : session.id_user,
            }
            API.post(`/car/products/empty`, request)
                .then(res => {
                    if (res.data.status === "success") {
                        setData([])
                        setCar([])
                    } else {
                        setLoading(false);
                        console.log(res.data.message);
                    }
                })
        }
    };
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                    {(!loading)? 
                            <Button variant="contained" onClick={deleteAllCar} disableElevation>Limpiar carrito</Button>
                        :
                            <Skeleton variant="rect" width={'15%'} height={38} style={{ borderRadius: 5, marginTop: 5 }} animation="wave" />
                    }
                    
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7} style={{ overflow: "scroll", overflowX: "hidden", height: 800, borderRadius: 10 }}>
                    {!loading ?
                            (data.length!=0) ?
                                data.map((item, index) => (
                                    <Paper key={index} className={classes.paper}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <ButtonBase className={classes.image}>
                                                    <img className={classes.img} alt="complex" src={item.imgURL} />
                                                </ButtonBase>
                                            </Grid>
                                            <Grid item xs={12} sm container>
                                                <Grid item xs container direction="column" spacing={2}>
                                                    <Grid item xs>
                                                        <Typography gutterBottom variant="subtitle1">
                                                            {item.title}
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            Precio individual: ${item.price.toFixed(2)}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            Cantidad: {item.quantity}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button variant="contained" onClick={() => deleteFromCar(item.id_product)} disableElevation>Eliminar del carrito</Button>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1">${(item.price * item.quantity).toFixed(2)}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                ))
                                :
                                <>
                                    <Typography variant="h6" gutterBottom>
                                        No hay productos en el carrito
                                    </Typography>
                                </>
                        :
                        <>
                            <Skeleton variant="rect" width={'100%'} height={150} style={{ borderRadius: 5, marginTop: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'100%'} height={150} style={{ borderRadius: 5, marginTop: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'100%'} height={150} style={{ borderRadius: 5, marginTop: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'100%'} height={150} style={{ borderRadius: 5, marginTop: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'100%'} height={150} style={{ borderRadius: 5, marginTop: 5 }} animation="wave" />
                        </>
                        
                    }
                </Grid>
                <Grid item xs={12} md={5}>
                    {!loading ?
                        <>
                           <div style={{ height: 620, overflow: "scroll", overflowX: "hidden", }}>
                               <TableContainer component={Paper} style={{ overflowX: "hidden", }}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Producto</TableCell>
                                                <TableCell align="right">Cantidad</TableCell>
                                                <TableCell align="right">Precio (C/U)</TableCell>
                                                <TableCell align="right">Precio Final</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {data.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.title}</TableCell>
                                                <TableCell align="right">{item.quantity}</TableCell>
                                                <TableCell align="right">{item.price.toFixed(2)}</TableCell>
                                                <TableCell align="right">{(item.quantity*item.price).toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <div style={{ height: 170 }}>
                                <Typography gutterBottom variant="body2" color="textSecondary">
                                    Cantidad de articulos: {productsQuantity}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Precio total: 
                                </Typography>
                                <Typography variant="h4" gutterBottom>
                                    ${productsPrice.toFixed(2)}
                                </Typography>
                                <Button variant="contained" fullWidth color='primary' style={{ marginTop: 10 }} onClick={handleClickOpen}>
                                    <AddShoppingCartIcon /> Facturar
                                </Button>
                            </div>
                        </>
                        :
                        <>
                            <Skeleton variant="rect" width={'100%'} height={600} style={{ borderRadius: 5, marginTop: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'100%'} height={150} style={{ borderRadius: 5, marginTop: 5 }} animation="wave" />
                        </>
                    }
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Facturar compra"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Estas seguro que deseas facturar estos productos por ${productsPrice.toFixed(2)}? Procederá a indicar los detalles de su compra tras esta acción.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={factureThis} color="primary" autoFocus>
                    Confirmar compra
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}