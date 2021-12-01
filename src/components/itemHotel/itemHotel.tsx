import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Image from '../image';
import { DetailType } from '../detail/detailType';
import {
    AirConditionerIcon,
    BreakfastIcon,
    CarIcon,
    ClockIcon,
    GymIcon,
    LaundryIcon,
    PetIcon,
    PinMapIcon,
    PoolIcon,
    SafeBoxIcon,
} from '../Icons';
import { NoImage } from '../../theme/images';
import metrics from '../../theme/metrics';
import fonts from '../../theme/fonts';

function ItemHotel(props: DetailType) {
    const [carIcon, setCarIcon] = useState(false);
    const [poolIcon, setPoolIcon] = useState(false);
    const [breakfastIcon, setBreakfastIcon] = useState(false);
    const [gymIcon, setGymIcon] = useState(false);
    const [petIcon, setPetIcon] = useState(false);
    const [laundryIcon, setLaundryIcon] = useState(false);
    const [safeBoxIcon, setSafeBoxIcon] = useState(false);
    const [airConditionerIcon, setAirConditionerIcon] = useState(false);

    useEffect(() => {
        JSON.parse(props.jsonExtraServices).map((item: any) => {
            const stringItem = item.Item.toString();
            if (stringItem == 'CarIcon') setCarIcon(true);
            if (stringItem == 'PoolIcon') setPoolIcon(true);
            if (stringItem == 'BreakfastIcon') setBreakfastIcon(true);
            if (stringItem == 'GymIcon') setGymIcon(true);
            if (stringItem == 'PetIcon') setPetIcon(true);
            if (stringItem == 'LaundryIcon') setLaundryIcon(true);
            if (stringItem == 'SafeBoxIcon') setSafeBoxIcon(true);
            if (stringItem == 'AirConditionerIcon') setAirConditionerIcon(true);
        });
    }, []);
  
    return (
        <View style={styles.main}>
            <View style={styles.imgContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={{uri: props.mainImage}}
                />
            </View>
            <View style={styles.details}>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>{props.name}</Text>
                </View>
                <View style={styles.subDetails}>
                    <View style={styles.iconsInfo}>
                        <PinMapIcon sizeMultiplier={0.04} fill={'#000'} />
                    </View>
                    <Text style={styles.textSubDetail}>
                        <Text style={{ fontFamily: fonts.weight.subtitle600 }}>Local: </Text>
                        {props.location.address}
                    </Text>
                </View>
                <View style={styles.subDetails}>
                    <View style={styles.iconsInfo}>
                        <ClockIcon sizeMultiplier={0.04} fill={'#000'} />
                    </View>
                    <Text style={styles.textSubDetail}>
                        <Text style={{ fontFamily: fonts.weight.subtitle600 }}>Recepção: </Text>
                        {props.openingHours}
                    </Text>
                </View>
                <View style={styles.subIcons}>
                    {carIcon && (
                        <View style={styles.iconSecondary}>
                            <CarIcon sizeMultiplier={0.04} fill={'#00DD84'} />
                        </View>
                    )}
                    {poolIcon && (
                        <View style={styles.iconSecondary}>
                            <PoolIcon sizeMultiplier={0.04} fill={'#00DD84'} />
                        </View>
                    )}
                    {breakfastIcon && (
                        <View style={styles.iconSecondary}>
                            <BreakfastIcon sizeMultiplier={0.04} fill={'#00DD84'} />
                        </View>
                    )}
                    {gymIcon && (
                        <View style={styles.iconSecondary}>
                            <GymIcon sizeMultiplier={0.04} fill={'#00DD84'} />
                        </View>
                    )}
                    {petIcon && (
                        <View style={styles.iconSecondary}>
                            <PetIcon sizeMultiplier={0.04} fill={'#00DD84'} />
                        </View>
                    )}
                    {laundryIcon && (
                        <View style={styles.iconSecondary}>
                            <LaundryIcon sizeMultiplier={0.04} fill={'#00DD84'} />
                        </View>
                    )}
                    {safeBoxIcon && (
                        <View style={styles.iconSecondary}>
                            <SafeBoxIcon sizeMultiplier={0.04} fill={'#00DD84'} />
                        </View>
                    )}
                    {airConditionerIcon && (
                        <View style={styles.iconSecondary}>
                            <AirConditionerIcon sizeMultiplier={0.04} fill={'#00DD84'} />
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        minHeight: metrics.screenWidth * 0.3,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E5E5E5',
    },
    imgContainer: {
        width: metrics.screenWidth * 0.3,
        height: '100%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        overflow: 'hidden',
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    details: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingLeft: '4%',
        paddingRight: '2%',
        paddingVertical: '2%',
    },
    title: {},
    subDetails: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '3%',
    },
    subIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconsInfo: {
        marginRight: '3%',
    },
    iconSecondary: {
        marginRight: '10%',
    },
    textTitle: {
        color: '#3B5E66',
        fontFamily: fonts.weight.subtitle600,
        fontSize: fonts.size.font14,
    },
    textSubDetail: {
        color: '#838889',
        fontSize: fonts.size.font12,
    },
});

export default ItemHotel;
