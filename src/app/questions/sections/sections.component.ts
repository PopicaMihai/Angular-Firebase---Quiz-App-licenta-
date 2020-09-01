import { Component, OnInit } from '@angular/core';
import { Week } from 'src/app/shared/weeks.model';
import { Section } from 'src/app/shared/section.model';
import { SectionsService } from './sections.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  week: Week;
  weeks: Array<Week>;
  sections: Section[];
  sectionsFB = [];
  currentSection;

  constructor() { }

  ngOnInit() {
    SectionsService.sectionSubject.subscribe((sections) => {
      this.sections = sections;
    });
  }

  returnCurrentSection(section) {
    return this.currentSection = section;
  }

}
