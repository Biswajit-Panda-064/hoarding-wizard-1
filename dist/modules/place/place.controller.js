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
exports.PlaceController = void 0;
const common_1 = require("@nestjs/common");
const place_service_1 = require("./place.service");
const create_place_dto_1 = require("./dto/create-place.dto");
const update_place_dto_1 = require("./dto/update-place.dto");
const current_user_decorator_1 = require("../../common/decorater/current-user.decorator");
const file_upload_interceptor_1 = require("../../common/intercepter/file-upload.interceptor");
const s3_bucket_service_1 = require("../s3_bucket/s3_bucket.service");
let PlaceController = class PlaceController {
    placeService;
    s3Service;
    constructor(placeService, s3Service) {
        this.placeService = placeService;
        this.s3Service = s3Service;
    }
    async create(createPlaceDto, userId, file) {
        const data = {
            ...createPlaceDto,
            createdBy: userId,
        };
        let result = await this.placeService.create(data);
        if (file) {
            const s3File = await this.s3Service.uploadFile(file);
            const updateData = {
                image: s3File.key,
            };
            result = await this.placeService.update(result.id, updateData);
        }
        return {
            message: 'Place added successfully',
            data: result,
        };
    }
    async findAll() {
        return this.placeService.findAll();
    }
    async findOne(id) {
        return this.placeService.findById(id);
    }
    async update(id, updatePlaceDto, file) {
        let image;
        if (file) {
            const oldPlace = await this.placeService.findById(id);
            if (oldPlace.image) {
                await this.s3Service.deleteFile(oldPlace.image);
            }
            const s3File = await this.s3Service.uploadFile(file);
            image = s3File.key;
        }
        const updateData = image ? { ...updatePlaceDto, image } : updatePlaceDto;
        return this.placeService.update(id, updateData);
    }
    async softDelete(id, userId) {
        const deletedPlace = await this.placeService.softDelete(id, userId);
        return {
            message: 'Place deleted successfully',
            success: true,
            data: deletedPlace
        };
    }
};
exports.PlaceController = PlaceController;
__decorate([
    (0, common_1.Post)(),
    (0, file_upload_interceptor_1.FileUploadInterceptor)({
        fieldName: 'file',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_place_dto_1.CreatePlaceDto, Number, Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, file_upload_interceptor_1.FileUploadInterceptor)({ fieldName: 'file' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_place_dto_1.UpdatePlaceDto, Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "softDelete", null);
exports.PlaceController = PlaceController = __decorate([
    (0, common_1.Controller)('places'),
    __metadata("design:paramtypes", [place_service_1.PlaceService,
        s3_bucket_service_1.S3BucketService])
], PlaceController);
//# sourceMappingURL=place.controller.js.map