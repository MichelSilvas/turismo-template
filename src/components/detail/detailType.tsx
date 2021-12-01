import { Moment } from 'moment';

export interface DetailType {
    id: Number;
    categoryId: Number;
    name: string;
    type: string;
    phoneNumber: string;
    operation: string;
    openingHours: string;
    detailedDescription: string;
    onPress: (id: DetailType) => void;
    mainImage: string;
    redirectTo: string;
    startDate: Moment;
    endDate?: Moment;
    date: Moment;
    location: LocationType;
    photos: PhotoType[];
    jsonExtraServices: string;
    dailyRate: string;
}

export interface LocationType {
    latitude?: number;
    longitude?: number;
    address?: string;
    travelType?: 'drive' | 'walk' | 'public_transport';
    start?: string;
    end?: string;
}

export interface PhotoType {
    id: number;
    photo: string;
}

export interface DetailHotelType extends DetailType {}

export interface DetailEventsType extends DetailType {}
