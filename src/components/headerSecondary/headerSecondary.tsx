import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';

import { ArrowLeftIcon } from '../Icons';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import metrics from '../../theme/metrics';

function HeaderSecondary({ route, navigation }: any) {
    const { title, categoryId } = route.params;
    return (
        <View style={styles.header}>
            <View style={styles.textView}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackTouch}>
                    <View style={styles.imgArrow}>
                        <ArrowLeftIcon sizeMultiplier={0.06} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'relative',
        width: metrics.screenWidth,
        height: metrics.screenHeight * 0.15,
        backgroundColor: colors.headerPrimary,
        alignItems: 'center',
    },
    goBackTouch: {
        position: 'absolute',
        left: '3%',
        width: metrics.screenWidth * 0.1,
        height: metrics.screenWidth * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
    imgArrow: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        flex: 1,
        textAlign: 'center',
        color: colors.headerTextCity,
        fontFamily: fonts.weight.subtitle600,
        fontSize: fonts.size.font20,
    },
});

export default HeaderSecondary;
