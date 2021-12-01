import React, { useEffect, useState } from 'react';
import getDetailItems from '../data/detailItens';
import { DetailType } from '../detail/detailType';
import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    BackHandler,
} from 'react-native';
import CustomHeader from '../headerSecondary/customHeader';
import TouristAttractionItem from './touristAttractionItem';
import { ListDivider } from '../listDivider';

function TouristAttraction({ navigation, route }: any) {
    const [isOnDetail, setIsOnDetail] = useState(false);
    const [isFromQrCode, setIsfromQrCode] = useState(false);
    const { id, categoryId = 4, cabecalho } = route.params;
    const [detailItem, setDetailItem] = useState<DetailType | null>();
    const [menuItens, setMenuItens] = useState<DetailType[]>([]);
    const [attractionItens, setAttractionIens] = useState<DetailType[]>([]);
    const [hardwareBack, setHardwareBack] = useState(false);
    const [valuesSearch, setValuesSearch] = useState('');

    const onFilter = (value: string): void => {
        setValuesSearch(value);
    };

    useEffect(() => {
        async function getData() {
            if (valuesSearch === '') {
                setAttractionIens(menuItens);
            } else {
                let filteredData = menuItens
                    .filter((e) => e.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().includes(valuesSearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()))
                    .sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    });
                    setAttractionIens(filteredData);
            }
        }
        if (menuItens) {
            getData();
        }
    }, [valuesSearch]);

    useEffect(() => {
        if (hardwareBack) {
            if (isOnDetail) {
                backToListFromDetail();
            } else {
                navigation.navigate('Home');
            }
            setHardwareBack(false);
        }
    }, [hardwareBack]);

    useEffect(() => {
        if (id) {
            setIsOnDetail(true);
            setIsfromQrCode(true);
            setUniqueData();
        } else {
            getData();
        }
        async function setUniqueData() {
            let data = await getDetailItems(setSelectedItem);
            let filteredData = data.filter((e) => e.categoryId == categoryId && e.id == id);
            setDetailItem(filteredData[0]);
        }
        async function getData(idItem?: number) {
            let data = await getDetailItems(setSelectedItem);
            let filteredData = data.filter((e) => e.categoryId == categoryId);
            if (idItem) {
                filteredData = filteredData.filter((e) => e.id == idItem);
            }
            setMenuItens(filteredData);
            setAttractionIens(filteredData);
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            setHardwareBack(true);
            return true;
        });

        return () => backHandler.remove();
    }, [id, categoryId]);

    const setSelectedItem = (item: DetailType) => {
        setIsOnDetail(true);
        setDetailItem(item);
    };

    function backToListFromDetail() {
        if (isFromQrCode) {
            navigation.navigate('Home');
        } else {
            setIsOnDetail(false);
            setDetailItem(null);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {detailItem ? (
                <TouristAttractionItem
                    {...detailItem}
                    goBack={backToListFromDetail}
                    navigation={navigation}
                    fromQrCode={id !== null}
                    isOnDetail={isOnDetail}
                ></TouristAttractionItem>
            ) : (
                <>
                    <CustomHeader
                        navigation={navigation}
                        route={route}
                        qtdToBack={isFromQrCode ? 2 : 0}
                        onFilter={(value: string) => onFilter(value)}
                    />
                    <View style={styles.main}>
                        <FlatList
                            data={attractionItens}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => item.onPress(item)}>
                                    <TouristAttractionItem
                                        {...item}
                                        goBack={backToListFromDetail}
                                        navigation={navigation}
                                        key={index}
                                        fromQrCode={isFromQrCode}
                                        isOnDetail={isOnDetail}
                                    ></TouristAttractionItem>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item: { id: any }) => item.id.toString()}
                            ItemSeparatorComponent={() => <ListDivider />}
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginVertical: '3%',
        paddingHorizontal: '5%',
        marginTop: '8%',
    },
});

export default TouristAttraction;
