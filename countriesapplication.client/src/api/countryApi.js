import axiosClient from './axiosClient';

export const getCountries = () => axiosClient.get('/countries');

export const getCountryByName = (name) => axiosClient.get(`/countries/${name}`);