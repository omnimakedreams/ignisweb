
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from 'react-leaflet';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Hidden from '@material-ui/core/Hidden';
import './MainPage.css';
import {
    Link
} from "react-router-dom";
import Slide from 'react-reveal/Slide';
import Flip from 'react-reveal/Flip';
import Typography from '@material-ui/core/Typography';
import { motion, useMotionValue, useTransform, MotionConfig } from "framer-motion";

let scene, camera, renderer, cube;

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 0,
        overflowY: 'hidden'
    },
    motionDiv1: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
    },
    motionDiv2: {
        height: 400
    },
    motionDivClouds: {
        height: 600
    },
    motionDivClouds2: {
        height: 400
    },
    motionDiv3: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
    },
    motionDiv4: {
        height: 200
    },
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
    type: 3,
    img: './svgsIndex/house(1).svg'
},
{
    type: 2,
    img: './svgsIndex/house(1).svg'
},
{
    type: 3,
    img: './svgsIndex/house(1).svg'
},
{
    type: 3,
    img: './svgsIndex/house(1).svg'
},
{
    type: 3,
    img: './svgsIndex/house(1).svg'
},
{
    type: 3,
    img: './svgsIndex/house(1).svg'
}]
const coordenadasIniciales = [10.491, -66.902];

export default function MainPage({ theme }) {
    const classes = useStyles();
    const [marker, setMarker] = useState(coordenadasIniciales);
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [mainSrc, setMainSrc] = useState("./svgsIndex/longcity.svg");
    const [cloudsSrc, setCloudsSrc] = useState("./svgsIndex/Clouds.svg");
    const [stars, setStars] = useState(false);
    const [weather, setWeather] = useState(false);
    const [noon, setNoon] = useState(false);
    const [weatherSrc, setWeatherSrc] = useState("./svgsIndex/sun.svg");
    const [letters, setLetters] = useState(false);
    const [title, setTitle] = useState('');
    const [seconds, setSeconds] = useState(2);
    const [logoPres, setLogoPres] = useState(false);

    useEffect(() => {
        console.log(marker);
        return false;
    }, [marker])
    useEffect(() => {
        setTimeout(() => {
            setWeather(true);
            setLetters(true);
        }, 2000);
    }, [])
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
        [-3500, -3000, -1500, -1000, 0, 500],
        ["#92c5fc", "#170300", "#000d17", "#ff8000", "#92c5fc", "#92c5fc"]
    )
    const mensajes = ['Somos la comunidad eCommerce a su alcance', 'Manejamos las herramientas que usted conoce', '¡Crea tu tienda gratis y prueba todo lo que tenemos para tí y tus clientes!']
    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setSeconds(10);
            setLetters(false);
            if (title == '') {
                setTitle(mensajes[0]);
                setTimeout(() => {
                    setLetters(true);
                }, 1000);
            }
            if (title == mensajes[0]) {
                setTitle(mensajes[1]);
                setTimeout(() => {
                    setLetters(true);
                }, 1000);
            }
            if (title == mensajes[1]) {
                setTitle(mensajes[2]);
                setTimeout(() => {
                    setLetters(true);
                }, 1000);
            }
            if (title == mensajes[2]) {
                setTitle(mensajes[0]);
                setTimeout(() => {
                    setLetters(true);
                }, 1000);
            }
        }
    });
    useEffect(() => {
        setTimeout(() => {
            setWeatherSrc("./svgsIndex/sun.svg");
        }, 5000);
    }, [])
    useEffect(() => x.onChange(latest => {
        if (latest > -3000 && latest < -1500) {
            if (mainSrc == "./svgsIndex/longcity.svg") {
                setMainSrc("./svgsIndex/longcity2.svg");
                setCloudsSrc("./svgsIndex/Clouds2.svg");
                setStars(true);
                setWeather(false);
                setTimeout(() => {
                    setWeatherSrc("./svgsIndex/moon.svg");
                    setWeather(true);
                }, 500);
            }
        }
        if (latest > -2000 && latest < -500) {
            if (!noon) {
                setNoon(true)
            }
        }
        if (latest < -1500 || latest > -500) {
            if (noon) {
                setNoon(false)
            }
        }
        if (latest < -3000 || latest > -1500) {
            if (mainSrc == "./svgsIndex/longcity2.svg") {
                setMainSrc("./svgsIndex/longcity.svg");
                setCloudsSrc("./svgsIndex/Clouds.svg");
                setStars(false);
                setWeather(false);
                setTimeout(() => {
                    setWeatherSrc("./svgsIndex/sun.svg");
                    setWeather(true);

                }, 500);
            }
        }
        if (latest > 0) {
            if (!logoPres) {
                setLogoPres(true);
            }
        }
        if (latest < -500) {
            if (logoPres) {
                setLogoPres(false);
            }
        }
    }), [mainSrc, logoPres])
    return (
        <>
            <Hidden xsDown >
                <motion.div className={classes.motionDiv1} style={{ background }}>
                        <motion.img
                            className={classes.motionDivClouds}
                            key={"clouds"}
                            src={cloudsSrc}
                            initial={{ x: '450vw' }}
                            transition={{ duration: 140, ease: "linear", loop: Infinity }}
                            animate={{ x: "calc(-155vw - 0%)" }}
                            exit={{ opacity: 0 }}
                        />
                        <motion.img
                            className={classes.motionDivClouds}
                            key={"clouds2"}
                            src={cloudsSrc}
                            initial={{ x: '450vw' }}
                            transition={{ duration: 140, ease: "linear", loop: Infinity }}
                            animate={{ x: "calc(-155vw - 0%)" }}
                            exit={{ opacity: 0 }}
                        />
                        <motion.img
                            className={classes.motionDiv2}
                            key={"main"}
                            src={mainSrc}
                            initial={{ x: '50vw' }}
                            transition={{ duration: 70, ease: "linear", loop: Infinity }}
                            animate={{ x: "calc(-300vw - 0%)" }}
                            exit={{ opacity: 0 }}
                            style={{ x }}
                        />
                        <motion.img
                            className={classes.motionDiv2}
                            key={"main2"}
                            src={mainSrc}
                            initial={{ x: '50vw' }}
                            transition={{ duration: 70, ease: "linear", loop: Infinity }}
                            animate={{ x: "calc(-600vw - 0%)" }}
                            exit={{ opacity: 0 }}
                            style={{ x }}
                        />
                </motion.div>
            </Hidden>
            <Hidden smUp>
                <motion.div className={classes.motionDiv1} style={{ background }}>
                    <motion.img
                        className={classes.motionDivClouds2}
                        key={"clouds"}
                        src={cloudsSrc}
                        initial={{ x: '-450vw' }}
                        transition={{ duration: 140, ease: "linear", loop: Infinity }}
                        animate={{ x: "calc(-600vw - 0%)" }}
                        exit={{ opacity: 0 }}
                    />
                    <motion.img
                        className={classes.motionDivClouds2}
                        key={"clouds2"}
                        src={cloudsSrc}
                        initial={{ x: '-450vw' }}
                        transition={{ duration: 140, ease: "linear", loop: Infinity }}
                        animate={{ x: "calc(-600vw - 0%)" }}
                        exit={{ opacity: 0 }}
                    />
                    <motion.img
                        className={classes.motionDiv4}
                        key={"main"}
                        src={mainSrc}
                        initial={{ x: '50vw' }}
                        transition={{ duration: 70, ease: "linear", loop: Infinity }}
                        animate={{ x: "calc(-2000vw - 0%)" }}
                        exit={{ opacity: 0 }}
                        style={{ x }}
                    />
                    <motion.img
                        className={classes.motionDiv4}
                        key={"main2"}
                        src={mainSrc}
                        initial={{ x: '50vw' }}
                        transition={{ duration: 70, ease: "linear", loop: Infinity }}
                        animate={{ x: "calc(-2000vw - 0%)" }}
                        exit={{ opacity: 0 }}
                        style={{ x }}
                    />
                </motion.div>
            </Hidden>
            <Grid container style={{ width: '100%' }}>
                <Hidden xsDown>
                    <Grid item xs={12} md={12} style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        marginTop: -750,
                        width: '100%'
                    }}>
                        <Slide left when={weather}>
                            <img
                                src={weatherSrc}
                                style={{ width: 200, marginLeft: 20 }}
                            />
                        </Slide>
                    </Grid>
                    <Grid item xs={12} md={12} style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        marginTop: -700,
                        width: '100%'
                    }}>
                        <Slide left when={noon}>
                            <img
                                src={"./svgsIndex/oneCloud.svg"}
                                style={{ width: 200 }}
                            />
                        </Slide>
                    </Grid>
                    <Grid item xs={12} md={12} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: -1300,
                        width: '100%',
                        backgroundImage: weatherSrc == "./svgsIndex/moon.svg" ? "url('./svgsIndex/stars.svg')" : "none"
                    }}>
                        <Flip top when={letters}>
                            <Typography variant="h4" style={{ color: '#fff' }}>
                                {title}
                            </Typography>
                        </Flip>
                    </Grid>
                    <Grid item xs={12} md={12} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: -500,
                        width: '100%'
                    }}>
                        <Flip top when={logoPres}>
                            <img
                                src={"./omniico.png"}
                                style={{ width: 300 }}
                            />
                        </Flip>
                    </Grid>
                    <Grid item xs={12} md={12} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: -1000,
                        width: '100%'
                    }}>
                        <Link to={"/planes"} style={{ textDecoration: 'none' }}>
                            <Button size="large" variant="contained" color="primary" style={{ marginTop: 10 }} disableElevation>
                                Se parte de Ignis
                            </Button>
                        </Link>
                    </Grid>
                </Hidden>
                <Hidden smUp>
                    <Grid item xs={12} md={12} style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        marginTop: -550,
                        width: '100%'
                    }}>
                        <Slide left when={weather}>
                            <img
                                src={weatherSrc}
                                style={{ width: 200, marginLeft: 20 }}
                            />
                        </Slide>
                    </Grid>
                    <Grid item xs={12} md={12} style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        marginTop: -500,
                        width: '100%'
                    }}>
                        <Slide left when={noon}>
                            <img
                                src={"./svgsIndex/oneCloud.svg"}
                                style={{ width: 200 }}
                            />
                        </Slide>
                    </Grid>
                    <Grid item xs={12} md={12} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: -1300,
                        backgroundImage: weatherSrc == "./svgsIndex/moon.svg" ? "url('./svgsIndex/stars.svg')" : "none",
                        width: '100%'
                    }}>
                        <Flip top when={letters}>
                            <Typography variant="h5" style={{ color: '#fff' }}>
                                {title}
                            </Typography>
                        </Flip>
                    </Grid>
                    <Grid item xs={12} md={12} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: -1000,
                        width: '100%'
                    }}>
                        <Link to={"/planes"} style={{ textDecoration: 'none' }}>
                            <Button size="large" variant="contained" color="primary" style={{ marginTop: 10 }} disableElevation>
                                Se parte de Ignis
                            </Button>
                        </Link>
                    </Grid>
                </Hidden>

            </Grid>
            <div className={classes.root}>
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