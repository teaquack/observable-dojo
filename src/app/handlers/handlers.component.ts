import { Component, OnInit } from '@angular/core';
import { Handler } from './handler';
import { Observable } from 'rxjs';
import { HandlerService } from './handler.service';

@Component({
  selector: 'dojo-handlers',
  templateUrl: './handlers.component.html',
  styleUrls: ['./handlers.component.css']
})
export class HandlersComponent implements OnInit {  
  catHandlers$!: Observable<Handler[]>;
  
  constructor(private handlerService: HandlerService) {}

  ngOnInit(): void {
    this.catHandlers$ = this.handlerService.getCatHandlers(1);
  }
}
