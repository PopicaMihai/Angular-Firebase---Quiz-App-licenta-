import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/student.model';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  usersCollection: AngularFirestoreCollection<Student>;
  students: Observable<Student[]>;
  
  studentInfo: AngularFirestoreDocument<Student>

  constructor(public afs: AngularFirestore) {
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

  deleteStudent(student: Student) {
    this.studentInfo = this.afs.doc(`Users/${student.id}`);
    this.studentInfo.delete();
  }

  updateStudent(student: Student) {
    this.studentInfo = this.afs.doc(`Users/${student.id}`);
    console.log(JSON.stringify(student.weeks));
    this.studentInfo.update(student);
  }
}
