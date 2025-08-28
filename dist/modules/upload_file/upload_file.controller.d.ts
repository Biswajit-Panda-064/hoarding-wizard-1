export declare class UploadController {
    uploadFile(file: Express.MulterS3.File): {
        url: string;
        key: string;
    };
}
