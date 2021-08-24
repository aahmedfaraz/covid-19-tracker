import React, { useEffect, useContext } from 'react';
import styles from './CountryPicker.module.css';
import img from '../../assets/images/globe.png'
import { FormControl, NativeSelect, FormHelperText, Grid } from '@material-ui/core';
// Importing Context
import globalContext from '../../context/global/globalContext';

const CountryPicker = () => {

    const { countries, listLoading, getCountries, current, setCurrentCountry } = useContext(globalContext)

    useEffect(() => {
        setTimeout(() => {
            getCountries();
            // setting timeout due to API rate limit (1 request per second > https://rapidapi.com/Gramzivi/api/covid-19-data/)
        }, 1500);
    // eslint-disable-next-line
    }, []);

    return (
        <Grid 
            container
            alignItems="center"
            justifyContent="center"
            className={styles.container}
        >
            <Grid item component={FormControl} xs={12} md={4}>
                <NativeSelect onChange={ e => setCurrentCountry(e.target.value)}>
                    <option value="">Global</option>
                    {
                        !listLoading && countries !== null ? (
                            countries.map((country, index) => <option key={index} value={`${country.name}:${country.alpha2code}`}>{country.name}</option>)
                        ): <option value="">Loading...</option>
                    }
                </NativeSelect>
                <FormHelperText>Search Globally or Country wise</FormHelperText>
            </Grid>
            <Grid item>
                {
                    current ? (
                        <img className={styles.flag} src={`https://www.countryflags.io/${current.alpha2code}/flat/64.png`} alt={`${current.name}'s Flag`} />
                    ):(
                        <img className={styles.flag} src={img} alt="Globe" />
                    )
                }
            </Grid>
        </Grid>
    )
}

export default CountryPicker;