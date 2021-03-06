import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RegisterForm} from '../models/registerForm';
import {Course} from '../models/course';
import {ResgisterStudent} from '../models/resgisterStudent';
import {APIContext, APICustomer} from '../APIContext';
import {ToastrService} from 'ngx-toastr';
import {HeaderMenuComponent} from '../header-menu/header-menu.component';
import {UrlCustomer} from '../SiteUrlContext';

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

  apiContext = new APIContext();
  apiCustomer = new APICustomer();
  centerId: number;
  urlCustomer = new UrlCustomer();

  courseModel: Course;
  courseId: number;
  isShowingEnroll = false;
  formsList: RegisterForm[] = [];
  dayInWeek: string[] = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];


  formId: number;
  registerStudent: ResgisterStudent = {
    Name: '',
    Email: '',
    Phone: '',
    Dob: '',
    Sex: true,
    AdmissionFormId: -1,
    Parent_Name: '',
    Parent_Gmail: '',
    Parent_Phone: '',
    CenterId: 1
  };
  errorMsgName = '-';
  errorMsgMail = '-';
  errorMsgPhone = '-';
  errorMsgDob = '-';

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: ToastrService) {
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
      currentContent.className += ' active show fadeInDown';
      evt.currentTarget.innerHTML = 'Huỷ';
    } else {
      currentContent.className += ' fadeOutUp';
      currentContent.className = currentContent.className.replace('active', '');
      currentContent.className = currentContent.className.replace('fadeInDown', '');
      currentContent.className = currentContent.className.replace('show', '');
      evt.currentTarget.innerHTML = 'Đăng kí tham gia';
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
      .set('centerId', this.centerId + '');

    const configUrl = this.apiContext.host + this.apiCustomer.getCourseById;
    this.http.get<Course>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.courseModel = res;
        console.log(this.courseModel);
        console.log(this.courseModel.Fee);
        this.getAvailbleForms(this.courseModel.Id);
      },
      error => {
        console.log(error);
      });
  }

  getAvailbleForms(cId: number) {
    const body = new HttpParams()
      .set('courseId', '' + cId)
      .set('centerId', this.centerId + '');

    const configUrl = this.apiContext.host + this.apiCustomer.getAllAdmissionForm;
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

  getDayById(dId: number) {
    if (dId >= 0 && dId < this.dayInWeek.length) {
      return this.dayInWeek[dId];
    }
    return dId;
  }


  submitEnroll() {
    const splitted = this.registerStudent.Dob.split('-', 3);
    this.registerStudent.Dob = splitted[1] + '/' + splitted[2] + '/' + splitted[0];
    console.log(this.registerStudent.Dob);
    const configUrl = this.apiContext.host + this.apiCustomer.registerCourse;
    const body = new HttpParams()
      .set('Name', this.registerStudent.Name)
      .set('Email', this.registerStudent.Email)
      .set('Phone', this.registerStudent.Phone)
      .set('Dob', this.registerStudent.Dob)
      .set('Sex', this.registerStudent.Sex + '')
      .set('AdmissionFormId', this.registerStudent.AdmissionFormId + '')
      .set('Parent_Name', this.registerStudent.Parent_Name)
      .set('Parent_Gmail', this.registerStudent.Parent_Gmail)
      .set('Parent_Phone', this.registerStudent.Parent_Phone)
      .set('CenterId', this.registerStudent.CenterId + '');
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        this.toastr.success('Bạn đã đăng kí thành công vào khoá học ' + this.courseModel.Name + '.', 'Chúc mừng!');
      },
      err => {
        console.log(err);
        this.toastr.error('Có lỗi xảy ra. Xin vui lòng thử lại.', 'Oops!');
      }
    );
    // this.redirectToCourses();
    document.getElementById('myModal').className = document.getElementById('myModal').className.replace('show', '');
    document.getElementById('myModal').className = document.getElementById('myModal').className.replace('modal-open', '');
  }

  redirectToCourses() {
    this.router.navigateByUrl('course-detail/' + this.courseId);
  }

  grantFormId(Id: number) {
    this.formId = Id;
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
      CenterId: this.centerId
    }
    ;
  }

  setradio(b: boolean) {
    this.registerStudent.Sex = b;
  }


  checkValidName() {
    if (this.registerStudent.Name != null) {
      this.registerStudent.Name = this.formatText(this.registerStudent.Name);
    }
    if (this.registerStudent.Name == null || this.registerStudent.Name === '') {
      this.errorMsgName = 'Tên học sinh không được bỏ trống.';
      return false;
    } else {
      this.errorMsgName = '';
      return true;
    }
  }

  checkValidEmail() {
    if (this.registerStudent.Email != null) {
      this.registerStudent.Email = this.formatText(this.registerStudent.Email);
    }
    const regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;
    if (this.registerStudent.Email == null || this.registerStudent.Email === '') {
      this.errorMsgMail = 'Email không được bỏ trống.';
      return false;
    } else if (!regex.test(this.registerStudent.Email)) {
      this.errorMsgMail = 'Định dạng email không đúng.';
      return false;
    } else {
      this.errorMsgMail = '';
      return true;
    }
  }

  checkValidPhone() {
    if (this.registerStudent.Phone != null) {
      this.registerStudent.Phone = this.formatText(this.registerStudent.Phone);
    }
    const regex = /(09|03)+([0-9]{8})\b/g;
    if (this.registerStudent.Phone == null || this.registerStudent.Phone === '') {
      this.errorMsgPhone = 'Số điện thoại không được bỏ trống.';
      return false;
    } else if (!regex.test(this.registerStudent.Phone)) {
      this.errorMsgPhone = 'Định dạng số điện thoại không đúng.';
      return false;
    } else {
      this.errorMsgPhone = '';
      return true;
    }
  }

  checkValidDob() {
    if (this.registerStudent.Dob != null) {
      this.registerStudent.Phone = this.formatText(this.registerStudent.Phone + '');
    }
    if (this.registerStudent.Phone == null || this.registerStudent.Phone === '') {
      this.errorMsgDob = 'Ngày sinh không được bỏ trống.';
      return false;
    } else {
      this.errorMsgDob = '';
      return true;
    }
  }

  checkValidFields() {
    this.checkValidName();
    this.checkValidEmail();
    this.checkValidPhone();
    this.checkValidDob();
    if (this.checkValidName() && this.checkValidEmail() && this.checkValidPhone() && this.checkValidDob()) {
      this.submitEnroll();
    } else {
      this.toastr.warning('Something is missing.', 'Alert!');
    }
  }

  isInputNumber(evt) {
    const c = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(c))) {
      evt.preventDefault();
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }

}
