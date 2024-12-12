import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMeeting, IMeetings } from '../../Models/Model';

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  private apiUrl = `http://localhost:5000/api/meetings`;
  constructor(private http: HttpClient) {}
  getMeetingList(
    period: '' | 'all' | 'past' | 'present' | 'future',
    search: string
  ) {
    return this.http.get<IMeetings[]>(
      `${this.apiUrl}?period=${period}&search=${search}`
    );
  }

  addAttendee(_id: string, userId: string) {
    return this.http.patch<IMeetings>(
      `${this.apiUrl}/${_id}?action=add_attendee&userId=${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  excuseAttendee(_id: string) {
    return this.http.patch<IMeetings>(
      `${this.apiUrl}/${_id}?action=remove_attendee`,
      {
        headers: {
          'Conten-Type': 'application/json',
        },
      }
    );
  }

  addMeet(meet: Omit<IMeeting, '_id'>) {
    console.log(meet);
    //meet.date =
    return this.http.post<IMeeting>(`${this.apiUrl}`, meet, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
