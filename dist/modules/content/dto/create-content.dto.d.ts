export declare class CreateContentDto {
    advertiserId: number;
    title: string;
    type: 'image' | 'video';
    url?: string;
    status?: 'pending' | 'approved' | 'rejected';
    remark?: string;
    description?: string;
    isActive?: boolean;
    createdBy?: number;
    updatedBy?: number;
}
