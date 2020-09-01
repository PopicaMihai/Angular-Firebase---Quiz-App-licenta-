import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/question.model';
import { Answer } from 'src/app/shared/answer.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuestionService } from '../question.service';


@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  question: any;
  id: number;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router) { }


  onEditQuestion() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteQuestion() {
    this.questionService.deleteQuestion(this.id);
    // this.router.navigate(['/questions']);
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          // debugger;
          this.question = this.questionService.getQuestion(this.id);
          console.log(this.question);
        }
      )
  }
}
