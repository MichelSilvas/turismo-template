import React, { useEffect, useState } from 'react';
import getDetailItems from '../data/detailItens';
import { DetailType } from '../detail/detailType';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    Alert,
    Linking,
    TouchableOpacity,
} from 'react-native';
import Image from '../image';
import { createOpenLink } from 'react-native-open-maps';
import { ListDivider } from '../listDivider';
import { NoImage } from '../../theme/images';
import HeaderSearch from '../headerSecondary/headerSearch';
import metrics from '../../theme/metrics';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import Btn from '../button/button';

function RestaurantList({ navigation, route }: any) {
    const { title, categoryId, cabecalho } = route.params;
    const [restaurantItems, setRestaurantItems] = useState<DetailType[]>([]);
    const [valuesSearch, setValuesSearch] = useState('');
    const [menuItens, setMenuItens] = useState<DetailType[]>([]);

    const onPress = (item: DetailType) => {
        navigation.navigate(item.redirectTo, {
            title: item.name,
            categoryId: item.categoryId,
            item: item,
        });
    };

    useEffect(() => {
        async function getData() {
            let data = await getDetailItems(onPress);
            let filteredData = data.filter((e) => e.categoryId == categoryId);
            setMenuItens(filteredData);
            setRestaurantItems(filteredData);
        }
        getData();
    }, [categoryId]);

    useEffect(() => {
        if (valuesSearch === '') {
            menuItens
                .filter((e) => e.categoryId == categoryId)
                .sort(function (a, b) {
                    return a.type.localeCompare(b.type);
                });
        } else {
            setRestaurantItems(
                menuItens
                    .filter(
                        (e) =>
                            e.type.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().includes(valuesSearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()) ||
                            e.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().includes(valuesSearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase())
                    )
                    .sort(function (a, b) {
                        return a.type.localeCompare(b.type);
                    })
            );
        }
    }, [valuesSearch]);

    const onPressPhone = () => {
        Alert.alert('Ligar para o Hotel', 'Deseja realizar essa ligação?', [
            {
                text: 'Ligar',
                onPress: () =>
                    Linking.openURL(`tel:0${menuItens[0].phoneNumber.replace(/\D/g, '')}`),
                style: 'default',
            },
            { text: 'Cancelar', onPress: () => {} },
        ]);
        return;
    };

    const onPressBtn = (location: any) => {
        const openMap = location.address
            ? createOpenLink({ query: `${location.address} - Santa fé do Sul` })
            : createOpenLink({ query: `${location.latitude}, ${location.longitude}` });

        return openMap();
    };

    const Item = ({
        mainImage,
        name,
        type,
        operation,
        openingHours,
        phoneNumber,
        location,
    }: any) => (
        <View>
            <View style={styles.logoContainer}>
                <Image style={styles.tinyLogo} source={{ uri: mainImage }} />
            </View>
            <View style={styles.textContent}>
                <Text style={styles.textName}>{name}</Text>
                <Text style={styles.textType}>{type}</Text>
                <TouchableOpacity onPress={onPressPhone}>
                    <Text style={styles.text}>
                        <Text style={styles.detailText}>Telefone: </Text>
                        {phoneNumber}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.text}>
                    <Text style={styles.detailText}>Endereço: </Text>
                    {location.address}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.detailText}>Funcionamento: </Text>
                    {operation}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.detailText}>Horário: </Text>
                    {openingHours}
                </Text>
            </View>
            <View style={styles.btnContainer}>
                <Btn
                    title="Como Chegar"
                    color={colors.buttonRestaurants}
                    onPress={() => onPressBtn(location)}
                />
            </View>
        </View>
    );

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
                    data={restaurantItems}
                    renderItem={({ item }) => (
                        <Item
                            mainImage={item.mainImage}
                            name={item.name}
                            type={item.type}
                            operation={item.operation}
                            openingHours={item.openingHours}
                            phoneNumber={item.phoneNumber}
                            location={item.location}
                        />
                    )}
                    keyExtractor={(item: { id: any }) => item.id.toString()}
                    ItemSeparatorComponent={() => <ListDivider />}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: '8%',
        paddingHorizontal: '6%',
    },
    logoContainer: {
        height: metrics.screenWidth * 0.78,
        width: '100%',
        borderRadius: metrics.screenWidth * 0.08,
        overflow: 'hidden',
    },
    tinyLogo: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    textContent: {
        marginVertical: '3%',
    },
    text: {
        color: colors.textDescriptionHotel,
        fontSize: fonts.size.font16,
        fontFamily: fonts.weight.text400,
    },
    textName: {
        color: colors.touristAttraction.textName,
        fontFamily: fonts.weight.text500,
        fontSize: fonts.size.font24,
    },
    textType: {
        color: colors.tagRestaurants,
        fontFamily: fonts.weight.subtitle600,
        fontSize: fonts.size.font16,
        marginBottom: '3%',
    },
    detailText: {
        fontFamily: fonts.weight.title700,
    },
    btnContainer: {
        height: metrics.screenHeight * 0.09,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5%',
    },
});

export default RestaurantList;
