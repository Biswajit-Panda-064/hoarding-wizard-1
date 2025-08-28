import { Repository } from 'typeorm';
import { Content } from './content.entity';
export declare class ContentService {
    private readonly contentRepository;
    constructor(contentRepository: Repository<Content>);
    create(data: Partial<Content>): Promise<Content>;
    findAll(page?: number, limit?: number): Promise<Content[]>;
    findById(id: number): Promise<Content>;
    update(id: number, data: Partial<Content>): Promise<Content>;
    softDelete(id: number): Promise<Content>;
    hardDelete(id: number): Promise<boolean>;
}
