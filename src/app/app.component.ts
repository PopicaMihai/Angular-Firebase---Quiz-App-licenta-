import { Component, OnInit } from '@angular/core';
import { SectionsService } from './questions/sections/sections.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private sectionService: SectionsService) {}
  ngOnInit(): void {
    this.sectionService.getObject();
  }
  
}
