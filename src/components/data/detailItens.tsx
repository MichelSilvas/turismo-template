import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { DetailType, DetailEventsType } from '../detail/detailType';
import Data from '../../services/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getDetailItems(onPress: (id: DetailType) => void): Promise<DetailType[]> {

    var dataStorage = await AsyncStorage.getItem('@sfds_data');

    return Data()
        .then((response) => response.text())
        .then((text) => 
        {
            let dataService = (text && JSON.parse(text)).map((item: DetailType) => {
                item.startDate = moment(item.startDate);
                item.onPress = () => onPress(item);
                item.date = moment(item.date);

                return item;
            });

            if (dataStorage !== null && dataStorage !== '' && dataStorage.length > 0) {
                let listDataStorage = JSON.parse(dataStorage);
                let atualizedList = listDataStorage
                    .filter((item: DetailType) => {
                        return !item.endDate;
                    })
                    .map((item: DetailType) => {
                        let itemFromService = dataService.filter(
                            (f: DetailType) => f.id === item.id && f.categoryId === item.categoryId
                        );
                        if (itemFromService.length >= 1) {
                            itemFromService[0].startDate = moment(item.startDate);
                            itemFromService[0].date = moment(item.date);
                            return itemFromService[0];
                        }
                        item.startDate = moment(item.startDate);
                        item.onPress = () => onPress(item);
                        item.date = moment(item.date);
                        return item;
                    });

                dataService.map((item: DetailType) => {
                    let itemFromStorage = listDataStorage.some(
                        (f: DetailType) => f.id === item.id && f.categoryId === item.categoryId
                    );
                    if (!itemFromStorage) {
                        item.startDate = moment(item.startDate);
                        item.date = moment(item.date);
                        atualizedList.push(item);
                        return item;
                    }
                    return false;
                });

                dataService = atualizedList.filter((item: DetailType) => {
                    return !item.endDate;
                });
            }

            AsyncStorage.setItem('@sfds_data', JSON.stringify(dataService));
            return dataService;
        })
        .catch((error) => {
            console.error(error);

            if (dataStorage !== null && dataStorage !== '' && dataStorage.length > 0)
                return JSON.parse(dataStorage);

            return [];
        });
}

export default getDetailItems;
