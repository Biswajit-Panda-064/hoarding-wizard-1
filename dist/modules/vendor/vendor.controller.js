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
exports.VendorController = void 0;
const common_1 = require("@nestjs/common");
const vendor_service_1 = require("./vendor.service");
const create_vendor_dto_1 = require("./dto/create-vendor.dto");
const update_vendor_dto_1 = require("./dto/update-vendor.dto");
const pagination_dto_1 = require("./dto/pagination.dto");
const current_user_decorator_1 = require("../../common/decorater/current-user.decorator");
const s3_bucket_service_1 = require("../s3_bucket/s3_bucket.service");
const file_upload_interceptor_1 = require("../../common/intercepter/file-upload.interceptor");
let VendorController = class VendorController {
    vendorService;
    s3Service;
    constructor(vendorService, s3Service) {
        this.vendorService = vendorService;
        this.s3Service = s3Service;
    }
    async create(createVendorDto, userId, file) {
        const data = {
            ...createVendorDto,
            createdBy: userId,
        };
        let result = await this.vendorService.create(data);
        if (file) {
            const s3File = await this.s3Service.uploadFile(file);
            const logoData = {
                logo: s3File.key,
            };
            result = await this.vendorService.update(result.id, logoData);
        }
        return {
            message: 'Vendor added successfully',
            data: result,
        };
    }
    async findOne(id) {
        const result = await this.vendorService.findById(id);
        return {
            message: "vendor details fetch successful",
            data: result
        };
    }
    async findAll(status = 'all', paginationDto) {
        const result = await this.vendorService.findAll(status, paginationDto);
        return {
            message: "Vendor details fetched successfully",
            success: true,
            ...result
        };
    }
    async update(id, updateVendorDto, userId, file) {
        const vendorData = {
            ...updateVendorDto,
            updatedBy: userId,
        };
        const data = await this.vendorService.update(id, vendorData);
        if (file) {
            const oldPlace = await this.vendorService.findById(id);
            if (oldPlace.logo) {
                await this.s3Service.deleteFile(oldPlace.logo);
            }
            const s3File = await this.s3Service.uploadFile(file);
            const logoUpdate = {
                logo: s3File.key,
            };
            const updatedWithFile = await this.vendorService.update(id, logoUpdate);
            return {
                message: 'Vendor updated successfully',
                data: updatedWithFile,
            };
        }
        return {
            message: 'Vendor updated successfully',
            data,
        };
    }
    async activateVendor(id, userId) {
        console.log('hi');
        const result = await this.vendorService.toggleStatus(id, userId);
        return {
            message: 'Vendor activated successfully',
            data: result
        };
    }
    async softDelete(id, userId) {
        const deletedData = await this.vendorService.softDelete(id, userId);
        return {
            message: 'Vendor deleted successfully',
            data: deletedData
        };
    }
};
exports.VendorController = VendorController;
__decorate([
    (0, common_1.Post)(),
    (0, file_upload_interceptor_1.FileUploadInterceptor)({
        fieldName: 'file',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vendor_dto_1.CreateVendorDto, Number, Object]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "findAll", null);
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
    __metadata("design:paramtypes", [Number, update_vendor_dto_1.UpdateVendorDto, Number, Object]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/activate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "activateVendor", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "softDelete", null);
exports.VendorController = VendorController = __decorate([
    (0, common_1.Controller)('vendors'),
    __metadata("design:paramtypes", [vendor_service_1.VendorService,
        s3_bucket_service_1.S3BucketService])
], VendorController);
//# sourceMappingURL=vendor.controller.js.map