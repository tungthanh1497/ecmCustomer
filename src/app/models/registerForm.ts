import {Center} from './center';
import {Building} from './building';
import {Course} from './course';
import {Slot} from './slot';

export class ResgisterForm {
  Building: Building;
  Center: Center;
  Course: Course;
  Id: number;
  IsClosed: boolean;
  Name: string;
  Slot: Slot;
  StartDate: string;
  Week: any;
}
