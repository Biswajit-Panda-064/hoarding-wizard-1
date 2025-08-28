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
exports.PlaceCategoryController = void 0;
const common_1 = require("@nestjs/common");
const place_category_service_1 = require("./place_category.service");
const create_place_category_dto_1 = require("./dto/create-place-category.dto");
const update_place_category_dto_1 = require("./dto/update-place-category.dto");
const current_user_decorator_1 = require("../../common/decorater/current-user.decorator");
let PlaceCategoryController = class PlaceCategoryController {
    placeCategoryService;
    constructor(placeCategoryService) {
        this.placeCategoryService = placeCategoryService;
    }
    async create(dto, userId) {
        const data = await this.placeCategoryService.create({ ...dto, createdBy: userId });
        return { message: 'Place category created', data };
    }
    async findAll() {
        const data = await this.placeCategoryService.findAll();
        return { message: 'All place categories fetched', data };
    }
    async findOne(id) {
        const data = await this.placeCategoryService.findOne(id);
        return { message: 'Place category fetched', data };
    }
    async update(id, dto) {
        const data = await this.placeCategoryService.update(id, dto);
        return { message: 'Place category updated', data };
    }
    async softDelete(id) {
        const data = await this.placeCategoryService.softDelete(id);
        return { message: 'Place category deleted sucessful', data };
    }
};
exports.PlaceCategoryController = PlaceCategoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_place_category_dto_1.CreatePlaceCategoryDto, Number]),
    __metadata("design:returntype", Promise)
], PlaceCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlaceCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlaceCategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_place_category_dto_1.UpdatePlaceCategoryDto]),
    __metadata("design:returntype", Promise)
], PlaceCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlaceCategoryController.prototype, "softDelete", null);
exports.PlaceCategoryController = PlaceCategoryController = __decorate([
    (0, common_1.Controller)('place-categorys'),
    __metadata("design:paramtypes", [place_category_service_1.PlaceCategoryService])
], PlaceCategoryController);
//# sourceMappingURL=place_category.controller.js.map