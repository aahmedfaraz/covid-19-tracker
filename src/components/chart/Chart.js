import React, { useEffect, useContext } from 'react';
import styles from './Chart.module.css';
import { Line, Pie } from 'react-chartjs-2';
import { CircularProgress } from '@material-ui/core';
// Importing context
import globalContext from '../../context/global/globalContext';

const Chart = () => {

    const { current, data, chartLoading, globalReport, getGlobalReport} = useContext(globalContext);

    useEffect(() => {
        getGlobalReport();
    // eslint-disable-next-line
    }, []);

    const LineChart = () => (
        <Line
            data={{
                labels: globalReport.map(report => report.reportDate),
                datasets: [
                    {
                        label: 'Confirmed',
                        data: globalReport.map(report => report.confirmed),
                        fill: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        borderColor: 'rgba(0, 89, 255, 1)',
                    },
                    {
                        label: 'Deaths',
                        data: globalReport.map(report => report.deaths),
                        fill: true,
                        backgroundColor: 'rgba(255, 0, 0, 0.3)',
                        borderColor: 'rgba(255, 0, 0, 1)',
                    }
                ]
            }}
        />
    )
    
    const PieChart = () => (
        <Pie
            data={{
                labels: ['Confirmed', 'Recovered', 'Deaths'],
                datasets: [
                    {
                        label: 'Total people',
                        data: [data.confirmed, data.recovered, data.deaths],
                        fill: true,
                        backgroundColor: ['rgba(184, 78, 255, 0.6)', 'rgba(0, 216, 29, 0.6)','rgba(255, 74, 74, 0.6)'],
                        borderColor: ['rgba(184, 78, 255, 1)', 'rgba(0, 216, 29, 1)','rgba(255, 74, 74, 1)'],
                    },
                ],
            }}
        />
    )

    return (
        <div className={`${styles.container} ${current && styles.pieSettings}`}>
            {
                chartLoading && !globalReport ? (
                    <CircularProgress className={styles.progress} color="secondary" />
                ) : (
                    current ? <PieChart /> : <LineChart />
                )
            }
        </div>
    )
}

export default Chart;