import { Repository } from 'typeorm';
import { PlaceCategory } from './place_category.entity';
export declare class PlaceCategoryService {
    private readonly placeCategoryRepository;
    constructor(placeCategoryRepository: Repository<PlaceCategory>);
    create(data: Partial<PlaceCategory>): Promise<PlaceCategory>;
    findAll(): Promise<PlaceCategory[]>;
    findOne(id: number): Promise<PlaceCategory>;
    update(id: number, data: Partial<PlaceCategory>): Promise<PlaceCategory>;
    softDelete(id: number): Promise<any>;
}
