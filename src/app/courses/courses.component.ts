import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Program} from '../models/program';
import {Course} from '../models/course';
import {APIContext, APICustomer} from '../APIContext';
import {HeaderMenuComponent} from '../header-menu/header-menu.component';
import {UrlCustomer} from '../SiteUrlContext';

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
  apiContext = new APIContext();
  apiCustomer = new APICustomer();
  centerId: number;
  urlCustomer = new UrlCustomer();

  isAllCourses: boolean;
  programId: number;
  programName: string;
  coursesList: Course[];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
  }

  redirectToUrl(url: string) {
    HeaderMenuComponent.currentUrl = url;
    this.router.navigateByUrl(url);
  }

  ngOnInit() {
    if (HeaderMenuComponent.centerId == null) {
      console.log('hic');
      //redirect error
    } else {
      this.centerId = HeaderMenuComponent.centerId;
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
        this.getProgramById(this.programId);
        this.getAllCoursesByProgram(this.programId);
      }
    }
  }


  getAllCoursesByProgram(pId: number) {
    const body = new HttpParams()
      .set('programId', '' + pId)
      .set('centerId', this.centerId + '');

    const configUrl = this.apiContext.host + this.apiCustomer.getAllCourseFollowProgram;
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
      .set('centerId', this.centerId + '');

    const configUrl = this.apiContext.host + this.apiCustomer.getAllCourse;
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

  private getProgramById(pId: number) {
    const body = new HttpParams()
      .set('programId', '' + pId)
      .set('centerId', this.centerId + '');

    const configUrl = this.apiContext.host + this.apiCustomer.getProgramById;
    this.http.get<Program>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.programName = res.Name;
        console.log(this.programName);
      },
      error => {
        console.log(error);
      });

  }
}
