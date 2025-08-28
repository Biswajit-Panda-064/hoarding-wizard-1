interface FileUploadOptions {
    fieldName: string;
    maxSize?: number;
    allowedTypes?: string[];
}
export declare function FileUploadInterceptor(options: FileUploadOptions): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
