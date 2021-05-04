import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SocketsService } from '../../services/sockets.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

// import { NotificationsComponent } from 'src/app/dialogs/notifications/notifications.component';

export interface notification {
  message: string;
  date: Date;
  emiterEmail: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;

  name: string = "";
  searchQuery: string = "";

  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  
  constructor(private authService: AuthService,
    private router: Router,
    private socketsService: SocketsService,
    private userService: UserService,
    private _snackBar: MatSnackBar, 
  ) {

    this.authService.loginStatus.subscribe(status => {
      this.isLoggedIn = status;
      if (this.authService.isLoggedIn()) {
        this.userService.getUserInfo(this.authService.getUserId())
          .then(res => {
            this.name = res.user.name;
          });
        }
    });

    this.socketsService.socketStatus.subscribe(status => {
      if (status) {
        this.socketsService.on('newVerificationRequest', data =>{
          const snack = this._snackBar.open("New verification request", "Close", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          snack._dismissAfter(3000);
        })
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.userService.getUserInfo(this.authService.getUserId())
        .then(res => {
          this.name = res.user.name;
        })
    }
  }

  logout() {
    this.socketsService.disconnect();
    this.authService.clear();
    this.router.navigate(['/sign-up']);
  }

}
