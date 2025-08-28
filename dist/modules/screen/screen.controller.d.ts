import { ScreenService } from './screen.service';
import { S3BucketService } from '../s3_bucket/s3_bucket.service';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
export declare class ScreenController {
    private readonly screenService;
    private readonly s3Service;
    constructor(screenService: ScreenService, s3Service: S3BucketService);
    create(dto: CreateScreenDto, userId: number, file?: Express.MulterS3.File): Promise<{
        message: string;
        data: import("./screen.entity").Screen;
    }>;
    findAll(page?: number, vendorId?: number, cityId?: number, categoryId?: number, placeId?: number): Promise<{
        message: string;
        data: import("./screen.entity").Screen[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findById(id: number): Promise<import("./screen.entity").Screen>;
    update(id: number, dto: UpdateScreenDto, file?: Express.MulterS3.File): Promise<{
        message: string;
        data: import("./screen.entity").Screen;
    }>;
    softDelete(id: number): Promise<import("./screen.entity").Screen>;
    toggleActive(id: number): Promise<import("./screen.entity").Screen>;
}
