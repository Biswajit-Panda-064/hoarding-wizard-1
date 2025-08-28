import { CityService } from './city.service';
import { City } from './city.entity';
export declare class CityController {
    private readonly cityService;
    constructor(cityService: CityService);
    createCity(cityName: string, userId: number): Promise<{
        message: string;
        data: City;
    }>;
    getAllCities(): Promise<{
        message: string;
        data: City[];
    }>;
    getCityById(id: number): Promise<{
        message: string;
        data: City;
    }>;
    updateCity(id: number, cityName: string, userId: number): Promise<{
        message: string;
        data: City;
    }>;
    deleteCity(id: number, userId: number): Promise<{
        message: string;
        data: City;
    }>;
}
