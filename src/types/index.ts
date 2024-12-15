export interface Member {
  id: string;
  name: string;
  nonWorkingDays: string[];
  workingDays: string[];
  maxShifts: number;
  minShifts: number;
  holidayShifts: number;
}

export interface Group {
  id: string;
  name: string;
  members: Member[];
}

export interface Schedule {
  date: string;
  memberId: string;
  groupId: string;
}

export interface ShiftStats {
  memberId: string;
  totalShifts: number;
  weekdayShifts: number;
  weekendShifts: number;
}