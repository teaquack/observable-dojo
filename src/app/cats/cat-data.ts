import { Cat } from './cat';

export class CatData {

    static cats: Cat[] = [
        <Cat>{
            id: 1,
            name: 'Fluffy',
            color: 'White',
            breed: 'Persian',
            age: 3,
            imageUrl: 'assets/images/fluffy.jpg',
        },
        <Cat>{
            id: 2,
            name: 'Kitty',
            color: 'Black',
            breed: 'Siamese',
            age: 2,
            imageUrl: 'assets/images/sassy.jpg'
        },
        <Cat>{
            id: 3,
            name: 'Salem',
            color: 'Black',
            breed: 'Domestic Shorthair',
            age: 1,
            imageUrl: 'assets/images/salem.jpg'
        },
        <Cat>{
            id: 4,
            name: 'Tigger',
            color: 'Orange',
            breed: 'Tabby',
            age: 5,
            imageUrl: 'assets/images/tigger.jpg'
        }
    ];
}