import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    Link
} from "react-router-dom";
const useStyles = makeStyles(() => ({
    root: {
        marginBottom: 10
    },
}));
function Promotion(props) {
    const classes = useStyles();
    const { imgURL, alt, link } = props;
    const [loadingContext, setLoadingContext] = useState(true)
    return (
       <>
            { 
            loadingContext? 
                <Skeleton variant="rect" width={'100%'} height={300} style={{ borderRadius: '1em' }} />
            :
                <></>
            }
            <Link to={link}>
                <Card className={classes.root} style={{ borderRadius: '1rem', }} elevation={0}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={imgURL} 
                        alt={alt} 
                        onLoad={() => setLoadingContext(false)}
                        title={alt}
                    />
                </Card>
            </Link>
            
       </>
    );
 }
 
 export default Promotion;