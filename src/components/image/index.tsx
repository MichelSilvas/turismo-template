import React from 'react';
import {
    Image as RNImage,
    StyleSheet,
    ImageBackground,
    ImageStyle,
    StyleProp,
    Animated,
} from 'react-native';
import { NoImage } from '../../theme/images';

export interface ImageProps {
    source: any;
    style: StyleProp<ImageStyle>;
}

const ImageAnimated = Animated.createAnimatedComponent(RNImage);

function Image({ source, style }: ImageProps) {
    const opacity = new Animated.Value(0);
    const imageAnimatedStyle = [style, { opacity: opacity }];

    function lowUri() {
        if (source.uri) {
            let splitedUri = source.uri.split('.');
            let imageExtension = splitedUri[splitedUri.length - 1];
            return source.uri.replace('.' + imageExtension, '_low.' + imageExtension);
        }
    }

    function handleAnimate() {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    return (
        <ImageBackground
            style={style}
            imageStyle={style}
            resizeMode="cover"
            blurRadius={2}
            source={{ uri: lowUri() }}
        >
            <ImageAnimated style={imageAnimatedStyle} source={source.uri ? { uri: source.uri } : NoImage} onLoadEnd={handleAnimate} />
        </ImageBackground>
    );
}

export default Image;

const styles = StyleSheet.create({
    viewContainer: {
        margin: 0,
        padding: 0,
    },
});
