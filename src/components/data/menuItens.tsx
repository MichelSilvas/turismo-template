import React from 'react';
import colors from '../../theme/colors';
import { ItemMenuType } from '../itemMenu/itemMenu';

import {
    CalendarIcon,
    FoodIcon,
    HotelIcon,
    SunIcon,
    LandmarkIcon,
    PhoneIcon,
    ListIcon,
    ContactIcon,
    QRCodeIcon,
} from '../Icons';

const getMenuItems = (onPress: (item: ItemMenuType) => void) => {
    const menuItens: Array<ItemMenuType> = [
        {
            categoryId: 1,
            name: 'eventos',
            title: 'Agenda de Eventos',
            onPress: onPress,
            icon: <CalendarIcon fill={'#fff'} />,
            path: 'caminho1',
            cabecalho: 'EVENTOS',
            color: colors.firstButtons,
            redirectTo: 'EventList',
        },
        {
            categoryId: 2,
            name: 'alimentacao',
            title: 'Onde Comer',
            onPress: onPress,
            icon: <FoodIcon />,
            path: 'caminho2',
            cabecalho: 'BAR E RESTAURANTES',
            color: colors.firstButtons,
            redirectTo: 'RestaurantList',
        },
        {
            categoryId: 3,
            name: 'hospedagem',
            title: 'Onde Hospedar',
            onPress: onPress,
            icon: <HotelIcon />,
            path: 'caminho3',
            cabecalho: 'GUIAS TURISTICOS',
            color: colors.firstButtons,
            redirectTo: 'HotelList',
        },
        {
            categoryId: 4,
            name: 'turistico',
            title: 'Atrativos Turísticos',
            onPress: onPress,
            icon: <SunIcon />,
            path: 'caminho4',
            cabecalho: 'ATRATIVOS TURÍSTICOS',
            color: colors.secondButtons,
            redirectTo: 'TouristAttraction',
        },
        {
            categoryId: 5,
            name: 'sobre',
            title: 'Sobre Santa Fé do Sul',
            onPress: onPress,
            icon: <LandmarkIcon />,
            path: 'caminho4',
            cabecalho: 'APOIO AO TURISTA',
            color: colors.secondButtons,
            redirectTo: 'AboutCity',
        },
        {
            categoryId: 6,
            name: 'contato',
            title: 'Contato',
            onPress: onPress,
            icon: <PhoneIcon />,
            path: 'caminho4',
            cabecalho: 'APOIO AO TURISTA',
            color: colors.secondButtons,
            redirectTo: 'Contact',
        },
        {
            categoryId: 7,
            name: 'noticias',
            title: 'Portal',
            onPress: onPress,
            icon: <ListIcon />,
            path: 'caminho4',
            cabecalho: 'APOIO AO TURISTA',
            color: colors.thirdButtons,
            redirectTo: 'NewsList',
        },
        {
            categoryId: 8,
            name: 'turismo-help',
            title: 'Atendimento ao Turismo',
            onPress: onPress,
            icon: <ContactIcon />,
            path: 'caminho4',
            cabecalho: 'APOIO AO TURISTA',
            color: colors.thirdButtons,
            redirectTo: '',
        },
        {
            categoryId: 9,
            name: 'qrcode-reader',
            title: 'Leitor de QRCode',
            onPress: onPress,
            icon: <QRCodeIcon />,
            path: 'caminho4',
            cabecalho: 'APOIO AO TURISTA',
            color: colors.thirdButtons,
            redirectTo: 'QRCodeReader',
        },
    ];

    return menuItens;
};

export default getMenuItems;
