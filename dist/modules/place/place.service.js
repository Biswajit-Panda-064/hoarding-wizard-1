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
exports.PlaceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const place_entity_1 = require("./place.entity");
let PlaceService = class PlaceService {
    placeRepository;
    constructor(placeRepository) {
        this.placeRepository = placeRepository;
    }
    async create(createPlaceDto) {
        const { name, location, vendorId, cityId, categoryId } = createPlaceDto;
        const existing = await this.placeRepository.findOne({
            where: { name, location },
        });
        if (existing) {
            throw new common_1.ConflictException('Place already exists');
        }
        const place = this.placeRepository.create(createPlaceDto);
        return this.placeRepository.save(place);
    }
    async findAll() {
        return this.placeRepository.find({
            where: { isActive: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findById(id) {
        const place = await this.placeRepository.findOne({ where: { id, isActive: true } });
        if (!place) {
            throw new common_1.NotFoundException(`Place with ID ${id} not found`);
        }
        return place;
    }
    async update(id, updatePlaceDto) {
        const place = await this.findById(id);
        Object.assign(place, updatePlaceDto);
        return this.placeRepository.save(place);
    }
    async softDelete(id, userId) {
        const place = await this.placeRepository.findOne({
            where: { id }
        });
        if (!place) {
            throw new common_1.NotFoundException(`Place with ID ${id} not found`);
        }
        if (!place.isActive) {
            throw new common_1.ConflictException('Place is already inactive');
        }
        place.isActive = false;
        place.updatedBy = userId;
        return this.placeRepository.save(place);
    }
};
exports.PlaceService = PlaceService;
exports.PlaceService = PlaceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(place_entity_1.Place)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlaceService);
//# sourceMappingURL=place.service.js.map