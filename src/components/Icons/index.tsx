import React from 'react';
import { SvgProps } from 'react-native-svg';

// GLOBAL
// HEADER
import ArrowLeftSvg from '../../assets/IconsSvg/arrow-left-icon.svg';

// HOME
import CalendarSvg from '../../assets/IconsSvg/icon-calendar.svg';
import ContactSvg from '../../assets/IconsSvg/icon-contact.svg';
import FoodSvg from '../../assets/IconsSvg/icon-food.svg';
import HotelSvg from '../../assets/IconsSvg/icon-hotel-guest.svg';
import LandmarkSvg from '../../assets/IconsSvg/icon-landmark.svg';
import ListSvg from '../../assets/IconsSvg/icon-list.svg';
import PhoneSvg from '../../assets/IconsSvg/icon-phone.svg';
import QRCodeSvg from '../../assets/IconsSvg/icon-qrcode.svg';
import SunSvg from '../../assets/IconsSvg/icon-sun.svg';

// AGENDA DE EVENTOS
import ArrowLeftSolidSvg from '../../assets/IconsSvg/arrow-left-solid-icon.svg';
import PinMapSvg from '../../assets/IconsSvg/icon-pinmap.svg';
import ClockSvg from '../../assets/IconsSvg/icon-clock.svg';
import ShareSvg from '../../assets/IconsSvg/icon-share.svg';

// Hotel
import WifiSvg from '../../assets/IconsSvg/icon-wifi.svg';
import PoolSvg from '../../assets/IconsSvg/icon-pool.svg';
import PetSvg from '../../assets/IconsSvg/icon-pet.svg';
import BreakfastSvg from '../../assets/IconsSvg/icon-breakfast.svg';
import GymSvg from '../../assets/IconsSvg/icon-gym.svg';
import LaundrySvg from '../../assets/IconsSvg/icon-laundry.svg';
import CarSvg from '../../assets/IconsSvg/icon-car.svg';
import SafeBoxSvg from '../../assets/IconsSvg/icon-safe-box.svg';
import AirConditionerSvg from '../../assets/IconsSvg/icon-air-conditioner.svg';
import MapSvg from '../../assets/IconsSvg/icon-map.svg';

// QR code Reader
import FlashOnSvg from '../../assets/IconsSvg/flash-on.svg';
import FlashOffSvg from '../../assets/IconsSvg/flash-off.svg';
import QrCodeScannerSvg from '../../assets/IconsSvg/icon-qrcode-scanner.svg';
import CloseSvg from '../../assets/IconsSvg/icon-close.svg';

import metrics from '../../theme/metrics';

const defaultSize = metrics.screenWidth * 0.09;
interface IconsType {
    fill?: string;
    size?: number;
    name?: string;
    sizeMultiplier?: number;
}

export function CalendarIcon(props: IconsType): JSX.Element {
    return IconMount(props, CalendarSvg);
}

export function ArrowLeftIcon(props: IconsType): JSX.Element {
    return IconMount(props, ArrowLeftSvg);
}

export function FoodIcon(props: IconsType): JSX.Element {
    return IconMount(props, FoodSvg);
}

export function HotelIcon(props: IconsType): JSX.Element {
    return IconMount(props, HotelSvg);
}

export function SunIcon(props: IconsType): JSX.Element {
    return IconMount(props, SunSvg);
}

export function LandmarkIcon(props: IconsType): JSX.Element {
    return IconMount(props, LandmarkSvg);
}

export function PhoneIcon(props: IconsType): JSX.Element {
    return IconMount(props, PhoneSvg);
}

export function ListIcon(props: IconsType): JSX.Element {
    return IconMount(props, ListSvg);
}

export function ContactIcon(props: IconsType): JSX.Element {
    return IconMount(props, ContactSvg);
}

export function QRCodeIcon(props: IconsType): JSX.Element {
    return IconMount(props, QRCodeSvg);
}

export function PinMapIcon(props: IconsType): JSX.Element {
    return IconMount(props, PinMapSvg);
}

export function ClockIcon(props: IconsType): JSX.Element {
    return IconMount(props, ClockSvg);
}

export function ShareIcon(props: IconsType): JSX.Element {
    return IconMount(props, ShareSvg);
}

export function ArrowLeftSolidIcon(props: IconsType): JSX.Element {
    return IconMount(props, ArrowLeftSolidSvg);
}

export function CarIcon(props: IconsType): JSX.Element {
    return IconMount(props, CarSvg);
}

export function WifiIcon(props: IconsType): JSX.Element {
    return IconMount(props, WifiSvg);
}

export function PoolIcon(props: IconsType): JSX.Element {
    return IconMount(props, PoolSvg);
}

export function PetIcon(props: IconsType): JSX.Element {
    return IconMount(props, PetSvg);
}

export function BreakfastIcon(props: IconsType): JSX.Element {
    return IconMount(props, BreakfastSvg);
}

export function GymIcon(props: IconsType): JSX.Element {
    return IconMount(props, GymSvg);
}

export function LaundryIcon(props: IconsType): JSX.Element {
    return IconMount(props, LaundrySvg);
}

export function SafeBoxIcon(props: IconsType): JSX.Element {
    return IconMount(props, SafeBoxSvg);
}

export function AirConditionerIcon(props: IconsType): JSX.Element {
    return IconMount(props, AirConditionerSvg);
}

export function MapIcon(props: IconsType): JSX.Element {
    return IconMount(props, MapSvg);
}

export function FlashOnIcon(props: IconsType): JSX.Element {
    return IconMount(props, FlashOnSvg);
}

export function FlashOffIcon(props: IconsType): JSX.Element {
    return IconMount(props, FlashOffSvg);
}

export function QrCodeScannerIcon(props: IconsType): JSX.Element {
    return IconMount(props, QrCodeScannerSvg);
}

export function CloseIcon(props: IconsType): JSX.Element {
    return IconMount(props, CloseSvg);
}

function IconMount(
    { fill, size, name, sizeMultiplier }: IconsType,
    Icon: React.FC<SvgProps>
): JSX.Element {
    const thisSize = sizeMultiplier ? metrics.screenWidth * sizeMultiplier : size || defaultSize;
    return <Icon width={thisSize} height={thisSize} fill={fill ?? 'white'} key={name} />;
}
