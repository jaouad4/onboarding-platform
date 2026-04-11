export declare enum Domain {
    TECHNIQUE = "TECHNIQUE",
    COMMERCE = "COMMERCE",
    MARKETING = "MARKETING",
    FINANCE = "FINANCE",
    RH = "RH"
}
export declare enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email?: string;
    domain: Domain;
    role?: Role;
}
