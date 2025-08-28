"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenModule = void 0;
const common_1 = require("@nestjs/common");
const screen_service_1 = require("./screen.service");
const screen_entity_1 = require("./screen.entity");
const typeorm_1 = require("@nestjs/typeorm");
const s3_bucket_module_1 = require("../s3_bucket/s3_bucket.module");
const screen_controller_1 = require("./screen.controller");
let ScreenModule = class ScreenModule {
};
exports.ScreenModule = ScreenModule;
exports.ScreenModule = ScreenModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([screen_entity_1.Screen]), s3_bucket_module_1.S3BucketModule],
        providers: [screen_service_1.ScreenService],
        controllers: [screen_controller_1.ScreenController]
    })
], ScreenModule);
//# sourceMappingURL=screen.module.js.map