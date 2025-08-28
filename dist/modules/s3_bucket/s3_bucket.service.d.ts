import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
export declare class S3BucketService {
    private configService;
    private readonly s3Client;
    private readonly bucket;
    constructor(configService: ConfigService);
    getUploadUrl(fileName: string, contentType: string): Promise<string>;
    getClient(): S3Client;
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
        key: string;
    }>;
    deleteFile(key: string): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
}
