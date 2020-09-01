import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../questions/admin-auth/admin-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AdminAuthService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.loggedIn.next(0);
  }

}
