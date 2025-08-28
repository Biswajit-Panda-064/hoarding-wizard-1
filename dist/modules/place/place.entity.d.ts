import { Vendor } from '../vendor/vendor.entity';
import { City } from '../city/city.entity';
import { PlaceCategory } from '../place_category/place_category.entity';
export declare class Place {
    id: number;
    name: string;
    location: string;
    placeCoordinates: string;
    contactPerson: string;
    contactNo: string;
    noScreens: number;
    dailyFootfall?: number;
    vendor: Vendor;
    vendorId: number;
    city: City;
    cityId: number;
    category: PlaceCategory;
    categoryId: number;
    isActive: boolean;
    createdBy?: number;
    updatedBy?: number;
    createdAt: Date;
    updatedAt: Date;
    image: string;
}
