export interface MenuItem {
  name: string;
  price: number;
  description: string;
  image: string;
  category?: string;
}


export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string | null;
  notifications: {
    orderStatuses: boolean;
    passwordChanges: boolean;
    specialOffers: boolean;
    newsletter: boolean;
  };
}