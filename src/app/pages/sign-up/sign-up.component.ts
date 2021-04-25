import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SessionService } from 'src/app/global/services/session.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/global/services/auth.service';
import { Router } from '@angular/router';

import { SocketsService } from 'src/app/global/services/sockets.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private sessionService: SessionService, 
    private _snackBar: MatSnackBar, 
    private authService: AuthService, 
    private router: Router, 
    private _socket: SocketsService
    ) { }

  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.sessionService.login(this.loginForm.getRawValue()).then(data => {
        console.log(data);
        this.authService.saveUserId(this.loginForm.getRawValue().email);
        this.authService.save(data.token)
        this._socket.connect(this.authService.get(), this.authService.getUserId());
        this.router.navigate(["/home"])
      }).catch(err => {
        console.log(err);

        const snack = this._snackBar.open(`Unable to login - ${err.error.message}`, "Close", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        snack._dismissAfter(3000);
      })
    }
  }
}
