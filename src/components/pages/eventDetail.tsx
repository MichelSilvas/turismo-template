import React, { useRef } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Share } from 'react-native';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, PinMapIcon, ShareIcon } from '../Icons';
import { NoImage } from '../../theme/images';
import fonts from '../../theme/fonts';
import metrics from '../../theme/metrics';
import colors from '../../theme/colors';
import Image from '../image';

function EventDetail({ navigation, route }: any) {
    const { item, categoryId, cabecalho } = route.params;

    const onShare = async () => {
        try {
            await Share.share({
                title: item.name,
                message: `${item.name}\n${item.date.format('LL')} às ${
                    item.openingHours
                }\n\nPara mais informações sobre o evento, baixe nosso aplicativo na Loja (link)`,
                url: item.mainImage,
            });
        } catch (err) {
            console.log(err);
        }
    };

    const InfoLine = (icon: JSX.Element, text: string, info: string) => {
        return (
            <View style={styles.textSubDetailInfo}>
                {icon}
                <Text style={styles.textSubDetail}>
                    <Text style={{ fontFamily: fonts.weight.subtitle600 }}>{info}: </Text>
                    {text}
                </Text>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imgContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.goBackTouch}
                    activeOpacity={0.7}
                >
                    <View style={styles.bgIcon}>
                        <ArrowLeftIcon sizeMultiplier={0.06} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareTouch} activeOpacity={0.7} onPress={onShare}>
                    <View style={styles.bgIcon}>
                        <ShareIcon sizeMultiplier={0.06} />
                    </View>
                </TouchableOpacity>
                <Image
                    style={styles.imgEvent}
                    source={{uri: item.mainImage}}
                />
            </View>
            <View style={styles.content}>
                <View style={styles.headerDescription}>
                    <Text style={styles.textTitle}>{item.name}</Text>
                    {InfoLine(
                        <CalendarIcon sizeMultiplier={0.06} fill={'#00DD84'} />,
                        item.date.format('LL'),
                        'Data'
                    )}
                    {InfoLine(
                        <ClockIcon sizeMultiplier={0.06} fill={'#00DD84'} />,
                        item.openingHours,
                        'Horário'
                    )}
                    {InfoLine(
                        <PinMapIcon sizeMultiplier={0.06} fill={'#00DD84'} />,
                        item.location.address,
                        'Local'
                    )}
                </View>
                <View style={styles.description}>
                    <Text style={styles.textDescription}>{item.detailedDescription}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    goBackTouch: {
        position: 'absolute',
        top: '4%',
        left: '4%',
        width: metrics.screenWidth * 0.105,
        height: metrics.screenWidth * 0.105,
        backgroundColor: '#00DD84',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
    bgIcon: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shareTouch: {
        position: 'absolute',
        top: '4%',
        right: '4%',
        width: metrics.screenWidth * 0.105,
        height: metrics.screenWidth * 0.105,
        backgroundColor: '#00DD84',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
    imgContainer: {
        position: 'relative',
        height: metrics.screenHeight * 0.5,
        width: '100%',
        overflow: 'hidden',
    },
    imgEvent: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    content: {
        paddingHorizontal: '5%',
    },
    headerDescription: {
        borderBottomWidth: 1,
        borderColor: '#C4C4C4',
        marginVertical: '6%',
        paddingBottom: '6%',
    },
    textTitle: {
        color: colors.textHotelName,
        fontFamily: fonts.weight.text500,
        fontSize: fonts.size.font20,
    },
    description: {
        paddingHorizontal: '5%',
    },
    textDescription: {
        textAlign: 'justify',
        fontSize: fonts.size.font16,
        fontFamily: fonts.weight.text400,
        color: colors.textDescriptionHotel,
    },
    textSubDetailInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    textSubDetail: {
        fontSize: fonts.size.font18,
        fontFamily: fonts.weight.text400,
        marginLeft: 7,
    },
});

export default EventDetail;
