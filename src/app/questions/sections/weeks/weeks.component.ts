import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Section } from 'src/app/shared/section.model';
import { SectionsService } from '../sections.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.css']
})
export class WeeksComponent implements OnInit {
  id: string;
  sections: Section[];
  public sectionIndex;
  constructor(private route: ActivatedRoute, private sectionService: SectionsService) { }

  ngOnInit() {
    this.route.params.pipe(switchMap(() => SectionsService.sectionSubject, (params, sections: Section[]) => {
      return [params, sections]
    })).subscribe(([params, sections]) => {
      this.id = params.id;
      this.sections = sections as Section[];

      sections.forEach((i,index) => {
        if (i.name === this.id) {
          this.sectionIndex = index;
          return;
        }
      })
    })
  }
}
