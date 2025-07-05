import Container from '@mui/material/Container';
import React from 'react'
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import Carousel from './Carousel';

const useStyles = makeStyles()((theme) => {
  return {
    banner: {
      
      height: 450,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    bannerContent: {
      height: 400,
      display: "flex",
      flexDirection: "column",
      paddingTop: 25,
      justifyContent: "space-around",
    },
    tagline: {
      display: "flex",
      height: "40%",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    },
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
  };
});

const Banner = () => {
    const {classes} = useStyles();
  return (
    <>
      <div className={classes.banner}>
        <Container className={classes.bannerContent}>
          <div className={classes.tagline}>
            <Typography variant="h2" style={{fontWeight: "bold", marginBottom: 15, fontFamily: "Montserrat"}}>
              Crypto Tracker
            </Typography>
            <Typography variant="subtitle2" style={{color: "darkgrey", textTransform: "capitalize"}}>
              Get all the Info regarding your favorite Crypto Currency
            </Typography>
          </div>
          <Carousel/>
        </Container>
      </div>
    </>
  );
};

export default Banner