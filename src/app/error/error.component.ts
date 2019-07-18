import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css',
    '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/style.css'
    , '../../assets/css/responsive.css']
})
export class ErrorComponent implements OnInit {

  courseId: number;

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
    }
  }

}
