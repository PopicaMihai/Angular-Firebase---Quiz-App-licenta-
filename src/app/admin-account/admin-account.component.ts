import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../questions/admin-auth/admin-auth.service';
import { Observable } from 'rxjs';
import { Admin } from '../shared/admin.model';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {
  adminCollection: AngularFirestoreCollection<Admin>;

  confirmPassword: string;
  oldAdmin: string;
  oldPassword: string;
  oldConfirmPassword: string;
  data;
  ceva;
  admin: Admin[];
  modifyAdmin: Admin = {
    id: ' ',
    name: '',
    password: '',
  }
  adminInfo: AngularFirestoreDocument<Admin>;
  isCorrect: boolean = false;
  
  constructor( public afs: AngularFirestore, public auth: AdminAuthService) {
    
  }
  
  ngOnInit() {
    this.auth.getAdminData().
      subscribe(admin => {
        this.admin = admin;
        console.log(this.admin);
      })
  }

  verifyOld(oldName, oldPass, oldConfirmPass) {
    if(this.admin[0].name === oldName && this.admin[0].password === oldPass && oldPass === oldConfirmPass) {
      this.isCorrect = true;
      console.log('trueee');
    }
  }

  submitNew(modifyAdmin) {
    if((this.isCorrect === true) && (modifyAdmin.password === this.confirmPassword)) {
      console.log("heyoooo")
      this.modifyAdmin.id = this.admin[0].id;
      this.auth.saveNewAdminData(modifyAdmin);
    }
  }

  

  
  
}
