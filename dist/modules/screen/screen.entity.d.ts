import { Vendor } from '../vendor/vendor.entity';
import { City } from '../city/city.entity';
import { PlaceCategory } from '../place_category/place_category.entity';
import { Place } from '../place/place.entity';
export declare class Screen {
    id: number;
    name: string;
    type: string;
    size: string;
    deviceId: string;
    slots: number;
    duration: number;
    image: string;
    vendorId: number;
    vendor: Vendor;
    cityId: number;
    city: City;
    categoryId: number;
    category: PlaceCategory;
    placeId: number;
    place: Place;
    isActive: boolean;
    createdBy: number;
    updatedBy: number;
    createdAt: Date;
    updatedAt: Date;
}
