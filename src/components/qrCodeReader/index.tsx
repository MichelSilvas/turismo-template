import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import QrCodeScanner from './qrCodeScanner';
import { QR_CODE_URL } from '@env';

function QrCodeReader({ navigation, route }: any) {
    const { initialUrl } = route.params;

    useEffect(() => {
        if (initialUrl) {
            scannAction(initialUrl);
        }
    }, [initialUrl]);

    const scannAction = (scannedData: string) => {
        if (scannedData.toUpperCase().startsWith(`${QR_CODE_URL}`.toUpperCase())) {
            // QR_CODE_URL?route=TouristAttraction&id=1
            const routeName = scannedData.split('?')[1].split('&')[0].split('=')[1];
            const id = scannedData.split('?')[1].split('&')[1].split('=')[1];
            navigation.navigate(routeName, { navigation, route, id: id });
        } else if (scannedData.startsWith('app.wizetech.net:/')) {
            // app.wizetech.net:/TouristAttraction/1
            scannedData = scannedData.replace('app.wizetech.net:/', '');
            let page = scannedData.split('/')[0];
            let pageId = scannedData.split('/')[1];
            navigation.navigate(page, { navigation, route, id: pageId });
        } else {
            Alert.alert('Qr Code inválido.');
            return false;
        }
    };

    return initialUrl ? null : (
        <QrCodeScanner navigation={navigation} route={route} scannAction={scannAction} />
    );
}
export default QrCodeReader;
