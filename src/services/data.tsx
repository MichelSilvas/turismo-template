import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

function Data(): Promise<Response> {
    return AsyncStorage.getItem('@sfds_lastDate')
    .then((date) => {
        let url = `${API_URL}${date || ''}`;

        return fetch(url, { method: 'GET' })
            .then((response) => {
                AsyncStorage.setItem('@sfds_lastDate', new Date().toISOString().split('T')[0]);
                return response;
            })
            .catch((error) => {
                console.info('error on fetch: ', error);
                return error;
            });
    });
}

export default Data;
