import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import metrics from '../../theme/metrics';
import Btn from '../button/button';
import getDetailItems from '../data/detailItens';
import { DetailType } from '../detail/detailType';
import { EmailType, sendEmail } from '../email/sendEmail';
import HeaderSecondary from '../headerSecondary/headerSecondary';

class ContactType {
    name: string;
    whatsApp: string;
    city: string;
    message: string;

    constructor(name: string, whatsApp: string, city: string, message: string) {
        this.name = name;
        this.whatsApp = whatsApp;
        this.city = city;
        this.message = message;
    }
}

function Contact({ navigation, route }: any) {
    const { title, categoryId, cabecalho } = route.params;
    const [nome, setNome] = useState('');
    const [whatsApp, setWhatsApp] = useState('');
    const [cidade, setCidade] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [manterPosicao, setManterPosicao] = useState(false);
    const [email, setEmail] = useState('');
    const categoryIdCity = 5;

    const onPressItem = (item: DetailType) => {
    };

    useEffect(() => {    
        getDetailItems(onPressItem)
        .then((data) => {
            const cityInfo = data.filter((e) => e.categoryId == categoryIdCity);
            setEmail(cityInfo ? JSON.parse(cityInfo[0].jsonExtraServices)[0].Item.toString() : '');
        });
    }, []);
    
    const onPressBtn = () => {
        try {
            ValidarDadoNuloOuVazio(nome, 'Nome');
            ValidarDadoNuloOuVazio(whatsApp, 'WhatsApp');
            ValidarDadoNuloOuVazio(cidade, 'Cidade');
            ValidarDadoNuloOuVazio(mensagem, 'Mensagem');

            const body = new ContactType(nome, whatsApp, cidade, mensagem);

            const send: EmailType = {
                to: `${email}`,
                subject: `[App Turismo] Contato - ${nome}`,
                body: mensagem,
            };

            sendEmail(send);
        } catch (e) {
            Alert.alert(e.message);
        }
    };

    const ValidarDadoNuloOuVazio = (dado: string, campo: string) => {
        if (dado === '' || dado === undefined)
            throw new Error(`Por favor, preencha o campo ${campo} para efetivar o envio.`);
    };

    const handleCustom = (text: string) => {
        setWhatsApp(
            text
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d{4})(\d)/, '$1-$2')
        );
    };

    const nameRef = useRef();
    const whatsAppRef = useRef();
    const cityRef = useRef();
    const bodyRef = useRef();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            style={{ flex: 1 }}
        >
            <HeaderSecondary navigation={navigation} route={route} />
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: manterPosicao ? 'flex-start' : 'flex-end',
                        }}
                    >
                        <View style={styles.inputContainer}>
                            <View style={styles.inputLabel}>
                                <Text style={styles.inputTextLabel}>Nome</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                onChangeText={setNome}
                                value={nome}
                                returnKeyType="next"
                                onFocus={() => {
                                    setManterPosicao(true);
                                }}
                                onBlur={() => {
                                    setManterPosicao(true);
                                }}
                                onSubmitEditing={() => {
                                    whatsAppRef.current.focus();
                                    setManterPosicao(false);
                                }}
                                blurOnSubmit={false}
                                ref={nameRef}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputLabel}>
                                <Text style={styles.inputTextLabel}>Whatsapp</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text: string) => {
                                    handleCustom(text);
                                }}
                                value={whatsApp}
                                onFocus={() => {
                                    setManterPosicao(true);
                                }}
                                onBlur={() => {
                                    setManterPosicao(true);
                                }}
                                keyboardType="phone-pad"
                                returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                                ref={whatsAppRef}
                                onSubmitEditing={() => {
                                    cityRef.current.focus();
                                    setManterPosicao(false);
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputLabel}>
                                <Text style={styles.inputTextLabel}>Cidade</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                onChangeText={setCidade}
                                value={cidade}
                                returnKeyType="next"
                                onFocus={() => {
                                    setManterPosicao(false);
                                }}
                                onBlur={() => {
                                    setManterPosicao(false);
                                }}
                                ref={cityRef}
                                onSubmitEditing={() => {
                                    bodyRef.current.focus();
                                    setManterPosicao(false);
                                }}
                            />
                        </View>
                        <View
                            style={[styles.inputContainer, { height: metrics.screenHeight * 0.18 }]}
                        >
                            <View
                                style={[
                                    styles.inputLabel,
                                    { top: (-metrics.screenHeight * 0.18) / 8, height: '25%' },
                                ]}
                            >
                                <Text style={styles.inputTextLabel}>Mensagem</Text>
                            </View>
                            <TextInput
                                style={styles.inputCanGrow}
                                onChangeText={setMensagem}
                                value={mensagem}
                                returnKeyType="next"
                                onFocus={() => {
                                    setManterPosicao(false);
                                }}
                                onBlur={() => {
                                    setManterPosicao(false);
                                }}
                                multiline={true}
                                ref={bodyRef}
                            />
                        </View>
                        <View style={styles.btnContainer}>
                            <Btn
                                title="Enviar"
                                color={colors.buttonRestaurants}
                                onPress={onPressBtn}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        height: metrics.screenHeight * 0.09,
        borderWidth: 1,
        borderRadius: 10,
        margin: '5%',
    },
    inputLabel: {
        position: 'absolute',
        top: (-metrics.screenHeight * 0.09) / 4,
        height: '50%',
        justifyContent: 'center',
        left: 25,
        zIndex: 999,
    },
    inputTextLabel: {
        fontSize: fonts.size.font12,
        fontFamily: fonts.weight.text400,
        backgroundColor: '#efefef',
        paddingHorizontal: '1%',
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: fonts.size.font16,
        padding: 10,
    },
    inputCanGrow: {
        height: '85%',
        textAlignVertical: 'top',
        justifyContent: 'flex-end',
        fontSize: fonts.size.font16,
        marginTop: 'auto',
        paddingHorizontal: '3%',
    },
    btnContainer: {
        height: metrics.screenHeight * 0.09,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '5%',
    },
});

export default Contact;
