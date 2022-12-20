import { Component, Injector } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerUserData: { email: string, password: string } = {
    email: '',
    password: ''
  }

  error: string = '';

  constructor(private _auth: AuthService, private _router: Router) { }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        {
          next: res => {
            localStorage.setItem('token', res.token)
            this._router.navigate(['/special'])
          },
          error: err => {
            console.log(err)
            this.error=err.error
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
