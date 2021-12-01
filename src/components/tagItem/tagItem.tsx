import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import fonts from '../../theme/fonts';
import metrics from '../../theme/metrics';

export interface TagItemType {
    description: string;
    color: string;
    textColor: string;
}

function TagItem(props: TagItemType) {
    return (
        <View style={styles(props).tag}>
            <Text style={styles(props).text}>{props.description}</Text>
        </View>
    );
}

const styles = (props: TagItemType) =>
    StyleSheet.create({
        tag: {
            width: metrics.screenWidth * 0.7,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            backgroundColor: props.color,
            marginVertical: '3%',
        },
        text: {
            color: props.textColor,
            fontSize: fonts.size.font18,
            fontWeight: 'bold',
            padding: '3%',
        },
    });

export default TagItem;
