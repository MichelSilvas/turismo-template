import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DetailType } from '../detail/detailType';
import { ClockIcon, PinMapIcon } from '../Icons';
import metrics from '../../theme/metrics';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

function ItemEvent(props: DetailType) {
    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <Text style={styles.textDate}>{props.date.format('DD')}</Text>
                <Text style={styles.textDay}>{props.date.format('ddd').toUpperCase()}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>{props.name}</Text>
                </View>
                <View>
                    <View style={styles.details}>
                        <PinMapIcon sizeMultiplier={0.04} fill={'#00DD84'} />
                        <Text style={styles.textAddress}>
                            <Text style={{ fontFamily: fonts.weight.subtitle600 }}>Local: </Text>
                            {props.location.address}
                        </Text>
                    </View>
                    <View style={styles.details}>
                        <ClockIcon sizeMultiplier={0.04} fill={'#00DD84'} />
                        <Text style={styles.textAddress}>
                            <Text style={{ fontFamily: fonts.weight.subtitle600 }}>Horário: </Text>
                            {props.openingHours}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: metrics.screenWidth * 0.3,
        width: '100%',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: metrics.screenWidth * 0.05,
        overflow: 'hidden',
    },
    dateContainer: {
        backgroundColor: colors.firstButtons,
        height: '100%',
        width: metrics.screenWidth * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDate: {
        flex: 1.2,
        color: '#fff',
        fontSize: fonts.size.font48,
        fontFamily: fonts.weight.title700,
    },
    textDay: {
        flex: 0.8,
        color: '#fff',
        fontSize: fonts.size.font20,
        fontFamily: fonts.weight.title700,
    },
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingLeft: '5%',
        paddingRight: '2.5%',
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    title: {},
    textTitle: {
        color: '#3B5E66',
        fontFamily: fonts.weight.subtitle600,
        fontSize: fonts.size.font14,
    },
    textAddress: {
        color: '#000',
        fontSize: fonts.size.font12,
        fontFamily: fonts.weight.text400,
        lineHeight: metrics.screenWidth * 0.048,
        marginLeft: 7,
    },
});
export default ItemEvent;
