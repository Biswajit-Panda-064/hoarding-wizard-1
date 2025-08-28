"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3_bucket_module_1 = require("../s3_bucket/s3_bucket.module");
const s3_bucket_service_1 = require("../s3_bucket/s3_bucket.service");
const upload_file_controller_1 = require("./upload_file.controller");
const config_1 = require("@nestjs/config");
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            s3_bucket_module_1.S3BucketModule,
            platform_express_1.MulterModule.registerAsync({
                imports: [s3_bucket_module_1.S3BucketModule],
                inject: [s3_bucket_service_1.S3BucketService, config_1.ConfigService],
                useFactory: (s3Service, configService) => ({
                    storage: (0, multer_s3_1.default)({
                        s3: s3Service.getClient(),
                        bucket: configService.get('s3.bucket'),
                        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
                        key: (req, file, cb) => {
                            const uniqueName = `asset/${Date.now()}-${file.originalname}`;
                            cb(null, uniqueName);
                        },
                    }),
                }),
            }),
        ],
        controllers: [upload_file_controller_1.UploadController],
    })
], UploadModule);
//# sourceMappingURL=upload_file.module.js.map