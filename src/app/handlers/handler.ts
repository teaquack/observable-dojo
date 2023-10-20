import { Role } from "./role";

export interface Handler {
    id: number;
    created_at: Date;
    guid: string;
    firstName: string;
    lastName: string;
    role: Role;
    imageUrl: string;
    cat_id: number;
}