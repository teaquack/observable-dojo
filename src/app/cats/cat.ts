import { Handler } from "../handlers/handler";

export interface Cat {
    id: number;
    created_at: Date;
    name: string;
    breed: string;
    color: string;
    birthdate: Date;
    imageUrl: string;
    age: number;
    handlers: Handler[];
}
