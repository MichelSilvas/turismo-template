import React, { useEffect, useState } from 'react';
import getDetailItems from '../data/detailItens';
import { DetailType } from '../detail/detailType';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import HeaderSearch from '../headerSecondary/headerSearch';
import ItemHotel from '../itemHotel/itemHotel';

function HotelList({ navigation, route }: any) {
    const { title, categoryId, cabecalho } = route.params;
    const [menuItens, setMenuItens] = useState<DetailType[]>([]);

    const onPress = (item: DetailType) => {
        navigation.navigate('HotelDetail', {
            title: item.name,
            categoryId: item.categoryId,
            item: item,
        });
    };
    const [hotelItems, setHotelItems] = useState<DetailType[]>([]);
    const [valuesSearch, setValuesSearch] = useState('');

    useEffect(() => {
        async function getData() {
            let data = await getDetailItems(onPress);
            let filteredData = data
                .filter((e) => e.categoryId == categoryId)
                .sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
            setMenuItens(filteredData);
            setHotelItems(filteredData);
        }
        getData();
    }, [categoryId]);

    useEffect(() => {
        async function getData() {
            if (valuesSearch === '') {
                setHotelItems(menuItens);
            } else {
                let filteredData = menuItens
                    .filter((e) => e.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().includes(valuesSearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()))
                    .sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    });
                setHotelItems(filteredData);
            }
        }
        if (menuItens) {
            getData();
        }
    }, [valuesSearch]);

    const onFilter = (value: string): void => {
        setValuesSearch(value);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderSearch
                navigation={navigation}
                route={route}
                onFilter={(value: string) => onFilter(value)}
            />
            <View style={styles.main}>
                <FlatList
                    data={hotelItems}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => item.onPress(item)}
                            style={styles.listDetail}
                        >
                            <ItemHotel {...item}></ItemHotel>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item: { id: any }) => item.id.toString()}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: '6%',
        marginTop: '8%',
    },
    listDetail: {
        flex: 1,
        marginBottom: '7%',
    },
});

export default HotelList;
