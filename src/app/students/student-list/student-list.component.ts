import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StudentService } from './student.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Student } from 'src/app/shared/student.model';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  
  editState: boolean = false;
  studentEdit: any;
  currentIndex: number;

  searchTerm: string;
  studentss: Student[];
  filters = {
    "Automatica-Romana": true,
    "Automatica-Engleza": true,
    "Informatica-Romana": true,
    "Informatica-Engleza": true,
  }
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.studentService.getStudents().
      subscribe(students => {
        this.studentss = students;
        console.log(this.studentss);
    })
  }

  deleteStudent(el: Student) {
    this.studentService.deleteStudent(el);
  }

  editStudent(student, index) {
    this.editState = true;
    this.studentEdit = student;
    this.currentIndex = index;
    // if(this.studentEdit.online === true) {
    //   this.studentEdit.prezente--;
    // } else if(this.studentEdit.online === false) {
    //   this.studentEdit.prezente++;
    // }
  }

  toggleOnline(el) {
    el.online = !el.online;
    this.studentService.updateStudent(el);
    if(el.online === true) {
      el.prezente++;
      this.studentService.updateStudent(el);
    }
  }

  saveEditStudent(el: Student) {
    this.studentService.updateStudent(el);
    console.log(el.weeks);
    this.editState = false;
  }

  updateWeek(student, value, key) {
    student.weeks[key] = value;
  }

  // editStudent(el, index) {
  //   this.editIndex = index;
  //   el.email = "";
  // }

  toggleFilter(name: string) {
    this.filters[name] = !this.filters[name];
    this.filters = Object.assign({}, this.filters);
    this.changeDetectorRef.detectChanges();
  }

  checkAll() {
    for( let i = 0; i < this.studentss.length; i++ ) {
      this.studentss[i].online = true;
    }
    console.log('heyo');
  }

  startExam() {
    for( let i = 0; i < this.studentss.length; i++ ) {
      if(this.studentss[i].online === true) {
        this.studentss[i].prezente++;
        this.studentService.updateStudent(this.studentss[i]);
      }
    }
  }
}
