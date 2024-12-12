import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser, UserService } from '../../../../../User/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IAttendee, IMeetings } from '../../../../../Models/Model';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './session-list.component.html',
  styleUrl: './session-list.component.scss',
})
export class SessionListComponent implements OnInit {
  @Input() meeting!: IMeetings;
  @Output() AddingMemeber = new EventEmitter<{ _id: string; userId: string }>();
  @Output() ExcuseFromMeeting = new EventEmitter<{ _id: string }>();
  selectedOption = '';
  persons = new Map<string, IUser>();
  personsInMeeting = {};
  registeredusers!: IUser[];

  constructor(private users: UserService) {}
  getNonRegisteredUsers() {
    for (let i = 0; i < this.meeting.attendees.length; i++) {
      if (this.persons.get(this.meeting.attendees[i].userId)) {
        this.persons.delete(this.meeting.attendees[i].userId);
      }
    }
    //console.log(this.persons);
    this.registeredusers = this.registeredusers.filter((user) =>
      this.persons.has(user._id)
    );
  }

  ngOnInit(): void {
    this.users.getUsers().subscribe({
      next: (registereduser) => {
        //console.log(registereduser);
        this.registeredusers = [...registereduser];
        for (let i = 0; i < this.registeredusers.length; i++) {
          this.persons.set(registereduser[i]._id, this.registeredusers[i]);
        }
        this.getNonRegisteredUsers();
        //console.log(this.registeredusers);
      },
    });
  }

  addAttendee() {
    if (this.selectedOption === '') return;
    if (this.meeting._id) {
      const data = {
        _id: this.meeting._id,
        userId: this.selectedOption,
      };
      this.AddingMemeber.emit(data);
      //console.log(this.selectedOption);
      this.registeredusers = this.registeredusers.filter(
        (user) => this.selectedOption !== user._id
      );
      //console.log(this.registeredusers);
      let temp = this.persons.get(this.selectedOption);
      if (temp) {
        let attended: IAttendee = {
          userId: temp._id,
          email: temp?.email,
        };
        this.meeting.attendees.push(attended);
        //console.log(this.meeting.attendees);
        this.selectedOption = '';
      }
    }
  }

  excuseFromMeeting(_id: string | undefined) {
    if (_id === undefined) return;
    console.log(this.meeting._id);
    console.log(_id);
    this.ExcuseFromMeeting.emit({ _id: _id });
  }
}
