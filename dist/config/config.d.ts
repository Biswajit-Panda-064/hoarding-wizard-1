declare const _default: () => {
    app: {
        port: string | number;
        name: string;
    };
    database: {
        host: string | undefined;
        port: string | number;
        user: string | undefined;
        password: string | undefined;
        name: string | undefined;
    };
    auth: {
        jwtSecret: string | undefined;
        expiresIn: string;
    };
    s3: {
        bucket: string | undefined;
        region: string | undefined;
        accessKey: string | undefined;
        secretKey: string | undefined;
    };
};
export default _default;
