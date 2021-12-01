import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Image, Alert, Linking } from 'react-native';
import { CarouselItem } from '../Carousel/carouselItem';
import Carousel from 'react-native-snap-carousel';
import metrics from '../../theme/metrics';
import Header from '../header/header';
import ItemMenu, { ItemMenuType } from '../itemMenu/itemMenu';
import getDetailItems from '../data/detailItens';
import { DetailType } from '../detail/detailType';
import getMenuItems from '../data/menuItens';
import { CITY_NEWS_URL } from '@env';

function Home({ navigation, route }: any) {
    const { initialUrl } = route.params;
    const [bannerItens, setBannerItens] = useState<DetailType[]>();
    const [cityInfo, setCityInfo] = useState<DetailType>();

    const onPressItem = (item: DetailType) => {
    };
    const categoryIdBanner = 10;
    const categoryIdCity = 5;

    useEffect(() => {
        if (initialUrl) {
            navigation.navigate('QRCodeReader', { initialUrl: initialUrl });
        }
    
        getDetailItems(onPressItem)
        .then((data) => {
            let filteredData = data.filter((e) => e.categoryId == categoryIdBanner);
            setBannerItens(filteredData); 
            setCityInfo(data.filter((e) => e.categoryId == categoryIdCity)[0])
        });
    }, [initialUrl]);

    const onPress = (item: ItemMenuType) => {
        if (item.name === 'turismo-help') {
            Alert.alert('Atendimento ao turista', 'Deseja realizar essa ligação?', [
                {
                    text: 'Ligar',
                    onPress: () => Linking.openURL(`tel:${cityInfo?.phoneNumber.replace(/\D/g, '')}`),
                    style: 'default',
                },
                { text: 'Cancelar', onPress: () => {} },
            ]);
            return;
        }

        if (item.name === 'noticias') {
            Alert.alert('Portal', 'Deseja acessar o Portal Oficial?', [
                {
                    text: 'Acessar',
                    onPress: () => Linking.openURL(`${CITY_NEWS_URL}`),
                    style: 'default',
                },
                { text: 'Cancelar', onPress: () => {} },
            ]);
            return;
        }

        navigation.navigate(item.redirectTo, {
            title: item.title,
            categoryId: item.categoryId,
            cabecalho: item.cabecalho,
        });
    };
    const menuItens = getMenuItems(onPress);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <View style={styles.main}>
                {menuItens?.map((item, key) => {
                    return <ItemMenu key={key} {...item} />;
                })}
            </View>
            {bannerItens &&
            <View style={styles.banner}>
                <Carousel
                    data={bannerItens[0].photos}
                    renderItem={({ item }) => <CarouselItem item={item} />}
                    sliderWidth={metrics.screenWidth * 0.85}
                    itemWidth={metrics.screenWidth * 0.85}
                    loop
                    autoplay
                    autoplayInterval={6000}
                />
            </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginVertical: '1%',
    },
    banner: {
        width: metrics.screenWidth * 0.85,
        height: metrics.screenHeight * 0.18,
        alignSelf: 'center',
        borderRadius: metrics.screenWidth * 0.02,
        overflow: 'hidden',
    },
});

export default Home;
