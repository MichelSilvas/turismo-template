import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { SvgProps } from 'react-native-svg';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import metrics from '../../theme/metrics';

export interface ItemMenuType {
    categoryId: Number;
    name: string;
    title: string;
    icon: JSX.Element;
    onPress: (item: ItemMenuType) => void;
    path: string;
    cabecalho: string;
    color: string;
    redirectTo: string;
}

function ItemMenu(props: ItemMenuType) {
    return (
        <TouchableOpacity onPress={() => props.onPress(props)} style={styles(props).button}>
            <View style={styles(props).grid}>
                {props.icon}
                <Text style={styles(props).text}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = (props: ItemMenuType) =>
    StyleSheet.create({
        button: {
            backgroundColor: props.color,
            width: metrics.screenWidth * 0.25,
            height: metrics.screenWidth * 0.25,
            paddingVertical: 5,
            paddingHorizontal: 8,
            margin: 10,
            borderRadius: 24,
            justifyContent: 'center',
            alignItems: 'center',
        },
        grid: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },
        text: {
            textAlign: 'center',
            color: colors.textMenusHome,
            fontFamily: fonts.weight.subtitle600,
            fontSize: fonts.size.font10,
        },
    });

export default ItemMenu;
