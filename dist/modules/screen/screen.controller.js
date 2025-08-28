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
exports.ScreenController = void 0;
const common_1 = require("@nestjs/common");
const screen_service_1 = require("./screen.service");
const file_upload_interceptor_1 = require("../../common/intercepter/file-upload.interceptor");
const s3_bucket_service_1 = require("../s3_bucket/s3_bucket.service");
const create_screen_dto_1 = require("./dto/create-screen.dto");
const update_screen_dto_1 = require("./dto/update-screen.dto");
const current_user_decorator_1 = require("../../common/decorater/current-user.decorator");
let ScreenController = class ScreenController {
    screenService;
    s3Service;
    constructor(screenService, s3Service) {
        this.screenService = screenService;
        this.s3Service = s3Service;
    }
    async create(dto, userId, file) {
        let data = await this.screenService.create({ ...dto, createdBy: userId });
        if (file) {
            const s3File = await this.s3Service.uploadFile(file);
            const image = s3File.key;
            data = await this.screenService.update(data.id, { image });
        }
        return { message: 'Screen created', data };
    }
    async findAll(page = 1, vendorId = -1, cityId = -1, categoryId = -1, placeId = -1) {
        const { data, pagination } = await this.screenService.findAll(page, {
            vendorId,
            cityId,
            categoryId,
            placeId,
        });
        return { message: 'All screens fetched', data, pagination };
    }
    async findById(id) {
        return await this.screenService.findById(id);
    }
    async update(id, dto, file) {
        const data = await this.screenService.update(id, dto);
        if (file) {
            const oldImage = await this.screenService.findById(id);
            if (oldImage.image) {
                await this.s3Service.deleteFile(oldImage.image);
            }
            const s3File = await this.s3Service.uploadFile(file);
            const logoUpdate = {
                image: s3File.key,
            };
            const updatedWithFile = await this.screenService.update(id, logoUpdate);
            return {
                message: "Screen updated successfully",
                data: updatedWithFile,
            };
        }
        return { message: "Screen updated successfully", data };
    }
    async softDelete(id) {
        return await this.screenService.softDelete(id);
    }
    async toggleActive(id) {
        return await this.screenService.toggleActive(id);
    }
};
exports.ScreenController = ScreenController;
__decorate([
    (0, common_1.Post)(),
    (0, file_upload_interceptor_1.FileUploadInterceptor)({ fieldName: 'file' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_screen_dto_1.CreateScreenDto, Number, Object]),
    __metadata("design:returntype", Promise)
], ScreenController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('vendorId')),
    __param(2, (0, common_1.Query)('cityId')),
    __param(3, (0, common_1.Query)('categoryId')),
    __param(4, (0, common_1.Query)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ScreenController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ScreenController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, file_upload_interceptor_1.FileUploadInterceptor)({ fieldName: 'file' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_screen_dto_1.UpdateScreenDto, Object]),
    __metadata("design:returntype", Promise)
], ScreenController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ScreenController.prototype, "softDelete", null);
__decorate([
    (0, common_1.Put)(':id/toggle-active'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ScreenController.prototype, "toggleActive", null);
exports.ScreenController = ScreenController = __decorate([
    (0, common_1.Controller)('screens'),
    __metadata("design:paramtypes", [screen_service_1.ScreenService,
        s3_bucket_service_1.S3BucketService])
], ScreenController);
//# sourceMappingURL=screen.controller.js.map