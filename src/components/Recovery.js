
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import API from './common/Axios';
import urls from './common/variables.js';
import { Redirect } from 'react-router';
import {
    Link
} from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        marginBottom: 10,
        paddingTop: 50,
        height: '100vh'
    },
}));

export default function Recovery() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertThis, setAlertThis] = useState(false);
    const [severity, setSeverity] = useState('error');
    const [view, setView] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [seconds, setSeconds] = useState(120);
    const [buttomAvailable, setButtomAvailable] = useState(false);
    const [id_user, setId_user] = useState(null);
    const [id_transaction, setId_transaction] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const handleChangeEmail = event => {
        setEmail(event.target.value);
    }
    const resetFrom = () => {
        setEmail('');
    }
    const handleChangeECode = event => {
        setCode(event.target.value);
    }
    const handleChangePassword = event => {
        setPassword(event.target.value);
    }
    const handleChangePassword2 = event => {
        setPassword2(event.target.value);
    }
    const resetFrom2 = () => {
        setCode('');
    }
    const handleSubmit = () => {
        if (email === "") {
            setAlertMessage("Campos no pueden estar vacíos.");
            setSeverity('error');
            setAlertThis(true);
        } else {
            setLoading(true);
            const request = {
                access : urls.access,
                email
            };
            API.post(`/users/restore/sendmail`, request)
            .then(res => {
                if (res.data.status === "success") {
                    resetFrom();
                    setView(2);
                    setLoading(false);
                    setId_user(res.data.data.id_user);
                } else {
                    setLoading(false);
                    setAlertMessage(res.data.message);
                    setSeverity('error');
                    setAlertThis(true);
                }
                setSeconds(120);
                setButtomAvailable(false);
            })
        }
    }
    const handleCodeSubmit = () => {
        if (code === "") {
            setAlertMessage("Campos no pueden estar vacíos.");
            setSeverity('error');
            setAlertThis(true);
        } else {
            setLoading(true);
            const request = {
                access : urls.access,
                code: code,
                id_user: id_user
            };
            API.post(`/users/restore/verify`, request)
            .then(res => {
                if (res.data.status === "success") {
                    setId_transaction(res.data.data.id);
                    setAlertMessage('Verificación exitosa.');
                    setSeverity('success');
                    setAlertThis(true);
                    resetFrom2();
                    setSeconds(120);
                    setView(3);
                    setLoading(false);
                    /* setTimeout(() => {
                        setLoading(false);
                        setRedirect(true);
                    }, 2000); */
                } else {
                    setAlertMessage(res.data.message);
                    setSeverity('error');
                    setAlertThis(true);
                    setLoading(false);
                }
            })
        }
    }
    const handlePasswordSubmit = () => {
        if (password === "") {
            setAlertMessage("Campos no pueden estar vacíos.");
            setSeverity('error');
            setAlertThis(true);
        } else {
            if(password!=password2){
                setAlertMessage("Las claves no coinciden.");
                setSeverity('error');
                setAlertThis(true); 
            }else{
                setLoading(true);
                const request = {
                    access : urls.access,
                    password,
                    password2,
                    id: id_transaction
                };
                API.post(`/users/restore/password`, request)
                .then(res => {
                    if (res.data.status === "success") {
                        setAlertMessage('Cambio de clave exitoso. Redireccionando...');
                        setSeverity('success');
                        setAlertThis(true);
                        resetFrom2();
                        setSeconds(120);
                        setView(1);
                        setTimeout(() => {
                            setLoading(false);
                            setRedirect(true);
                        }, 2000);
                    } else {
                        setAlertMessage(res.data.message);
                        setSeverity('error');
                        setAlertThis(true);
                        setLoading(false);
                    }
                })
            }
        }
    }
    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setButtomAvailable(true);
        }
    });
    if (redirect) {
        return <Redirect to='/login' />;
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
                                                Recuperar Cuenta
                                            </Typography>
                                            <Typography color="textSecondary" align="center" style={{  marginTop: 10 }}>
                                                Ingresa la dirección de correo electrónico de tu cuenta.
                                            </Typography>
                                        </>
                                    :
                                        view === 2 ?
                                            <>  
                                                <Typography variant="h4" color="primary" align="center" style={{ marginTop: 20 }}>
                                                    Correo de verificación
                                                </Typography>
                                                <Typography color="textSecondary" align="center" style={{ marginTop: 10 }}>
                                                    Ha sido envíado un código de verificación a tu correo electrónico. Por favor ingresalo a continuación para recuperar tu clave.
                                                    Recuerda revisar la bandeja de Spam. Tienes un plazo de 30min para ejecutar esta acción, de lo contrario deberás volver a intentarlo.
                                                </Typography>
                                            </>
                                        :   
                                            <>
                                                <Typography variant="h4" color="primary" align="center" style={{ marginTop: 20 }}>
                                                    Cambiar Clave
                                                </Typography>
                                                <Typography color="textSecondary" align="center" style={{ marginTop: 10 }}>
                                                    Ingresa tu nueva clave.
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
                                                label="Email"
                                                variant="outlined"
                                                style={{ margin: 5 }}
                                                value={email}
                                                onChange={handleChangeEmail}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Button variant="contained" fullWidth color="primary" style={{ marginTop: 10 }} onClick={handleSubmit}>
                                                    Recuperar
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} md={12} style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Button variant="contained" fullWidth color="gray" style={{ marginTop: 10 }} onClick={()=>{
                                                setRedirect(true);
                                            }}>
                                                Cancelar
                                            </Button>
                                        </Grid>
                                    </>
                                :   
                                    view === 2 ?
                                    <>
                                        <Grid item style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "flex-start"
                                        }}>
                                            <TextField
                                                fullWidth
                                                label="Código"
                                                variant="outlined"
                                                style={{ margin: 5 }}
                                                value={code}
                                                onChange={handleChangeECode}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Button variant="contained" fullWidth color="primary" style={{ marginTop: 10 }} onClick={handleCodeSubmit}>
                                                Verificar
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} md={12} style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                        {
                                            buttomAvailable ?
                                                <Button variant="contained" fullWidth color="secondary" style={{ marginTop: 10 }} onClick={handleSubmit}>
                                                    Renviar Correo
                                                </Button>
                                            :
                                                <Button variant="contained" fullWidth color="gray" style={{ marginTop: 10 }}>
                                                    Reenviar (Espere {seconds} segundos)
                                                </Button>
                                        }
                                        </Grid>
                                    </>
                                :
                                    <>
                                        <Grid item style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "flex-start"
                                        }}>
                                            <TextField
                                                fullWidth
                                                type="password"
                                                label="Clave"
                                                variant="outlined"
                                                style={{ margin: 5 }}
                                                value={password}
                                                onChange={handleChangePassword}
                                            />
                                        </Grid>
                                        <Grid item style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "flex-start"
                                        }}>
                                            <TextField
                                                fullWidth
                                                type="password"
                                                label="Repetir Clave"
                                                variant="outlined"
                                                style={{ margin: 5 }}
                                                value={password2}
                                                onChange={handleChangePassword2}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Button variant="contained" fullWidth color="primary" style={{ marginTop: 10 }} onClick={handlePasswordSubmit}>
                                                Cambiar Clave
                                            </Button>
                                        </Grid>
                                    </>
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