import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { VerificationRequest } from 'src/app/global/models/verification-request.model';
import { SocketsService } from 'src/app/global/services/sockets.service';
import { VerificationService } from 'src/app/global/services/verification.service';

@Component({
  selector: 'app-verification-requests',
  templateUrl: './verification-requests.component.html',
  styleUrls: ['./verification-requests.component.scss']
})
export class VerificationRequestsComponent implements OnInit {

  isLoading: boolean = false;
  errorMessage: String = '';
  currentUser: String;
  
  requests: Array<VerificationRequest> = [];

  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  
  constructor(
    private verificationService: VerificationService,
    private _snackBar: MatSnackBar, 
    private _socketService: SocketsService
  ) { }

  ngOnInit(): void {
    this._socketService.on('newVerificationRequest', data =>{
      const snack = this._snackBar.open("New verification request", "Close", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      snack._dismissAfter(3000);
      this.getVerificationRequests();
    })
    this.getVerificationRequests();
  }


  getVerificationRequests():void {
    this.isLoading = true;
    this.verificationService.getVerificationRequestss()
      .then((resp) => {
        console.log(resp);
        if(resp.body.pending_verifications) {
          this.requests = []
          let requestsList = resp.body.pending_verifications;
          requestsList.forEach((element:any) => {
            this.requests.push({ official_id_url :element.official_id_url, user_email :element.user_email, userName: element.user_email.split("@")[0]});
          });
        }
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
        this.isLoading = false;
        const snack = this._snackBar.open(`Verifications could not get- ${err.message}`, "Close", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        snack._dismissAfter(3000);
      })
  }

  updateVerificationRequest(request:any, result:boolean) {
    this.isLoading = true;
    this.verificationService.updateVerificationRequest(escape(request.user_email), result)
      .then((res) => {

        console.log(res);
        const snack = this._snackBar.open(`Verification ${(result)?'ACCEPTED': 'REJECTED'}`, "Close", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        snack._dismissAfter(3000);

        this._socketService.emit('verify', {verificationStatus: (result)?'ACCEPTED': 'REJECTED', email:escape(request.user_email)});

        this.getVerificationRequests();
      })
      .catch((err) => {
        this.isLoading = false;
        const snack = this._snackBar.open(`Verification could not accept - ${err.message}`, "Close", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        snack._dismissAfter(3000);
      })
  }

}
