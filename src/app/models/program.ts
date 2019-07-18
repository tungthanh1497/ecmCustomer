import {Center} from './center';
import {Course} from './course';

export class Program {
  $id: string;
  Center: Center;
  Courses: Course[];
  CreatedAt: string;
  Description: string;
  Id: number;
  Image: string;
  Name: string;
  UpdatedAt: string;
}
