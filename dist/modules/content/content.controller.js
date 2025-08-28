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
exports.ContentController = void 0;
const common_1 = require("@nestjs/common");
const content_service_1 = require("./content.service");
const create_content_dto_1 = require("./dto/create-content.dto");
const update_content_dto_1 = require("./dto/update-content.dto");
const file_upload_interceptor_1 = require("../../common/intercepter/file-upload.interceptor");
const s3_bucket_service_1 = require("../s3_bucket/s3_bucket.service");
const current_user_decorator_1 = require("../../common/decorater/current-user.decorator");
let ContentController = class ContentController {
    contentService;
    s3Service;
    constructor(contentService, s3Service) {
        this.contentService = contentService;
        this.s3Service = s3Service;
    }
    async create(dto, userId, file) {
        let url;
        if (file) {
            const s3File = await this.s3Service.uploadFile(file);
            url = s3File.url;
        }
        const data = await this.contentService.create({ ...dto, url, createdBy: userId });
        return data;
    }
    async findAll(page = 1, limit = 10) {
        return await this.contentService.findAll(page, limit);
    }
    async findById(id) {
        return await this.contentService.findById(id);
    }
    async update(id, dto, userId, file) {
        let url;
        if (file) {
            const prevContent = await this.contentService.findById(id);
            if (prevContent.url) {
                await this.s3Service.deleteFile(prevContent.url);
            }
            const s3File = await this.s3Service.uploadFile(file);
            url = s3File.url;
        }
        const data = await this.contentService.update(id, url ? { ...dto, url, updatedBy: userId } : { ...dto, updatedBy: userId });
        return data;
    }
    async hardDelete(id) {
        const content = await this.contentService.findById(id);
        if (content.url) {
            await this.s3Service.deleteFile(content.url);
        }
        await this.contentService.hardDelete(id);
        return { message: 'Content and file deleted successfully' };
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, common_1.Post)(),
    (0, file_upload_interceptor_1.FileUploadInterceptor)({ fieldName: 'file' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_content_dto_1.CreateContentDto, Number, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)('page')),
    __param(1, (0, common_1.Body)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, file_upload_interceptor_1.FileUploadInterceptor)({ fieldName: 'file' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('userId')),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_content_dto_1.UpdateContentDto, Number, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "hardDelete", null);
exports.ContentController = ContentController = __decorate([
    (0, common_1.Controller)('contents'),
    __metadata("design:paramtypes", [content_service_1.ContentService,
        s3_bucket_service_1.S3BucketService])
], ContentController);
//# sourceMappingURL=content.controller.js.map