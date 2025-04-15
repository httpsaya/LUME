import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  http: HttpClient = inject(HttpClient);
  baseurl = "http://127.0.0.1:8000";
  private apiUrl = 'http://127.0.0.1:8000/api/users/'; // Ваш API-URL
  private api2Url = 'http://127.0.0.1:8000/api-auth/';
  private tokenKey = 'http://127.0.0.1:8000/admin/authtoken/tokenproxy/';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  getAllVols(): Observable<any> {
    return this.http.get(this.baseurl + "/api/volunteers/", { headers: this.httpHeaders });
  }

  getAllVol2s(): Observable<any> {
    return this.http.get(this.baseurl + "/api/volunteers2/", { headers: this.httpHeaders });
  }

  registerNewUser(userData: { username: string; surname: string; password: string; email: string }, headers: any): Observable<any> {
    return this.http.post(this.apiUrl, userData, { headers });  // передаем заголовки сюда
  }

  signinNewUser(userData: { username: string; password: string; email: string }): Observable<any> {
    return this.http.post(this.api2Url, userData);
  }

  // Метод для получения токена
  getToken(): string {
    return this.isBrowser() ? localStorage.getItem(this.tokenKey) || '' : ''; 
  }

  // Метод для установки токена
  setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // Метод для удаления токена
  removeToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  // Проверка на то, что код выполняется в браузере
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
}
