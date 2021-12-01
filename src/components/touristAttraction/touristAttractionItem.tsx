import React from 'react';
import { DetailType } from '../detail/detailType';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import Image from '../image';
import metrics from '../../theme/metrics';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import Btn from '../button/button';
import { ArrowLeftIcon } from '../Icons';
import { ListDivider } from '../listDivider';
import { createOpenLink } from 'react-native-open-maps';

interface TouristAttractionItemProps extends DetailType {
    isOnDetail: boolean;
    fromQrCode: boolean;
    goBack: () => void;
    navigation: any;
}

function TouristAttractionItem(props: TouristAttractionItemProps) {
    const onPressBtn = (location: any) => {
        const openMap = location.address
            ? createOpenLink({ query: `${location.address} - Santa fé do Sul` })
            : createOpenLink({
                  query: `${location.address}, ${location.address}`,
              });

        return openMap();
    };

    const onPressPhone = () => {
        Alert.alert('Ligar para o Hotel', 'Deseja realizar essa ligação?', [
            {
                text: 'Ligar',
                onPress: () => Linking.openURL(`tel:0${props.phoneNumber.replace(/\D/g, '')}`),
                style: 'default',
            },
            { text: 'Cancelar', onPress: () => {} },
        ]);
        return;
    };

    return (
        <View style={styles(props.isOnDetail).main}>
            <ScrollView>
                <View style={styles(props.isOnDetail).imageContainer}>
                    <Image style={styles().image} source={{ uri: props.mainImage }} />
                    {props.isOnDetail && (
                        <TouchableOpacity
                            style={styles().goBack}
                            onPress={() => props.goBack()}
                            activeOpacity={0.5}
                        >
                            <View style={styles().arrowLeftBack}>
                                <ArrowLeftIcon sizeMultiplier={0.06} />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles(props.isOnDetail).textContainer}>
                    <Text style={styles().textName}>{props.name}</Text>
                    <View>
                        <TouchableOpacity onPress={onPressPhone}>
                            <Text style={styles().detailText}>
                                <Text style={styles().textSubDetail}>Telefone: </Text>
                                {props.phoneNumber}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles().detailText}>
                            <Text style={styles().textSubDetail}>Endereço: </Text>
                            {props.location.address}
                        </Text>
                        <Text style={styles().detailText}>
                            <Text style={styles().textSubDetail}>Horário de Funcionamento: </Text>
                            {props.operation}
                        </Text>
                        <Text style={styles().detailText}>
                            <Text style={styles().textSubDetail}>Acesso: </Text>
                            {props.dailyRate}
                        </Text>
                    </View>
                    {props.isOnDetail ? (
                        <>
                            <ListDivider />
                            <View style={styles().detailedDescription}>
                                <Text style={styles().detailText}>{props.detailedDescription}</Text>
                            </View>
                        </>
                    ) : null}
                    {!props.fromQrCode && (
                        <View style={styles().btnContainer}>
                            <Btn
                                title="Como Chegar"
                                color={colors.touristAttraction.buttonTouristAttractionItem}
                                onPress={() => onPressBtn(props.location)}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = (isOnDetail?: boolean) =>
    StyleSheet.create({
        main: {
            width: '100%',
            paddingHorizontal: 0,
        },
        imageContainer: {
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            overflow: 'hidden',
            borderRadius: isOnDetail ? 0 : metrics.screenWidth * 0.08,
            height: metrics.screenHeight * 0.5,
        },
        image: {
            resizeMode: 'cover',
            width: '100%',
            height: '100%',
        },
        textContainer: {
            width: '100%',
            paddingTop: metrics.screenHeight * 0.02,
            paddingLeft: isOnDetail ? '5%' : 0,
            paddingRight: isOnDetail ? '5%' : 0,
        },
        detailText: {
            color: colors.touristAttraction.textDescription,
            textAlign: 'justify',
            fontFamily: fonts.weight.text400,
            fontSize: fonts.size.font16,
            paddingTop: metrics.screenHeight * 0.005,
        },
        textSubDetail: {
            fontFamily: fonts.weight.title700,
            color: colors.touristAttraction.textSubDetail,
            fontSize: fonts.size.font16,
        },
        textName: {
            color: colors.touristAttraction.textName,
            fontFamily: fonts.weight.text500,
            fontSize: fonts.size.font20,
        },
        detailedDescription: {
            paddingTop: 15,
        },
        goBack: {
            position: 'absolute',
            top: '8%',
            left: '3%',
            width: metrics.screenWidth * 0.1,
            height: metrics.screenWidth * 0.1,
            backgroundColor: '#00DD84',
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
        },
        arrowLeftBack: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        btnContainer: {
            height: metrics.screenHeight * 0.09,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: '5%',
        },
    });

export default TouristAttractionItem;
