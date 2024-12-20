import { Timestamp } from "@firebase/firestore";

export interface Event {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    date: string | Timestamp;
    companyName?: string;
    time: string;
    location: string;
    image: string;
    potentialEarnings?: number;
    registered? :number
}