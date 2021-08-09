
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StoreIcon from '@material-ui/icons/Store';
import API from './common/Axios';
import axios from './common/Axios';
import urls from "./common/variables";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    Link
} from "react-router-dom";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import CropperImage from './common/CropperImage';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 10,
        paddingTop: 50,
        minHeight: 650,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    cover: {
        width: "100%",
        backgroundPosition: 'center',
        backgroundRepeat: 'none',
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
        backgroundColor: '#dfefff'
    },
    logo0: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 220,
        height: 220,
        borderRadius: '50%',
        backgroundColor: theme.palette.terteary.main,
        padding: 10
    },
    logo2: {
        width: 219,
        height: 219,
        borderRadius: '50%',
        backgroundColor: theme.palette.terteary.main,
    },
    logo3: {
        width: 185,
        height: 185,
        marginTop: 15
    },
    logoEmpty: {
        width: 220,
        height: 220,
        borderRadius: '50%',
        backgroundColor: '#fff',
        padding: 10
    }
}));
function getSteps() {
    return ['Datos principales', 'Configura tu moneda', 'Carga de imágenes', 'Finalizar'];
}
export default function NewStore({ session }) {
    const classes = useStyles();
    const steps = getSteps();
    const [activeStep, setActiveStep] = useState(2);
    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingInCard, setLoadingInCard] = useState(false);
    const [title, setTitle] = useState('');
    const [tempurl, setTempurl] = useState('');
    const [description, setDescription] = useState('');
    const [statusdomain, setStatusDomain] = useState('unchecked');
    const [dolar, setDolar] = useState(0);
    const [banner, setBanner] = useState(null);
    const [logo, setLogo] = useState(null);
    
    
    const handleChangeTitle = (event) => {
        setStatusDomain('unchecked');
        setTitle(event.target.value);
        const value = event.target.value.toLowerCase().replace(/ /g, "").replace(/[^a-zA-Z0-9]/g, '');
        setTempurl(value);
    };
    const handleChangeTempURL = (event) => {
        setStatusDomain('unchecked');
        setTempurl(event.target.value);
    };
    const handleChangeDolar = (event) => {
        setDolar(event.target.value);
    };
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };
    

    const handleCopy = (e) => {
        e.preventDefault();
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const verifyTitles = () => {
        if (title != "" && tempurl != "") {
            setLoadingButton(true);
            const request = {
                access: urls.access,
                key: tempurl
            };
            API.post(`store/check/add`, request)
                .then(res => {
                    console.log(res.data);
                    if (res.data.status === "success") {
                        setStatusDomain('checked');
                    } else {
                        setStatusDomain('denied');
                    }
                    setLoadingButton(false);
                })
        } else {
            console.log("No puede haber campos vacíos");
        }
    };
    async function getData(base64) {
        try {
            const params = new URLSearchParams();
            params.append('image', base64);
            let res = await axios.post(urls.imgbburl+"?key=422ecf7d3657705a1b4f61d39718e465", params);
            console.log(res);
            return res
        }
        catch (err) {
            console.error(err);
        }
    }
    const darDeAlta = () => {
        setLoadingInCard(true);
        new Promise((resolve, _) => {
            let resp = getData(logo.split(',')[1]);
            resolve(resp);
        }).then((logoInfo) => {
            new Promise((resolve1, _) => {
                let resp1 = getData(banner.split(',')[1]);
                resolve1(resp1);
            }).then((bannerInfo) => {
                const request = {
                    access: urls.access,
                    key: tempurl,
                    id_user: session.id_user,
                    logo: logoInfo.data.data.image.url,
                    banner: bannerInfo.data.data.image.url,
                    description: description,
                    title: title,
                    dolar: dolar
                };
                API.post(`/store/add`, request)
                .then(res => {
                    console.log(res.data);
                    if (res.data.status === "success") {
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    } else {
                        
                    }
                    setLoadingInCard(false);
                })
            })
        })
        
    };
    if(session){
        if(session.type=="free" && session.myStores.length>0){
            return (
                <div className={classes.root}>
                    <Grid item  xs={12} md={12} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Card style={{ width: '90%', marginTop: 50 }} variant="outlined">
                            <Grid container spacing={0} style={{ margin: 5,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: 250
                            }}>
                                <Grid item  xs={12} md={12} style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Typography className={classes.instructions} variant="h4">Accede a servicios premium para administrar multiples tiendas</Typography>
                                </Grid>
                                <Grid item  xs={12} md={12} style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Link to={"/planes"} style={{ textDecoration: "none" }}>
                                        <Button variant="contained" color="primary">
                                            Ir a lista de planes
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                            
                        </Card>
                    </Grid>
                </div>
            )
        }
    }
    return (
        <div className={classes.root}>
            <Card style={{ width: '90%', marginTop: 50 }} variant="outlined">
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? (
                    <Grid container spacing={0} style={{ margin: 5,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 250
                     }}>
                            <Grid item  xs={12} md={12} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Typography className={classes.instructions} variant="h4">¡Enhorabuena!</Typography>
                            </Grid>
                            <Grid item  xs={12} md={12} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Typography className={classes.instructions}>Has conseguido crear tu tienda en la dirección:</Typography>
                            </Grid>
                            <Grid item  xs={12} md={12} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Link to={"/"+tempurl}>
                                    <Typography className={classes.instructions}>{urls.clientURL+"/"+tempurl}</Typography>
                                </Link>
                            </Grid>
                            <Grid item  xs={12} md={12} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Link to={"/"+tempurl} style={{ textDecoration: "none" }}>
                                    <Button variant="contained" color="primary">
                                        Ir a mi tienda
                                    </Button>
                                </Link>
                            </Grid>
                    </Grid>
                ) : (
                    <div style={{ minHeight: 350 }}>
                        <Grid container spacing={0} style={{ margin: 5,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: 250
                             }}>
                            {
                                 (loadingInCard)?
                                    <Grid item  xs={12} md={12} style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: 600
                                    }}>
                                        <CircularProgress color="primary"/>
                                    </Grid>
                                :
                                activeStep == 0 ?
                                    <Grid item xs={12} md={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={false} md={2}>
                                                        <></>
                                                    </Grid>
                                                    <Grid item xs={12} md={7} style={{ paddingRight: 15 }}>
                                                        <TextField id="outlined-basic1" label="Nombre de la tienda (Requerido)" variant="outlined" value={title} fullWidth onChange={handleChangeTitle} helperText={"(Este campo tiene un máximo de 50 caractéres)"} autoComplete='off' inputProps={{ maxLength: 50 }} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3} style={{
                                                        display: "flex",
                                                        justifyContent: "flex-start",
                                                        alignItems: "center"
                                                    }}>
                                                        <></>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={false} md={2}>
                                                        <></>
                                                    </Grid>
                                                    <Grid item xs={12} md={7} style={{ paddingRight: 15 }} >
                                                        <TextField id="outlined-basic" label="URL de acceso (Requerido)" variant="outlined" value={tempurl} onChange={handleChangeTempURL} onCopy={handleCopy} onPaste={handleCopy} helperText={(tempurl!="")?"Tu dirección de acceso será: " + urls.clientURL + "/" + tempurl+" (Este campo tiene un máximo de 50 caractéres)" : "(Este campo tiene un máximo de 50 caractéres)"} autoComplete='off' fullWidth inputProps={{ maxLength: 50 }} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3} style={{
                                                        display: "flex",
                                                        justifyContent: "flex-start",
                                                        alignItems: "center"
                                                    }}>
                                                        {
                                                            (statusdomain == "unchecked") ?
                                                                <RadioButtonUncheckedIcon style={{ marginRight: 5, color: '#ff8000' }} />
                                                                :
                                                                (statusdomain == "denied") ?
                                                                    <CancelIcon style={{ marginRight: 5, color: "#d90000" }} />
                                                                    :
                                                                    (statusdomain == "checked") ?
                                                                        <CheckCircleIcon style={{ marginRight: 5, color: "#00b700" }} />
                                                                        :
                                                                        <></>
                                                        }
                                                        {
                                                            (statusdomain == "unchecked") ?
                                                                "No verificado"
                                                                :
                                                                (statusdomain == "denied") ?
                                                                    "No disponible"
                                                                    :
                                                                    (statusdomain == "checked") ?
                                                                        "Disponible"
                                                                        :
                                                                        <></>
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={false} md={2}>
                                                        <></>
                                                    </Grid>
                                                    <Grid item xs={12} md={7} style={{ paddingRight: 15 }}>
                                                        <TextField multiline id="outlined-basic3" label="Descripción" variant="outlined" value={description} onChange={handleChangeDescription} helperText={"Este campo será visible para tus clientes (max 5000 caractéres)"} autoComplete='off' fullWidth inputProps={{ maxLength: 5000 }} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3} style={{
                                                        display: "flex",
                                                        justifyContent: "flex-start",
                                                        alignItems: "center"
                                                    }}>
                                                        <></>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    :
                                        activeStep == 1 ?
                                            <Grid item xs={12} md={12}>
                                                <TextField id="outlined-basic2" type="number" label="Precio en BsS de un (1) dolar" variant="outlined" value={dolar} onChange={handleChangeDolar} onCopy={handleCopy} onPaste={handleCopy} helperText="Esto será visible para tus clientes y se haran cálculos en base a él" style={{ width: '50%' }} autoComplete='off' fullWidth />
                                            </Grid>
                                            :
                                            activeStep == 2 ?
                                                    <Grid item xs={12} md={12} style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}>
                                                        <CropperImage banner={banner} setBanner={setBanner} logo={logo} setLogo={setLogo} />
                                                    </Grid>
                                                :
                                                activeStep == 3 ?
                                                <>
                                                    <Grid item xs={12} md={12} style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}>
                                                        <Typography variant="h4">
                                                            {title}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={12} style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}>
                                                        <Typography variant="h6">
                                                            {urls.clientURL+"/"+tempurl}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={12} style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}>
                                                        <Typography>
                                                            Dolar: BsS {parseInt(dolar).toFixed(2)}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={12} style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}>
                                                        <Card style={{ width: '90%', height: 480 }} variant="outlined">
                                                            <div className={classes.cover} style={{ backgroundImage: 'url(' + banner + ')' }}>
                                                            </div>
                                                            <div className={classes.logo0}>
                                                                <Grid container spacing={0} style={{ padding: 5, marginTop: -310 }}>
                                                                    <Grid item xs={12} md={12} style={{
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        alignItems: "center"
                                                                    }}>
                                                                        <div className={classes.logo}>
                                                                            <img src={logo} className={classes.logo2} />
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </Card>
                                                    </Grid>
                                                        
                                                </>
                                                :
                                                <>
                                                </>
                            }
                        </Grid>
                        <div style={{ marginTop: 20, marginBottom: 20}}>
                            {
                                activeStep == 0 ?
                                    <>
                                        {
                                            (loadingButton) ?
                                                <Button variant="contained" color="primary" onClick={verifyTitles}>
                                                    <CircularProgress size={25} color="secondary" style={{ marginLeft: 25, marginRight: 25 }} />
                                                </Button>
                                                :
                                                (statusdomain == "unchecked") ?
                                                    <Button variant="contained" color="primary" onClick={verifyTitles}>
                                                        Verificar
                                                    </Button>
                                                    :
                                                    (statusdomain == "denied") ?
                                                        <Button variant="contained" color="primary" disabled={true}>
                                                            Verificar
                                                        </Button>
                                                        :
                                                        (statusdomain == "checked") ?
                                                            <Button variant="contained" disabled={(description.length>5000)?true:false} color="primary" onClick={handleNext}>
                                                                Siguiente
                                                            </Button>
                                                            :
                                                            <></>
                                        }

                                    </>
                                    :
                                    activeStep == 1 ?
                                        <>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.backButton}
                                            >
                                                Volver
                                            </Button>
                                            <Button variant="contained" disabled={(dolar > 0) ? false : true} color="primary" onClick={handleNext}>
                                                Siguiente
                                            </Button>
                                        </>
                                        :
                                        activeStep == 2 ?
                                            <>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    className={classes.backButton}
                                                >
                                                    Volver
                                                </Button>
                                                <Button variant="contained" disabled={(!banner || !logo) ? true : false} color="primary" onClick={handleNext}>
                                                    Siguiente
                                                </Button>
                                            </>
                                            :
                                            (activeStep == 3 && !loadingInCard) ?
                                            <>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    className={classes.backButton}
                                                >
                                                    Volver
                                                </Button>
                                                <Button variant="contained" color="primary" onClick={darDeAlta}>
                                                    <StoreIcon /> Dar de alta a tu tienda
                                                </Button>
                                            </>
                                            :
                                                <>
                                                </>
                            }
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}