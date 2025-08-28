"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3BucketService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let S3BucketService = class S3BucketService {
    configService;
    s3Client;
    bucket;
    constructor(configService) {
        this.configService = configService;
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.get('s3.region'),
            credentials: {
                accessKeyId: this.configService.get('s3.accessKey'),
                secretAccessKey: this.configService.get('s3.secretKey'),
            },
        });
        this.bucket = this.configService.get('s3.bucket');
    }
    async getUploadUrl(fileName, contentType) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: fileName,
            ContentType: contentType,
        });
        return await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn: 3600 });
    }
    getClient() {
        return this.s3Client;
    }
    async uploadFile(file) {
        const key = `asset/${Date.now()}-${file.originalname}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        await this.s3Client.send(command);
        return {
            url: `https://${this.bucket}.s3.${this.configService.get('s3.region')}.amazonaws.com/${key}`,
            key,
        };
    }
    async deleteFile(key) {
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });
        try {
            await this.s3Client.send(command);
            return { success: true, message: 'File deleted successfully' };
        }
        catch (error) {
            return { success: false, message: 'Error deleting file', error: error.message };
        }
    }
};
exports.S3BucketService = S3BucketService;
exports.S3BucketService = S3BucketService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3BucketService);
//# sourceMappingURL=s3_bucket.service.js.map