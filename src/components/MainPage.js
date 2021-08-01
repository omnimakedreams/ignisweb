
import React, { useState, useEffect, useRef, useMemo } from 'react';
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

import {
    Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 0
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
const coordenadasIniciales = [10.491, -66.902];
export default function MainPage({ theme }) {
    const classes = useStyles();
    const [marker, setMarker] = useState(coordenadasIniciales);
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])
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
    if(loading){
        return <Loader theme={theme} />
    }
    return (
        <>  
            <div className={classes.root}>
                <div style={{
                    position: 'absolute',
                    zIndex: 10,
                    width: '100%',

                }}>
                    <Hidden smDown>
                        <Grid container style={{ padding: 5 }}>
                            <Grid item xs={12} md={12} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 400
                            }}>
                                <Grid item xs={12} md={12} style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Grid container style={{ padding: 5 }}>
                                        <Grid item xs={12} md={6} style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Link to="/planes" style={{ textDecoration: 'none' }}>
                                                <Button variant="contained" color="primary" onClick={handleOpen}>
                                                    Crea tu tienda gratis
                                                </Button>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} md={6} style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: 40
                                        }}>
                                            <Card style={{ width: 280 }} className={classes.minicard}>
                                                <CardContent>
                                                    <TextField
                                                        label="Llave de tu tienda favorita"
                                                        variant="outlined"
                                                        className={classes.textField}
                                                        InputProps={{
                                                            classes: {
                                                                input: classes.multilineColor
                                                            }
                                                        }}
                                                        color="secondary"
                                                        focused
                                                        helperText="Escribe 'ignis' para ver un demo"
                                                    />
                                                    
                                                    <Link to="/demo" style={{ textDecoration: 'none' }}>
                                                        <Button variant="contained" color="primary" style={{ marginTop: 10 }}>
                                                            Visitar
                                                        </Button>
                                                    </Link>

                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>


                                </Grid>
                            </Grid>
                        </Grid>
                    </Hidden>

                </div>
                <Carousel emulateTouch autoPlay autoFocus infiniteLoop showArrows={false} showIndicators={false} showThumbs={false} interval={5000}>
                    <div>
                        <img src="https://i.ibb.co/mTh4fhs/publi1.jpg" style={{ opacity: 0.8 }} />
                    </div>
                    <div>
                        <img src="https://i.ibb.co/D1rt1QH/publi2.jpg" style={{ opacity: 0.8 }} />
                    </div>
                </Carousel>
                <Hidden mdUp>
                    <Grid container style={{ padding: 5 }}>
                        <Grid item xs={12} md={12} style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Grid item xs={12} md={12} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Grid container style={{ padding: 5 }}>
                                    <Grid item xs={12} md={6} style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Link to="/planes" style={{ textDecoration: 'none' }}>
                                            <Button variant="contained" color="primary" onClick={handleOpen}>
                                                Crea tu tienda gratis
                                            </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12} md={6} style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 40
                                    }}>
                                        <Card style={{ width: 280 }} className={classes.minicard}>
                                            <CardContent>
                                                <TextField
                                                    label="Llave de tu tienda favorita"
                                                    variant="outlined"
                                                    style={{ width: 250, color: "#fff", marginTop: 10 }}
                                                    InputProps={{
                                                        classes: {
                                                            input: classes.multilineColor
                                                        }
                                                    }}
                                                    color="secondary"
                                                    focused
                                                />
                                                <Link to="/demo" style={{ textDecoration: 'none' }}>
                                                    <Button variant="contained" color="primary" style={{ marginTop: 10 }}>
                                                        Visitar
                                                    </Button>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Hidden>
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