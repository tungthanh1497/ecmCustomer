import {Component, OnInit} from '@angular/core';
import {Program} from '../models/program';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Center} from '../models/center';
import {APIContext, APICustomer} from '../APIContext';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderMenuComponent} from '../header-menu/header-menu.component';
import {UrlCustomer} from '../SiteUrlContext';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css'
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
    , '../../assets/css/animate.css'
  ]
})

export class ProgramsComponent implements OnInit {
  apiContext = new APIContext();
  apiCustomer = new APICustomer();
  centerId: number;
  urlCustomer = new UrlCustomer();

  programsList: Program[] = [];

  // center: Center;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    if (HeaderMenuComponent.centerId == null) {
      console.log('hic');
      //redirect error
    } else {
      this.centerId = HeaderMenuComponent.centerId;
      this.getAllProgram();
      console.log('yea');
    }
  }


  // getProgramWithCenterId() {
  //   const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
  //   this.http.get<Center>(url).toPromise().then((data) => {
  //       this.center = data;
  //       if (this.center != null) {
  //         this.getAllProgram();
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //     });
  // }

  getAllProgram() {
    const body = new HttpParams()
      .set('centerId', this.centerId + '');

    const configUrl = this.apiContext.host + this.apiCustomer.getAllProgram;
    this.http.get<Program[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.programsList = res;
        console.log(this.programsList);
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

  redirectToUrl(url: string) {
    HeaderMenuComponent.currentUrl = url;
    this.router.navigateByUrl(url);
  }
}
