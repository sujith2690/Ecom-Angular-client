import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegister, UserLogin } from '../../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  private server: string = 'http://localhost:5001/user/';
  // private server: string = 'https://libestorary.onrender.com/user/';

  doLogin(user: UserLogin): Observable<{ token?: string; message: string }> {
    const url = `${this.server}login`;
    return this.http.post<{ token?: string; message: string }>(url, user);
  }

  signupOTP(
    user: UserRegister
  ): Observable<{ status: number; message: string }> {
    const url = `${this.server}signup`;
    return this.http.post<{ status: number; message: string }>(url, user);
  }
}
