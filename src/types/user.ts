import { Address } from "cluster";

declare global {
    interface User {
      name: string | null;
      email: string | null;
      photoURL: string | null;
      address: Address[] | null;
      wallet: number | null;
      eventsId: [];
      following: [];
      orders: [];
      role: "User";
    }
    interface Organization {
      name: string | null;
      email: string | null;
      photoURL: string | null;
      address: string | null;
      followers: [];
      events: [];
      role: "Organization"
    }
    interface DeliveryPerson {
      name: string | null;
      email: string | null;
      photoURL: string | null;
      organizationId: string | null;
      rating: number | null;
      assigned_work: [];
      address: string,
      code: number,
      role: "DeliveryPerson"
    }
}
  