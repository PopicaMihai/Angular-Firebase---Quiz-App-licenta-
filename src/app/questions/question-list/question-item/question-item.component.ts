import { Component, OnInit, Input} from '@angular/core';
import { Question } from 'src/app/shared/question.model';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.css']
})
export class QuestionItemComponent implements OnInit {
  @Input() question: Question;
  @Input() index: number;

  ngOnInit() {
  }

}
