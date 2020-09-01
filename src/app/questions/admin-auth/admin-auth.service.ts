import { Admin } from 'src/app/shared/admin.model';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthService {

    loggedIn = new ReplaySubject(0);
    adminCollection: AngularFirestoreCollection<Admin>;
    admin: Observable<Admin[]>;
    ceva;
    adminInfo: AngularFirestoreDocument<Admin>
    
    constructor( public afs: AngularFirestore) {
        this.adminCollection = this.afs.collection('Admin');

        this.admin = this.adminCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Admin;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    getAdminData() {
        return this.admin;
    }

    // isLoggenIn() {
    //     this.loggedIn.next(1);
    // }

    saveNewAdminData(admin: Admin) {
        this.adminInfo = this.afs.doc(`Admin/${admin.id}`);
        this.adminInfo.update(admin);
    }

    public login(admin: Admin) {
        localStorage.setItem('ACCESS_TOKEN', "access_token");
    }

    public isLoggedIn() {
        return localStorage.getItem('ACCESS_TOKEN') !== null;
    }

    public logout() {
        localStorage.removeItem('ACCESS_TOKEN');
    }

}