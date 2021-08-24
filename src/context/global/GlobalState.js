import React, {useReducer} from 'react';
import axios from 'axios';
import globalContext from './globalContext';
import globalReducer from './globalReducer';
import { GET_DATA, GET_COUNTRIES, SET_CARD_LOADING, SET_LIST_LOADING, SET_CURRENT_COUNTRY, SET_CHART_LOADING, GET_GLOBAL_REPORT } from "../types";

const GlobalState = props => {
    const initialState = {
        data: {},
        globalReport: null,
        countries: null,
        current: null,
        cardLoading: true,
        listLoading: true,
        chartLoading: true,
    }

    const [state, dispatch] = useReducer(globalReducer, initialState);

    // Function to get global or country data
    const getData = async countryCode => {
        setCardLoading(true);
        // setting url
        const url = `https://covid-19-data.p.rapidapi.com/${countryCode === "" ? 'totals' : 'country/code'}`;
        // setting options
        const options = {
            headers: {
              'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
              'x-rapidapi-key': '2ff5d441b3msh027a92a261ae509p1bac58jsn1206ca86cdeb'
            }
        }
        if(countryCode !== ""){
            options.params = {
                code: countryCode
            }
        }
        // fetching data
        try {
            const {data} = await axios.get(url, options);

            const {confirmed, recovered, deaths, lastUpdate} = await data[0];

            const modifiedData = {
                confirmed,
                recovered,
                deaths,
                lastUpdate
            }

            dispatch({type: GET_DATA, payload: modifiedData});
        } catch (error) {
            console.log(error);
            setCardLoading(false);
        }
    }

    // Function to get list of all countries
    const getCountries = async () => {
        setListLoading(true);
        try {
            const {data} = await axios.get('https://covid-19-data.p.rapidapi.com/help/countries',{
                headers: {
                  'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
                  'x-rapidapi-key': '2ff5d441b3msh027a92a261ae509p1bac58jsn1206ca86cdeb'
                }
            })
            dispatch({
                type: GET_COUNTRIES,
                payload: data.map(({name, alpha2code}) => ({name,alpha2code}))
            })
        } catch (error) {
            console.log(error);
            setListLoading(false);
        }
    }
    
    // Function to get global report
    const getGlobalReport = async () => {
        setChartLoading(true);
        try {
            const { data } = await axios.get('https://covid19.mathdro.id/api/daily');
            dispatch({
                type: GET_GLOBAL_REPORT,
                payload: data.map(({confirmed, deaths, reportDate}) => ({
                    confirmed: confirmed.total,
                    deaths: deaths.total,
                    reportDate
                }))
            })
        } catch (error) {
            console.log(error);
            setChartLoading(false);
        }
    }

    // Function to set current country
    const setCurrentCountry = value => {
        if(value !== ""){
            dispatch({type: SET_CURRENT_COUNTRY, payload: {
                name: value.split(':')[0],
                alpha2code: value.split(':')[1]
            }})
        } else {
            dispatch({type: SET_CURRENT_COUNTRY, payload: null})
        }
    }

    // Function to set card loading
    const setCardLoading = (value) => dispatch({type: SET_CARD_LOADING, payload: value});

    // Function to set list loading
    const setListLoading = (value) => dispatch({type: SET_LIST_LOADING, payload: value});

    // Function to set chart loading
    const setChartLoading = (value) => dispatch({type: SET_CHART_LOADING, payload: value});

    return (
        <globalContext.Provider
            value={{
                data: state.data,
                current: state.current,
                globalReport: state.globalReport,
                countries: state.countries,
                cardLoading: state.cardLoading,
                listLoading: state.listLoading,
                chartLoading: state.chartLoading,
                getData: getData,
                getCountries: getCountries,
                setCurrentCountry: setCurrentCountry,
                getGlobalReport: getGlobalReport
            }}
        >
            {props.children}
        </globalContext.Provider>
    )
}

export default GlobalState;