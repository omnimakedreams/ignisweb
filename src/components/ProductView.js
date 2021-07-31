
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Carousel from 'react-hook-carousel';
import { SRLWrapper } from "simple-react-lightbox";
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import TextField from '@material-ui/core/TextField';
import BreadsLine from './common/BreadsLine';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {
    useParams,
    useHistory,
    Link
} from "react-router-dom";
import API from './common/Axios';
import urls from "./common/variables";
import themes from './common/themes';
import Loader from './Loader';
import MainAppBar from './common/MainAppBar';
import Footer from './common/Footer';
const useStyles = makeStyles(() => ({
    root: ({ myTheme }) => (  {
        backgroundColor: myTheme.terteary.main
    }),
    addCarButton: ({ myTheme }) => ({
        color: myTheme.primary.contrastText,
        backgroundColor: myTheme.primary.main
    })
}));

export default function ProductView({ session, setCar, setSession, car }) {
    let { product_key } = useParams();
    const history = useHistory();
    const [selectedTheme, setSelectedTheme] = useState(themes.themeBlueDark);
    const [day, setDay] = useState(false);
    const [loading, setLoading] = useState(true);
    const [itemQuantity, setItemQuantity] = useState(1);
    const [data, setData] = useState(null);
    const [dolar, setDolar] = useState(0);
    const [id_product, setId_product] = useState(null);
    const [carousel, setCarousel] = useState(null);
    const [storeInfo, setStoreInfo] = useState(null);
    let classes = useStyles({ myTheme: selectedTheme });
    const handleChangeQuantity = (event) => {
        setItemQuantity(event.target.value);
    };
    const options = {
        buttons: {
            backgroundColor: 'rgba(30,30,36,0.8)',
            iconColor: selectedTheme.primary.main,
            iconPadding: '10px',
            showAutoplayButton: false,
            showCloseButton: true,
            showDownloadButton: false,
            showFullscreenButton: true,
            size: '40px'
        },
        thumbnails: {
            showThumbnails: true,
            thumbnailsAlignment: 'center',
            thumbnailsContainerBackgroundColor: 'transparent',
            thumbnailsContainerPadding: '0',
            thumbnailsGap: '0 1px',
            thumbnailsIconColor: '#ffffff',
            thumbnailsOpacity: 0.4,
            thumbnailsPosition: 'bottom',
            thumbnailsSize: ['100px', '80px']
        }
    }
    const addToCar = () => {
        if (!session) {
            history.push('/login');
        } else {
            setLoading(true);
            const request = {
                access: urls.access,
                id_product: id_product,
                quantity: itemQuantity.toString(),
                id_user: session.id_user
            }
            API.post(`/car/products/add`, request)
                .then(res => {
                    if (res.data.status === "success") {
                        setCar(res.data.data);
                        history.push('/car');
                    } else {
                        setLoading(false);
                        console.log(res.data.message);
                    }
                })
        }
    };

    useEffect(() => {
        setLoading(true);
        const request = {
            access: urls.access,
            key: product_key
        }
        console.log(request);
        API.post(`/products/getOne`, request)
            .then(res => {
                if (res.data.status === "success") {
                    console.log(res.data);
                    setData(res.data.data);
                    setId_product(res.data.data.id_product);
                    setDolar(res.data.data.store.dolar);
                    setStoreInfo(res.data.data.store);
                    if (res.data.data.store.theme == 1) {
                        if (res.data.data.store.day == 1) {
                            setSelectedTheme(themes.themeBlueLight);
                        } else {
                            setSelectedTheme(themes.themeBlueDark);
                        }
                    } else {
                        if (res.data.data.store.theme == 2) {
                            if (res.data.data.store.day == 1) {
                                setSelectedTheme(themes.themePinkLight);
                                console.log("here");
                            } else {
                                setSelectedTheme(themes.themePinkDark);
                            }
                        } else {
                            if (res.data.data.store.day == 3) {
                                setSelectedTheme(themes.themeOrangeLight);
                            } else {
                                setSelectedTheme(themes.themeOrangeDark);
                            }
                        }
                    }
                    setLoading(false);
                } else {
                    setLoading(false);
                    console.log(res.data.message);
                }
            })
    }, [])
    useEffect(() => {
        console.log(selectedTheme);
    }, [selectedTheme])
    useEffect(() => {
        if (data) {
            let vector = [];
            data.images.reverse().forEach(element => {
                let valor = {
                    image: element.imgURL,
                    alt: element.id_img
                }
                vector.push(valor);
            });
            setCarousel(vector);
        }
    }, [data])
    if (loading) {
        return <Loader theme={themes.themeBlueDark} />
    }
    return (
        <>
            <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar} theme={selectedTheme} />
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={12} style={{
                            marginTop: 70,
                            paddingLeft: 20,
                            paddingRight: 20,
                            marginBottom: 8
                        }}> 
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={3}> 
                                <Link to={"/"+storeInfo.store_key} style={{ textDecoration: 'none' }}>
                                    <Button fullWidth variant="outlined" className={classes.addCarButton}>
                                        <NavigateBeforeIcon /> {storeInfo.title}
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12} md={9} style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                paddingLeft: 20,
                                paddingTop: 8
                            }}> 
                                <BreadsLine categories={data.category.tree} theme={selectedTheme} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={7} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start"
                    }}>
                        <SRLWrapper options={options}>
                            <Carousel items={carousel} groupBy={1} showDots={false} effect="fade" />
                        </SRLWrapper>
                    </Grid>
                    <Grid item xs={12} md={5} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start"
                    }}>
                        <Card className={classes.root} variant="outlined" style={{ borderRadius: '1rem', margin: 5, width: '100%', paddingLeft: -5, textAlign: 'left' }}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {data.category.main.name}
                                </Typography>
                                <Typography variant="h5" component="h2" style={{ textAlign: 'center' }}>
                                    {data.title}
                                </Typography>
                                <Typography variant="h4" color="textSecondary" style={{ textAlign: 'center' }}>
                                    {data.price.toFixed(2)}$
                                </Typography>
                                <Typography variant="h5" color="textSecondary" style={{ textAlign: 'center' }}>
                                    BsS {(data.price * dolar).toFixed(2)}
                                </Typography>

                                <Typography style={{ marginTop: 15, minHeight: 340 }}>
                                    {data.description}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Grid item style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "flex-start"
                                }}>
                                    <TextField
                                        type="number"
                                        InputProps={{
                                            inputProps: {
                                                max: 100, min: 1
                                            }
                                        }}
                                        fullWidth
                                        onChange={handleChangeQuantity}
                                        InputLabelProps={{ shrink: true }}
                                        label="Cantidad"
                                        variant="outlined"
                                        value={itemQuantity}
                                        style={{ margin: 5, marginTop: 10 }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Button variant="contained" fullWidth className={classes.addCarButton} onClick={addToCar}>
                                        <AddShoppingCartIcon /> Agregar al carrito
                                    </Button>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <Footer theme={selectedTheme} />
        </>
    );
}