import {Center} from './center';
import {Building} from './building';
import {Course} from './course';
import {Slot} from './slot';
import {Week} from './week';

export class RegisterForm {
  $id: string;
  Id: number;
  Course: Course;
  Name: string;
  StartDate: string;
  Slot: Slot;
  Weeks: Week[];
  Building: Building;
  IsClosed: boolean;
}
