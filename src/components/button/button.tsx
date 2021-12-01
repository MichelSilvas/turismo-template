import React from 'react';
import { TouchableOpacity, StyleSheet, ButtonProps, Text } from 'react-native';
import fonts from '../../theme/fonts';

function Btn(props: ButtonProps) {
    return (
        <TouchableOpacity style={styles(props).main} onPress={props.onPress} activeOpacity={0.5}>
            <Text style={styles(props).text}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = (props: ButtonProps) =>
    StyleSheet.create({
        main: {
            backgroundColor: props.color,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            height: '100%',
            width: '100%',
        },
        text: {
            color: 'white',
            fontFamily: fonts.weight.subtitle600,
            fontSize: fonts.size.font18,
        },
    });

export default Btn;
