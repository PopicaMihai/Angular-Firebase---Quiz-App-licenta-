import { Router } from '@angular/router';

import { OnInit, Component } from '@angular/core';
import { AuthUserService } from '../authUser.service';
import { SectionsService } from 'src/app/questions/sections/sections.service';
import { Student } from 'src/app/shared/student.model';
import { StudentService } from 'src/app/students/student-list/student.service';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { TestService } from '../test.service';
import { Question } from 'src/app/shared/question.model';
import { BehaviorSubject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomePageComponent implements OnInit {
  isClicked = false;
  currentAnswer = [];
  public i = 0;
  public test = false;
  public isNavbarCollapsed = true;
  studentss: Student[];
  public currentWeekName: string;
  user: firebase.User;
  newUser;
  curentuser;
  questions;
  public score = 0;
  public showScore = false;
  private isInitializing = false;
  questionTest: any = [];


  constructor(
    private auth: AuthUserService, 
    private router: Router,
    private studentService: StudentService, 
    private db: AngularFireDatabase,
    private testService: TestService) {
    
  }

  ngOnInit() {
    this.isInitializing = true;

    this.auth.getUserState().
      subscribe( user => {
        this.user = user;
        this.studentService.getStudents().
          subscribe( students => {
            this.studentss = students.filter((item) => {
            if(item.email.toLowerCase() === this.user.email.toLowerCase()){
              console.log("am gasit");
              this.newUser = item;
              console.log(this.newUser.section);
              this.db.list(`/Sectii/${this.newUser.section}`).snapshotChanges().
                subscribe( heyo => {
                  this.questions = heyo;
                  this.isInitializing = false;
              });
            } else {
              this.isInitializing = false
            }
            console.log(item.email.toLowerCase());
            console.log(this.user.email.toLowerCase());
          });
        })
        console.log(user);
      })
      
  }

  currentWeek(i: string) {
    this.isInitializing = true;
    this.test = true;
    this.auth.getUserState().subscribe( user => {
        this.user = user;
        this.studentService.getStudents().subscribe( students => {
            this.studentss = students.filter((item) => {
            if(item.email.toLowerCase() === this.user.email.toLowerCase()) {
              console.log("am gasit");
              this.newUser = item;
              console.log(this.newUser.section);
              this.db.list(`/Sectii/${this.newUser.section}/${i}`).valueChanges().subscribe(heyo => {
                this.questionTest = heyo;
                this.currentWeekName = i;
                this.isInitializing = false;
            });
          } else {
            this.isInitializing = false;
          }
          console.log(item.email.toLowerCase());
          console.log(this.user.email.toLowerCase());
        });
      })
      console.log(user);
      })
  }


  nextQuestion() {
    let rezultate = this.buildResult(); 

    if(this.buildResult().includes('false')) {
      console.log('Incorrect');
    } else if (this.buildResult().includes('true')){
      console.log('Correct');
      this.score++;
    } else {
      console.log('Incorrect');
    }
    this.currentAnswer = [];
    this.i++;
  }

  finishTest() {
    if(this.buildResult().includes('false')) {
      console.log('Incorrect');
    } else if (this.buildResult().includes('true')){
      console.log('Correct');
      this.score++;
    } else {
      console.log('Incorrect');
    }
    console.log("score:", this.score);
    // this.test = false;
    this.showScore = true;
    this.newUser.weeks[this.currentWeekName] = this.score;
    console.log(this.newUser.weeks[this.currentWeekName]);
    this.studentService.updateStudent(this.newUser);
    console.log(this.newUser);
    console.log(this.currentWeekName);
    this.sendResult(this.score);
    setTimeout(() =>{   
      this.newUser.online = false;
      this.studentService.updateStudent(this.newUser)
      this.auth.logout();
      
      
    }, 3000);
  }

  sendResult(score) {
    // this.studentService.updateStudent();
  }

  previousQuestion() {
    this.i--;
  }

  buildResult() {
    let result = [];
    for(let i = 0; i < this.currentAnswer.length; i++) {
      const currentAnswer = this.currentAnswer[i];
      if(currentAnswer) {
        result.push(this.questionTest[this.i].answer[i].correct);
      }
    }
    return result;
  }

  handleCountdownEvent(event, index) {    
    if(event.action === "done" && !this.isInitializing) {
      this.nextQuestion();
    }

    if(this.questionTest.length === index) {
      console.log('Finish');
    }
  }

  clickButton(k, text, correct) {
    console.log(k);
    console.log(text);
    console.log(correct);
  }


  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
  }

  register() {
    this.router.navigate(['/register']);
  }
}