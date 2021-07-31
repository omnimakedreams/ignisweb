
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
    Link
} from "react-router-dom";
import { Redirect } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import API from './common/Axios';
import urls from './common/variables.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import VerificateCode from './common/VerificateCode';

const useStyles = makeStyles(() => ({
    root: {
        marginBottom: 10,
        paddingTop: 100,
        height: '100vh'
    },
}));

export default function Login({ setSession, setCar }) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertThis, setAlertThis] = useState(false);
    const [severity, setSeverity] = useState('error');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [id_user, setId_user] = useState(null);
    const [view, setView] = useState(1);
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        setSession(false);
    }, [])
    const handleChangePassword = event => {
        setPassword(event.target.value);
    }
    const handleChangeLogin = event => {
        setLogin(event.target.value);
    }
    const resetFrom = () => {
        setLogin('');
        setPassword('');
    }
    const handleSubmit = () => {
        if (login === "" || password === "") {
            setAlertMessage("Campos no pueden estar vacíos.");
            setSeverity('error');
            setAlertThis(true);
        } else {
            setLoading(true);
            const request = {
                access: urls.access,
                login,
                password
            };
            API.post(`/users/login`, request)
            .then(res => {
                console.log(res.data);
                if (res.data.status === "success") {
                    resetFrom();
                    setId_user(res.data.data.id_user);
                    if(res.data.data.id_condition===5){
                        setView(2);
                    }else{
                        setSession(res.data.data);
                        localStorage.setItem('session', JSON.stringify(res.data.data));
                        setCar(res.data.data.car);
                        setRedirect(true);
                    }
                    setLoading(false);
                } else {
                    setLoading(false);
                    setAlertMessage(res.data.message);
                    setSeverity('error');
                    setAlertThis(true);
                }
            })
        }
    }
    if (redirect) {
        return <Redirect to='/' />;
    }
    return (
        <div className={classes.root} style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>

            <Card variant="outlined" style={{ borderRadius: '1rem', margin: 5, width: 350, paddingLeft: -5, textAlign: 'left' }}>
                {
                    !loading ?
                        <>  
                            
                            
                            <CardContent>
                            {
                                view === 1 ?
                                    <>
                                        <Typography variant="h4" color="primary" align="center" style={{ marginTop: 20 }}>
                                                Ingresa a Ignis
                                        </Typography>
                                        <Typography color="textSecondary" align="center" style={{ marginTop: 10 }}>
                                                Disfruta de los servicios de Ignis ingresando con tu cuenta
                                        </Typography>
                                    </>
                                    :   
                                    <>
                                        <Typography variant="h4" color="primary" align="center" style={{ marginTop: 20 }}>
                                            Verificar correo
                                        </Typography>
                                        <Typography color="textSecondary" align="center" style={{ marginTop: 10 }}>
                                            Ha sido envíado un código de verificación a tu correo electrónico. Por favor ingresalo a continuación para activar tu cuenta.
                                            Recuerda revisar la bandeja de Spam.
                                        </Typography>
                                    </>
                            }
                            </CardContent>
                            <CardContent>
                            {
                                view === 1 ?
                                    <>
                                        <Grid item style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "flex-start"
                                        }}>
                                            <TextField
                                                fullWidth
                                                label="Email o teléfono"
                                                variant="outlined"
                                                style={{ margin: 5 }}
                                                value={login}
                                                onChange={handleChangeLogin}
                                            />
                                        </Grid>
                                        <Grid item style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "flex-start"
                                        }}>
                                            <TextField
                                                type="password"
                                                fullWidth
                                                label="Clave"
                                                variant="outlined"
                                                value={password}
                                                onChange={handleChangePassword}
                                                style={{ margin: 5, marginTop: 10 }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Button variant="contained" fullWidth color="primary" style={{ marginTop: 10 }} onClick={handleSubmit}>
                                                Ingresar
                                        </Button>
                                        </Grid>
                                        <Link to="/recovery"  style={{ textDecoration: 'none' }}>
                                            <Typography color="textSecondary" style={{ textAlign: 'center', marginTop: 10 }}>
                                                ¿Has olvidado tu clave? Click aquí
                                            </Typography>
                                        </Link>
                                        <Link to="/register"  style={{ textDecoration: 'none' }}>
                                            <Typography color="textSecondary" style={{ textAlign: 'center', marginTop: 10 }}>
                                                ¿Aún no tienes cuenta? Regístrate aquí
                                            </Typography>
                                        </Link>
                                    </>
                                :
                                    <VerificateCode id_user={id_user} setAlertMessage={setAlertMessage} setSeverity={setSeverity} setAlertThis={setAlertThis} setLoading={setLoading} setRedirect={setRedirect} setSession={setSession} userData={userData} />
                            }
                            </CardContent>
                        </>
                        :
                        <div style={{
                            height: 400,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        >
                            <CircularProgress />
                        </div>
                }

            </Card>
            {
                alertThis ?
                    <Alert variant="filled" severity={severity} onClose={() => { setAlertThis(false); }} style={{ position: 'fixed', bottom: 0, zIndex: 1, marginBottom: 10 }}>{alertMessage}</Alert>
                    :
                    <></>
            }
        </div>
    );
}