import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginResponse } from '../interfaces/login.interface';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  private url: string = enviroment.API_URL;
  private authState = new BehaviorSubject<boolean>(this.hasToken());
  private readonly ACCESS_TOKEN_KEY = 'userTokenAccess';

  login(data: any): Observable<loginResponse> {
    return this.http.post<loginResponse>(this.url + 'auth/login', JSON.stringify(data));
  }

  saveToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }
  isLoggedIn(): boolean {
    return this.authState.value;
  }

  /** Logout global */
  logout(): void {
    localStorage.clear();
    this.authState.next(false);
    this.router.navigate(['/auth']);
  }

  /** Header listo para API */
  getAuthorizationHeader() {
    console.log('esta trallendo la autorizacion');

    const token = this.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  private hasToken(): boolean {
    return this.getAccessToken() != '' ? true : false;
  }
}
