import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native';
import { DetailType } from '../detail/detailType';
import { NoResultsBg } from '../../theme/images';
import { Moment } from 'moment';
import getDetailItems from '../data/detailItens';
import DateFilter from '../dateFilter/dateFilter';
import HeaderSecondary from '../headerSecondary/headerSecondary';
import ItemEvent from '../itemEvent/itemEvent';
import metrics from '../../theme/metrics';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

function EventList({ navigation, route }: any) {
    const { title, categoryId, cabecalho } = route.params;
    const [menuItens, setMenuItens] = useState<DetailType[]>([]);
    const [date, setDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [eventsOnDate, setEventsOnDate] = useState<DetailType[]>([]);

    const onPress = (item: DetailType) => {
        navigation.navigate('EventDetail', {
            title: item.name,
            categoryId: item.categoryId,
            item: item,
        });
    };

    useEffect(() => {
        async function getData() {
            let data = await getDetailItems(onPress);
            let filteredData = data.filter((e) => e.categoryId == categoryId);
            setMenuItens([...filteredData]);
        }
        getData();
    }, [categoryId]);

    useEffect(() => {
        let filteredData = menuItens.filter((e) => compareDate(e.date));
        setEventsOnDate([...filteredData]);
    }, [date, menuItens]);

    const meses = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
    ];

    const renderRow = ({ item }: any) => {
        return (
            <TouchableOpacity onPress={() => item.onPress(item)} style={styles.itemInfo}>
                <ItemEvent {...item} />
            </TouchableOpacity>
        );
    };

    const formatDate = (): string => {
        return meses[date.getMonth()] + ' / ' + date.getFullYear();
    };

    const onPressPrevious = () => {
        setDate(new Date(date.setMonth(date.getMonth() - 1)));
    };

    const onPressNext = () => {
        setDate(new Date(date.setMonth(date.getMonth() + 1)));
    };

    const compareDate = (eventDate: Moment): boolean => {
        return eventDate.year() === date.getFullYear() && eventDate.month() === date.getMonth();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderSecondary navigation={navigation} route={route} />
            <View style={styles.main}>
                <View style={styles.dateFilter}>
                    <DateFilter
                        onPressPrevious={onPressPrevious}
                        onPressNext={onPressNext}
                        text={formatDate()}
                    />
                </View>
                <View style={styles.listItems}>
                    {eventsOnDate.length > 0 ? (
                        <FlatList
                            data={eventsOnDate}
                            renderItem={renderRow}
                            keyExtractor={(item: { id: any }) => item.id.toString()}
                            contentContainerStyle={{ paddingVertical: '5%' }}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <View style={styles.noResults}>
                            <View style={styles.bgImage}>
                                <Image style={styles.img} source={NoResultsBg} />
                            </View>
                            <View style={styles.noResultsText}>
                                <Text style={styles.resultsTitle}>Oops!</Text>
                                <Text style={styles.resultsText}>
                                    {'Nenhum evento\nencontrado neste mês'}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: '6%',
    },
    dateFilter: {
        alignSelf: 'center',
        marginVertical: '4%',
    },
    listItems: {
        flex: 1,
        alignItems: 'center',
    },
    itemInfo: {
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: '5%',
    },
    noResults: {
        flex: 1,
        alignItems: 'center',
    },
    bgImage: {
        marginTop: '5%',
        height: metrics.screenWidth * 0.5,
        width: metrics.screenWidth * 0.5,
    },
    img: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    noResultsText: {
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultsTitle: {
        fontFamily: fonts.weight.text500,
        fontSize: fonts.size.font48,
        color: '#000',
        opacity: 0.8,
    },
    resultsText: {
        fontFamily: fonts.weight.text500,
        fontSize: fonts.size.font16,
        color: colors.textDescriptionHotel,
        textAlign: 'center',
    },
});

export default EventList;
