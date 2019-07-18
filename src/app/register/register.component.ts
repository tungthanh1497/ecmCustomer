import {Component, OnInit} from '@angular/core';
import {ResgisterStudent} from '../models/resgisterStudent';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css']
})
export class RegisterComponent implements OnInit {

  formId: number;
  registerStudent: ResgisterStudent;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    console.log(this.route.snapshot.paramMap.get('fId'));
    if (this.route.snapshot.paramMap.get('fId') == null) {
    } else {
      this.formId = +this.route.snapshot.paramMap.get('fId');
    }
    if (this.formId == null || isNaN(this.formId)) {
      //redirect error
    } else {
      this.registerStudent = {
        Name: '',
        Email: '',
        Phone: '',
        Dob: '',
        Sex: false,
        AdmissionFormId: this.formId,
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
    const splitted = this.registerStudent.Dob.split('-', 3);
    this.registerStudent.Dob = splitted[1] + '/' + splitted[2] + '/' + splitted[0];
    console.log(this.registerStudent.Dob);
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/RegistrationStudent/RegisterCourse';
    const body = new HttpParams()
      .set('Name', this.registerStudent.Name)
      .set('Email', this.registerStudent.Email)
      .set('Phone', this.registerStudent.Phone)
      .set('Dob', this.registerStudent.Dob)
      .set('Sex', this.registerStudent.Sex + '')
      .set('AdmissionFormId', this.registerStudent.AdmissionFormId + '')
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
    this.redirectToCourses();
  }

  changedGender() {
    this.registerStudent.Sex = !this.registerStudent.Sex;
  }

  redirectToCourses() {
    this.router.navigateByUrl('courses');
  }
}
