import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouteReuseStrategy } from '@angular/router';
import { jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router){

  }


  login(email: string, password: string){
    return this.http.post<{token: string}>(`${this.baseUrl}/login`, {email, password})
  }

  register(data: any){
    return this.http.post(`${this.baseUrl}/register`, data)
  }

  saveToken(token: string){
    localStorage.setItem('token', token)
  }

  getToken(): string|null{
    return localStorage.getItem('token')
  }

  inLoggedIn(): boolean|null{
    return !!this.getToken()
  }
  

  // private baseUrl = 'http://localhost:3000/api';

  // constructor(private http: HttpClient, private router: Router) {}

  // login(email: string, password: string) {
  //   return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { email, password });
  // }

  // register(data: any) {
  //   return this.http.post(`${this.baseUrl}/register`, data);
  // }

  // saveToken(token: string) {
  //   localStorage.setItem('token', token);
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // isLoggedIn(): boolean {
  //   return !!this.getToken();
  // }
}
