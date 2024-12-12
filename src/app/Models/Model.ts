interface IAttend {
  userId?: string;
  email: string;
}

interface IMeeting extends IMeetBase {
  attendees: IAttend[];
}

interface ITime {
  hours: number;
  minutes: number;
}

interface IAttendee {
  userId: string;
  email: string;
}

interface IMeetBase {
  _id?: string;
  name: string;
  description: string;
  date: Date;
  startTime: ITime;
  endTime: ITime;
}

interface IMeetings extends IMeetBase {
  attendees: IAttendee[];
  // HeightAndBottom?: String[];
}

export type { IAttend, IMeetBase, IAttendee, IMeeting, IMeetings };
