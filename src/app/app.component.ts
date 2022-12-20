import { Component } from '@angular/core';
import { AuthService } from "./auth.service";
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public _auth:AuthService, private _router:Router){}

  title = 'ngApp';
}
