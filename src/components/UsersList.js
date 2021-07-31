
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import API from './common/Axios';
import urls from "./common/variables";
import SkeletonCommons from "./common/SkeletonCommons";
import AdminUserEdit from './AdminUserEdit'; 

const useStyles = makeStyles(() => ({
    root: {
        marginBottom: 10,
         height: 1000
    },
}));

export default function UsersList({ session }) {
    const classes = useStyles();
    const [page, setPage] = useState(1); 
    const [loading, setLoading] = useState(true);
    const [maxPage, setMaxPage] = useState(0);
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const handleCleanUser = () => {
        setUser(null);
    };
    const handleSelectUser = (userInfo) => {
        setUser(userInfo);
    };
    const handleChangePage = (event, value) => {
        setPage(value);
    };
    useEffect(() => {
        setLoading(true);
        console.log(session);
        const request = {
            access: urls.access,
            id_admin: session.id_user,
            page: page
        }
        API.post(`/admin/users/getall`, request)
        .then(res => {
            if (res.data.status === "success") {
                console.log(res.data);
                const maxPages = (parseInt(res.data.result)/12);
                var intvalue = Math.ceil( maxPages );
                setMaxPage(intvalue);
                setData(res.data.data);
                setLoading(false); 
            } else {
                setLoading(false);
                console.log(res.data.message);
            }
        })
    }, [page])
    return (
        <>  
            {
                user!=null?
                    <>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start"
                        }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                elevation={0}
                                className={classes.button}
                                style={{ marginBottom: 10, marginTop: 10, width: 150 }}
                                onClick={handleCleanUser}
                            >
                                Volver
                            </Button>
                        </div>
                        <AdminUserEdit session={session} user={user} />
                    </>
                :
                    <>
                        <div className={classes.root}>
                            <Grid container style={{ margin: 5, width: '98%' }}>
                                <Grid item xs={12} md={12} style={{ marginBottom: 10 }}>
                                    <Typography variant="h4" color="primary" style={{ textAlign: 'center', marginTop: 20 }}>
                                        Lista de usuarios
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={12} style={{ marginBottom: 10 }}>
                                    <List component="nav" aria-label="secondary mailbox folders">
                                        {
                                            !loading?
                                                Array.from(data).map((item, index) => (
                                                    <ListItem key={index} button style={{ border: '1px solid', marginTop: 2, borderRadius: 5, borderColor: '#757ce8' }} onClick={() => {
                                                        handleSelectUser(item)
                                                    }} >
                                                        <ListItemText style={{ color: '#757ce8' }} primary={item.email} secondary={item.name+" "+item.lastname} />
                                                    </ListItem>
                                                ))
                                            :
                                                <SkeletonCommons type="usersList" />
                                        }
                                    </List>
                                </Grid>
                            </Grid>
                            
                        </div>
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
                    </>
                
            }

        </>
    );
}
