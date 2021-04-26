import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private httpClient:HttpClient, private _authService: AuthService) { }

  getVerificationRequestss():Promise<any> {
    const url = `${environment.ibmApiUrl}verifications`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });

    return this.httpClient.get(url, {
      headers: httpHeaders
    }).toPromise();
  }

  updateVerificationRequest(userEmail:String, verificationStatus:boolean) {
    const url = `${environment.ibmApiUrl}verifications${userEmail}`;
    const httpHeaders = new HttpHeaders({
      Authorization: this._authService.get()
    });

    return this.httpClient.put(url, {"verificationStatus": verificationStatus}, {
      headers: httpHeaders
    }).toPromise();
  }
}
