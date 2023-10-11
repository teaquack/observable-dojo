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

  testSurvey(): void {
    this.loadSurveyMonkeyScript();
  }

  loadSurveyMonkeyScript(): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd3xyUJlWvMtw7U_2BKGrDbrODPuXXZ1EnPMYgSc1vyqaJ9.js';
    script.id = 'smcx-sdk';
    const surveyMonkeyDiv = document.getElementById('survey-monkey');
    // const surveyMonkeyDiv = document.body;
    if (surveyMonkeyDiv) {
      surveyMonkeyDiv.appendChild(script);
    } else {
      // Handle the case where the element with id "survey-monkey" is not found
      console.error('Element with id "survey-monkey" not found.');
    }
  }

}
