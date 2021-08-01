
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from 'react-leaflet';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import Product from "./common/Product";
import Hidden from '@material-ui/core/Hidden';
import {
    useParams
} from "react-router-dom";
import { Redirect } from 'react-router';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PaymentIcon from '@material-ui/icons/Payment';
import Switch from '@material-ui/core/Switch';
import MainAppBar from './common/MainAppBar';
import Footer from './common/Footer';
import FormatPaintIcon from '@material-ui/icons/FormatPaint';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Loader from './Loader';
import API from './common/Axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import themes from './common/themes';


const useStyles = makeStyles((theme) => ({
    root: ({ myTheme }) => (  {
        marginBottom: 0,
        backgroundColor: myTheme.terteary.main
    }),
    cover: {
        width: "100%",
        height: 450,
        backgroundPosition: 'center',
        backgroundRepeat: 'none',
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-end"
    },
    logo0: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: ({ myTheme }) => ( {
        width: 220,
        height: 220,
        borderRadius: '50%',
        backgroundColor: myTheme.terteary.main,
        padding: 10
    }),
    logo2: ({ myTheme }) => (  {
        width: 219,
        height: 219,
        borderRadius: '50%', 
        backgroundColor: myTheme.terteary.main,
    }),
    title: ({ myTheme }) => ({
        backgroundColor: myTheme.terteary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }),
    tab: ({ myTheme }) => ({ 
        backgroundColor: myTheme.primary.light,
    }),
    coverButtons: ({ myTheme }) => ({ 
        padding: 10,
        borderRadius: 25, 
        height: 50,
        maxWidth: '100%',
        marginTop: 20,
        marginBottom: 20,
        backgroundColor:  myTheme.terteary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }),
    themeButtons: ({ myTheme }) => ({ 
        position: 'absolute',
        padding: 3,
        borderRadius: 25, 
        height: 30,
        marginTop: 70,
        right: 10,
        marginLeft: 25,
        backgroundColor:  myTheme.terteary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }),
    day: ({ myTheme }) => ({ 
        position: 'absolute',
        padding: 3,
        borderRadius: 25, 
        height: 30,
        left: 10,
        marginTop: 70,
        backgroundColor:  myTheme.terteary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }),
    multilineColor: ({ myTheme }) => ({
        color: myTheme.secondary.main,
        marginLeft: theme.spacing(1),
        flex: 1,
    }),
    divider: ({ myTheme }) => ( {
        backgroundColor: myTheme.secondary.main,
    }),
    switchActive: ({ myTheme }) => ({ color: myTheme.secondary.main }),
    switchInactive: ({ myTheme }) => ({ color: myTheme.secondary.dark }),
    customBadge: ({ myTheme }) => ( {
        backgroundColor: myTheme.primary.main,
        color: myTheme.primary.contrastText
    }),
    ul: ({ myTheme }) => ({
        "& .MuiPaginationItem-root": {
            color:  myTheme.terteary.contrastText
        }
    }), 
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
const coordenadasIniciales = [10.600732, -66.922719];
export default function Store({ setSession, session, car, setCar }) {
    let { key } = useParams();
    const [value, setValue] = useState(0);
    const [moneda, setMoneda] = useState(true);
    const [selectedTheme, setSelectedTheme] = useState(themes.themeBlueDark);
    const [day, setDay] = useState(false);
    const [themeColor, setThemeColor] = useState('blue');
    const [marker, setMarker] = useState(coordenadasIniciales);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [redirectNF, setRedirectNF] = useState(false);
    const [redirectUN, setRedirectUN] = useState(false);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [deliveryDescription, setDeliveryDescription] = useState(null);
    const [banner, setBanner] = useState(null);
    const [logo, setLogo] = useState(null);
    const [id_store, setId_store] = useState(null);
    const [usercar, setUsercar] = useState(null);
    const [precioDolar, setPrecioDolar] = useState(null);
    const [tabs, setTabs] = useState(null);
    const [products, setProducts] = useState(null);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [actualCategory, setActualCategory] = useState('all');
    const [loadingTabs, setLoadingTabs] = useState(false);

    let classes = useStyles({ myTheme: selectedTheme });
    const handleChangeMoneda = (event) => {
        setMoneda(event.target.checked);
    };
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleChangePage = (event, value) => {
        setPage(value);
    };
    useEffect(() => {
        const actualSession = (session.id_user)?session.id_user:0;
        API.get(`/store/get/`+key+`/`+actualSession)
            .then(res => {
                if (res.data.status=="success") {
                    console.log(res.data);
                    setId_store(res.data.storeData.id_store);
                    setPrecioDolar(res.data.storeData.dolar);
                    setTitle(res.data.storeData.title);
                    setLogo(res.data.storeData.logo);
                    setBanner(res.data.storeData.banner);
                    setDescription(res.data.storeData.description);
                    setDeliveryDescription(res.data.storeData.deliveryDescription);
                    setUsercar(res.data.userCar);
                    if (res.data.storeData.theme == 1) {
                        if (res.data.storeData.day == 1) {
                            setSelectedTheme(themes.themeBlueLight);
                        } else {
                            setSelectedTheme(themes.themeBlueDark);
                        }
                    } else {
                        if (res.data.storeData.theme == 2) {
                            if (res.data.storeData.day == 1) {
                                setSelectedTheme(themes.themePinkLight);
                            } else {
                                setSelectedTheme(themes.themePinkDark);
                            }
                        } else {
                            if (res.data.storeData.day == 3) {
                                setSelectedTheme(themes.themeOrangeLight);
                            } else {
                                setSelectedTheme(themes.themeOrangeDark);
                            }
                        }
                    }

                    setTabs(res.data.categoriesMenu);
                    setProducts(res.data.products.vector);
                    const maxPages = (res.data.products.total/12);
                    var intvalue = Math.ceil( maxPages );
                    setMaxPage(intvalue);
                    setLoading(false);
                } else {
                    if(res.data.message=="notfound"){
                        setRedirectNF(true);
                    }else{
                        setRedirectUN(true);
                    }
                }
            })
    }, [])
    useEffect(() => {
        setLoadingTabs(true);
        API.get(`/store/get/tabs/`+key+`/`+page+`/`+actualCategory)
            .then(res => {
                console.log(res.data);
                if (res.data.status=="success") {
                    setProducts(res.data.products);
                    setLoadingTabs(false);
                } else {
                    console.log(res.data);
                }
            })
    }, [page, actualCategory])
    const handleChangeTheme = (color) => {
        setThemeColor(color);
        switch (color) {
            case 'blue':
                if(!day){
                    setSelectedTheme(themes.themeBlueDark);
                }else{
                    setSelectedTheme(themes.themeBlueLight);
                }
                break;
            case 'pink':
                if(!day){
                    setSelectedTheme(themes.themePinkDark);
                }else{
                    setSelectedTheme(themes.themePinkLight);
                }
                break;
            case 'orange':
                if(!day){
                    setSelectedTheme(themes.themeOrangeDark);
                }else{
                    setSelectedTheme(themes.themeOrangeLight);
                }
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        switch (themeColor) {
            case 'blue':
                if(!day){
                    setSelectedTheme(themes.themeBlueDark);
                }else{
                    setSelectedTheme(themes.themeBlueLight);
                }
                break;
            case 'pink':
                if(!day){
                    setSelectedTheme(themes.themePinkDark);
                }else{
                    setSelectedTheme(themes.themePinkLight);
                }
                break;
            case 'orange':
                if(!day){
                    setSelectedTheme(themes.themeOrangeDark);
                }else{
                    setSelectedTheme(themes.themeOrangeLight);
                }
                break;
            default:
                break;
        }
    }, [day])
    const handleChangeDay = () => {
        setDay(!day);
    };
    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };
    const loadTabContent = (id) => {
        setActualCategory(id);
    };
    if (redirectNF) {
        return <Redirect to='/not_found' />;
    }
    if (redirectUN) {
        return <Redirect to='/unavailable' />;
    }
    if(loading){
        return <Loader theme={themes.themeBlueDark} />
    }
    return (
        <>
        {
            (id_store==1)?
            <>
                <div className={classes.themeButtons}>
                    <IconButton style={{ color: themes.themeBlueLight.primary.main }} component="span" onClick={()=>{ handleChangeTheme('blue')}}>
                        <FormatPaintIcon />
                    </IconButton>
                    <IconButton style={{ color: themes.themePinkLight.primary.main }} component="span" onClick={()=>{ handleChangeTheme('pink')}}>
                        <FormatPaintIcon />
                    </IconButton>
                    <IconButton style={{ color: themes.themeOrangeLight.primary.main }} component="span" onClick={()=>{ handleChangeTheme('orange')}}>
                        <FormatPaintIcon />
                    </IconButton>
                </div>
                <div className={classes.day}>
                    <IconButton style={{ color: selectedTheme.secondary.main }} component="span" onClick={handleChangeDay}>
                        {
                            (day)?
                                <Brightness4Icon />
                            :
                                <Brightness5Icon />
                        }
                        
                    </IconButton>
                </div>
            </>
            :
            <></>
        }
        
        <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar} theme={selectedTheme} />
            
            <div className={classes.root} >
                <div className={classes.cover} style={{ backgroundImage: 'url('+banner+')'  }}>
                    
                </div>
                <div className={classes.logo0}>
                    <Grid container spacing={0} style={{ padding: 5, marginTop: -350 }}>
                        <Grid item xs={12} md={12}  style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <div className={classes.logo}>
                                <img src={logo} className={classes.logo2} />
                            </div>
                        </Grid>
                        <Grid container spacing={0}  style={{ padding: 5 }}>
                            <Grid  item xs={12} md={3}>

                            </Grid>
                            <Grid  item xs={12} md={6} className={classes.coverButtons}>
                                <Hidden xsDown>
                                    <InputBase
                                        className={classes.multilineColor}
                                        placeholder="Buscar un artículo"
                                    />
                                    <IconButton type="submit"  style={{ color: selectedTheme.secondary.main }}  aria-label="Buscar">
                                        <SearchIcon />
                                    </IconButton>
                                    <Divider className={classes.divider} orientation="vertical" />
                                </Hidden>
                                <IconButton position="start">
                                    <Badge badgeContent={usercar.length} classes={{ badge: classes.customBadge }} >
                                        <ShoppingCartIcon  style={{ color: selectedTheme.secondary.main }} />
                                    </Badge>
                                </IconButton>
                                <IconButton position="start">
                                    <LocationOnIcon   style={{ color: selectedTheme.secondary.main }}  onClick={handleOpenModal} />
                                </IconButton>
                                <IconButton position="start">
                                    <PaymentIcon  style={{ color: selectedTheme.secondary.main }} />
                                </IconButton>
                                <IconButton position="start">
                                    <LocalShippingIcon  style={{ color: selectedTheme.secondary.main }}  />
                                </IconButton>
                                <Typography component="div">
                                    <Grid component="label" container alignItems="center" spacing={1}>
                                        <Grid item><Typography component="p" className={(!moneda)?classes.switchActive:classes.switchInactive}>BsS</Typography></Grid>
                                    <Grid item>
                                        <Switch checked={moneda} onChange={handleChangeMoneda} style={{ color: selectedTheme.primary.main }}  name="checkedC" />
                                    </Grid>
                                        <Grid item><Typography component="p" className={(moneda)?classes.switchActive:classes.switchInactive}>$</Typography></Grid>
                                    </Grid>
                                </Typography>
                            </Grid>
                            <Hidden smUp>
                                <Grid  item xs={12} md={6} className={classes.coverButtons}>
                                    <InputBase
                                        className={classes.multilineColor}
                                        placeholder="Buscar un artículo"
                                    />
                                    <IconButton type="submit"  style={{ color: selectedTheme.secondary.main }}  aria-label="Buscar">
                                        <SearchIcon />
                                    </IconButton>
                                </Grid>
                            </Hidden>
                            <Grid  item xs={12} md={3}>

                            </Grid>
                        </Grid>
                        
                    </Grid>
                </div>
                <div className={classes.title}>
                    <Typography variant="h5" style={{ color: selectedTheme.secondary.main }}>
                        {title}
                    </Typography>
                </div>
                <AppBar position="static" color={selectedTheme.terteary.main}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        className={classes.tab}
                        variant="scrollable"
                        scrollButtons="auto"
                        elevation={0}
                        selectionFollowsFocus 
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Todos" {...a11yProps(0)}  onClick={()=>{
                                    loadTabContent('all');
                        }} />
                        {
                        (tabs)?
                            tabs.map((tab, i) => {
                                return <Tab label={tab.name} {...a11yProps(i+1)} onClick={()=>{
                                    loadTabContent(tab.id_categorie);
                                }} />
                            })
                        :
                            <></>
                        }
                    </Tabs>
                </AppBar>
                    <TabPanel value={value} index={0} style={{ minHeight: 600, backgroundColor: selectedTheme.terteary.main }}>
                        <Grid container spacing={0}>
                        {   
                            (!loadingTabs && products)?
                                    products.map((item, i) => {
                                        console.log(item);
                                        return <Product item={item} dolar={precioDolar} link={"/product/"+item.product_key} theme={selectedTheme} moneda={moneda} />
                                    })
                                :
                                    <Grid item  xs={12} md={12} style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: 600
                                    }}>
                                        <CircularProgress style={{'color': selectedTheme.primary.main }}/>
                                    </Grid>

                        }
                        </Grid>
                    </TabPanel>
                    <Grid container spacing={0}>
                        <Grid item  xs={12} md={12} style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 60
                        }}>
                            {
                                (maxPage!=0) ? 
                                    <Pagination variant="outlined" count={maxPage} page={page} onChange={handleChangePage} classes={{ ul: classes.ul }} style={{ bottom: 0 }} />
                                :
                                    <>
                                    </>
                            }
                            
                        </Grid>
                    </Grid>
                    
            </div>
            <Footer theme={selectedTheme} />
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >   
                <Grid container spacing={0} style={{ padding: 5 }}>
                    <Grid item xs={false} md={3}>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <MapContainer 
                            center={coordenadasIniciales} 
                            zoom="13" 
                            scrollWheelZoom={true}
                            style={{height: "80vh" }}
                        >   
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={marker}>
                                <Popup>
                                    Esta tienda tiene su sede principal en esta ubicación.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </Grid>
                    <Grid item xs={false} md={3}>

                    </Grid>
                    <Grid item xs={12} md={12}>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 45
                        }}>
                        <Button variant="contained" style={{ position: "absolute", backgroundColor: selectedTheme.primary.main, color: selectedTheme.primary.contrastText }} onClick={handleCloseModal}>
                            Cerrar
                        </Button>
                        </div>
                    </Grid>
                </Grid>
                
            </Modal>
        </>
    );
}