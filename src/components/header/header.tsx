import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { BrasaoLogo } from '../../theme/images';
import MenuIcon from '../../assets/IconsSvg/menu-icon.svg';
import metrics from '../../theme/metrics';

function Header() {
    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                <View>
                    <Image source={BrasaoLogo} style={styles.logo} />
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Bem vindo à</Text>
                    <Text style={styles.titleTextCity}>Santa Fé do Sul</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        width: metrics.screenWidth,
        height: metrics.screenHeight * 0.15,
        backgroundColor: colors.headerPrimary,
    },
    container: {
        position: 'relative',
        flex: 1,
        maxWidth: '70%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    logo: {
        width: metrics.screenWidth * 0.18,
        height: metrics.screenWidth * 0.18,
        borderRadius: 100,
    },
    title: {
        marginLeft: '10%',
    },
    titleText: {
        fontSize: fonts.size.font16,
        fontFamily: fonts.weight.text400,
    },
    titleTextCity: {
        fontSize: fonts.size.font18,
        fontFamily: fonts.weight.title700,
        color: colors.headerTextCity,
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

export default Header;
