import { Linking } from 'react-native';

export interface EmailType {
    to: string;
    subject: string;
    body: string;
}

export async function sendEmail(emailType: EmailType) {
    let url = `mailto:${emailType.to}`;

    const query = JSON.stringify(emailType);

    url += `?to=${emailType.to}&subject=${emailType.subject}&body=${emailType.body}`;

    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
}
