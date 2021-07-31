
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import API from '../common/Axios';
import urls from '../common/variables.js';

export default function VerificateCode({ id_user, setAlertMessage, setSeverity, setAlertThis, setLoading, setRedirect, setSession, userData }) {
    const [code, setCode] = useState('');
    const [seconds, setSeconds] = useState(120);
    const [buttomAvailable, setButtomAvailable] = useState(false);
    const handleChangeECode = event => {
        setCode(event.target.value);
    }
    const resetFrom2 = () => {
        setCode('');
    }

    const handleResendMailSubmit = () => {
        setLoading(true);
        setButtomAvailable(false);
        const request = {
            access: urls.access,
            id_user: id_user
        };
        API.post(`/users/send/verification`, request)
        .then(res => {
            if (res.data.status === "success") {
                setAlertMessage('Correo re-enviado exitosamente.');
                setSeverity('success');
                setAlertThis(true);
                resetFrom2();
                setLoading(false);
            } else {
                setAlertMessage(res.data.message);
                setSeverity('error');
                setAlertThis(true);
                setLoading(false);
            }
            setSeconds(120);
            setButtomAvailable(false);
        })
    }
    const handleCodeSubmit = () => {
        if (code === "") {
            setAlertMessage("Campos no pueden estar vacíos.");
            setSeverity('error');
            setAlertThis(true);
        } else {
            setLoading(true);
            const request = {
                access: urls.access,
                code: code,
                id_user: id_user
            };
            API.post(`/users/verify`, request)
            .then(res => {
                if (res.data.status === "success") {
                    setAlertMessage('Verificación exitosa. Redireccionando...');
                    setSeverity('success');
                    setAlertThis(true);
                    resetFrom2();
                    setSeconds(120);
                    setSession(userData);
                    localStorage.setItem('session', JSON.stringify(userData));
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
    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setButtomAvailable(true);
        }
    });
    return (
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
                        <Button variant="contained" fullWidth color="secondary" style={{ marginTop: 10 }} onClick={handleResendMailSubmit}>
                            Renviar Correo
                        </Button>
                    :
                        <Button variant="contained" fullWidth color="gray" style={{ marginTop: 10 }}>
                            Reenviar (Espere {seconds} segundos)
                        </Button>
                }
            </Grid>
        </>
    );
}