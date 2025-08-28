"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertiserModule = void 0;
const common_1 = require("@nestjs/common");
const advertiser_controller_1 = require("./advertiser.controller");
const advertiser_service_1 = require("./advertiser.service");
const typeorm_1 = require("@nestjs/typeorm");
const advertiser_entity_1 = require("./advertiser.entity");
const s3_bucket_module_1 = require("../s3_bucket/s3_bucket.module");
let AdvertiserModule = class AdvertiserModule {
};
exports.AdvertiserModule = AdvertiserModule;
exports.AdvertiserModule = AdvertiserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([advertiser_entity_1.Advertiser]), s3_bucket_module_1.S3BucketModule],
        controllers: [advertiser_controller_1.AdvertiserController],
        providers: [advertiser_service_1.AdvertiserService],
        exports: [advertiser_service_1.AdvertiserService]
    })
], AdvertiserModule);
//# sourceMappingURL=advertiser.module.js.map