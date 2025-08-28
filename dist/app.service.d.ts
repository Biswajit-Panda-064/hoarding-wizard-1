interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
}
export declare class AppService {
    getHealthCheck(): HealthCheckResponse;
}
export {};
