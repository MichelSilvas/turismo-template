import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import metrics from '../../theme/metrics';

export const CarouselItem = ({ item }: any) => {
    return (
        <View style={styles.imgView}>
            <Image style={styles.imgBanner} key={item.id} source={{ uri: item.photo }} />
        </View>
    );
};

const styles = StyleSheet.create({
    imgView: {
        height: metrics.screenHeight * 0.18,
        width: metrics.screenWidth - metrics.screenWidth * 0.15,
        borderRadius: metrics.screenWidth * 0.02,
        overflow: 'hidden',
    },
    imgBanner: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
});
