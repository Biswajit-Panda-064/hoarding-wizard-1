import { PlaceCategoryService } from './place_category.service';
import { CreatePlaceCategoryDto } from './dto/create-place-category.dto';
import { UpdatePlaceCategoryDto } from './dto/update-place-category.dto';
export declare class PlaceCategoryController {
    private readonly placeCategoryService;
    constructor(placeCategoryService: PlaceCategoryService);
    create(dto: CreatePlaceCategoryDto, userId: number): Promise<{
        message: string;
        data: import("./place_category.entity").PlaceCategory;
    }>;
    findAll(): Promise<{
        message: string;
        data: import("./place_category.entity").PlaceCategory[];
    }>;
    findOne(id: number): Promise<{
        message: string;
        data: import("./place_category.entity").PlaceCategory;
    }>;
    update(id: number, dto: UpdatePlaceCategoryDto): Promise<{
        message: string;
        data: import("./place_category.entity").PlaceCategory;
    }>;
    softDelete(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
