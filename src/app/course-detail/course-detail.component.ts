import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RegisterForm} from '../models/registerForm';
import {Course} from '../models/course';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'
    , '../../assets/css/bootstrap.css'
    , '../../assets/vendors/linericon/style.css'
    , '../../assets/css/font-awesome.min.css'
    , '../../assets/vendors/owl-carousel/owl.carousel.min.css'
    , '../../assets/vendors/lightbox/simpleLightbox.css'
    , '../../assets/vendors/nice-select/css/nice-select.css'
    , '../../assets/vendors/animate-css/animate.css'
    , '../../assets/vendors/popup/magnific-popup.css'
    , '../../assets/css/style.css'
    , '../../assets/css/responsive.css'
  ]
})
export class CourseDetailComponent implements OnInit, AfterViewInit {

  courseModel: Course;
  courseId: number;
  isShowingEnroll = false;
  formsList: RegisterForm[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('cId'));
    if (this.route.snapshot.paramMap.get('cId') == null) {
    } else {
      this.courseId = +this.route.snapshot.paramMap.get('cId');
    }
    if (this.courseId == null || isNaN(this.courseId)) {
      //redirect error
    } else {
      this.getCourse(this.courseId);
    }
  }

  ngAfterViewInit(): void {

  }

  displayEnroll(evt) {
    // var i, tabcontent, tablinks;
    // tabcontent = document.getElementsByClassName('tab-pane');
    // for (i = 0; i < tabcontent.length; i++) {
    //   // tabcontent[i].style.display = 'none';
    //   tabcontent[i].className = tabcontent[i].className.replace(' active', '');
    //   tabcontent[i].className = tabcontent[i].className.replace(' show', '');
    // }
    // tablinks = document.getElementsByClassName('nav-link');
    // for (i = 0; i < tablinks.length; i++) {
    //   tablinks[i].className = tablinks[i].className.replace(' active', '');
    // }
    const currentContent = document.getElementById('fromGroups');
    if (!this.isShowingEnroll) {
      currentContent.className += ' active show';
      evt.currentTarget.innerHTML = 'Cancel';
    } else {
      currentContent.className = currentContent.className.replace('active', '');
      currentContent.className = currentContent.className.replace('show', '');
      evt.currentTarget.innerHTML = 'Enroll this course';
    }
    this.isShowingEnroll = !this.isShowingEnroll;
  }

  switchTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tab-pane');
    for (i = 0; i < tabcontent.length; i++) {
      // tabcontent[i].style.display = 'none';
      tabcontent[i].className = tabcontent[i].className.replace(' active', '');
      tabcontent[i].className = tabcontent[i].className.replace(' show', '');
    }
    tablinks = document.getElementsByClassName('nav-link');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabName).className += ' active show';
    evt.currentTarget.className += ' active';
  }

  getCourse(cId: number) {
    const body = new HttpParams()
      .set('courseId', '' + cId)
      .set('centerId', '1');

    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/Customer/GetCourseById';
    this.http.get<Course>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.courseModel = res;
        console.log(this.courseModel);
        this.getAvailbleForms(this.courseModel.Id);
      },
      error => {
        console.log(error);
      });
  }

  getAvailbleForms(cId: number) {
    const body = new HttpParams()
      .set('courseId', '' + cId)
      .set('centerId', '1');

    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/Customer/GetAllAdmissionForm';
    this.http.get<RegisterForm[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        const tempList = res;
        console.log(tempList);
        for (const formModel of tempList) {
          if (!formModel.IsClosed) {
            this.formsList.push(formModel);
          }
        }
      },
      error => {
        console.log(error);
      });
  }

}
