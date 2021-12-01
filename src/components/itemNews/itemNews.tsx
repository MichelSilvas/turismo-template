import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Image from '../image';
import metrics from '../../theme/metrics';
import { DetailType } from '../detail/detailType';
import fonts from '../../theme/fonts';

function ItemNews(props: DetailType) {
    return (
        <View style={styles.main}>
            <View style={styles.imgContainer}>
                <Image style={styles.tinyLogo} source={{ uri: props.mainImage }} />
            </View>
            <View style={styles.details}>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>{props.name}</Text>
                </View>
                <View style={styles.subDetails}>
                    <Text style={styles.textSubDetail}>{props.date.format('LL')}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: metrics.screenWidth * 0.3,
        width: '100%',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: metrics.screenWidth * 0.05,
        overflow: 'hidden',
    },
    imgContainer: {
        width: metrics.screenWidth * 0.3,
        height: '100%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        overflow: 'hidden',
    },
    tinyLogo: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    details: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingLeft: '5%',
        paddingRight: '2.5%',
    },
    title: {
        paddingBottom: 5,
    },
    subDetails: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingBottom: 5,
    },
    textTitle: {
        color: '#3B5E66',
        fontWeight: 'bold',
        fontSize: fonts.size.font16,
    },
    textSubDetail: {
        color: '#838889',
        fontSize: fonts.size.font14,
    },
});

export default ItemNews;
