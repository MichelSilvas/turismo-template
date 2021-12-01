import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Linking, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Navigation from './src/navigation/navigation';
import colors from './src/theme/colors';
import getDetailItems from './src/components/data/detailItens';
import { DetailType } from './src/components/detail/detailType';

export default function App() {
    const [url, setUrl] = useState<string>();
    const [menuItens, setMenuItens] = useState<DetailType[]>([]);
    const [fontsLoaded] = useFonts({
        'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
        'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    });

    const onPress = (item: DetailType) => {};

    useEffect(() => {
        async function getData() {
            let data = await getDetailItems(onPress);
            setMenuItens(data);
        }
        getData();
    }, []);

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    Linking.getInitialURL().then((url) => {
        if (url?.startsWith('app.wizetech.net')) setUrl(url);
        else setUrl('');
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <Navigation initialUrl={url} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.headerPrimary,
        paddingTop: StatusBar.currentHeight,
    },
});
