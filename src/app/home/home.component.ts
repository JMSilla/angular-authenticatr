import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (!this.loginService.isLoggedIn())
      this.router.navigateByUrl("/");
  }

  loggedUser(): string {
    return this.loginService.loggedUser();
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl("/");
  }
}
