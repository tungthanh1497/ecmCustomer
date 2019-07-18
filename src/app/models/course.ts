import {Center} from './center';
import {Program} from './program';
import {Subject} from './subject';

export class Course {
  $id: string;
  Center: Center;
  Classes: string;
  CreatedAt: string;
  Description: string;
  Fee: number;
  Id: number;
  Image: string;
  Name: string;
  Program: Program;
  Subject: Subject;
  TotalSession: number;
  UpdatedAt: string;
}
