import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from "./../../../environments/environment"
import { AuthService } from './auth.service';
import { SocketsService } from './sockets.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private httpClient:HttpClient, private authService:AuthService) { }

  login(credentials:any):Promise<any> {
    const url = `${environment.apiUrl}/users/admin/login`;
    return this.httpClient.post(url, credentials).toPromise();
  }

}