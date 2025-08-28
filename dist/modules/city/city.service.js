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
exports.CityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const city_entity_1 = require("./city.entity");
let CityService = class CityService {
    cityRepository;
    constructor(cityRepository) {
        this.cityRepository = cityRepository;
    }
    async createCity(cityName, createdBy) {
        const existing = await this.cityRepository.findOne({ where: { cityName } });
        if (existing) {
            throw new common_1.ConflictException(`City with name '${cityName}' already exists`);
        }
        const city = this.cityRepository.create({
            cityName,
            createdBy,
        });
        return await this.cityRepository.save(city);
    }
    async getAllCities() {
        return await this.cityRepository.find({ where: { isActive: true } });
    }
    async getCityById(id) {
        const city = await this.cityRepository.findOne({ where: { id } });
        if (!city) {
            throw new common_1.NotFoundException(`City with id ${id} not found`);
        }
        return city;
    }
    async updateCity(id, cityName, updatedBy) {
        const city = await this.getCityById(id);
        if (cityName !== undefined)
            city.cityName = cityName;
        if (updatedBy !== undefined)
            city.updatedBy = updatedBy;
        return await this.cityRepository.save(city);
    }
    async deleteCity(id, updatedBy) {
        const city = await this.getCityById(id);
        city.isActive = false;
        if (updatedBy !== undefined)
            city.updatedBy = updatedBy;
        return await this.cityRepository.save(city);
    }
};
exports.CityService = CityService;
exports.CityService = CityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(city_entity_1.City)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CityService);
//# sourceMappingURL=city.service.js.map