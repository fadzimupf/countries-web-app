import axiosClient from './axiosClient';

export const getWeatherForecast = () => axiosClient.get('/weatherforecast');
