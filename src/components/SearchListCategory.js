
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import API from './common/Axios';
import {
    useParams
} from "react-router-dom";
import urls from "./common/variables";
import Product from "./common/Product";
import SkeletonCommons from "./common/SkeletonCommons";

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
    inputLabel: {
        color: "#333333"
    },
    select: {
        color: "#333333"
    }
}));
export default function SearchListCategory() {
    const classes = useStyles();
    const { category, main } = useParams();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState('title');
    const [direction, setDirection] = useState('-');
    const [categorySelected, setCategorySelected] = useState('none');
    const [maxPage, setMaxPage] = useState(0);
    const [data, setData] = useState([]);
    const [categoryList, setCategoryList] = useState([]); 
    const handleChangeOrder = (event) => {
        setOrder(event.target.value);
    };
    const handleChangeCategory = (event) => {
        setCategorySelected(event.target.value);
    };
    const handleChangeDirection = (event) => {
        setDirection(event.target.value);
    };
    const handleChangePage = (event, value) => {
        setPage(value);
    };
    useEffect(() => {
        console.log("running");
        const data = {
            access : urls.access
        }
        setLoading(true);
        API.post(`/categories/get/main`, data)
            .then(res => {
                if (res.data.status === "success") {
                    setCategoryList(res.data.data);
                    setTimeout(() => {
                        console.log(category);
                        let testCategory;
                        if(main=='ROOT'){
                            setCategorySelected(category);
                            testCategory = category;
                        }else{
                            setCategorySelected(main);
                            testCategory = main;
                        }
                        API.get(`/products/getCategory/1/`+order+direction+`/`+testCategory)
                        .then(res => {
                            if (res.data.status === "success") {
                                setData(res.data.products);
                                const maxPages = (res.data.results/12);
                                var intvalue = Math.ceil( maxPages );
                                setMaxPage(intvalue);
                                setLoading(false); 
                                console.log("ahora");
                            } else {
                                setLoading(false);
                                console.log(res.data.message);
                            }
                        })
                    }, 500);
                } else {
                    console.log(res.data.message);
                }
            })
    }, [])
    useEffect(() => {
        if(categorySelected!="none"){
            setLoading(true);
            API.get(`/products/getCategory/1/`+order+direction+`/`+categorySelected)
            .then(res => {
                if (res.data.status === "success") {
                    setData(res.data.products);
                    const maxPages = (res.data.results/12);
                    var intvalue = Math.ceil( maxPages );
                    setMaxPage(intvalue);
                    setLoading(false); 
                } else {
                    setLoading(false);
                    console.log(res.data.message);
                }
            })
        }
    }, [direction])
    useEffect(() => {
        if(categorySelected!="none"){
            setLoading(true);
            API.get(`/products/getCategory/1/`+order+direction+`/`+categorySelected)
            .then(res => {
                if (res.data.status === "success") {
                    setData(res.data.products);
                    const maxPages = (res.data.results/12);
                    var intvalue = Math.ceil( maxPages );
                    setMaxPage(intvalue);
                    setLoading(false); 
                } else {
                    setLoading(false);
                    console.log(res.data.message);
                }
            })
        }
    }, [order])
    useEffect(() => {
        if(categorySelected!="none"){
            setLoading(true);
            API.get(`/products/getCategory/`+page+`/`+order+direction+`/`+categorySelected)
            .then(res => {
                if (res.data.status === "success") {
                    setData(res.data.products);
                    const maxPages = (res.data.results/12);
                    var intvalue = Math.ceil( maxPages );
                    setMaxPage(intvalue);
                    setLoading(false); 
                } else {
                    setLoading(false);
                    console.log(res.data.message);
                }
            })
        }
    }, [page])
    useEffect(() => {
        if(categorySelected!="none"){
            setLoading(true);
            API.get(`/products/getCategory/`+page+`/`+order+direction+`/`+categorySelected)
            .then(res => {
                if (res.data.status === "success") {
                    setData(res.data.products);
                    const maxPages = (res.data.results/12);
                    var intvalue = Math.ceil( maxPages );
                    setMaxPage(intvalue);
                    setLoading(false); 
                } else {
                    setLoading(false);
                    console.log(res.data.message);
                }
            })
        }
    }, [categorySelected])
    return (
        <div className={classes.root}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                height: 80,
                padding: 10
            }}> 
                
                            <Grid container style={{ margin: 5 }}>
                                <Grid item xs={12} md={6}>
                                    <div style={{
                                        width: '50%',
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center"
                                    }}> 
                                        {
                                            !loading ? (
                                                <FormControl variant="outlined">
                                                    <InputLabel className={classes.inputLabel} id="demo-simple-select-outlined-label2">Categoría</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label2"
                                                        id="demo-simple-select-outlined2"
                                                        value={categorySelected}
                                                        onChange={handleChangeCategory}
                                                        label="Categoría"
                                                        style={{ width: 250 }}
                                                        className={classes.select}

                                                    >   
                                                        <MenuItem value={'none'} selected>Ninguna</MenuItem>
                                                        { Array.from(categoryList).map((item, index) => (
                                                            <MenuItem key={index} value={item.code}>{item.name}</MenuItem>
                                                        )) }
                                                    </Select>
                                                </FormControl>
                                                )
                                            :
                                                <Skeleton variant="rect" width={'100%'} height={30} style={{ borderRadius: 10, marginTop: 5, margin: 5 }} animation="wave" />
                                        }
                                        
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6} style={{
                                        width: '50%',
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        marginTop: 10
                                    }}>
                                    <div style={{
                                        width: '50%',
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                    }}
                                    >   

                                    {
                                        !loading ? (
                                                <>
                                                    
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl variant="outlined">
                                                            <InputLabel className={classes.inputLabel} id="demo-simple-select-outlined-label">Orden</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-outlined-label"
                                                                id="demo-simple-select-outlined"
                                                                value={direction}
                                                                onChange={handleChangeDirection}
                                                                label="Dirección"
                                                                style={{ width: 150 }}
                                                                className={classes.select}
                                                            >
                                                                <MenuItem value={'+'} selected>Ascendente</MenuItem>
                                                                <MenuItem value={'-'}>Descendente</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl variant="outlined">
                                                            <InputLabel className={classes.inputLabel} id="demo-simple-select-outlined-label">Ordenar por</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-outlined-label"
                                                                id="demo-simple-select-outlined"
                                                                value={order}
                                                                onChange={handleChangeOrder}
                                                                label="Ordenar por"
                                                                style={{ width: 150 }}
                                                                className={classes.select}
                                                            >
                                                                <MenuItem value={'title'} selected>Nombre</MenuItem>
                                                                <MenuItem value={'price'}>Precio</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    
                                                </>
                                            )
                                        :
                                            <Skeleton variant="rect" width={'100%'} height={30} style={{ borderRadius: 10, marginTop: 5, margin: 5 }} animation="wave" />
                                    }
                                </div>
                            </Grid>
                        </Grid>
            </div>   
            <Grid container spacing={1} style={{ padding: 15, minHeight: 800, marginTop: 20 }}> 
                {
                    !loading ? 
                        Array.from(data).map((item, index) => (
                            <Grid key={index} item xs={12} md={3}>
                                <Product link={"/product/"+item.id} item={item} />
                            </Grid>
                        )) 
                    :
                        <SkeletonCommons type="searchlist" />
                } 
            </Grid>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 60
            }}>
                {
                    (maxPage!=0) ? 
                        <Pagination count={maxPage} page={page} onChange={handleChangePage} />
                    :
                        <>
                        </>
                }
                
            </div>
        </div>
    );
}