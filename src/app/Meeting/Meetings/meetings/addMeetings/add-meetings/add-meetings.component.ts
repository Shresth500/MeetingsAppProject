import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  NgbDatepicker,
  NgbDateStruct,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MeetingsService } from '../../../meetings.service';
import { AuthService } from '../../../../../common/auth/auth.service';
import { UserService, IUser } from '../../../../../User/user.service';
import { SessionListComponent } from '../../meetingSession/session-list/session-list.component';
import { IAttend, IMeetBase, IMeeting } from '../../../../../Models/Model';

@Component({
  selector: 'app-add-meetings',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgbProgressbarModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-meetings.component.html',
  styleUrl: './add-meetings.component.scss',
})
export class AddMeetingsComponent implements OnInit {
  model!: NgbDateStruct;
  registeredusers!: IUser[];
  addMeetingForm!: FormGroup;
  persons = new Map<string, string>();

  constructor(
    private fb: FormBuilder,
    private meetingApi: MeetingsService,
    private users: UserService,
    private authenticationService: AuthService,
    private router: Router
  ) {
    this.addMeetingForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      startTime: this.fb.group({
        hours: [0, Validators.required],
        minutes: [0, Validators.required],
      }),
      endTime: this.fb.group({
        hours: [0, Validators.required],
        minutes: [0, Validators.required],
      }),
      description: ['', Validators.required],
      emails: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  getAttendee() {
    let temp: string[] = this.addMeetingForm.value.emails.split(',');
    let attendee: IAttend[] = [];
    temp.forEach((element) => {
      let val: IAttend = {
        email: element,
      };
      attendee.push(val);
    });
    let val: IAttend = {
      email: this.authenticationService.getUser().email,
    };
    attendee.push(val);
    return attendee;
  }

  addMeeting() {
    const formValue = this.addMeetingForm.value;
    const dateOnly = new Date(
      formValue.date.year, // Ensure formValue.date has year
      formValue.date.month - 1, // Months are zero-based
      formValue.date.day + 1 // Ensure formValue.date has day
    );

    const formattedDate = dateOnly.toISOString().split('T')[0];

    console.log(formValue.date.month);
    const data: Omit<IMeeting, '_id'> = {
      name: this.addMeetingForm.value.name,
      date: new Date(formattedDate),
      startTime: this.addMeetingForm.value.startTime,
      endTime: this.addMeetingForm.value.endTime,
      description: this.addMeetingForm.value.description,
      attendees: this.getAttendee(),
    };

    console.log(data.date);

    this.meetingApi.addMeet(data).subscribe({
      next: (addedMeet) => {
        console.log(addedMeet);
        this.router.navigate(['/meetings']);
      },
    });
  }
}
