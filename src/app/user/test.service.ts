import { Injectable } from '@angular/core';
import { AuthUserService } from './authUser.service';
import { Router } from '@angular/router';
import { StudentService } from '../students/student-list/student.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Student } from '../shared/student.model';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TestService {
  studentss: Student[];
  user: firebase.User;
  newUser;
  curentuser;
  questions
  questions2: unknown[];
  usersCollection: AngularFirestoreCollection<Student>;
  students: Observable<Student[]>;
  
  studentInfo: AngularFirestoreDocument<Student>
  constructor(private auth: AuthUserService, public afs: AngularFirestore,private studentService: StudentService, private db: AngularFireDatabase) {
    this.usersCollection = this.afs.collection('Users', ref => ref.orderBy('group', 'asc'));

    this.students = this.usersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Student;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    console.log(this.students);
   }

  getStudents() {
    return this.students;
  }

  updateStudent(student: Student) {
    this.studentInfo = this.afs.doc(`Users/${student.id}`);
    console.log(JSON.stringify(student.weeks));
    this.studentInfo.update(student);
  }
}
