import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseAPI = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.baseAPI);
  }

  getUserById(id: number) {
    return this.http.get(`${this.baseAPI}/${id}`);
  }

  registerUser(payload: any) {
    return this.http.post(`${this.baseAPI}`, payload);
  }

  updateUser(id: number, payload: any) {
    return this.http.put(`${this.baseAPI}/${id}`, payload);
  }
}
