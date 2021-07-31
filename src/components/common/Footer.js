import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import ShopIcon from '@material-ui/icons/Shop';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import YouTubeIcon from '@material-ui/icons/YouTube';
import {
    Link
} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: ({ myTheme }) => ({
        flexGrow: 1,
        backgroundColor: myTheme.primary.main,
        width: '100%'
    }),
    copy: ({ myTheme }) => ({
        height: 35,
        backgroundColor: myTheme.terteary.main,
        color: myTheme.secondary.main,
        width: '100%',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: "1em",
        borderTopRightRadius: "1em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }),
    internalDiv: {
        padding: 20
    }
}));
export default function Footer({ theme }) {
    const classes = useStyles({myTheme : theme});
    return (
        <>
            <div className={classes.root} >
                <Container maxWidth="lg" style={{ padding: 0 }}>
                    <Grid container>
                        <Hidden xsDown>
                            <Grid item xs={12} md={3} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <img src={"https://i.ibb.co/25424yZ/omniico.png"} alt="image" style={{ width: 300, padding: 5 }} />
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} md={9} style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <div className={classes.internalDiv} >
                                <IconButton color="secondary" aria-label="add an alarm">
                                    <ShopIcon />
                                </IconButton>
                                <IconButton color="secondary" aria-label="add an alarm">
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton color="secondary" aria-label="add an alarm">
                                    <InstagramIcon />
                                </IconButton>
                                <IconButton color="secondary" aria-label="add an alarm">
                                    <WhatsAppIcon />
                                </IconButton>
                                <IconButton color="secondary" aria-label="add an alarm">
                                    <YouTubeIcon />
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                    <div className={classes.copy} >
                        Copyright <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> 2021 Omni
                    </div>
                </Container>
            </div>
        </>
    );
}