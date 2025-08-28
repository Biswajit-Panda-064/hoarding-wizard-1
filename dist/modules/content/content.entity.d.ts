import { Advertiser } from '../advertiser/advertiser.entity';
export declare class Content {
    id: number;
    advertiserId: number;
    advertiser: Advertiser;
    title: string;
    type: 'image' | 'video';
    description?: string;
    status: 'pending' | 'approved' | 'rejected';
    remark?: string;
    url?: string;
    isActive: boolean;
    createdBy?: number;
    updatedBy?: number;
    createdAt: Date;
    updatedAt: Date;
}
