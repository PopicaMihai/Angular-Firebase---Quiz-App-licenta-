import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Admin } from 'src/app/shared/admin.model';
import { Observable } from 'rxjs';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AdminAuthService } from './admin-auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {
  adminForm: FormGroup
  
  admin: Admin[];
  username: string;
  password: string;
  adminCollection: AngularFirestoreCollection<Admin>;
  
  
  constructor(public afs: AngularFirestore,private route: ActivatedRoute,private auth: AdminAuthService, 
    private router: Router) { 
      
  }

  ngOnInit() {
    this.adminCollection = this.afs.collection('Admin');
    this.adminCollection.valueChanges().subscribe(data => {  
        this.admin = data;
        console.log(this.admin[0].name);
        console.log(this.admin[0].password);
        console.log(this.admin);
    }) 
  }

  loginAdmin() {
    if(this.username === this.admin[0].name && this.password === this.admin[0].password) {
      this.auth.loggedIn.next(1);
      this.router.navigate(['questions']);
    }
    else alert('Mai incearca...');
  }

}
