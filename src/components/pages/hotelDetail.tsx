import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Alert,
    Linking,
    Modal,
} from 'react-native';
import Image from '../image';
import { DetailType } from '../detail/detailType';
import { ArrowLeftIcon, CloseIcon, MapIcon, PhoneIcon } from '../Icons';
import { createOpenLink } from 'react-native-open-maps';
import getDetailItems from '../data/detailItens';
import fonts from '../../theme/fonts';
import metrics from '../../theme/metrics';
import colors from '../../theme/colors';
import { NoImage } from '../../theme/images';

function HotelDetail({ navigation, route }: any) {
    const [altura, setAltura] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [photoId, setPhotoId] = useState(0);

    const { item, categoryId, cabecalho } = route.params;
    const onPress = (item: DetailType) => {
        navigation.navigate(item.redirectTo, {
            title: item.name,
            categoryId: item.categoryId,
            item: item,
        });
    };

    useEffect(() => {
        const { otoItem } = route.params;
    }, []);

    const menuItens: DetailType[] = [
        {
            id: item['id'],
            categoryId: item['categoryId'],
            name: item['name'],
            type: item['type'],
            phoneNumber: item['phoneNumber'],
            operation: item['operation'],
            openingHours: item['openingHours'],
            detailedDescription: item['detailedDescription'],
            onPress: item['onPress'],
            mainImage: item['mainImage'],
            redirectTo: item['redirectTo'],
            date: item['date'],
            location: item['location'],
            photos: item['photos'],
            startDate: item['startDate'],
            jsonExtraServices: item['jsonExtraServices'],
            dailyRate: item['']
        },
    ];

    const renderRow = ({ item }: any) => {
        return (
            <>
                <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                        setModalVisible(true);
                        setPhotoId(item.id);
                    }}
                >
                    <Image style={styles.tinyLogoList} source={{ uri: item.photo }} />
                </TouchableOpacity>
                <Modal
                    animationType="fade"
                    visible={modalVisible}
                    hardwareAccelerated
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={() => setModalVisible(false)}
                    >
                        <CloseIcon />
                    </TouchableOpacity>
                    <FlatList
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={menuItens[0].photos}
                        initialScrollIndex={photoId}
                        onScrollToIndexFailed={() => {}}
                        renderItem={({ item }) => (
                            <View style={styles.modalContent}>
                                <Image
                                    style={{
                                        width: metrics.screenWidth,
                                        height: metrics.screenHeight,
                                        resizeMode: 'contain',
                                    }}
                                    source={{ uri: item.photo }}
                                />
                            </View>
                        )}
                        keyExtractor={(item: { id: any }) => item.id.toString()}
                    />
                </Modal>
            </>
        );
    };

    function find_dimesions(layout: { x: any; y: any; width: any; height: any }) {
        const { x, y, width, height } = layout;
        setAltura(height);
    }

    const onPressMap = (location: any) => {
        const openMap = location.address
            ? createOpenLink({ query: `${location.address} - Santa fé do Sul` })
            : createOpenLink({ query: `${location.latitude}, ${location.longitude}` });

        return openMap();
    };

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

    return (
        <ScrollView style={styles.main}>
            <View style={styles.imgContainer}>
                <Image style={styles.tinyLogo} source={{ uri: item.mainImage }} />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.goBackTouch}
                    activeOpacity={0.5}
                >
                    <ArrowLeftIcon sizeMultiplier={0.06} />
                </TouchableOpacity>
            </View>
            <View
                style={stylesBanner(altura).detailHotel}
                onLayout={(event) => {
                    find_dimesions(event.nativeEvent.layout);
                }}
            >
                <View style={styles.subDetailHotel}>
                    <Text style={styles.textTitle}>{menuItens[0].name}</Text>
                    <TouchableOpacity onPress={onPressPhone}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.iconsDetail}>
                                <PhoneIcon sizeMultiplier={0.04} fill={'#00DD84'} />
                            </View>
                            <Text style={styles.textSubDetail}>
                                <Text style={{ fontFamily: fonts.weight.title700 }}>
                                    Telefone:{' '}
                                </Text>
                                {menuItens[0].phoneNumber}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => onPressMap(menuItens[0].location)}>
                    <MapIcon sizeMultiplier={0.16} fill="currentColor" />
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.detailPhotos}>
                    <FlatList
                        horizontal={true}
                        data={menuItens[0].photos}
                        renderItem={renderRow}
                        keyExtractor={(item: { id: any }) => item.id.toString()}
                    />
                </View>
                <View style={styles.detailDescription}>
                    <Text style={styles.textDescription}>{item.detailedDescription}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    goBackTouch: {
        position: 'absolute',
        top: '8%',
        left: '3%',
        width: metrics.screenWidth * 0.1,
        height: metrics.screenWidth * 0.1,
        backgroundColor: '#00DD84',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
    imgContainer: {
        position: 'relative',
        height: metrics.screenWidth * 0.9,
        width: metrics.screenWidth,
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
    },
    tinyLogoList: {
        width: metrics.screenHeight * 0.15,
        height: metrics.screenHeight * 0.15,
        marginHorizontal: 10,
        borderRadius: 24,
    },
    detailPhotos: {
        marginTop: '-10%',
        marginBottom: '5%',
        paddingHorizontal: 20,
    },
    detailDescription: {
        paddingHorizontal: '5%',
    },
    textTitle: {
        color: colors.textHotelName,
        fontFamily: fonts.weight.title700,
        fontSize: fonts.size.font18,
        paddingBottom: '5%',
    },
    subDetailHotel: {
        maxWidth: '75%',
    },
    textSubDetail: {
        color: colors.textSubDetailHotel,
        fontFamily: fonts.weight.text400,
        fontSize: fonts.size.font14,
    },
    textDescription: {
        textAlign: 'justify',
        fontSize: fonts.size.font16,
        fontFamily: fonts.weight.text400,
        color: colors.textDescriptionHotel,
    },
    iconsDetail: {
        marginRight: '4%',
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    closeIcon: {
        position: 'absolute',
        top: '5%',
        right: '5%',
        zIndex: 999,
    },
});

const stylesBanner = (props: any) =>
    StyleSheet.create({
        detailHotel: {
            flexDirection: 'row',
            borderRadius: metrics.screenWidth * 0.05,
            minHeight: metrics.screenHeight * 0.01,
            backgroundColor: colors.backgroudDetailHotel,
            transform: [{ translateY: -(props / 2) }],
            width: '85%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingVertical: '5%',
            paddingHorizontal: '2%',
            marginLeft: 'auto',
            marginRight: 'auto',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
        },
    });

export default HotelDetail;
