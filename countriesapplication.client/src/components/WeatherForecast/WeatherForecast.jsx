import { useEffect, useState } from 'react';
import { getWeatherForecast } from '../../api/weatherApi';
import './WeatherForecast.css';

function WeatherForecast() {
    const [forecasts, setForecasts] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getWeatherForecast();
                setForecasts(response.data);
            } catch (err) {
                setError('Failed to load weather data.');
                console.error(err);
            }
        }

        fetchData();
    }, []);

    if (error) return <p>{error}</p>;
    if (!forecasts) return <p>Loading...</p>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default WeatherForecast;