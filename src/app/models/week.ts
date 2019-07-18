import {Center} from './center';
import {RegisterForm} from './registerForm';
import {Subject} from './subject';
import {Course} from './course';

export class Week {
  $id: string;
  Id: number;
  AdmissionForm: RegisterForm;
  DayOfWeek: number;
  Center: Center;
}
