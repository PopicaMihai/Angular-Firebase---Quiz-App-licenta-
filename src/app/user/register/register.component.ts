import { Component, OnInit } from '@angular/core';

import { AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthUserService } from '../authUser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  
  authError: any;
  constructor(private auth: AuthUserService,private router: Router) { }

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }

  createUser(frm) {
    this.auth.createUser(frm.value);
  }

  back() {
    this.router.navigate(['/home']);
  }
}

