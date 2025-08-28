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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3BucketController = void 0;
const common_1 = require("@nestjs/common");
const s3_bucket_service_1 = require("./s3_bucket.service");
const public_decorator_1 = require("../../common/decorater/public.decorator");
let S3BucketController = class S3BucketController {
    s3Service;
    constructor(s3Service) {
        this.s3Service = s3Service;
    }
    async getUploadUrl(body) {
        const url = await this.s3Service.getUploadUrl(body.fileName, body.contentType);
        return { uploadUrl: url };
    }
};
exports.S3BucketController = S3BucketController;
__decorate([
    (0, common_1.Post)('upload-url'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], S3BucketController.prototype, "getUploadUrl", null);
exports.S3BucketController = S3BucketController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('s3'),
    __metadata("design:paramtypes", [s3_bucket_service_1.S3BucketService])
], S3BucketController);
//# sourceMappingURL=s3_bucket.controller.js.map