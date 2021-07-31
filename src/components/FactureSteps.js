
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import API from './common/Axios';
import urls from "./common/variables";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import {
    Link
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
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));
function getSteps() {
    return ['Selecciona el método de pago', 'Selecciona el modo de entrega', 'Confirma tu Factura'];
  }
  
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Selecciona el método de pago';
      case 1:
        return 'Selecciona el modo de entrega';
      case 2:
        return 'Confirma tu Factura';
      default:
        return 'Unknown stepIndex';
    }
  }
export default function FactureSteps({ session, car, setCar }) {
    console.log(session);
    const classes = useStyles();
    const steps = getSteps();
    const [productsQuantity, setProductsQuantity] = useState(0);
    const [productsPrice, setProductsPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [value, setValue] = useState(null);
    const [value2, setValue2] = useState(null);
    const [address, setAddress] = useState('');
    useEffect(() => {
        if(activeStep==2){
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
            if(car){
                let countArt = 0;
                let totalPrice = 0;
                car.forEach(art=>{
                    countArt = countArt+art.quantity;
                    totalPrice = totalPrice+(art.price*art.quantity);
                })
                setProductsQuantity(countArt);
                setProductsPrice(totalPrice);
            }
        }
        
    }, [activeStep])
    useEffect(() => {
        if(!session.addressData.street || !session.addressData.house || !session.addressData.city || session.addressData.state=="(empty)" || session.addressData.crountry=="(empty)"){
            setAddress('')
        }else{
            setAddress(session.addressData.street+" "+session.addressData.house+" "+session.addressData.city+" "+session.addressData.state+" "+session.addressData.country);
        } 
    }, [])
    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    };
    const handleChange = (event) => {
      setValue(event.target.value);
    };
    const handleChange2 = (event) => {
        setValue2(event.target.value);
    };
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const resetFrom = () => {
        setValue(null);
        setValue2(null);
        setAddress('');
    };
    const submitPurchase = () => {
        handleClose();
            setLoading(true);
            const request = {
                access : urls.access,
                id_user: session.id_user,
                shipMethod : value2,
                payMethod : value,
                address : address
            };
            API.post(`car/products/buy`, request)
            .then(res => {
                setLoading(false);
                if (res.data.status === "success") {
                    resetFrom();
                    setActiveStep(3);
                    setCar([]);
                } else {
                    console.log(res.data.message);
                }
            })
    };
    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                <div>
                    <Typography className={classes.instructions}>Facturación Completada</Typography>
                    <Typography className={classes.instructions}>En las proximas horas seras contactado por nuestro personal para confirmar tu compra. Por favor esta atento a tus vías de contacto: </Typography>
                    <Typography className={classes.instructions}>{session.code+session.phone}</Typography>
                    <Typography className={classes.instructions}>{session.email}</Typography>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="primary">
                            Volver al inicio
                        </Button>
                    </Link>
                    
                </div>
                ) : (
                    <div style={{ minHeight: 600 }}>
                        <Grid container style={{ margin: 5 }}>
                            {
                                activeStep==0?
                                    <Grid item xs={12} md={12}>
                                        <FormControl component="fieldset" style={{ marginTop: 10, marginBottom: 10}}>
                                            <FormLabel component="legend">{getStepContent(activeStep)}</FormLabel>
                                            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                                <FormControlLabel value="punto" control={<Radio color='#757ce8' />} label="Debito/Crédito" />
                                                <FormControlLabel value="pmovil" control={<Radio color='#757ce8' />} label="Pago Móvil" />
                                                <FormControlLabel value="paypal" control={<Radio color='#757ce8' />} label="Paypal" />
                                                <FormControlLabel value="zellen" control={<Radio color='#757ce8' />} label="Zellen" />
                                                <FormControlLabel value="efectivo" control={<Radio color='#757ce8' />} label="Efectivo" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                :
                                    activeStep==1?
                                        <Grid item xs={12} md={12}>
                                            <FormControl component="fieldset" style={{ marginTop: 10, marginBottom: 10}}>
                                                <FormLabel component="legend">{getStepContent(activeStep)}</FormLabel>
                                                <RadioGroup aria-label="gender" name="gender2" value={value2} onChange={handleChange2}>
                                                    <FormControlLabel value="personal" control={<Radio color='#757ce8' />} label="Entrega Personal en la tienda" />
                                                    <FormControlLabel value="delivery" control={<Radio color='#757ce8' />} label="Delivery" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    :
                                    activeStep==2?
                                        !loading ?
                                            <>  
                                                <Grid item xs={12} md={9} style={{ height: 620, overflow: "scroll", overflowX: "hidden" }}>
                                                    <TableContainer component={Paper} style={{ overflowX: "hidden" }}>
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
                                                            {car.map((item, index) => (
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
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <Typography gutterBottom variant="body2" color="textSecondary">
                                                        A nombre de: {session.name+" "+session.lastname}
                                                    </Typography>
                                                    <Typography gutterBottom variant="body2" color="textSecondary">
                                                        Número de contacto: {session.code+session.phone}
                                                    </Typography>
                                                    <Typography gutterBottom variant="body2" color="textSecondary">
                                                        Método de pago: {(value == "pmovil") ? "Pago Móvil" : (value == "punto") ? "Punto de Venta" : (value == "paypal") ? "Paypal" : (value == "zellen") ? "Zellen" : (value == "efectivo") ? "Efectivo" : value}
                                                    </Typography>
                                                    <Typography gutterBottom variant="body2" color="textSecondary">
                                                        Método de entrega: {(value2 == "delivery") ? "Delivery" : (value2 == "personal") ? "Entrega Personal en la tienda" : value2}
                                                    </Typography>
                                                    {   (value2 == "delivery")?
                                                        <Typography gutterBottom variant="body2" color="textSecondary">
                                                            Dirección: {address}
                                                        </Typography>
                                                        :
                                                        <>
                                                        </>
                                                    }
                                                    <Typography gutterBottom variant="body2" color="textSecondary">
                                                        Cantidad de articulos: {productsQuantity}
                                                    </Typography>
                                                    <Typography variant="h6" gutterBottom>
                                                        Precio total: 
                                                    </Typography>
                                                    <Typography variant="h4" gutterBottom>
                                                        ${productsPrice.toFixed(2)}
                                                    </Typography>
                                                </Grid>
                                            </>
                                        :
                                            <>
                                                <Skeleton variant="rect" width={'100%'} height={300} style={{ borderRadius: 5, marginTop: 5 }} animation="wave" />
                                                <Skeleton variant="rect" width={'100%'} height={150} style={{ borderRadius: 5, marginTop: 5 }} animation="wave" />
                                            </>
                                    :
                                        <>
                                        </>


                            }
                            {
                                (value2=="delivery" && activeStep==1)?
                                        <Grid item xs={12} md={12}>
                                            <Typography className={classes.instructions}>Tu dirección</Typography>
                                            <TextField multiline id="outlined-basic" label="Dirección" variant="outlined" value={address} helperText="Calle, Casa/Piso, Ciudad, Estado, País"  style={{ width: '70%' }} onChange={handleChangeAddress} />
                                        </Grid>
                                :
                                    <>
                                    </>
                            }
                        </Grid>
                    <div>
                        {
                            activeStep==0?
                                    <>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.backButton}
                                        >
                                            Volver
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleNext} disabled={(!value)?true:false}>
                                            Siguiente
                                        </Button>
                                    </>
                            :
                                activeStep==1?
                                    <>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.backButton}
                                        >
                                            Volver
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleNext} disabled={(value2 && address.length>30)?false:(value2=="personal")?false:true}>
                                            Siguiente
                                        </Button>
                                    </>
                                :
                                    activeStep==2?
                                        !loading?
                                            <>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    className={classes.backButton}
                                                >
                                                    Volver
                                                </Button>
                                                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                                    <AddShoppingCartIcon /> Completar Compra
                                                </Button>
                                            </>
                                        :
                                            <>
                                                <Skeleton variant="rect" width={'100%'} height={60} style={{ borderRadius: 5, marginTop: 5 }} animation="wave" />
                                            </>
                                    :
                                        <>
                                        </>
                        }
                    </div>
                </div>
                )}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">¿Estas seguro que deseas facturar estos productos por ${productsPrice.toFixed(2)}?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Nuestro personal se pondran contacto contigo en un máximo de 72 horas tras realizar esta acción.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={submitPurchase} color="primary" autoFocus>
                        Completar Compra
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}