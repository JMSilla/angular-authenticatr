import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  showLogError: boolean = false;

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private router: Router) 
  { 

  }

  ngOnInit(): void {
    this.showLogError = false;
    
    if (this.loginService.isLoggedIn())
      this.router.navigateByUrl("/home");
  }

  login() {
    let formValues = this.loginForm.value;

    if(this.loginService.login(formValues.username, formValues.password))
      this.router.navigateByUrl("/home");
    else
      this.showLogError = true;
  }
}
