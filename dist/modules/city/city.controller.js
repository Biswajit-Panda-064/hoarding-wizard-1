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
exports.CityController = void 0;
const common_1 = require("@nestjs/common");
const city_service_1 = require("./city.service");
const current_user_decorator_1 = require("../../common/decorater/current-user.decorator");
let CityController = class CityController {
    cityService;
    constructor(cityService) {
        this.cityService = cityService;
    }
    async createCity(cityName, userId) {
        const data = await this.cityService.createCity(cityName, userId);
        return { message: 'City created successfully', data };
    }
    async getAllCities() {
        const data = await this.cityService.getAllCities();
        return { message: 'All cities fetched successfully', data };
    }
    async getCityById(id) {
        const data = await this.cityService.getCityById(id);
        return { message: 'City fetched successfully', data };
    }
    async updateCity(id, cityName, userId) {
        const data = await this.cityService.updateCity(id, cityName, userId);
        return { message: 'City updated successfully', data };
    }
    async deleteCity(id, userId) {
        const data = await this.cityService.deleteCity(id, userId);
        return { message: 'City deleted successfully', data };
    }
};
exports.CityController = CityController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('cityName')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "createCity", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CityController.prototype, "getAllCities", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "getCityById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('cityName')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "updateCity", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "deleteCity", null);
exports.CityController = CityController = __decorate([
    (0, common_1.Controller)('cities'),
    __metadata("design:paramtypes", [city_service_1.CityService])
], CityController);
//# sourceMappingURL=city.controller.js.map