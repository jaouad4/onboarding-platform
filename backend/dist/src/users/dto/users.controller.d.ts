import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUsersDto } from './dto/list-users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<{
        success: boolean;
        data: any;
        message: string;
    }>;
    findAll(query: ListUsersDto): Promise<{
        success: boolean;
        data: any;
        message: null;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: any;
        message: null;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        success: boolean;
        data: any;
        message: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        data: null;
        message: any;
    }>;
}
