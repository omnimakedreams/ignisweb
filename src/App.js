import React, { useState, useEffect } from 'react';
import MainAppBar from './components/common/MainAppBar';
import PlansPage from './components/PlansPage';
import MainPage from './components/MainPage';
import AdminPanel from './components/AdminPanel';
import ProductView from './components/ProductView';
import AddProduct from './components/AddProduct';
import CarList from './components/CarList';
import Login from './components/Login';
import Register from './components/Register';
import UsersList from './components/UsersList'; 
import Profile from './components/Profile';
import Store from './components/Store';
import NewStore from './components/NewStore';
import Recovery from './components/Recovery';
import SimpleReactLightbox from 'simple-react-lightbox';
import Footer from './components/common/Footer';
import Notfound from './components/Notfound';
import Unavailable from './components/Unavailable';
import FactureSteps from './components/FactureSteps';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#005380',
      main: '#00334e',
      dark: '#002437',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#676767',
      contrastText: '#000',
    },
    terteary: {
      light: '#363636',
      main: '#0d0d0d',
      dark: '#000',
      contrastText: '#fff',
    }
  },
});
theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    backgroundColor: '#0d0d0d'
  }
}));

function App() {
  const classes = useStyles();
  const [session, setSession] = useState(false);
  const [car, setCar] = useState([]);
  const themeBlue = {
    primary: {
      light: '#005380',
      main: '#00334e',
      dark: '#002437',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#676767',
      contrastText: '#000',
    },
    terteary: {
      light: '#363636',
      main: '#0d0d0d',
      dark: '#000',
      contrastText: '#fff',
    }
  }
  const selectedTheme = themeBlue;
  useEffect(() => {
    const storageSession = localStorage.getItem('session');
    console.log("Sesión en Storage: ");
    console.log(JSON.parse(storageSession));
    if(storageSession){
      setSession(JSON.parse(storageSession));
      const storageCar = localStorage.getItem('car');
      console.log("Carrito en Storage: ");
      console.log(JSON.parse(storageCar));
      setCar(JSON.parse(storageCar));
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('car', JSON.stringify(car));
  }, [car])

  return (
    <ThemeProvider theme={theme}>
      <Router >
        <div className={classes.root}>
            <Switch>
              { /* <Route path="/product/:product_key">
                  <SimpleReactLightbox>
                    <ProductView session={session} setSession={setSession} session={session} car={car} setCar={setCar} />
                  </SimpleReactLightbox>
              </Route>
              <Route path="/car">
                <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar}  theme={selectedTheme}/>
                <Container maxWidth="lg" style={{ padding: 0 }}>
                  <CarList  session={session} car={car} setCar={setCar} />
                </Container>
                <Footer theme={selectedTheme} />
              </Route>
              <Route path="/login">
                <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar}  theme={selectedTheme}/>
                <Container maxWidth="lg" style={{ padding: 0 }}>
                  <Login setSession={setSession}  setCar={setCar}/>
                </Container>
                <Footer theme={selectedTheme} />
              </Route>
              <Route path="/register">
                <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar}  theme={selectedTheme}/>
                <Container maxWidth="lg" style={{ padding: 0 }}>
                  <Register setSession={setSession} />
                </Container>
                <Footer theme={selectedTheme} />
              </Route>
              <Route path="/profile">
                <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar}  theme={selectedTheme}/>
                <Container maxWidth="lg" style={{ padding: 0 }}>
                  <Profile />
                </Container>
                <Footer theme={selectedTheme} />
              </Route>
              <Route path="/recovery">
                <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar}  theme={selectedTheme}/>
                <Container maxWidth="lg" style={{ padding: 0 }}>
                  <Recovery />
                </Container>
                <Footer theme={selectedTheme} />
              </Route>
              <Route path="/panel/products/add">
                <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar}  theme={selectedTheme}/>
                <Container maxWidth="lg" style={{ padding: 0 }}>
                  <AddProduct session={session} />
                </Container>
                <Footer theme={selectedTheme} />
              </Route>
              <Route path="/buy">
                <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar}  theme={selectedTheme}/>
                <Container maxWidth="lg" style={{ padding: 0 }}>
                  <FactureSteps session={session} car={car} setCar={setCar}/>
                </Container>
                <Footer theme={selectedTheme} />
              </Route>
              <Route path="/admin/panel/users">
                <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar}  theme={selectedTheme}/>
                <Container maxWidth="lg" style={{ padding: 0 }}>
                  <UsersList session={session} />
                </Container>
                <Footer theme={selectedTheme} />
              </Route>
              <Route path="/admin/panel">
                <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar}  theme={selectedTheme}/>
                <Container maxWidth="lg" style={{ padding: 0 }}>
                  <AdminPanel />
                </Container>
                <Footer theme={selectedTheme} />
              </Route>
              <Route path="/newstore">
                <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar}  theme={selectedTheme} />
                <NewStore session={session} />
                <Footer theme={selectedTheme} />
              </Route>
              <Route path="/planes">
                <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar}  theme={selectedTheme} />
                <PlansPage session={session} />
                <Footer theme={selectedTheme} />
              </Route>
              <Route path="/not_found">
                <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar}  theme={selectedTheme}/>
                  <Notfound theme={selectedTheme} />
                <Footer theme={selectedTheme} />
              </Route>
              <Route path="/unavailable">
                <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar}  theme={selectedTheme}/>
                  <Unavailable theme={selectedTheme} />
                <Footer theme={selectedTheme} />
              </Route>
              <Route path="/:key">
                <Store setSession={setSession} session={session} car={car} setCar={setCar} />
              </Route>
              */}
              <Route path="/">
                <MainAppBar setSession={setSession} session={session} car={car} setCar={setCar}  theme={selectedTheme}/>
                <MainPage theme={selectedTheme} />
              </Route>
            </Switch>
            
        </div>
        
      </Router>

    </ThemeProvider>
  );
}

export default App;
