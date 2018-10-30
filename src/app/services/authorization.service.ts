import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { LoginResponse } from './interfaces/login-response.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor (private httpClient: HttpClient, private jwtHelper: JwtHelperService) {
  }

  loginCheckUrl = `http://localhost:8001/auth/`;
  refreshTokenUrl = `http://localhost:8001/auth/refresh`;

  login (username: string, password: string): Observable<LoginResponse> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const postObservable = this.httpClient.post<LoginResponse>(this.loginCheckUrl, body.toString(), { headers });

    const subject = new ReplaySubject<LoginResponse>(1);
    subject.subscribe((r: LoginResponse) => {
      this.setAccessToken(r.token);
      this.setRefreshToken(r.refresh_token);
    }, (err) => {
      this.handleAuthenticationError(err);
    });

    postObservable.subscribe(subject);
    return subject;
  }

  refresh (): Observable<LoginResponse> {
    const body = new HttpParams()
        .set('refresh_token', this.getRefreshToken())
        .set('username', 'vaeron');

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const refreshObservable = this.httpClient.post<LoginResponse>(this.refreshTokenUrl, body.toString(), { headers });

    const refreshSubject = new ReplaySubject<LoginResponse>(1);
    refreshSubject.subscribe((r: LoginResponse) => {
      this.setAccessToken(r.token);
      this.setRefreshToken(r.refresh_token);
    }, (err) => {
      this.handleAuthenticationError(err);
      this.handleBadRefreshToken();
    });

    refreshObservable.subscribe(refreshSubject);
    return refreshSubject;
  }
    handleBadRefreshToken(): any {
        // show error message && switch to login page
        console.log('move user to login page');

    }

  logout () {
    this.setAccessToken(null);
    this.setRefreshToken(null);
  }

  isAuthenticated (): boolean {
    return this.jwtHelper.isTokenExpired(this.getAccessToken());
  }

  private handleAuthenticationError (err: any) {
    this.setAccessToken(null);
    this.setRefreshToken(null);
  }

  private setAccessToken (accessToken: string) {
    if (!accessToken) {
      localStorage.removeItem('access_token');
    } else {
      localStorage.setItem('access_token', accessToken);
    }
  }

  setRefreshToken (refreshToken: string) {
    if (!refreshToken) {
      localStorage.removeItem('refresh_token');
    } else {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }
  setUserDetails(user) {
    if (!user) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
  getUserDetails() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getAccessToken () {
    return localStorage.getItem('access_token');
  }

  getRefreshToken () {
    return localStorage.getItem('refresh_token');
  }
}
