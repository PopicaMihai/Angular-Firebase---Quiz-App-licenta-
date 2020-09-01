import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../authUser.service';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/students/student-list/student.service';
import { Student } from 'src/app/shared/student.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  students: Student[] = [];
  authError: any;

  constructor(private auth: AuthUserService, private router: Router,private studentService: StudentService) {
    this.studentService.getStudents().
      subscribe(students => {
        this.students = students;
        console.log(this.students);
    })
   }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    });
  }

  login(frm) {
    let student = this.students.find(e => e.email === frm.value.email);
    console.log(student);
    if( student.online === true ) {
      this.auth.login(frm.value.email, frm.value.password);
    } else {
      alert('Trebuie sa fii la curs pentru a da testul');
    }
  }

  register() {
    this.router.navigate(['/register']);
  }

}