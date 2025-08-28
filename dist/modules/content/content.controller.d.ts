import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { S3BucketService } from '../s3_bucket/s3_bucket.service';
export declare class ContentController {
    private readonly contentService;
    private readonly s3Service;
    constructor(contentService: ContentService, s3Service: S3BucketService);
    create(dto: CreateContentDto, userId: number, file?: Express.MulterS3.File): Promise<import("./content.entity").Content>;
    findAll(page?: number, limit?: number): Promise<import("./content.entity").Content[]>;
    findById(id: number): Promise<import("./content.entity").Content>;
    update(id: number, dto: UpdateContentDto, userId: number, file?: Express.MulterS3.File): Promise<import("./content.entity").Content>;
    hardDelete(id: number): Promise<{
        message: string;
    }>;
}
