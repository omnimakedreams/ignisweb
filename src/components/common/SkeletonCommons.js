
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(() => ({

}));
const cardHeight = 220;
export default function SkeletonCommons(props) {
    const { type } = props;
    const classes = useStyles();
    return (
        <>
            {
                (type === "searchlist") ?
                    <>
                        <Grid item xs={12} md={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Skeleton variant="rect" width={'100%'} height={cardHeight} style={{ borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'80%'} height={25} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave"  />
                                    <Skeleton variant="rect" width={'25%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Skeleton variant="rect" width={'100%'} height={cardHeight} style={{ borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'80%'} height={25} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave"  />
                                    <Skeleton variant="rect" width={'25%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Skeleton variant="rect" width={'100%'} height={cardHeight} style={{ borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'80%'} height={25} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave"  />
                                    <Skeleton variant="rect" width={'25%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Skeleton variant="rect" width={'100%'} height={cardHeight} style={{ borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'80%'} height={25} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave"  />
                                    <Skeleton variant="rect" width={'25%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Skeleton variant="rect" width={'100%'} height={cardHeight} style={{ borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'80%'} height={25} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave"  />
                                    <Skeleton variant="rect" width={'25%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Skeleton variant="rect" width={'100%'} height={cardHeight} style={{ borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'80%'} height={25} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave"  />
                                    <Skeleton variant="rect" width={'25%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Skeleton variant="rect" width={'100%'} height={cardHeight} style={{ borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'80%'} height={25} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave"  />
                                    <Skeleton variant="rect" width={'25%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Skeleton variant="rect" width={'100%'} height={cardHeight} style={{ borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'80%'} height={25} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave"  />
                                    <Skeleton variant="rect" width={'25%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Skeleton variant="rect" width={'100%'} height={cardHeight} style={{ borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'80%'} height={25} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave"  />
                                    <Skeleton variant="rect" width={'25%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Skeleton variant="rect" width={'100%'} height={cardHeight} style={{ borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'80%'} height={25} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave"  />
                                    <Skeleton variant="rect" width={'25%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Skeleton variant="rect" width={'100%'} height={cardHeight} style={{ borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'80%'} height={25} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave"  />
                                    <Skeleton variant="rect" width={'25%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Skeleton variant="rect" width={'100%'} height={cardHeight} style={{ borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'80%'} height={25} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                    <Skeleton variant="rect" width={'100%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave"  />
                                    <Skeleton variant="rect" width={'25%'} height={15} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                                </CardContent>
                            </Card>
                        </Grid>
                    </>
                    :
                    (type === "usersList")?
                        <>
                            <Skeleton variant="rect" width={'98%'} height={70} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={70} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={70} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={70} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={70} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={70} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={70} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={70} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={70} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={70} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={70} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={70} style={{ marginTop: 5, borderRadius: 5 }} animation="wave" />
                        </>
                    :
                    (type === "AdminUserEdit")?
                        <>
                            <Skeleton variant="rect" width={'98%'} height={90} style={{ marginTop: 30, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={60} style={{ marginTop: 10, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={60} style={{ marginTop: 10, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={60} style={{ marginTop: 10, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={60} style={{ marginTop: 10, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={60} style={{ marginTop: 10, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={60} style={{ marginTop: 10, borderRadius: 5 }} animation="wave" />
                            <Skeleton variant="rect" width={'98%'} height={60} style={{ marginTop: 10, borderRadius: 5 }} animation="wave" />
                        </>
                    :
                    
                    <></>
            }
        </>
    );
}

