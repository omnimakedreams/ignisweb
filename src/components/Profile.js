
import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
    },
  }));
export default function Register() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    return (
        <div className={classes.root} style={{
            marginTop: 10,
            width: '100%'
        }}>
        <AppBar position="static" color="default" style={{ width: '100%'}} elevation={0}>
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            style={{ width: '100%'}}
            >
            <Tab icon={<PersonIcon color="primary" />} label="Mi perfil" {...a11yProps(0)} />
            <Tab icon={<HomeIcon color="primary" />} label="Mi dirección" {...a11yProps(1)} />
            <Tab icon={<LockIcon color="primary" />} label="Seguridad" {...a11yProps(2)} />
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
            style={{ height: 600 }}
        >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        dehiekr80@gmail.com
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                Mi dirección
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                Seguridad
            </TabPanel>
        </SwipeableViews>
     </div>
    );
}