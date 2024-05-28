import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  authToken = new BehaviorSubject<string>(
    localStorage.getItem('auth_token') || ''
  );
  authTokenRole = new BehaviorSubject<any>(
    localStorage.getItem('auth_role_id')
  );
  authUserName = new BehaviorSubject<any>(
    localStorage.getItem('auth_user_name')
  );
  roleName = new BehaviorSubject<any>(localStorage.getItem('role_name'));
  areaName = new BehaviorSubject<any>(localStorage.getItem('area_name'));
  nik = new BehaviorSubject<any>(localStorage.getItem('nik'));
  userId = new BehaviorSubject<any>(localStorage.getItem('user_id'));
  userGroup = new BehaviorSubject<any>(localStorage.getItem('user_group'));
  line =  new BehaviorSubject<any>(localStorage.getItem('id_line'));

  constructor(private http: HttpClient) {
    setInterval(() => {
      this.logoutIfTokenExpired();
    }, 5 * 60 * 1000);
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.authToken.value}`,
    });
  }

  // AUTHENTICATION
  login(nik: number, password: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { nik, password });
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_role_id');
    localStorage.removeItem('auth_user_name');
    localStorage.removeItem('area_name');
    localStorage.removeItem('nik');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_group');
    localStorage.removeItem('id_line')
    this.authToken.next('');
    this.authTokenRole.next(null);
    this.authUserName.next('');
    this.roleName.next('');
    this.areaName.next('');
    this.nik.next('');
    this.userId.next('');
    this.userGroup.next('');
    this.line.next('')
  }

  calculateTokenExpiration(): number {
    const token = this.authToken.value;
    if (!token) {
      return 0;
    }

    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const expiration = tokenData.exp * 1000;

    return expiration - Date.now();
  }

  logoutIfTokenExpired() {
    const expiration = this.calculateTokenExpiration();

    if (expiration <= 0) {
      this.logout();
    }
  }

  // TOKEN & ROLE_ID
  saveToken(
    token: string,
    role_id: any,
    userId: any,
    user_name: string,
    roleName: string,
    areaName: string,
    nik: any,
    userGroup: any,
    line:any
  ) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_role_id', role_id);
    localStorage.setItem('auth_user_name', user_name);
    localStorage.setItem('role_name', roleName);
    localStorage.setItem('area_name', areaName);
    localStorage.setItem('nik', nik);
    localStorage.setItem('user_id', userId);
    localStorage.setItem('user_group', userGroup);
    localStorage.setItem('id_line', line);
    this.authToken.next(token);
    this.authTokenRole.next(role_id);
    this.authUserName.next(role_id);
    this.roleName.next(roleName);
    this.areaName.next(areaName);
    this.nik.next(nik);
    this.userId.next(userId);
    this.userGroup.next(userGroup);
    this.line.next(line);
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  getUserGroup() {
    return localStorage.getItem('user_group');
  }

  getUserId() {
    return localStorage.getItem('user_id');
  }

  getRoleID(): any {
    return localStorage.getItem('auth_role_id');
  }

  getUserName(): any {
    return localStorage.getItem('auth_user_name');
  }

  getRoleName(): any {
    return localStorage.getItem('role_name');
  }

  getAreaName(): any {
    return localStorage.getItem('area_name');
  }

  getNIK(): any {
    return localStorage.getItem('nik');
  }

  getLine(): any {
    return localStorage.getItem('id_line');
  }

  isLoggedIn(): Observable<boolean> {
    return this.authToken.pipe(
      map((token: string) => {
        const isLoggedIn = !!token;
        if (isLoggedIn) {
          this.logoutIfTokenExpired();
        }
        return isLoggedIn;
      })
    );
  }
}
