
import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Skeleton from '@material-ui/lab/Skeleton';
import API from './common/Axios';
import axios from 'axios';
import urls from "./common/variables";
import Alert from '@material-ui/lab/Alert';
import CircularProgress  from '@material-ui/core/CircularProgress';
import {
    useHistory
} from "react-router-dom";
const useStyles = makeStyles(() => ({
    root: {
        marginBottom: 10
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
}));
const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);
export default function AddProduct({ session }) {
    const classes = useStyles();
    const history = useHistory();
    const [precio, setPrecio] = useState(0.00);
    const [title, setTitle] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');
    const [secondary, setSecondary] = useState([]);
    const [loading, setLoading] = useState(true)
    const [showProgress, setShowProgress] = useState(false)
    const [cancel, setCancel] = useState(false)
    const [mainIMG, setMainIMG] = useState(null)
    const [resetPictures, setResetPictures] = useState(false)
    const [actualCategory, setActualCategory] = useState(null);
    const [buttonText, setButtonText] = useState('Selecciona una categoría');
    const [alertThis, setAlertThis] = useState(false);
    const [severity, setSeverity] = useState('error');
    const [alertMessage, setAlertMessage] = useState('');
    const resetAll = () => {
        resetCategory();
        resetPics();
        setPrecio(0);
        setTitle('');
        setDescription('');
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
    const register = () => {
        if(precio!=0 && title!="" && actualCategory!=null && mainIMG!=null){
            setShowProgress(true);
            let newVector = [...secondary, mainIMG]
            console.log(secondary);
            console.log(mainIMG);
            let exit = [];
            Promise.all(newVector.map((pic, index) => {
                return new Promise((resolve, _) => {
                    let resp = getData(pic.base64.split(',')[1]);
                    console.log(resp);
                    resolve(resp);
                }).then((data) => {
                    let obj = {
                        main: pic.main,
                        upload : {
                            imgURL: data.data.data.image.url,
                            thumb: data.data.data.thumb.url,
                            delete: data.data.data.delete_url
                        }
                    };
                    console.log(obj);
                    exit.push(obj);
                })
            })).then(() => {
                const request = {
                    access : urls.access,
                    id_user : session.id_user,
                    title: title,
                    category : actualCategory.code,
                    price : precio,
                    description : description,
                    imgvector: exit
                }
                console.log(request);
                API.post(`/products/add`, request)
                    .then(res => {
                        console.log(res);
                        if (res.data.status === "success") {
                            setSeverity('success');
                            setAlertMessage('Producto registrado exitosamente... Redireccionando')
                            setAlertThis(true);
                            resetAll();
                            setShowProgress(false);
                            setTimeout(() => {
                                history.push('/product/'+res.data.data.id_product);
                            }, 1000);
                        } else {
                            console.log(res.data.message);
                            setShowProgress(false);
                        }
                    })
            });                         
            
        }else{
            setSeverity('error');
            setAlertMessage('Hay campos obligatorios vacíos.')
            setAlertThis(true);
        }
    };
    const handlerChangeCategory = (cat) => {
        setActualCategory(cat);
        setLoading(true);
        const data = {
            access : urls.access,
            code : cat.code
        }
        API.post(`/categories/get/tree/from`, data)
            .then(res => {
                if (res.data.status === "success") {
                    setCategories(res.data.data);
                    if(res.data.data.length!=0){
                        setButtonText('Selecciona una subcategoría');
                    }
                    setCancel(true);
                    setLoading(false);
                } else {
                    console.log(res.data.message);
                }
            })
        
        handleClose();
    };
    const resetCategory = () => {
        setLoading(true);
        setActualCategory(null);
        setButtonText('Selecciona una categoría');
        setCancel(false);
        const data = {
            access : urls.access
        }
        API.post(`/categories/get/main`, data)
        .then(res => {
            if (res.data.status === "success") {
                setCategories(res.data.data);
                setLoading(false);
            } else {
                console.log(res.data.message);
            }
        })
    };
    const resetPics = () => {
        setMainIMG(null);
        setSecondary([]);
    };
    
    const handlerChangeSecondaryImage = (event) => {
        const file = event.target.files[0];
        event.target.value = null
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          setSecondary([...secondary, { base64: base64, main: false }]);
        };
        reader.onerror = (error) => {
          console.log(error);
        };
        reader.readAsDataURL(file);
        
    };
    useEffect(() => {
        if(secondary.length!=0 || mainIMG!=null){
            setResetPictures(true)
        }else{
            setResetPictures(false)
        }
    }, [secondary, mainIMG])
    const handlerChangeImage = (event) => {
        const file = event.target.files[0];
        event.target.value = null
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          setMainIMG({base64: base64, main: true});
        };
        reader.onerror = (error) => {
          console.log(error);
        };
        reader.readAsDataURL(file);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };
    useEffect(() => {
        const getCategories = () => {
            const data = {
                access : urls.access
            }
            API.post(`/categories/get/main`, data)
                .then(res => {
                    if (res.data.status === "success") {
                        setCategories(res.data.data);
                        setLoading(false);
                    } else {
                        console.log(res.data.message);
                    }
                })
        }
        setCategories([]);
        getCategories();
    }, [])
    useEffect(() => {
        if(actualCategory){
            console.log(actualCategory);
        }
    }, [actualCategory])
    const handleChangePrecio = (event) => {
        setPrecio(event.target.value);
    };
    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };
    return (
        <div className={classes.root}>
            
            {
                (!showProgress) ?
                    <Grid container style={{ margin: 5,
                                            width: '98%' }}>
                                    <Grid item xs={12} md={12} style={{ marginBottom: 10 }}>
                                        <Typography variant="h4" color="primary" style={{ textAlign: 'center', marginTop: 20 }}>
                                            Registrar nuevo producto
                                        </Typography>
                                    </Grid>
                                    {
                                        !mainIMG?
                                            <>  
                                                <Grid item xs={12} md={12} style={{ marginBottom: 10 }}>
                                                    <Typography variant="h6" color="primary" style={{ textAlign: 'center', marginTop: 20 }}>
                                                        Selecciona la imagen principal del producto
                                                    </Typography>
                                                    <input type="file" accept="image/*" onChange={handlerChangeImage} />
                                                </Grid>
                                            </>
                                            
                                        :
                                                <Grid item xs={12} md={12} style={{ maxHeight: 400, marginBottom: 10 }}>
                                                    <img src={mainIMG.base64} alt="main*"  style={{ maxHeight: 400, maxWidth: 350 }} />
                                                </Grid>

                                    }
                                        <Grid item xs={12} md={12} style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginBottom: 10
                                        }}> 
                                                {
                                                    (resetPictures)? 
                                                        <Button
                                                            aria-controls="customized-menu"
                                                            aria-haspopup="true"
                                                            variant="outlined"
                                                            onClick={resetPics}
                                                            elevation={0}
                                                            style={{ marginBottom: 10, width: '50%', color: 'gray' }}
                                                        >
                                                            Resetear Imágenes
                                                        </Button>
                                                    :
                                                        <>
                                                        </>
                                                }
                                        </Grid>
                                    

                                    <Grid container style={{
                                            marginBottom: 20,
                                            width: '98%'
                                    }}>   
                                        {   
                                            (secondary.length!=0)?
                                                Array.from(secondary).map((img, index) => (      
                                                    <Grid key={index} item xs={12} md={3}  style={{
                                                        padding: 5
                                                }}>
                                                        <img src={img.base64} alt={index.toString()} style={{ width: '100%' }}/>
                                                    </Grid>
                                                ))   
                                            : 
                                                <>  
                                                </>
                                        }
                                        <Grid item xs={12} md={12}>                       
                                            <Typography variant="h6" color="primary" style={{ textAlign: 'center', marginTop: 20 }}>
                                                Agregar imagen secundaria
                                            </Typography>
                                            <input type="file" accept="image/*" onChange={handlerChangeSecondaryImage} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Nombre del Producto"
                                            variant="outlined"
                                            style={{ margin: 5, width: '80%' }}
                                            value={title}
                                            onChange={handleChangeTitle}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            
                                            type="number"
                                            label="Precio (en $)"
                                            variant="outlined"
                                            style={{ margin: 5, width: '80%' }}
                                            value={precio}
                                            onChange={handleChangePrecio}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Descripción (opcional)"
                                            style={{ margin: 5, width: '80%' }}
                                            multiline
                                            value={description}
                                            rows={12}
                                            onChange={handleChangeDescription}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    {
                                        (actualCategory)?
                                        <Grid item xs={12} md={12} style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginBottom: 10
                                        }}> 
                                                <div style={{
                                                    border: '2px dotted',
                                                    borderColor: '#757ce8',
                                                    borderRadius: 5,
                                                    padding: 10
                                                }}>
                                                    <Typography style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>
                                                        Categoría del producto
                                                    </Typography> 
                                                    <Typography variant="h5" color="primary" style={{ textAlign: 'center', marginTop: 20 }}>
                                                        { actualCategory.name }
                                                    </Typography>
                                                </div>
                                            
                                        </Grid>
                                        :
                                        <>
                                        </>
                                    }
                                    <Grid item xs={12} md={12} style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "flex-start",
                                                marginBottom: 10
                                            }}>
                                        {   
                                            !loading ?
                                                (categories.length>1)? 
                                                    <Button
                                                        aria-controls="customized-menu"
                                                        aria-haspopup="true"
                                                        variant="outlined"
                                                        color="primary"
                                                        onClick={handleClick}
                                                        elevation={0}
                                                        style={{ marginBottom: 10, width: '50%' }}
                                                    >
                                                        {buttonText}
                                                    </Button>
                                                :
                                                    <>
                                                    </>
                                            :
                                                <Skeleton variant="rect" width={'50%'} height={30} style={{ borderRadius: 5, padding: 5, marginBottom: 10 }} animation="wave" />
                                        }
                                        <StyledMenu
                                            id="customized-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >   
                                            {
                                            (categories.length!=0)? 
                                                Array.from(categories).map((item, index) => (
                                                    <StyledMenuItem key={index} onClick={() => handlerChangeCategory(item)}>
                                                        <ListItemText primary={item.name}/>
                                                    </StyledMenuItem>
                                                )) 
                                            :
                                                <>
                                                </>
                                            }
                                        </StyledMenu>
                                    </Grid>
                                    <Grid item xs={12} md={12} style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "flex-start",
                                                marginBottom: 10
                                            }}>
                                        {   
                                            !loading ?
                                                (cancel)? 
                                                    <Button
                                                        aria-controls="customized-menu"
                                                        aria-haspopup="true"
                                                        variant="outlined"
                                                        onClick={resetCategory}
                                                        elevation={0}
                                                        style={{ marginBottom: 10, width: '50%', color: 'gray' }}
                                                    >
                                                        Cancelar selección
                                                    </Button>
                                                :
                                                    <>
                                                    </>
                                            :
                                                <Skeleton variant="rect" width={'50%'} height={30} style={{ borderRadius: 5, padding: 5, marginBottom: 10 }} animation="wave" />
                                        }

                                    </Grid>
                                    <Grid item xs={12} md={12} style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "flex-start",
                                                marginBottom: 10
                                            }}>
                                        {   
                                            !loading ?
                                                (precio!=0 && title!="" && actualCategory!=null && mainIMG!=null)? 
                                                    <Button
                                                        aria-controls="customized-menu"
                                                        aria-haspopup="true"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={register}
                                                        elevation={0}
                                                        style={{ marginBottom: 10, width: '50%' }}
                                                    >
                                                        Registrar Producto
                                                    </Button>
                                                :
                                                    <Button
                                                        aria-controls="customized-menu"
                                                        aria-haspopup="true"
                                                        variant="outlined"
                                                        disabled 
                                                        color="primary"
                                                        elevation={0}
                                                        style={{ marginBottom: 10, width: '50%' }}
                                                    >
                                                        Registrar Producto
                                                    </Button>
                                            :
                                                <Skeleton variant="rect" width={'50%'} height={30} style={{ borderRadius: 5, padding: 5, marginBottom: 10 }} animation="wave" />
                                        }

                                    </Grid>
                                </Grid>
                    :
                    <div  style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 800
                    }}>
                        <CircularProgress />
                    </div>
            }
            {
                alertThis ?
                    <Alert variant="filled" severity={severity} onClose={() => { setAlertThis(false); }} style={{ position: 'fixed', bottom: 0, marginLeft:20, zIndex: 1, marginBottom: 10 }}>{alertMessage}</Alert>
                    :
                    <></>
            }
        </div>
    );
}
