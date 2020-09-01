import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  isLoggedIn: boolean = false;
  constructor(private authService: AdminAuthService) {
    this.bindAuth();
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isLoggedIn;
  }

  bindAuth() {
    this.authService.loggedIn.subscribe((isLoggedIn) => {
      console.log(isLoggedIn);
      this.isLoggedIn = isLoggedIn == 1;
    })
  }
}
