import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Cat } from './cat';
import { CatData } from './cat-data';

export class AppData implements InMemoryDbService {

  createDb(): { cats: Cat[] } {
    const cats = CatData.cats;
    return { cats };
  }
}
