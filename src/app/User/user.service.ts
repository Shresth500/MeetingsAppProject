import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IUser {
  _id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `http://localhost:5000/api/users`;
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get<IUser[]>(`${this.apiUrl}`);
  }
}
