import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from "../model/userModel";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  fileName = '';
  file!: File;
  profileUserData: User = {
    name: '',
    email: '',
    password: '',
    data: '',
    imagePath:''
  }

  constructor(private http: HttpClient, private _auth: AuthService, private _router: Router) { }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("image", file);
      const upload$ = this.http.post("http://localhost:3000/api/imageUpload", formData);
      upload$.subscribe();
    }
  }

  ngOnInit() {
    this._auth.getUser()
      .subscribe({
        next: (res) => {
          this.profileUserData = res
          console.log(res)
        },
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
          console.log(err)
        }
      })
  }
}
