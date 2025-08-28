"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertiserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const advertiser_entity_1 = require("./advertiser.entity");
const pagination_dto_1 = require("./dto/pagination.dto");
let AdvertiserService = class AdvertiserService {
    advertiserRepository;
    constructor(advertiserRepository) {
        this.advertiserRepository = advertiserRepository;
    }
    async findByEmail(email) {
        return this.advertiserRepository.findOne({ where: { email } });
    }
    async create(createAdvertiserDto) {
        const { email, password, ...rest } = createAdvertiserDto;
        const existing = await this.findByEmail(email);
        if (existing) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const advertiser = this.advertiserRepository.create({
            ...rest,
            email,
            password: hashedPassword,
        });
        return this.advertiserRepository.save(advertiser);
    }
    async findById(id) {
        const advertiser = await this.advertiserRepository.findOne({ where: { id, isActive: true } });
        if (!advertiser) {
            throw new common_1.NotFoundException(`Advertiser with ID ${id} not found`);
        }
        return advertiser;
    }
    async update(id, updateAdvertiserDto) {
        const advertiser = await this.findById(id);
        if (updateAdvertiserDto.email && updateAdvertiserDto.email !== advertiser.email) {
            const existing = await this.advertiserRepository.findOne({ where: { email: updateAdvertiserDto.email } });
            if (existing && existing.id !== id) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        if (updateAdvertiserDto.password) {
            updateAdvertiserDto.password = await bcrypt.hash(updateAdvertiserDto.password, 10);
        }
        await this.advertiserRepository.update(id, updateAdvertiserDto);
        return this.findById(id);
    }
    async softDelete(id, userId) {
        const advertiser = await this.advertiserRepository.findOne({
            where: { id }
        });
        if (!advertiser) {
            throw new common_1.NotFoundException(`Advertiser with ID ${id} not found`);
        }
        if (!advertiser.isActive) {
            throw new common_1.ConflictException('Advertiser is already inactive');
        }
        advertiser.isActive = false;
        advertiser.updatedBy = userId;
        await this.advertiserRepository.save(advertiser);
        return advertiser;
    }
    async toggleStatus(id, userId) {
        const advertiser = await this.advertiserRepository.findOne({
            where: { id }
        });
        if (!advertiser) {
            throw new common_1.NotFoundException(`Advertiser with ID ${id} not found`);
        }
        if (advertiser.isActive) {
            throw new common_1.ConflictException('Advertiser is already active');
        }
        advertiser.isActive = true;
        advertiser.updatedBy = userId;
        return this.advertiserRepository.save(advertiser);
    }
    async findAll(status = 'all', paginationDto = new pagination_dto_1.PaginationDto()) {
        let { page = 1, limit = 10 } = paginationDto;
        limit = Math.min(limit, pagination_dto_1.PaginationDto.MAX_LIMIT);
        const skip = (page - 1) * limit;
        let where = {};
        if (status === 'active') {
            where = { isActive: true };
        }
        else if (status === 'inactive') {
            where = { isActive: false };
        }
        const [counts, [data, filteredTotal]] = await Promise.all([
            Promise.all([
                this.advertiserRepository.count(),
                this.advertiserRepository.count({ where: { isActive: true } }),
                this.advertiserRepository.count({ where: { isActive: false } })
            ]),
            this.advertiserRepository.findAndCount({
                where,
                skip,
                take: limit,
                order: { createdAt: 'DESC' }
            })
        ]);
        const [total, active, inactive] = counts;
        const totalPages = Math.ceil(filteredTotal / limit);
        return {
            data,
            pagination: {
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            },
            aggregation: { total, active, inactive }
        };
    }
};
exports.AdvertiserService = AdvertiserService;
exports.AdvertiserService = AdvertiserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(advertiser_entity_1.Advertiser)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdvertiserService);
//# sourceMappingURL=advertiser.service.js.map