
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VerificateCode from './common/VerificateCode';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    Link
} from "react-router-dom";
import { Redirect } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import API from './common/Axios';
import urls from './common/variables.js';
import ReCAPTCHA from "react-google-recaptcha";
const useStyles = makeStyles(() => ({
    root: {
        marginBottom: 10,
        paddingBottom: 104,
        paddingTop: 100,
        height: '100%'
    },
}));

export default function Register({ setSession }) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertThis, setAlertThis] = useState(false);
    const [severity, setSeverity] = useState('error');
    const [id_user, setId_user] = useState(null);
    const [view, setView] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [userData, setUserData] = useState(null);
    const [captchaValue, setCaptchaValue] = useState(null);
    
    const handleChangeLastname = (event) => {
        setLastname(event.target.value);
    };
    const handleChangeEmail = event => {
        setEmail(event.target.value);
    }
    const handleChangeName = event => {
        setName(event.target.value);
    }
    const handleChangePassword = event => {
        setPassword(event.target.value);
    }
    const handleChangePassword2 = event => {
        setPassword2(event.target.value);
    }
    const handleChangePhone = event => {
        setPhone(event.target.value);
    }
    const resetFrom = () => {
        setEmail('');
        setPassword('');
        setPassword2('');
        setPhone('');
        setName('');
    }
    const handleSubmit = () => {
        if(!captchaValue){
            setAlertMessage("Captcha no verificado, si tiene inconvenientes por favor recargue la página.");
            setSeverity('error');
            setAlertThis(true);
        }else{
            if (email === "" || password === "" || password2 === "" || phone === "" || name === ""  || lastname === "") {
                setAlertMessage("Campos no pueden estar vacíos.");
                setSeverity('error');
                setAlertThis(true);
            } else {
                setLoading(true);
                const request = {
                    access : urls.access,
                    email: email,
                    password: password,
                    password2: password2,
                    code: 58,
                    phone: parseInt(phone),
                    name: name,
                    lastname: lastname
                };
                API.post(`users/add`, request)
                .then(res => {
                    setLoading(false);
                    if (res.data.status === "success") {
                        setAlertMessage('Registro exitoso.');
                        setSeverity('success');
                        setAlertThis(true);
                        setUserData(res.data.data);
                        setId_user(res.data.data.id_user);
                        resetFrom();
                        setView(2);
                    } else {
                        setAlertMessage(res.data.message);
                        setSeverity('error');
                        setAlertThis(true);
                    }
                })
                
            }
        }
    }
    function onChange(value) {
        setCaptchaValue(value)
    }
    function onExpired(value) {
        setCaptchaValue(null)
    }
    function onErrored(value) {
        console.log(value);
        setCaptchaValue(null)
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
                <CardContent>
                    {
                        view === 1 ?
                            <Typography variant="h4" color="primary" align="center" style={{ marginTop: 20 }}>
                                Se parte de Ignis
                            </Typography>
                            :
                            <Typography variant="h4" color="primary" align="center" style={{  marginTop: 20 }}>
                                Verificar correo
                            </Typography>
                    }
                    {
                        view === 1 ?
                            <Typography color="textSecondary" align="center" style={{ marginTop: 10 }}>
                                Disfruta de los servicios de Ignis registrandote en el sistema
                            </Typography>
                            :
                            <Typography color="textSecondary" align="center" style={{ marginTop: 10 }}>
                                Ha sido envíado un código de verificación a tu correo electrónico. Por favor ingresalo a continuación para activar tu cuenta.
                                Recuerda revisar la bandeja de Spam.
                            </Typography>
                    }
                </CardContent>
                <CardContent>
                    {
                        !loading ?
                            <>
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
                                            <Grid item style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "flex-start"
                                            }}>
                                                <TextField
                                                    fullWidth
                                                    type="number"
                                                    label="Teléfono"
                                                    variant="outlined"
                                                    style={{ margin: 5 }}
                                                    value={phone}
                                                    onChange={handleChangePhone}
                                                />
                                            </Grid>
                                            <Grid item style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "flex-start"
                                            }}>
                                                <TextField
                                                    fullWidth
                                                    label="Nombre"
                                                    variant="outlined"
                                                    style={{ margin: 5 }}
                                                    value={name}
                                                    onChange={handleChangeName}
                                                />
                                            </Grid>
                                            <Grid item style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "flex-start"
                                            }}>
                                                <TextField
                                                    fullWidth
                                                    label="Apellido"
                                                    variant="outlined"
                                                    style={{ margin: 5 }}
                                                    value={lastname}
                                                    onChange={handleChangeLastname}
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
                                                    style={{ margin: 5, marginTop: 10 }}
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
                                                    type="password"
                                                    fullWidth
                                                    label="Repite tu clave"
                                                    variant="outlined"
                                                    style={{ margin: 5, marginTop: 10 }}
                                                    value={password2}
                                                    onChange={handleChangePassword2}
                                                />
                                            </Grid>
                                            <Grid item style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "flex-start"
                                            }}>
                                                <ReCAPTCHA
                                                    sitekey="6LfMZcQbAAAAAA-aXo2ggqiUMGl-gmMw36PXZe2A"
                                                    onChange={onChange}
                                                    onExpired={onExpired}
                                                    onErrored={onErrored}
                                                    theme="dark"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12} style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>
                                                <Button variant="contained" fullWidth color="primary" style={{ marginTop: 10 }} onClick={handleSubmit}>
                                                    Registrarse
                                                </Button>
                                            </Grid>
                                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                                <Typography color="textSecondary" style={{ textAlign: 'center', marginTop: 10 }}>
                                                    ¿Ya tienes cuenta? Ingresa aquí
                                                </Typography>
                                            </Link>
                                        </>
                                        :
                                        <VerificateCode id_user={id_user} setAlertMessage={setAlertMessage} setSeverity={setSeverity} setAlertThis={setAlertThis} setLoading={setLoading} setRedirect={setRedirect} setSession={setSession} userData={userData} />
                                }
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
                </CardContent>
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