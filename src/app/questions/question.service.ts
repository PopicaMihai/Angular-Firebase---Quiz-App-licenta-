import { Question } from '../shared/question.model';
import { Answer } from '../shared/answer.model';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Section } from '../shared/section.model';
import { AngularFireDatabase } from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
}) 
export class QuestionService {
   sections: Section[] = [];
    questionChanged = new Subject<Question[]>();
    questions: Question[] = [];

  constructor(public db: AngularFireDatabase) {

  }

  getQuestion(index: number) {
    return this.questions[index];
  }

  getQuestions() {
    return this.questions.slice();
  }

  activeQuestionList(currentQuestions) {
    this.questions = currentQuestions;
  }

  addQuestion(question: Question) {
    this.questions.push(question);
    this.questionChanged.next(this.questions.slice());
  }

  updateQuestion(index: number, newQuestion: Question) {
    this.questions[index] = newQuestion;
    this.questionChanged.next(this.questions.slice());
  }

  deleteQuestion(index: number) {
      this.questions.splice(index, 1);
      this.questionChanged.next(this.questions);
      console.log("Aici", this.questions);
  }

}