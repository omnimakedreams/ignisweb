import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Link
} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import urls from "./variables";

const useStyles = makeStyles(() => ({
    root: {
        marginBottom: 10
    },
    productCard: ({ myTheme }) => ({
        padding: 0,
        paddingBottom: 0,
        border :'solid 2px', 
        borderRadius: 10,
        borderColor: myTheme.primary.main,
        backgroundColor: myTheme.terteary.main,
        minHeight: 350
    }),
    productCardContent: {
        padding: 5
    },
    productImage: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    productImage2: {
        maxHeight: 300,
        minWidth: '100%'
    },
}));
function Product(props) {
    const { link, item, theme, dolar, moneda } = props;
    let classes = useStyles({ myTheme: theme });
    return (
       <>
            <Grid item xs={12} sm={4} md={2}>
                <Link to={link} style={{ textDecoration: 'none' }}>
                    <Card className={classes.productCard}>
                        <CardContent color={theme.primary.main} className={classes.productCardContent}>
                            <div className={classes.productImage}>
                                <img src={item.imgURL} className={classes.productImage2}/>
                            </div>
                            <Typography align="center" gutterBottom variant="h5" style={{ color: theme.terteary.contrastText }}>
                                {item.title}
                            </Typography>
                            <Grid container spacing={0} style={{ padding: 5 }}>
                                <Grid item xs={12} sm={(moneda && item.mprice)?6:12}>
                                    <Typography align="center" gutterBottom style={{ color: theme.terteary.contrastText }}>
                                        {
                                            (moneda)?
                                                urls.formatAmount(item.price, 'US')
                                            :
                                                urls.formatAmount((item.price * dolar), 'VE').replace('VES', 'BS')      
                                        }
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={(moneda)?6:12}>
                                    {
                                        (item.mprice)?
                                            <>
                                                <Typography variant="caption" align="center" style={{ color: theme.terteary.contrastText }}>
                                                    Al Mayor: 
                                                </Typography>
                                                <Typography align="center" gutterBottom style={{ color: theme.terteary.contrastText }}>
                                                    {
                                                        (moneda)?
                                                            urls.formatAmount(item.mprice, 'US')
                                                        :
                                                            urls.formatAmount((item.mprice * dolar), 'VE').replace('VES', 'BS')   
                                                    }  
                                                </Typography>
                                            </>
                                        :
                                        <>
                                        </>
                                    }
                                </Grid>
                            </Grid>
                            
                        </CardContent>
                    </Card>
                </Link>
            </Grid>
       </>
    );
 }
 
 export default Product;