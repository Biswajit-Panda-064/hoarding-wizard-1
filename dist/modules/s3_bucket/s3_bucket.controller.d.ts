import { S3BucketService } from './s3_bucket.service';
export declare class S3BucketController {
    private readonly s3Service;
    constructor(s3Service: S3BucketService);
    getUploadUrl(body: {
        fileName: string;
        contentType: string;
    }): Promise<{
        uploadUrl: string;
    }>;
}
