import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from 'react-native';

export function ListDivider() {
    return <View style={styles.container}></View>;
}

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 1,
        backgroundColor: '#C4C4C4',
        marginVertical: 30,
        alignSelf: 'center',
    },
});
