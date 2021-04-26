import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { VerificationRequest } from 'src/app/global/models/verification-request.model';
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
  ) { }

  ngOnInit(): void {
    this.getVerificationRequests();
  }


  getVerificationRequests():void {
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
      })
      .catch((err) => {
        console.log(err);
        const snack = this._snackBar.open(`Verifications could not get- ${err.message}`, "Close", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        snack._dismissAfter(3000);
      })
  }

  updateVerificationRequest(request:any, result:boolean) {
    console.log(request, result);
    this.isLoading = true;
    this.verificationService.updateVerificationRequest(escape(request.user_email), result)
      .then((res) => {
        this.isLoading = false;
        console.log(res);
        const snack = this._snackBar.open(`Verification accepted!`, "Close", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        snack._dismissAfter(3000);

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
