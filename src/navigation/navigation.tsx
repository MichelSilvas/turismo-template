import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../components/pages/home';
import AboutCity from '../components/pages/aboutCity';
import RestaurantList from '../components/pages/restaurantList';
import HotelList from '../components/pages/hotelList';
import HotelDetail from '../components/pages/hotelDetail';
import EventList from '../components/pages/eventList';
import EventDetail from '../components/pages/eventDetail';
import QrCodeReader from '../components/qrCodeReader';
import TouristAttraction from '../components/touristAttraction';
import TouristAttractionItem from '../components/touristAttraction/touristAttractionItem';
import Contact from '../components/pages/contact';

interface Props {
    initialUrl?: string;
}

function Navigation({ initialUrl }: Props) {
    const Stack = createNativeStackNavigator();
    const linking = {
        prefixes: [initialUrl ?? ''],
    };
    return (
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'My home' }}
                    initialParams={{ initialUrl }}
                />
                <Stack.Screen name="AboutCity" component={AboutCity} />
                <Stack.Screen name="RestaurantList" component={RestaurantList} />
                <Stack.Screen name="HotelList" component={HotelList} />
                <Stack.Screen name="HotelDetail" component={HotelDetail} />
                <Stack.Screen name="EventList" component={EventList} />
                <Stack.Screen name="EventDetail" component={EventDetail} />
                <Stack.Screen name="QRCodeReader" component={QrCodeReader} />
                <Stack.Screen name="TouristAttraction" component={TouristAttraction} />
                <Stack.Screen name="TouristAttractionItem" component={TouristAttractionItem} />
                <Stack.Screen name="Contact" component={Contact} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
