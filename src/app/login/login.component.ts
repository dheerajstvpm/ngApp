import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from "../model/userModel";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginUserData: User = {
    name: '',
    email: '',
    password: '',
    data: '',
    imagePath:''
  }

  error: string = '';

  constructor(private _auth: AuthService, private _router: Router) { }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        {
          next: res => {
            localStorage.setItem('token', res.token)
            this._router.navigate(['/special'])
          },
          error: err => {
            console.log(err)
            this.error = err.error
          }
        }
      )
  }

  // ngOnInit() {
  //   if (this._auth.loggedIn()) {
  //     this._router.navigate(['/special'])
  //   }
  // }
}
