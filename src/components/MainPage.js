
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from 'react-leaflet';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Hidden from '@material-ui/core/Hidden';
import Loader from './Loader';
import './MainPage.css';
import {
    Link
} from "react-router-dom";
import { motion, useMotionValue, useTransform, } from "framer-motion";

let scene, camera, renderer, cube;

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 0,
        marginTop: 400
    },
    card: {
        borderRadius: '1rem',
        boxShadow: 'none',
        position: 'relative',
        minWidth: 200,
        minHeight: 360,
        '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '64%',
            bottom: 0,
            zIndex: 1,
            background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
        },
    },
    content: {
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        width: '90%',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    minicard: {
        backgroundColor: theme.palette.terteary.main,
    },
    multilineColor: {
        color: theme.palette.secondary.main
    },
    textField: {
        width: 250, 
        color: theme.palette.terteary.contrastText,
        marginTop: 10,
        '& p':{
            color: theme.palette.terteary.contrastText
        }
    },
    motionDiv1: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        width: '100%',
        height: 400,
        position: 'fixed'
    },
    motionDiv2:{
        height: 400
    }
}));
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const SVGData = [{
    type:3,
    img: './svgsIndex/house(1).svg'
},
{
    type:2,
    img: './svgsIndex/house(1).svg'
},
{
    type:3,
    img: './svgsIndex/house(1).svg'
},
{
    type:3,
    img: './svgsIndex/house(1).svg'
},
{
    type:3,
    img: './svgsIndex/house(1).svg'
},
{
    type:3,
    img: './svgsIndex/house(1).svg'
}]
const coordenadasIniciales = [10.491, -66.902];
export default function MainPage({ theme }) {
    const classes = useStyles();
    const [marker, setMarker] = useState(coordenadasIniciales);
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        console.log(marker);
        return false;
    }, [marker])
    function LocationMarker({ mrk, setMarker }) {
        const map = useMapEvents({
            click(e) {
                setMarker(e.latlng)
            },
        })
        return (
            <Marker position={mrk}>
                <Popup>Esta es mi ubicación de entrega.</Popup>
            </Marker>
        )
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setMarker(coordenadasIniciales);
        setOpen(false);
    };
    const saveLocation = () => {
        setOpen(false);
    };
    const constraintsRef = useRef(null);
    /* if(loading){
        return <Loader theme={theme} />
    } */
    const x = useMotionValue(0)
    
    const background = useTransform(
        x,
        [-300, 0, 300],
        ["#010023", "#ff8000", "#92c5fc" ]
    )
    return (
        <>  
            <motion.div className={classes.motionDiv1} style={{ background }}>
                <motion.img
                    drag="x"
                    dragConstraints={{ top: 0, bottom: 0, left: -450, right: 450 }}
                    className={classes.motionDiv2}
                    key={"./svgsIndex/longcity.svg"}
                    src={"./svgsIndex/longcity.svg"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{x}}
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                />
            </motion.div>
            <Grid container style={{ padding: 20, width: '100%' }}>
                    <Grid item xs={12} md={12} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 100, 
                        marginLeft: -15,
                        position: 'fixed',
                        width: '100%'
                    }}>
                        <Link to={"/planes"} style={{textDecoration: 'none'}}>
                            <Button size="large" variant="contained" color="primary" style={{ marginTop: 10 }} disableElevation>
                                Se parte de Ignis
                            </Button>
                        </Link>
                    </Grid>
            </Grid>
            <div className={classes.root}>
                <Grid container style={{ padding: 20 }}>
                    <Grid item xs={12} md={4} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 300
                    }}>
                        <img src="whatsapp.jpg" style={{ borderRadius: '50%', maxWidth: 300 }} />
                    </Grid>
                    <Grid item xs={12} md={8} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 300
                    }}>
                        <Grid container style={{ padding: 20 }}>
                            <Grid item xs={12} md={12}>
                                <Typography variant="h6" color="secondary">
                                    Manejamos las herramientas que usted conoce
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography variant="p" color="secondary">
                                    Reciba sus reportes de facturación diario/semanal/mensual directamente a su número de teléfono vía whatsapp y administre las alertas de compra por la misma vía.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 300
                    }}>
                        <img src="android.png" style={{ maxWidth: 300 }} />
                    </Grid>
                    <Grid item xs={12} md={8} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 300
                    }}>
                        <Grid container style={{ padding: 20 }}>
                            <Grid item xs={12} md={12}>
                                <Typography variant="h6" color="secondary">
                                    Manténga a sus clientes conectados con nuestra app
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} >
                                <Typography variant="p" color="secondary">
                                    Obtenga su menú en línea y promocione su espacio mediante la aplicación móvil dedicada para usuarios.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Grid container style={{ padding: 5 }}>
                        <Grid item xs={false} md={3}>

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MapContainer
                                center={[10.491, -66.902]}
                                zoom="13"
                                scrollWheelZoom={true}
                                style={{ height: "80vh" }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationMarker mrk={marker} setMarker={setMarker} />
                            </MapContainer>
                        </Grid>
                        <Grid item xs={false} md={3}>

                        </Grid>
                        <Grid item xs={12} md={12}>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 20
                            }}>
                                <Button variant="contained" color="primary" style={{ position: "absolute" }} onClick={saveLocation}>
                                    Confirmar ubicación
                                </Button>

                            </div>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 45
                            }}>
                                <Button variant="contained" style={{ position: "absolute" }} onClick={handleClose}>
                                    Cancelar
                                </Button>
                            </div>
                        </Grid>
                    </Grid>

                </Modal>

            </div>
        </>
        
        
    );
}