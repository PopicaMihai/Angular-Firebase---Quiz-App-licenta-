import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { QuestionService } from '../question.service';
import { Question } from 'src/app/shared/question.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription, combineLatest } from 'rxjs';
import { SectionsService } from '../sections/sections.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  id: number;
  editMode = false;
  questionsForm: FormGroup;
  sections;
  intrebare: Question;
  questions: Question[];
  subscription: Subscription;
  currentWeek: any;
  currentSection: any;
  currentNew: Params;
  constructor(
    private route: ActivatedRoute, 
    private questionService: QuestionService,
    private router: Router,
    private db: AngularFireDatabase,
    private sectionService: SectionsService,
    private change: ChangeDetectorRef) { }

  ngOnInit() {
    combineLatest(
      this.route.parent.parent.params,
      this.route.parent.params,
      this.route.params
    ).subscribe(([sectionParams, weekParams, params]) => {
      this.currentWeek = weekParams;
      this.currentSection = sectionParams
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.editForm();
      console.log(this.currentWeek);
      console.log(this.currentSection);
    })
  }

  onSubmit() {
    SectionsService.sectionSubject.subscribe((sections) => {
      this.sections = sections;
      console.log(this.sections);
    });
    this.questions = this.questionService.getQuestions();
    console.log('heyo',this.sections[0].weeks);
    console.log(this.questionsForm.value);
    if(this.editMode) {
      this.questionService.updateQuestion(this.id, this.questionsForm.value);
      this.db.list(`/Sectii/${this.currentSection.id}/${this.currentWeek.id}`).update(this.questions[this.id].id, this.questionsForm.value);
      this.change.detectChanges();
      
      // console.log('hhh',this.questionsForm.get('answer'));
    } else {
      console.log(this.currentWeek);
      this.intrebare = this.questionsForm.value
      this.questionService.addQuestion(this.questionsForm.value);
      this.db.list(`/Sectii/${this.currentSection.id}/${this.currentWeek.id}`).push(this.intrebare);
    }
    this.onCancel();
  }

  onAddAnswer() {
    (<FormArray>this.questionsForm.get('answer')).push(
      new FormGroup({
        'text': new FormControl('', Validators.required),
        'correct': new FormControl(null, Validators.required)
      })
    )
  }

  onRemoveAnswer(index: number) {
    (<FormArray>this.questionsForm.get('answer')).removeAt(index);
  }

  onRemoveAllAnswers() {
    (<FormArray>this.questionsForm.get('answer')).clear();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
    console.log('hhh',this.questionsForm.value);
  }

  public editForm () {
    let questionName = '';
    let questionImage = '';
    let questionDescription = '';
    let questionTime = null;
    let questionAnswers = new FormArray([]);

    

    if (this.editMode) {
      const question = this.questionService.getQuestion(this.id);
      questionName = question.name;
      questionImage = question.image;
      questionDescription = question.description;
      questionTime = question.time;

      if (question['answer']) {
        for (let answer of question.answer) {
          questionAnswers.push(
            new FormGroup({
              'correct': new FormControl(answer.correct, Validators.required),
              'text': new FormControl(answer.text, Validators.required)
            })
          );
        }
      }
    }

    this.questionsForm = new FormGroup({
      'name': new FormControl(questionName, Validators.required),
      'image': new FormControl(questionImage),
      'description': new FormControl(questionDescription, Validators.required),
      'time': new FormControl(questionTime, Validators.required),
      'answer': questionAnswers
    });
  }

  get controls() { 
    return (<FormArray>this.questionsForm.get('answer')).controls;
  }

}
