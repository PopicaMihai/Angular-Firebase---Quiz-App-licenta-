import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { Question } from '../../shared/question.model';
import { QuestionService } from '../question.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { SectionsService } from '../sections/sections.service';
import { switchMap } from 'rxjs/operators';
import { Section } from 'src/app/shared/section.model';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})

export class QuestionListComponent implements OnInit, OnDestroy {
  sections: Section[] = [];
  id:string;
  questions: Question[] = [];
  subscription: Subscription;
  currentWeek: any;
  currentSection: any;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    
    SectionsService.sectionSubject.subscribe((sections) => {
      this.sections = sections;
      
    });

    combineLatest(
      this.route.parent.params,
      this.route.params
      ).pipe(switchMap(() => SectionsService.sectionSubject, (params, sections) => {
        let questions: Question[] = [];
        this.currentWeek = params[1];
        this.currentSection = params[0]; 
        if(Array.isArray(sections) && sections.length) {
          questions = sections.filter((item) => {
            return item.name === this.currentSection.id;
          })[0].weeks.filter((item) => {
            return item.name === this.currentWeek.id;
          })[0].questions;
        }
       return questions;
      })).subscribe((questions: Question[]) => {
        this.questionService.activeQuestionList(questions);
        this.questions = questions;}
      );
    console.log(this.sections);
    
    console.log(this.sections);
    

    this.route.params.
      subscribe((params: Params) => {
        this.id = params.id
    });

    this.subscription = this.questionService.questionChanged.subscribe(
        (questions: Question[]) => {
          this.questions = questions;
        }
      )
  }

  onNewQuestion() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
