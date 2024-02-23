import { Cat } from './cat';

export interface CatListEvent {
    cat?: Cat;
}

export interface CatNavigationEvent extends CatListEvent {
    path: string;
}

export interface CatModalEvent extends CatListEvent {
    width: string;
    height: string;
}
