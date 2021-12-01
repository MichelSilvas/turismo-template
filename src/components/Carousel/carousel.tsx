import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CarouselItem } from './carouselItem';

import { PhotoType } from '../detail/detailType';
import metrics from '../../theme/metrics';

type Props = {
    data: PhotoType[];
};

export default function Carousel({ data }: Props) {
    return (
        <View style={styles.bannerView}>
            {data.length > 0 ? (
                <FlatList
                    data={data}
                    renderItem={({ item }) => <CarouselItem item={item} />}
                    keyExtractor={(item: { id: any }) => item.id.toString()}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                />
            ) : (
                <Text style={{ alignSelf: 'center', fontSize: 24 }}>No hay fotita</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    bannerView: {
        height: metrics.screenHeight * 0.15,
        // width: metrics.screenWidth - metrics.screenWidth * 0.15,
        width: metrics.screenWidth,
        // alignSelf: 'center',
        // overflow: 'hidden',
    },
});
