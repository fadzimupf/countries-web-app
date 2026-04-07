import axiosClient from './axiosClient';

export const getCountries = () => axiosClient.get('/countries');

export const getCountryById = (id) => axiosClient.get(`/countries/${id}`);