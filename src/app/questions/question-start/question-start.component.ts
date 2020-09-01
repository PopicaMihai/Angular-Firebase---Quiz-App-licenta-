import { Component, OnInit } from '@angular/core';
import { SectionsService } from '../sections/sections.service';
import { Section } from 'src/app/shared/section.model';

@Component({
  selector: 'app-question-start',
  templateUrl: './question-start.component.html',
  styleUrls: ['./question-start.component.css']
})
export class QuestionStartComponent implements OnInit {
  sections: Section[];
  constructor() { }
    ngOnInit(): void {
      SectionsService.sectionSubject.subscribe((sections) => {
        this.sections = sections;
      });
    }

}
