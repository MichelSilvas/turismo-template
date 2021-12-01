import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { FlashOnIcon, FlashOffIcon, QrCodeScannerIcon, CloseIcon } from '../Icons';
import metrics from '../../theme/metrics';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

function QrCodeScanner({ scannAction, navigation }: any) {
    const [hasPermission, setHasPermission] = useState<boolean>();
    const [scanned, setScanned] = useState(false);
    const [withFlash, setWithFlash] = useState(false);

    useEffect(() => {
        (async () => {
            Camera.requestPermissionsAsync().then(({ status }) => {
                if (status === 'granted') {
                    setHasPermission(true);
                } else {
                    alert(
                        "O aplicativo 'Santa Fé do Sul' não possui permissão de acesso à camera.\nPara utilizar esta funcionalidade é preciso liberar a permissão de acesso à camera na tela de configurações do seu dispositivo."
                    );
                    navigation.goBack();
                }
            });
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
        setScanned(true);
        if (!scannAction(data)) {
            setTimeout(() => {
                setScanned(false);
            }, 5000);
        }
    };

    if (hasPermission === false) {
        return <Text>Aguardando permissão para uso da camera</Text>;
    }

    return (
        <>
            {hasPermission ? (
                <View style={styles.container}>
                    <View style={styles.cameraContainer}>
                        <Camera
                            barCodeScannerSettings={{
                                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                            }}
                            flashMode={
                                withFlash
                                    ? Camera.Constants.FlashMode.torch
                                    : Camera.Constants.FlashMode.off
                            }
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={[
                                StyleSheet.absoluteFillObject,
                                scannerStyles(scanned ? 'none' : 'flex').scanner,
                            ]}
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.exitTouch}>
                        <View style={styles.exitIcon}>
                            <CloseIcon />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.qrCodeScannerIcon}>
                        <QrCodeScannerIcon sizeMultiplier={0.8} />
                    </View>
                    <TouchableOpacity
                        onPress={() => setWithFlash(!withFlash)}
                        style={styles.flashTouch}
                    >
                        {withFlash ? (
                            <View style={styles.flashIcon}>
                                <FlashOffIcon />
                            </View>
                        ) : (
                            <View style={styles.flashIcon}>
                                <FlashOnIcon />
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <Text style={styles.awaitingPermissionText}>
                        Aguardando permissão para uso da câmera.
                    </Text>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraContainer: {
        flex: 1,
        backgroundColor: '#000',
        padding: 0,
    },
    flashTouch: {
        position: 'absolute',
        bottom: '5%',
        left: '5%',
        width: metrics.screenWidth * 0.1,
        height: metrics.screenWidth * 0.1,
    },
    flashIcon: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrCodeScannerIcon: {
        position: 'absolute',
        top: '25%',
        left: '10%',
        width: metrics.screenWidth * 5,
        height: metrics.screenWidth * 5,
    },
    exitTouch: {
        position: 'absolute',
        top: '5%',
        right: '5%',
        width: metrics.screenWidth * 0.1,
        height: metrics.screenWidth * 0.1,
    },
    exitIcon: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    awaitingPermissionText: {
        marginTop: metrics.screenHeight * 0.05,
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: fonts.size.font16,
    },
});

const scannerStyles = (display: 'none' | 'flex' = 'flex') =>
    StyleSheet.create({
        scanner: {
            flex: 1,
            alignItems: 'center',
        },
    });

export default QrCodeScanner;
