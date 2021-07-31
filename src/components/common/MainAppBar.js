import React, { useState } from 'react';
import { fade, makeStyles, withStyles  } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import API from './Axios';
import urls from './variables.js';
import {
  Link,
  useHistory
} from "react-router-dom";
import StoreIcon from '@material-ui/icons/Store';
import Hidden from '@material-ui/core/Hidden';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: ({ myTheme }) => ({
    flexGrow: 1,
    color: myTheme.primary.contrastText,
    textDecoration: 'none'
  }),
  divider: ({ myTheme }) => ( {
      backgroundColor: myTheme.secondary.main,
  }),
}));
export default function MainAppBar({ setSession, session, setCar, theme }) {
  const StyledMenuItem = withStyles((theme0) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.primary.contrastText,
        },
      },
      '&:hover': {
        backgroundColor: theme.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.primary.contrastText,
        },
      },
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.terteary.contrastText,
      },
      color: theme.terteary.contrastText,
      backgroundColor: theme.terteary.main
    },
  }))(MenuItem);
  const classes = useStyles({myTheme : theme});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();
  const logOut = () => {
    handleClose();
    const request = {
        access: urls.access,
        id_user: session.id_user
    };
    API.post(`/users/logout`, request)
    .then(res => {
        console.log(res.data);
        setCar([]);
        localStorage.clear();
        setSession(false);
        history.push({
          pathname: '/',
        });
    })
  }

  
  return (
    <div className={classes.root} >
      <AppBar position="fixed" elevation={0} style={{ height: 60,  borderBottomLeftRadius: "1em", borderBottomRightRadius: "1em", borderTopLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: theme.primary.main }}>
        <Toolbar>
            <IconButton position="start">
              <Link to="/">
                <img src={"https://i.ibb.co/25424yZ/omniico.png"} alt="image" style={{ width: 50, padding: 10 }} />
              </Link>
            </IconButton>
            <Hidden xsDown>
              <Link to="/" style={{textDecoration: 'none'}}>
                <Typography variant="h4" className={classes.title}>
                  IGNIS
                </Typography>
              </Link>
            </Hidden>
            <Typography variant="h4" className={classes.title}>
                
            </Typography>
            <Link to="/planes" style={{textDecoration: 'none'}}>
              <Button position="end"  style={{ color: theme.primary.contrastText }}>Planes</Button>
            </Link>
            
            {
              session?
                <IconButton position="end" onClick={handleClick}>
                  <AccountCircleIcon style={{ color: theme.primary.contrastText }} />
                </IconButton>
              :
                <Link to="/login" style={{textDecoration: 'none'}}>
                  <Button position="end"  style={{ color: theme.primary.contrastText }}>Ingresar</Button>
                </Link>
            }
        </Toolbar>
      </AppBar>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <StyledMenuItem>
          <ListItemIcon>
            <Avatar alt="Remy Sharp" src={urls.serverURL+session.imgURL} />
          </ListItemIcon>
          <ListItemText secondaryTypographyProps={{ color: theme.primary.contrastText }} primary="Mi Perfil" secondary={session.name+" "+session.lastname} />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <StoreIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Tiendas" />
        </StyledMenuItem>
        <Divider className={classes.divider} />
        <StyledMenuItem onClick={logOut}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}