import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View, TextInput } from 'react-native';

import { ArrowLeftIcon } from '../Icons';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import metrics from '../../theme/metrics';

function CustomHeader({ route, navigation, onFilter }: any) {
    const { title, qtdGoBack, onBackClick } = route.params;
    const [valueText, setValueText] = useState('');

    useEffect(() => {
        onFilter(valueText);
    }, [valueText]);

    function goBackClick() {
        if (onBackClick) onBackClick();
        else if (qtdGoBack) navigation.pop(qtdGoBack);
        else navigation.goBack();
    }

    return (
        <View style={styles.header}>
            <View style={styles.textView}>
                <TouchableOpacity onPress={goBackClick} style={styles.goBackTouch}>
                    <View style={styles.imgArrow}>
                        <ArrowLeftIcon sizeMultiplier={0.06} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>{title}</Text>
            </View>
            <View style={styles.search}>
                <TextInput value={valueText} onChangeText={(text) => setValueText(text)} style={styles.searchText} placeholder="Encontre" />
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
        justifyContent: 'center',
    },
    text: {
        flex: 1,
        textAlign: 'center',
        color: colors.headerTextCity,
        fontFamily: fonts.weight.subtitle600,
        fontSize: fonts.size.font20,
    },
    search: {
        position: 'absolute',
        bottom: -(metrics.screenHeight * 0.05) / 2,
        height: metrics.screenHeight * 0.05,
        width: '70%',
        alignSelf: 'center',
    },
    searchText: {
        borderColor: colors.textInputBorderColor,
        backgroundColor: colors.textInputBackgroud,
        fontSize: fonts.size.font16,
        fontFamily: fonts.weight.text400,
        borderRadius: 50,
        paddingHorizontal: 15,
        height: '100%',
        width: '100%',
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

export default CustomHeader;
