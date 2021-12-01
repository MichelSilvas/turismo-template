import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import Image from '../image';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import metrics from '../../theme/metrics';
import getDetailItems from '../data/detailItens';
import { DetailType } from '../detail/detailType';
import HeaderSecondary from '../headerSecondary/headerSecondary';

function AboutCity({ navigation, route }: any) {
    const { title, categoryId, cabecalho } = route.params;
    const [menuItem, setMenuItem] = useState<DetailType>();
    const [activeSlide, setActiveSlide] = useState(0);

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
            let filteredData = data.filter((e) => e.categoryId == categoryId)[0];
            setMenuItem(filteredData);
        }
        getData();
    }, [categoryId]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderSecondary navigation={navigation} route={route} />
            <ScrollView contentContainerStyle={styles.main}>
                {menuItem && (
                    <>
                        <Carousel
                            data={menuItem.photos}
                            renderItem={({ item }) => (
                                <View style={styles.imgContainer}>
                                    <Image style={styles.tinyLogo} source={{ uri: item.photo }} />
                                </View>
                            )}
                            onSnapToItem={(index) => setActiveSlide(index)}
                            sliderWidth={metrics.screenWidth * 0.9}
                            itemWidth={metrics.screenWidth * 0.9}
                            loop
                        />
                        <Pagination
                            dotsLength={menuItem.photos.length}
                            activeDotIndex={activeSlide}
                            dotStyle={styles.dotStyle}
                            inactiveDotStyle={styles.inactiveDotStyle}
                            inactiveDotOpacity={1}
                            inactiveDotScale={0.8}
                        />
                        <View style={styles.detailDescription}>
                            <Text
                                style={{
                                    textAlign: 'justify',
                                    marginTop: -metrics.screenHeight * 0.08,
                                    marginBottom: -metrics.screenHeight * 0.2,
                                }}
                            >
                                {menuItem.detailedDescription.split('/p').map((txt, index) => {
                                    return (
                                        <Text key={index}>
                                            <Text style={styles.textTitleDescription}>
                                                {'\n'}
                                                {'\n'}
                                                {txt.split('/t')[0].trim()}
                                                {'\n'}
                                            </Text>
                                            <Text style={styles.textDescription}>
                                                {txt.split('/t')[1].trim()}
                                            </Text>
                                        </Text>
                                    );
                                })}
                            </Text>
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        padding: '5%',
    },
    imgContainer: {
        width: metrics.screenWidth * 0.9,
        height: metrics.screenWidth * 0.9,
        alignSelf: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: metrics.screenWidth * 0.09,
    },
    tinyLogo: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    dotStyle: {
        width: 70,
        height: 10,
        borderRadius: 10,
        backgroundColor: colors.dotStyleColorCity,
    },
    inactiveDotStyle: {
        width: 10,
        height: 10,
    },
    detailDescription: {
        marginHorizontal: '3%',
    },
    textTitleDescription: {
        fontFamily: fonts.weight.title700,
        fontSize: fonts.size.font20,
        color: colors.textDescriptionHotel,
    },
    textDescription: {
        fontFamily: fonts.weight.text400,
        fontSize: fonts.size.font16,
        lineHeight: metrics.screenWidth * 0.075,
        color: colors.textDescriptionHotel,
    },
});

export default AboutCity;
