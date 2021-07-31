
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import API from './common/Axios';
import urls from "./common/variables";
import SkeletonCommons from './common/SkeletonCommons';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
    root: {
        marginBottom: 10,
        height: 1100
    },
}));
const conditions0 = [{ value: 1, title: 'Activo' }, { value: 4, title: 'Eliminado' }, { value: 5, title: 'No Activo' }] 
const sexs0 = [{ value: 'N', title: 'Indefinido' }, { value: 'M', title: 'Masculino' }, { value: 'F', title: 'Femenino' }]
export default function AdminUserEdit(props) {
    let { session, user } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState(null);
    const [modTitle, setModTitle] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [sexs, setSexs] = useState(sexs0);
    const [conditions, setConditions] = useState(conditions0);
    const [temporalValue, setTemporalValue] = useState('');
    const [temporalCondition, setTemporalCondition] = useState('');
    const [temporalSex, setTemporalSex] = useState('');
    const [selectOption, setSelectOption] = useState('');
    const [temporalCountry, setTemporalCountry] = useState('(empty)');
    const [temporalState, setTemporalState] = useState('(empty)');
    const [selectedField, setSelectedField] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        API.get(`/country/all`)
        .then(res => {
            setCountries(res.data);
            setLoading(false);
        })
    }, [])
    const handleClickOpen = (field) => {
        setSelectedField(field);
        switch (field) {
            case 'name':
                setAlertType("text");
                setModTitle("Nombre");
                setOpen(true);
            break;
            case 'lastname':
                setAlertType("text");
                setModTitle("Apellido");
                setOpen(true);
            break;
            case 'code':
                setAlertType("number");
                setModTitle("Código de área");
                setOpen(true);
            break;
            case 'phone':
                setAlertType("number");
                setModTitle("Teléfono");
                setOpen(true);
            break;
            case 'email':
                setAlertType("text");
                setModTitle("E-mail");
                setOpen(true);
            break;
            case 'sex':
                setAlertType("select");
                setModTitle("Género");
                setSelectOption("genero");
                setOpen(true);
            break;
            case 'condition':
                setAlertType("select");
                setSelectOption("condition");
                setModTitle("Condición");
                setOpen(true);
            break;
            case 'country':
                setAlertType("select");
                setModTitle("País");
                setSelectOption("country");
                setOpen(true);
            break;
            case 'city':
                setAlertType("text");
                setModTitle("Ciudad");
                setOpen(true);
            break;
            case 'street':
                setAlertType("text");
                setModTitle("Calle");
                setOpen(true);
            break;
            case 'house':
                setAlertType("text");
                setModTitle("Casa/Piso");
                setOpen(true);
            break;
            case 'cp':
                setAlertType("text");
                setModTitle("Código Postal");
                setOpen(true);
            break;
            default:

            break;
        }
        
        
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChangeCountry = (event) => {
        let selectedName = event.target.value;
        setTemporalCountry(selectedName);
        const indexToUpdate = countries.findIndex((count) => count.name == selectedName);
        if (indexToUpdate != -1) {
            API.get(`/country/state/`+countries[indexToUpdate].code)
            .then(res => {
                setStates(res.data);
            })
        } else {
            setStates([]);
        }
    };
    const handleChangeState = (event) => {
        let selectedName = event.target.value;
        setTemporalState(selectedName);
    };
    const handleChangeCondition = (event) => {
        setTemporalCondition(event.target.value);
    };
    const handleChangeSex = (event) => {
        setTemporalSex(event.target.value);
    };
    const handleChangeValue = (event) => {
        setTemporalValue(event.target.value);
    };
    const handleSubmit = () => {
        let request;
        switch (selectedField) {
            case 'name':
                if(temporalValue!=""){
                    setLoading(true)
                    request = {
                        access : urls.access,
                        id_user : user.id_user, 
                        name : temporalValue, 
                        lastname : user.lastname, 
                        sex : user.sex 
                    }
                    API.post(`/profiles/all/update`, request)
                    .then(res => {
                        if (res.data.status=="success") {
                            user.name=temporalValue;
                            setTemporalValue('');
                            handleClose();
                            setLoading(false);
                        }else{
                            console.log(res.data);
                            setLoading(false);
                        }
                    })
                }else{
                    console.log("El campo se encuentra vacío");
                }
            break;
            case 'lastname':
                if(temporalValue!=""){
                    setLoading(true)
                    request = {
                        access : urls.access,
                        id_user: user.id_user,  
                        name : user.name, 
                        lastname : temporalValue, 
                        sex : user.sex 
                    }
                    API.post(`/profiles/all/update`, request)
                    .then(res => {
                        if (res.data.status=="success") {
                            user.lastname=temporalValue;
                            setTemporalValue('');
                            handleClose();  
                            setLoading(false);
                        }else{
                            console.log(res.data);
                            setLoading(false);
                        }
                    })
                }else{
                    console.log("El campo se encuentra vacío");
                }
                
            break;
            case 'code':
                
            break;
            case 'phone':
                
            break;
            case 'email':
                
            break;
            case 'sex':
                if(temporalSex!=""){
                    setLoading(true)
                    request = {
                        access : urls.access,
                        id_user: user.id_user,  
                        name : user.name, 
                        lastname : user.lastname, 
                        sex : temporalSex 
                    }
                    API.post(`/profiles/all/update`, request)
                    .then(res => {
                        if (res.data.status=="success") {
                            user.sex=temporalSex;
                            setTemporalSex('');
                            handleClose();  
                            setLoading(false);
                        }else{
                            console.log(res.data);
                            setLoading(false);
                        }
                    })
                }else{
                    console.log("El campo se encuentra vacío");
                }
            break;
            case 'condition':
                
            break;
            case 'country':
                
            break;
            case 'city':
                
            break;
            case 'street':
                
            break;
            case 'house':
                
            break;
            case 'cp':
                
            break;
            default:

            break;
        }

    };
    return (
        <div className={classes.root}>
            <Grid container style={{ marginTop: 10 }}>
                {
                    !loading?
                        <>
                            <Grid item xs={12} md={12} style={{ marginBottom: 10 }}>
                                <Typography variant="h4" color="primary" style={{ textAlign: 'center', marginTop: 20 }}>
                                    Editar usuario
                                </Typography>
                                <Typography variant="p" color="primary" style={{ textAlign: 'center', marginTop: 20 }}>
                                    Datos del usuario
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginBottom: 15 }}>
                                <TextField label="Nombre" variant="outlined" style={{ width: '98%' }}  shrink value={user.name} disabled onClick={()=>{ handleClickOpen("name") }}/>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginBottom: 15 }}>
                                <TextField label="Apellido" variant="outlined" style={{ width: '98%' }}  shrink value={user.lastname} disabled onClick={()=>{ handleClickOpen("lastname") }}/>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginBottom: 15 }}>
                                <TextField label="Código de área" variant="outlined" style={{ width: '98%' }}  shrink value={user.code} disabled onClick={()=>{ handleClickOpen("code") }}/>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginBottom: 15 }}>
                                <TextField label="Teléfono" variant="outlined" style={{ width: '98%' }}  shrink value={user.phone} disabled onClick={()=>{ handleClickOpen("phone") }}/>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginBottom: 15 }}>
                                <TextField label="E-mail" variant="outlined" style={{ width: '98%' }}  shrink value={user.email} disabled onClick={()=>{ handleClickOpen("email") }}/>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginBottom: 15 }}>
                                <TextField label="Género" variant="outlined" style={{ width: '98%' }}  shrink value={(user.sex=='F')?'Femenino':(user.sex=='M')?'Masculino':'Indefinido'} disabled  onClick={()=>{ handleClickOpen("sex") }}/>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginBottom: 15 }}>
                                <TextField label="Condición" variant="outlined" style={{ width: '98%' }}  shrink value={(user.id_condition==1)?'Activo':(user.id_condition==2)?'Congelado':(user.id_condition==3)?'Bloqueado':(user.id_condition==4)?'Eliminado':(user.id_condition==4)?'No activado':'Indefinido'} disabled  onClick={()=>{ handleClickOpen("condition") }}/>
                            </Grid>
                            <Grid item xs={12} md={12} style={{ marginBottom: 10 }}>
                                <Typography variant="p" color="primary" style={{ textAlign: 'center', marginTop: 20 }}>
                                    Dirección
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginBottom: 15 }}>
                                <TextField label="País" variant="outlined" style={{ width: '98%' }}  shrink value={(user.country=='(empty)')?'Indefinido':user.country} disabled  onClick={()=>{ handleClickOpen("country") }}/>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginBottom: 15 }}>
                                <TextField label="Estado" variant="outlined" style={{ width: '98%' }}  shrink value={(user.state=='(empty)')?'Indefinido':user.state} disabled  onClick={()=>{ handleClickOpen("country") }}/>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginBottom: 15 }}>
                                <TextField label="Ciudad" variant="outlined" style={{ width: '98%' }}  shrink value={(user.city)?user.city:'Indefinido'} disabled  onClick={()=>{ handleClickOpen("city") }}/>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginBottom: 15 }}>
                                <TextField label="Calle" variant="outlined" style={{ width: '98%' }}  shrink value={(user.street)?user.street:'Indefinido'} disabled  onClick={()=>{ handleClickOpen("street") }}/>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginBottom: 15 }}>
                                <TextField label="Casa/Piso" variant="outlined" style={{ width: '98%' }}  shrink value={(user.house)?user.house:'Indefinido'} disabled  onClick={()=>{ handleClickOpen("house") }}/>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginBottom: 15 }}>
                                <TextField label="Código Postal" variant="outlined" style={{ width: '98%' }}  shrink value={(user.cp)?user.cp:'Indefinido'} disabled  onClick={()=>{ handleClickOpen("cp") }}/>
                            </Grid>
                        </>
                    :
                    <SkeletonCommons type="AdminUserEdit" />
                }
                
            </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Modificar perfil de "+user.name}</DialogTitle>
        <DialogContent>
            {   

                loading?
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    >
                        <CircularProgress />
                    </div>
                :
                    (alertType=="text" || alertType=="number")?
                        <TextField label={modTitle} type={alertType} variant="outlined" style={{ width: '98%' }} value={temporalValue} onChange={handleChangeValue} shrink focused autoFocus/>
                    :   
                        (selectOption=="country")?
                            <>
                                <FormControl variant="filled" className={classes.formControl} style={{ width: '98%' }}>
                                <InputLabel id="demo-simple-select-filled-label">País</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={temporalCountry}
                                        onChange={handleChangeCountry}
                                        fullWidth
                                    >
                                        <MenuItem value={"(empty)"}>Indefinido</MenuItem>
                                        {   
                                            Array.from(countries).map((item, index) => (
                                                <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '98%' }}>
                                    <InputLabel id="demo-simple-select-filled-label2">Estado</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label2"
                                        id="demo-simple-select-filled2"
                                        value={temporalState}
                                        onChange={handleChangeState}
                                        fullWidth
                                    >   
                                        <MenuItem value={"(empty)"}>Indefinido</MenuItem>
                                        {   
                                            Array.from(states).map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </>
                        :
                        (selectOption=="genero")?
                            <FormControl variant="filled" className={classes.formControl} style={{ width: '98%' }}>
                                <InputLabel id="demo-simple-select-filled-label">{modTitle}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={temporalSex}
                                        onChange={handleChangeSex}
                                        fullWidth
                                    >
                                        {   
                                            Array.from(sexs).map((item, index) => (
                                                <MenuItem key={index} value={item.value}>{item.title}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                        :
                            (selectOption=="condition")?
                                <FormControl variant="filled" className={classes.formControl} style={{ width: '98%' }}>
                                    <InputLabel id="demo-simple-select-filled-label">{modTitle}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            value={temporalCondition}
                                            onChange={handleChangeCondition}
                                            fullWidth
                                        >
                                            {   
                                                Array.from(conditions).map((item, index) => (
                                                    <MenuItem key={index} value={item.value} >{item.title}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                            :
                            <></>
            }
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Modificar
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}
