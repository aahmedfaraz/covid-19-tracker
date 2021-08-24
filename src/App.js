import React, { Fragment } from 'react';
import './App.module.css'
// Importing State
import GlobalState from './context/global/GlobalState';
// Import Components
import { Header, Cards, Chart, CountryPicker } from './components';

const App = () => {
    return (
        <GlobalState>
            <Fragment>
                <Header />
                <CountryPicker />
                <Cards />
                <Chart />
            </Fragment>
        </GlobalState>
    )
}

export default App;