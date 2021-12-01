import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeftSolidIcon } from '../Icons';
import colors from '../../theme/colors';
import metrics from '../../theme/metrics';
import fonts from '../../theme/fonts';

export interface DateFilterType {
    onPressPrevious: () => void;
    onPressNext: () => void;
    text: string;
}

function DateFilter(props: DateFilterType) {
    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={() => props.onPressPrevious()} style={styles.button}>
                <ArrowLeftSolidIcon sizeMultiplier={0.04} fill={'#fff'} />
            </TouchableOpacity>
            <Text style={styles.text}>{props.text}</Text>
            <TouchableOpacity
                onPress={() => props.onPressNext()}
                style={[styles.button, { transform: [{ rotate: '180deg' }] }]}
            >
                <ArrowLeftSolidIcon sizeMultiplier={0.04} fill={'#fff'} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.firstButtons,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 50,
        width: metrics.screenWidth * 0.7,
    },
    text: {
        paddingVertical: '1%',
        color: colors.textTag,
        fontFamily: fonts.weight.subtitle600,
        fontSize: fonts.size.font18,
    },
    button: {
        padding: '3.5%',
        justifyContent: 'center',
    },
});

export default DateFilter;
