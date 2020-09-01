import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Answer } from 'src/app/shared/answer.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.css']
})
export class AnswerDetailComponent implements OnInit {
  @Output() answerAdded = new EventEmitter<Answer>();

  constructor() { }

  onAddAnswer(form: NgForm) {
    const value = form.value;
    const newAnswer = new Answer(value.correct, value.text);
    this.answerAdded.emit(newAnswer);
  }

  ngOnInit() {
  }

}
