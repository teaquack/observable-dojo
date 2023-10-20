import { Component } from '@angular/core';
import { CatService } from './cat.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'dojo-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent {
  pageTitle = 'Look at all them cats!';
  cats$ = this.catService.cats$;
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private catService: CatService) {  };

  displayCats(): string {
    return '😻😼😹🙀';
  }

  getAge(birthdate: Date): number {
    const today = new Date();
    const birthdateDate = new Date(birthdate);
    let age = today.getFullYear() - birthdateDate.getFullYear();
    birthdateDate.setFullYear(today.getFullYear());
    if (birthdateDate > today) {
      age--;
    }
    return age;
  }

}
