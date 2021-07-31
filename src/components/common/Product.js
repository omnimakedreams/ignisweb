import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Link
} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
                            <Typography align="center" gutterBottom variant="p" style={{ color: theme.terteary.contrastText }}>
                                {
                                (moneda)?
                                    '$'+item.price.toFixed(2)
                                :
                                    'BsS '+(item.price*dolar).toFixed(2)
                                }
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            </Grid>
       </>
    );
 }
 
 export default Product;