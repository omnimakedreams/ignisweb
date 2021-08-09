import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import { makeStyles } from '@material-ui/core/styles';
import 'react-image-crop/dist/ReactCrop.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import './CropperImage.css';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 10,
        paddingTop: 50,
        minHeight: 650,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    cover: {
        minWidth: "80vw",
        backgroundPosition: 'center',
        backgroundRepeat: 'none',
        backgroundSize: 'cover',
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        minHeight: 500,
        backgroundColor: '#dfefff'
    },
    logo0: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        marginBottom: 30
    },
    logo: {
        width: 220,
        height: 220,
        borderRadius: '50%',
        backgroundColor: theme.palette.terteary.main
    },
    logo2: {
        width: 219,
        height: 219,
        borderRadius: '50%',
        backgroundColor: theme.palette.terteary.main,
    },
    logo3: {
        width: 185,
        height: 185,
        marginTop: 15
    },
    logoEmpty: {
        width: 220,
        height: 220,
        borderRadius: '50%',
        backgroundColor: theme.palette.terteary.main,
        padding: 10,
        margintTop: -100
    }
}));



export default function CropperImage({ logo, banner, setLogo, setBanner }) {
    const classes = useStyles();

    const [upImg, setUpImg] = useState();
    const [upImg2, setUpImg2] = useState();

    const imgRef = useRef(null);
    const imgRef2 = useRef(null);

    const previewCanvasRef = useRef(null);
    const previewCanvasRef2 = useRef(null);

    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 19 / 9 });
    const [crop2, setCrop2] = useState({ unit: '%', width: 30, aspect: 1 / 1 });

    const [completedCrop, setCompletedCrop] = useState(null);
    const [completedCrop2, setCompletedCrop2] = useState(null);

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);
    const onLoad2 = useCallback((img) => {
        imgRef2.current = img;
    }, []);
    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);
    useEffect(() => {
        if (!completedCrop2 || !previewCanvasRef2.current || !imgRef2.current) {
            return;
        }

        const image = imgRef2.current;
        const canvas = previewCanvasRef2.current;
        const crop = completedCrop2;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop2]);
    const handlerChangeLogo = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setLogo(null);
            setUpImg2();
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg2(reader.result));
            reader.onerror = (error) => {
                console.log(error);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const handlerChangeCover = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setBanner(null);
            setUpImg();
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.onerror = (error) => {
                console.log(error);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    function generateDownload(canvas, crop) {
        console.log(canvas, crop);
        if (!crop || !canvas) {
            return;
        }
        canvas.toBlob(
            (blob) => {
                setUpImg();
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result;
                    setBanner(base64);
                };
                reader.onerror = (error) => {
                    console.log(error);
                };
                reader.readAsDataURL(blob);
            },
            'image/png',
            1
        );
    }
    function generateDownload2(canvas, crop) {
        if (!crop || !canvas) {
            return;
        }
        canvas.toBlob(
            (blob) => {
                setUpImg2();
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result;
                    setLogo(base64);
                };
                reader.onerror = (error) => {
                    console.log(error);
                };
                reader.readAsDataURL(blob);
            },
            'image/png',
            1
        );
    }
    return (
        <div>
            <Grid container spacing={0} style={{ 
                    width: '98%', display: "flex",
                    justifyContent: "center",
                    alignItems: "center" }}>

                <Grid item xs={12} md={6} style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: '50%',
                    padding: 2
                }}>
                    {
                        (!upImg2)?
                            (upImg && !banner) ?
                                <Button
                                    variant="contained"
                                    component="label"
                                    color={(!banner)?"primary":"default"}
                                    fullWidth
                                    onClick={() => {
                                        generateDownload(previewCanvasRef.current, completedCrop)
                                    }}
                                >
                                    Recortar
                                </Button>
                                :
                                <Button
                                    variant="contained"
                                    component="label"
                                    color={(!banner)?"primary":"default"}
                                    fullWidth
                                >
                                    {(!banner) ? 'Cargar Banner' : 'Cambiar Banner'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlerChangeCover}
                                        hidden
                                    />
                                </Button>
                        :
                            <>
                            </>
                    }
                </Grid>
                <Grid item xs={12} md={6} style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 2
                }}>
                    {
                        (!upImg)?
                            (upImg2 && !logo) ?
                                <Button
                                    variant="contained"
                                    component="label"
                                    color={(!logo)?"primary":"default"}
                                    fullWidth
                                    onClick={() => {
                                        generateDownload2(previewCanvasRef2.current, completedCrop2)
                                    }}
                                >
                                    Recortar
                                </Button>
                                :
                                <Button
                                    variant="contained"
                                    component="label"
                                    color={(!logo)?"primary":"default"}
                                    fullWidth
                                >
                                    {(!logo) ? 'Cargar Logo' : 'Cambiar Logo'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlerChangeLogo}
                                        hidden
                                    />
                                </Button>
                        :
                            <>
                            </>
                    }
                </Grid>
            </Grid>
            <Grid container spacing={0}  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5,
                    width: '99%'
                }}>
                <Grid item xs={12} md={12} style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Typography variant="h6" align="center" color="primary" style={{ width: 150, backgroundColor: '#fff', opacity: 0.8, borderRadius: 20 }}>
                        Vista previa
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12} style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Card style={{ width: '100%', minHeight: 530 }} variant="outlined">
                        <div className={classes.cover} style={{ backgroundImage: 'url(' + banner + ')' }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} md={12} className={classes.logo0}>
                                    {
                                        (logo) ?
                                            <img src={logo} className={classes.logoEmpty} />
                                            :
                                            <img src={'./upload.svg'} className={classes.logoEmpty} />
                                    }
                                </Grid>
                            </Grid>
                            
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12} style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: -533,
                }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={12} style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            {
                                (!banner && upImg) ?
                                    <Card style={{ width: '100%', minHeight: 530, opacity: (upImg)? 1 : 0 }} variant="outlined">
                                        <ReactCrop
                                            src={upImg}
                                            onImageLoaded={onLoad}
                                            crop={crop}
                                            onChange={(c) => setCrop(c)}
                                            onComplete={(c) => setCompletedCrop(c)}
                                            style={{ width: '100%' }}
                                        />
                                        <div style={{ opacity: 0 }}>
                                            <canvas
                                                ref={previewCanvasRef}
                                                style={{
                                                    width: Math.round(completedCrop?.width ?? 0),
                                                    height: Math.round(completedCrop?.height ?? 0)
                                                }}
                                            />
                                        </div>
                                    </Card>
                                    :
                                    <></>
                            }
                        </Grid>
                        <Grid item xs={12} md={12} style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            {
                                (!logo && upImg2) ?
                                    <Card style={{ width: '100%', minHeight: 530, opacity: (upImg2)? 1 : 0 }} variant="outlined">
                                        <ReactCrop
                                            src={upImg2}
                                            onImageLoaded={onLoad2}
                                            crop={crop2}
                                            onChange={(c) => setCrop2(c)}
                                            onComplete={(c) => setCompletedCrop2(c)}
                                            style={{ width: '100%'}}
                                            className='Crop--circle'
                                        />
                                        <div style={{ opacity: 0 }}>
                                            <canvas
                                                ref={previewCanvasRef2}
                                                // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                                                style={{
                                                    width: Math.round(completedCrop2?.width ?? 0),
                                                    height: Math.round(completedCrop2?.height ?? 0)
                                                }}
                                            />
                                        </div>
                                    </Card>
                                    :
                                    <>
                                    </>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    );
}
