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
exports.ScreenService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const screen_entity_1 = require("./screen.entity");
let ScreenService = class ScreenService {
    screenRepository;
    DEFAULT_LIMIT = 10;
    constructor(screenRepository) {
        this.screenRepository = screenRepository;
    }
    async create(data) {
        const existing = await this.screenRepository.findOne({ where: { deviceId: data.deviceId } });
        if (existing) {
            throw new common_1.ConflictException('device id already installed');
        }
        const screen = this.screenRepository.create(data);
        const result = await this.screenRepository.save(screen);
        return result;
    }
    async findAll(page = 1, filters = {}) {
        const query = {};
        if (filters.vendorId && filters.vendorId !== -1) {
            query.vendorId = filters.vendorId;
        }
        if (filters.cityId && filters.cityId !== -1) {
            query.cityId = filters.cityId;
        }
        if (filters.categoryId && filters.categoryId !== -1) {
            query.categoryId = filters.categoryId;
        }
        if (filters.placeId && filters.placeId !== -1) {
            query.placeId = filters.placeId;
        }
        const [data, total] = await this.screenRepository.findAndCount({
            where: query,
            skip: (page - 1) * this.DEFAULT_LIMIT,
            take: this.DEFAULT_LIMIT,
            order: { id: 'DESC' },
        });
        return {
            data,
            pagination: {
                total,
                page,
                limit: this.DEFAULT_LIMIT,
                totalPages: Math.ceil(total / this.DEFAULT_LIMIT),
            },
        };
    }
    async getActiveScreen(id) {
        const screen = await this.screenRepository.findOne({ where: { id, isActive: true } });
        if (!screen)
            throw new common_1.NotFoundException('Screen not found');
        return screen;
    }
    async findById(id) {
        const screen = await this.getActiveScreen(id);
        return screen;
    }
    async update(id, data) {
        const screen = await this.getActiveScreen(id);
        if (data.name && data.name !== screen.name) {
            const existing = await this.screenRepository.findOne({ where: { name: data.name } });
            if (existing) {
                throw new common_1.ConflictException('Screen name already exists');
            }
        }
        if (data.deviceId && data.deviceId !== screen.deviceId) {
            const existingDevice = await this.screenRepository.findOne({ where: { deviceId: data.deviceId } });
            if (existingDevice) {
                throw new common_1.ConflictException('Device ID already installed');
            }
        }
        Object.assign(screen, data);
        const result = await this.screenRepository.save(screen);
        return result;
    }
    async softDelete(id) {
        const screen = await this.getActiveScreen(id);
        screen.isActive = false;
        await this.screenRepository.save(screen);
        return screen;
    }
    async toggleActive(id) {
        const screen = await this.screenRepository.findOne({ where: { id } });
        if (!screen)
            throw new common_1.NotFoundException('Screen not found');
        screen.isActive = !screen.isActive;
        await this.screenRepository.save(screen);
        return screen;
    }
};
exports.ScreenService = ScreenService;
exports.ScreenService = ScreenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(screen_entity_1.Screen)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ScreenService);
//# sourceMappingURL=screen.service.js.map