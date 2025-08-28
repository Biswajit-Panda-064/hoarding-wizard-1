import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './place.entity';
import { S3BucketService } from '../s3_bucket/s3_bucket.service';
export declare class PlaceController {
    private readonly placeService;
    private readonly s3Service;
    constructor(placeService: PlaceService, s3Service: S3BucketService);
    create(createPlaceDto: CreatePlaceDto, userId: number, file?: Express.MulterS3.File): Promise<any>;
    findAll(): Promise<Place[]>;
    findOne(id: number): Promise<Place>;
    update(id: number, updatePlaceDto: UpdatePlaceDto, file?: Express.MulterS3.File): Promise<Place>;
    softDelete(id: number, userId: number): Promise<any>;
}
