import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Program} from '../models/program';
import {Course} from '../models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'
    , '../../assets/css/bootstrap.css'
    , '../../assets/vendors/linericon/style.css'
    , '../../assets/css/font-awesome.min.css'
    , '../../assets/vendors/owl-carousel/owl.carousel.min.css'
    , '../../assets/vendors/lightbox/simpleLightbox.css'
    , '../../assets/vendors/nice-select/css/nice-select.css'
    , '../../assets/vendors/animate-css/animate.css'
    , '../../assets/vendors/popup/magnific-popup.css'
    , '../../assets/css/style.css'
    , '../../assets/css/responsive.css']
})
export class CoursesComponent implements OnInit {

  isAllCourses: boolean;
  programId: number;
  coursesList: Course[];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('pId'));
    if (this.route.snapshot.paramMap.get('pId') == null) {
      this.isAllCourses = true;
    } else {
      this.isAllCourses = false;
      this.programId = +this.route.snapshot.paramMap.get('pId');
    }
    if (this.programId == null) {
      this.getAllCourses();
    } else if (isNaN(this.programId)) {
      //redirect error
    } else {
      this.getAllCoursesByProgram(this.programId);
    }
  }


  getAllCoursesByProgram(pId: number) {
    const body = new HttpParams()
      .set('programId', '' + pId)
      .set('centerId', '1');

    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/Customer/GetAllCourseFollowProgram';
    this.http.get<Course[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.coursesList = res;
        console.log(this.coursesList);
      },
      error => {
        console.log(error);
      });
  }

  getAllCourses() {
    const body = new HttpParams()
      .set('centerId', '1');

    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/Customer/GetAllCourse';
    this.http.get<Course[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.coursesList = res;
        console.log(this.coursesList);
      },
      error => {
        console.log(error);
      });
  }
  mouseEnterEvent(evt: any) {
    evt.currentTarget.className = evt.currentTarget.className.replace('flipInX', '');
    evt.currentTarget.className += ' pulse';
  }

  mouseLeaveEvent(evt: any) {
    evt.currentTarget.className = evt.currentTarget.className.replace('pulse', '');
  }

}
