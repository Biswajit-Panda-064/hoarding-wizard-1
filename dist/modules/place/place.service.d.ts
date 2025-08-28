import { Repository } from 'typeorm';
import { Place } from './place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
export declare class PlaceService {
    private readonly placeRepository;
    constructor(placeRepository: Repository<Place>);
    create(createPlaceDto: CreatePlaceDto): Promise<Place>;
    findAll(): Promise<Place[]>;
    findById(id: number): Promise<Place>;
    update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<Place>;
    softDelete(id: number, userId: number): Promise<Place>;
}
