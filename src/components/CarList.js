
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import API from './common/Axios';
import urls from "./common/variables";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    useParams,
    useHistory
} from "react-router-dom";
import Loader from './Loader';
import themes from './common/themes';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch';
import {
    Link
} from "react-router-dom";
import MainAppBar from './common/MainAppBar';
import Footer from './common/Footer';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: ({ myTheme }) => ( {
        flexGrow: 1,
        padding: 10,
        backgroundColor: myTheme.terteary.main
    }),
    mainDiv: ({ myTheme }) => ( {
        backgroundColor: myTheme.terteary.main
    }),
    paper: {
        padding: theme.spacing(2),
        marginBottom: 10,
        minWidth: 300,
        maxHeight: 300
    },
    paperLeft: ({ myTheme }) => ({
        padding: theme.spacing(2),
        marginBottom: 10,
        minWidth: 300,
        borderRadius: 10,
        border: 'solid 3px',
        borderColor: myTheme.primary.main
    }),
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
    card: {
        marginTop: 60,
        padding: 20,
    },
    minicard: {
        backgroundColor: '#e0e0e0',
        maxWidth: 180,
        maxHeight: 37,
        padding: 0
    },
    switch: {
        marginTop: -2
    },
    table: {
        maxWidth: 100
    },
    storeCard: {
        borderTopLeftRadius: 200,
        borderBottomLeftRadius: 200,
    }
}));
export default function CarList({ session, car, setCar, setSession }) {
    let { store_key } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [productsQuantity, setProductsQuantity] = useState(0);
    const [productsPrice, setProductsPrice] = useState(0);
    const [storeData, setStoreData] = useState(null);
    const [data, setData] = useState(null);
    const [open, setOpen] = useState(false);
    const [moneda, setMoneda] = useState(true);
    const [dolar, setDolar] = useState(0);
    const [toDeleteID, setToDeleteID] = useState(0);
    const [dialogType, setDialogType] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState(themes.themeBlueDark);
    let classes = useStyles({ myTheme: selectedTheme });
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const factureThis = () => {
        history.push('/buy');
    }
    const handlerFacturar = () => {
        setDialogType('facturar');
        handleClickOpen();
    }
    useEffect(() => {
        if (data) {
            let countArt = 0;
            let totalPrice = 0;
            data.forEach(art => {
                countArt = countArt + art.quantity;
                if(art.mprice && art.quantity>=art.mcondition){
                    totalPrice = totalPrice + (art.mprice * art.quantity);
                }else{
                    totalPrice = totalPrice + (art.price * art.quantity);
                }
            })
            setProductsQuantity(countArt);
            setProductsPrice(totalPrice);
        }
    }, [loading])
    useEffect(() => {
        const getCar = () => {
            if (!session) {
                const storageSession = localStorage.getItem('session');
                if (storageSession) {
                    setLoading(true);
                    const actualSession = JSON.parse(storageSession);
                    const request = {
                        access: urls.access,
                        session: actualSession.session,
                        id_user: actualSession.id_user
                    }
                    API.post(`/users/check/session`, request)
                        .then(res => {
                            if (res.data.status === "success") {
                                setSession(actualSession);
                                API.get(`/store/get/` + store_key + `/` + actualSession.id_user)
                                    .then(res => {
                                        if (res.data.status === "success") {
                                            setStoreData(res.data.storeData);
                                            setDolar(res.data.storeData.dolar);
                                            setData(res.data.userCar);
                                            if (res.data.storeData.theme == 1) {
                                                if (res.data.storeData.day == 1) {
                                                    setSelectedTheme(themes.themeBlueLight);
                                                } else {
                                                    setSelectedTheme(themes.themeBlueDark);
                                                }
                                            } else {
                                                if (res.data.storeData.theme == 2) {
                                                    if (res.data.storeData.day == 1) {
                                                        setSelectedTheme(themes.themePinkLight);
                                                    } else {
                                                        setSelectedTheme(themes.themePinkDark);
                                                    }
                                                } else {
                                                    if (res.data.storeData.day == 3) {
                                                        setSelectedTheme(themes.themeOrangeLight);
                                                    } else {
                                                        setSelectedTheme(themes.themeOrangeDark);
                                                    }
                                                }
                                            }
                                            setLoading(false);
                                        } else {
                                            setLoading(false);
                                            console.log(res.data.message);
                                        }
                                    })
                            } else {
                                console.log(res.data.message);
                            }
                        })
                } else {
                    history.push('/login');
                }
            } else {
                setLoading(true);
                API.get(`/store/get/` + store_key + `/` + session.id_user)
                    .then(res => {
                        if (res.data.status === "success") {
                            setStoreData(res.data.storeData);
                            setDolar(res.data.storeData.dolar);
                            setData(res.data.userCar);
                            if (res.data.storeData.theme == 1) {
                                if (res.data.storeData.day == 1) {
                                    setSelectedTheme(themes.themeBlueLight);
                                } else {
                                    setSelectedTheme(themes.themeBlueDark);
                                }
                            } else {
                                if (res.data.storeData.theme == 2) {
                                    if (res.data.storeData.day == 1) {
                                        setSelectedTheme(themes.themePinkLight);
                                    } else {
                                        setSelectedTheme(themes.themePinkDark);
                                    }
                                } else {
                                    if (res.data.storeData.day == 3) {
                                        setSelectedTheme(themes.themeOrangeLight);
                                    } else {
                                        setSelectedTheme(themes.themeOrangeDark);
                                    }
                                }
                            }
                            setLoading(false);
                        } else {
                            setLoading(false);
                            console.log(res.data.message);
                        }
                    })

            }
        };
        getCar();
    }, [])
    const deleteFromCar = () => {
        setLoading(true);
        const request = {
            access: urls.access,
            id_user: session.id_user,
            id_product: toDeleteID,
            id_store: storeData.id_store
        }
        API.post(`/car/products/delete`, request)
            .then(res => {
                if (res.data.status === "success") {
                    setData(res.data.data)
                    setLoading(false);
                } else {
                    setLoading(false);
                    console.log(res.data.message);
                }
                handleClose();
            })
    };
    const deleteHandler = (id) => {
        setToDeleteID(id);
        setDialogType('eliminar');
        handleClickOpen();
    };
    const deleteAllCar = () => {
        setLoading(true);
        const request = {
            access: urls.access,
            id_user: session.id_user,
            id_store: storeData.id_store
        }
        API.post(`/car/products/empty`, request)
            .then(res => {
                if (res.data.status === "success") {
                    setData([])
                    setCar([])
                    setLoading(false);
                } else {
                    setLoading(false);
                    console.log(res.data.message);
                }
                handleClose();
            })
    };
    const deleteAllHandler = () => {
        setDialogType('eliminarTodo');
        handleClickOpen();
    };
    const handleChangeMoneda = (event) => {
        setMoneda(event.target.checked);
    };

    if (loading) {
        return <Loader theme={themes.themeBlueDark} />
    }
    return (
        <div className={classes.mainDiv} >
            <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar} theme={selectedTheme} />
            <Container maxWidth="lg" style={{ padding: 0 }}>
                <div className={classes.root}>
                    <Card variant="outlined" className={classes.card}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 20
                            }}>
                                <Link to={"/" + storeData.store_key} style={{ textDecoration: 'none' }}>
                                    <img src={storeData.logo} style={{ width: '80%', border: 'solid 5px', borderRadius: '50%', borderColor: selectedTheme.primary.main }} />
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={9} style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center"
                            }}>
                                <Card elevation={0} className={classes.storeCard} style={{
                                    backgroundImage: "url('" + storeData.banner + "')",
                                    backgroundSize: 'cover',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 250,
                                    width: '100%'
                                }}>
                                    <Link to={"/" + storeData.store_key} style={{ textDecoration: 'none' }}>
                                        <Typography variant="h3" style={{ backgroundColor: '#fff', padding: 5, borderRadius: 50, paddingLeft: 15, paddingRight: 15, color: selectedTheme.primary.main }}>
                                            {storeData.title}
                                        </Typography>
                                    </Link>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={2}>
                                <Button variant="contained" onClick={deleteAllHandler} startIcon={<ClearAllIcon />} disableElevation> Vaciar carrito</Button>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <Card elevation={0} className={classes.minicard}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4} style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Typography>
                                                Bs
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Switch
                                                checked={moneda}
                                                onChange={handleChangeMoneda}
                                                name="checkedA"
                                                style={{ color: selectedTheme.primary.main }}
                                                className={classes.switch}
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                        </Grid>
                                        <Grid item xs={4} style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Typography>
                                                $
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Card>
                            </Grid>

                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} style={{ overflow: "auto", overflowX: "hidden", minHeight: 320, maxHeight: 600, borderRadius: 10 }}>
                                {
                                    (data.length != 0) ?
                                        data.map((item, index) => (
                                            <Paper key={index} className={classes.paperLeft}>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Link to={"/product/" + item.product_key} style={{ textDecoration: 'none' }}>
                                                            <ButtonBase className={classes.image}>
                                                                <img className={classes.img} alt="complex" src={item.imgURL} />
                                                            </ButtonBase>
                                                        </Link>
                                                    </Grid>
                                                    <Grid item xs={12} sm container>
                                                        <Grid item xs container direction="column" spacing={2}>
                                                            <Grid item xs>
                                                                <Typography gutterBottom variant="subtitle1">
                                                                    {item.title}
                                                                </Typography>
                                                                <Typography variant="body2" gutterBottom>
                                                                    {"Precio individual: "}
                                                                    {
                                                                        (moneda)?
                                                                            urls.formatAmount((item.mprice && item.quantity>=parseInt(item.mcondition)) ? item.mprice : item.price, 'US')
                                                                        :
                                                                            urls.formatAmount((((item.mprice && item.quantity>=parseInt(item.mcondition)) ? item.mprice : item.price) * dolar), 'VE').replace('VES', 'BS')

                                                                    }
                                                                    {
                                                                        (item.mprice && item.quantity>=item.mcondition) ? 
                                                                            " (Al mayor)" 
                                                                        : 
                                                                            ""
                                                                    }
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary">
                                                                    Cantidad: {item.quantity}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container>
                                                                <Grid item xs={12} style={{
                                                                    display: "flex",
                                                                    justifyContent: "flex-end",
                                                                    alignItems: "flex-start",
                                                                    minHeight: 100
                                                                }}>
                                                                    <Typography variant="subtitle1">
                                                                        {
                                                                            (moneda) ?
                                                                                urls.formatAmount((((item.mprice && item.quantity>=parseInt(item.mcondition)) ? item.mprice : item.price) * item.quantity), 'US')
                                                                                :
                                                                                urls.formatAmount(((((item.mprice && item.quantity>=parseInt(item.mcondition)) ? item.mprice : item.price) * item.quantity) * dolar), 'VE').replace('VES', 'BS')
                                                                        }
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12} style={{
                                                                    display: "flex",
                                                                    justifyContent: "flex-end",
                                                                    alignItems: "flex-end"
                                                                }}>
                                                                    <IconButton onClick={() => deleteHandler(item.id_product)} disableElevation style={{ color: selectedTheme.primary.main }} aria-label="upload picture" component="span">
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Grid>
                                                            </Grid>
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
                                }
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{ height: 170 }}>
                                    <Typography gutterBottom variant="body2" color="textSecondary">
                                        Cantidad de articulos: {productsQuantity}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        Precio total:
                                    </Typography>
                                    <Typography variant="h4" gutterBottom>
                                        {
                                            (moneda) ?
                                                urls.formatAmount(productsPrice, 'US')
                                                :
                                                urls.formatAmount((productsPrice * dolar), 'VE').replace('VES', 'BS')
                                        }
                                    </Typography>
                                    {
                                        (data) ?
                                            (data.length != 0) ?
                                                <Button variant="contained" fullWidth style={{ marginTop: 10, backgroundColor: selectedTheme.primary.main, color: selectedTheme.primary.contrastText }} onClick={handlerFacturar}>
                                                    <AddShoppingCartIcon style={{ color: selectedTheme.primary.contrastText }} /> Facturar
                                                </Button>
                                                :
                                                <Button variant="contained" fullWidth style={{ marginTop: 10 }} disabled={true}>
                                                    <AddShoppingCartIcon /> Facturar
                                                </Button>
                                            :
                                            <>
                                            </>

                                    }

                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography>
                                    El precio y la disponibilidad de los productos de {storeData.title} están sujetos a cambio. En el carrito de compras puedes dejar temporalmente los productos que quieras. Aparecerá el precio más reciente de cada producto.
                                </Typography>
                            </Grid>

                        </Grid>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            {
                                (dialogType == "facturar") ?
                                    <>
                                        <DialogTitle id="alert-dialog-title">{"Facturar compra"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                ¿Estas seguro que deseas facturar estos productos por {urls.formatAmount(productsPrice, 'US')}? Procederá a indicar los detalles de su compra tras esta acción.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} >
                                                Cancelar
                                            </Button>
                                            <Button onClick={factureThis}  style={{ color: selectedTheme.primary.main }} autoFocus>
                                                Confirmar compra
                                            </Button>
                                        </DialogActions>
                                    </>
                                    :
                                    (dialogType == "eliminar") ?
                                        <>
                                            <DialogTitle id="alert-dialog-title">Eliminar producto</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    ¿Estas seguro que deseas eliminar este producto del carrito?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>
                                                    Cancelar
                                                </Button>
                                                <Button onClick={deleteFromCar}  style={{ color: selectedTheme.primary.main }} autoFocus>
                                                    Eliminar
                                                </Button>
                                            </DialogActions>
                                        </>
                                        :
                                        (dialogType == "eliminarTodo") ?
                                            <>
                                                <DialogTitle id="alert-dialog-title">Eliminar producto</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        ¿Estas seguro que deseas eliminar todos los productos del carrito?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>
                                                        Cancelar
                                                    </Button>
                                                    <Button onClick={deleteAllCar} style={{ color: selectedTheme.primary.main }} autoFocus>
                                                        Eliminar Todo
                                                    </Button>
                                                </DialogActions>
                                            </>
                                            :
                                            <></>
                            }
                        </Dialog>
                    </Card>
                </div>
            </Container>
            <Footer theme={selectedTheme} />
        </div>
    );
}