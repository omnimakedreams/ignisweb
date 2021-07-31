import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import API from './common/Axios';
import urls from "./common/variables";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
export default function AdminBar({ product }) {
  const classes = useStyles();
  const [promoted, setPromoted] = useState(false)
    const unpromote = () => {
        const request = {
            access: urls.access,
            id_product : product.id_product
        }
        API.post(`/promotions/unpromote/product`, request)
            .then(res => {
                if (res.data.status === "success") {
                    setPromoted(false);
                }
            })
    };
    const promote = () => {
        const request = {
            access: urls.access,
            id_product : product.id_product
        }
        API.post(`/promotions/promote/product`, request)
            .then(res => {
                if (res.data.status === "success") {
                    setPromoted(true);
                }
            })
    };
    useEffect(() => {
        if(product){
            setPromoted(product.promoted);
        }
    }, [product])
  return (
    <div className={classes.root} >
      <AppBar position="static" color="default" elevation={0} style={{ marginTop: 10 }}>
        <Toolbar>
            {   
                (product)?
                    (promoted)? 
                        (
                            <IconButton onClick={unpromote}>
                                <BookmarkIcon color="primary" />
                            </IconButton>
                        )
                    :   (
                            <IconButton onClick={promote}>
                                <BookmarkBorderIcon color="primary" />
                            </IconButton>
                        )
                :
                    <>
                    </>
            }
            <IconButton>
                <EditIcon color="primary" />
            </IconButton>
            <IconButton>
                <DeleteIcon style={{ color: 'red' }} />
            </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}