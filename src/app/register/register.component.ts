import {Component, OnInit} from '@angular/core';
import {ResgisterStudent} from '../models/resgisterStudent';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css']
})
export class RegisterComponent implements OnInit {

  courseId: number;
  registerStudent: ResgisterStudent;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    console.log(this.route.snapshot.paramMap.get('cId'));
    if (this.route.snapshot.paramMap.get('cId') == null) {
    } else {
      this.courseId = +this.route.snapshot.paramMap.get('cId');
    }
    if (this.courseId == null || isNaN(this.courseId)) {
      //redirect error
    } else {
      this.registerStudent = {
        Name: '',
        Email: '',
        Phone: '',
        Dob: '',
        Sex: false,
        IsPayment: false,
        CourseId: this.courseId,
        Parent_Name: '',
        Parent_Gmail: '',
        Parent_Phone: '',
        CenterId: 1
      };
    }
  }

  ngOnInit() {
  }

  submitEnroll() {
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/RegistrationStudent/RegisterCourse';
    const body = new HttpParams()
      .set('Name', this.registerStudent.Name)
      .set('Email', this.registerStudent.Email)
      .set('Phone', this.registerStudent.Phone)
      .set('Dob', this.registerStudent.Dob)
      .set('Sex', this.registerStudent.Sex + '')
      .set('IsPayment', this.registerStudent.IsPayment + '')
      .set('CourseId', this.registerStudent.CourseId + '')
      .set('Parent_Name', this.registerStudent.Parent_Name)
      .set('Parent_Gmail', this.registerStudent.Name)
      .set('Parent_Phone', this.registerStudent.Parent_Phone)
      .set('CenterId', this.registerStudent.CenterId + '');
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
    // this.redirectToAllProgram();
  }
}
