import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) { }

  getUserState() {
    return this.afAuth.authState;
  }

  createUser(user) {
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then( userCredentials => {
        this.newUser = user;
        console.log(userCredentials);
        userCredentials.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName,
        });

        this.insertUserData(userCredentials)
          .then(() => {
            this.router.navigate(['/login']);
          });
      })
      .catch((error) => {
        this.eventAuthError.next(error);
      })
  }

  insertUserData( userCredentials: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredentials.user.uid}`).set({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      phone: this.newUser.phone,
      section: this.newUser.section,
      group: this.newUser.group,
      weeks: {
        'Saptamana-01': 0,
        'Saptamana-02': 0,
        'Saptamana-03': 0,
        'Saptamana-04': 0,
        'Saptamana-05': 0,
        'Saptamana-06': 0,
        'Saptamana-07': 0,
        'Saptamana-08': 0,
        'Saptamana-09': 0,
        'Saptamana-10': 0,
        'Saptamana-11': 0,
        'Saptamana-12': 0,
        'Saptamana-13': 0,
        'Saptamana-14': 0
      },
      medie: 0,
      online: false,
      prezente: 0,
      notaFinala: 0
    });
  }

  login( email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          this.router.navigate(['/home']);
        }
      })
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  logout() {
    return this.afAuth.signOut();
  }

}
