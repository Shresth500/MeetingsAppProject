import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../common/auth/auth.service';
import { IMeetings } from '../../Models/Model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  apiUrl = `http://localhost:5000/api/calendar`;
  constructor(private http: HttpClient, private auth: AuthService) {}
  getCalendarfromDate(date: string) {
    return this.http.get<IMeetings[]>(`${this.apiUrl}?date=${date}`, {});
  }
}
