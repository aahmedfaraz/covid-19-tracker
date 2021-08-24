import React, { useContext, useEffect, Fragment } from 'react';
import styles from './Cards.module.css';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@material-ui/core';
import CountUp from 'react-countup';
import Moment from 'react-moment';
// Importing Context
import globalContext from '../../context/global/globalContext';

const Cards = () => {

    const { data:{confirmed, recovered, deaths, lastUpdate}, cardLoading, getData, current } = useContext(globalContext);

    useEffect(() => {
        getData(current ? current.alpha2code : "");
    // eslint-disable-next-line
    }, [current]);

    return (
        <div className={styles.container}>
            <Grid 
                container
                justifyContent="center"
                spacing={2}
            >
                <Grid item xs={12} md={3} component={Card} className={`${styles.card} ${styles.confirmed}`}>
                    <CardContent>
                        {
                            !cardLoading ? (
                                <Fragment>
                                    <Typography color="textSecondary" gutterBottom>Confirmed</Typography>
                                    <Typography variant="h5">
                                        <CountUp start={0} end={confirmed} duration={2} separator="," />
                                    </Typography>
                                    <Typography color="textSecondary">
                                        <Moment>{lastUpdate}</Moment>
                                    </Typography>
                                    <Typography variant="body2">Number of active cases of COVID-19</Typography>
                                </Fragment>
                            ) : <CircularProgress />
                        }
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={3} component={Card} className={`${styles.card} ${styles.recovered}`}>
                    <CardContent>
                        {
                            !cardLoading ? (
                                <Fragment>
                                    <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                                    <Typography variant="h5">
                                        <CountUp start={0} end={recovered} duration={2} separator="," />
                                    </Typography>
                                    <Typography color="textSecondary">
                                        <Moment>{lastUpdate}</Moment>
                                    </Typography>
                                    <Typography variant="body2">Number of recoveries from COVID-19</Typography>
                                </Fragment>
                            ) : <CircularProgress />
                        }
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={3} component={Card} className={`${styles.card} ${styles.deaths}`}>
                    <CardContent>
                        {
                            !cardLoading ? (
                                <Fragment>
                                    <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                                    <Typography variant="h5">
                                        <CountUp start={0} end={deaths} duration={2} separator="," />
                                    </Typography>
                                    <Typography color="textSecondary">
                                        <Moment>{lastUpdate}</Moment>
                                    </Typography>
                                    <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                                </Fragment>
                            ) : <CircularProgress />
                        }
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;
