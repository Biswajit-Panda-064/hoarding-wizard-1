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
exports.AdvertiserController = void 0;
const common_1 = require("@nestjs/common");
const advertiser_service_1 = require("./advertiser.service");
const update_advertiser_dto_1 = require("./dto/update-advertiser.dto");
const pagination_dto_1 = require("./dto/pagination.dto");
const file_upload_interceptor_1 = require("../../common/intercepter/file-upload.interceptor");
const current_user_decorator_1 = require("../../common/decorater/current-user.decorator");
const s3_bucket_service_1 = require("../s3_bucket/s3_bucket.service");
let AdvertiserController = class AdvertiserController {
    advertiserService;
    s3Service;
    constructor(advertiserService, s3Service) {
        this.advertiserService = advertiserService;
        this.s3Service = s3Service;
    }
    async findAll(status = 'all', paginationDto) {
        const result = await this.advertiserService.findAll(status, paginationDto);
        return {
            message: "Advertiser details fetched successfully",
            success: true,
            ...result
        };
    }
    async findOne(id) {
        const result = await this.advertiserService.findById(id);
        return {
            message: "vendor details fetch successful",
            data: result
        };
    }
    async update(id, updateAdvertiserDto, userId, file) {
        const data = {
            ...updateAdvertiserDto,
            updatedBy: userId,
        };
        const result = await this.advertiserService.update(id, data);
        if (file) {
            const oldImage = await this.advertiserService.findById(id);
            if (oldImage.logo) {
                await this.s3Service.deleteFile(oldImage.logo);
            }
            const s3File = await this.s3Service.uploadFile(file);
            const logoUpdate = {
                logo: s3File.key,
            };
            const updatedWithFile = await this.advertiserService.update(id, logoUpdate);
            return {
                message: "Advertiser updated successfully",
                data: updatedWithFile,
            };
        }
        return {
            message: "Advertiser updated successfully",
            data: result,
        };
    }
    async activateAdvertiser(id, userId) {
        const result = await this.advertiserService.toggleStatus(id, userId);
        return {
            message: 'Advertiser activated successfully',
            data: result
        };
    }
    async softDelete(id, userId) {
        const deleteData = await this.advertiserService.softDelete(id, userId);
        return {
            message: 'Advertiser deleted successfully',
            data: deleteData
        };
    }
};
exports.AdvertiserController = AdvertiserController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], AdvertiserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdvertiserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, file_upload_interceptor_1.FileUploadInterceptor)({
        fieldName: 'file',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('userId')),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_advertiser_dto_1.UpdateAdvertiserDto, Number, Object]),
    __metadata("design:returntype", Promise)
], AdvertiserController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/activate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdvertiserController.prototype, "activateAdvertiser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdvertiserController.prototype, "softDelete", null);
exports.AdvertiserController = AdvertiserController = __decorate([
    (0, common_1.Controller)('advertisers'),
    __metadata("design:paramtypes", [advertiser_service_1.AdvertiserService,
        s3_bucket_service_1.S3BucketService])
], AdvertiserController);
//# sourceMappingURL=advertiser.controller.js.map