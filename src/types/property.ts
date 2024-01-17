export interface Property {
  data: {
    id: string;
    userId: string;
    userName: string;
    name: string;
    address: string;
    neighborhood: string;
    business: string;
    price: number;
    description: string;
    bathrooms: number;
    bedrooms: number;
    garage: number;
    sqft: number;
    category: any;
    images: any[];
  }[];
}
