import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {HeaderMenuComponent} from './header-menu/header-menu.component';
import {CoursesComponent} from './courses/courses.component';
import {ErrorComponent} from './error/error.component';
import {ProgramsComponent} from './programs/programs.component';
import {ProgramDetailComponent} from './program-detail/program-detail.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {
    path: ':centerId', component: HeaderMenuComponent, children: [
      {path: '', redirectTo: 'homepage', pathMatch: 'full'}
      , {path: 'homepage', component: HomepageComponent}
      , {path: 'programs', component: ProgramsComponent}
      // , {path: 'courses/:id', component: CoursesComponent}
      , {
        path: 'courses', children: [
          {path: '', component: CoursesComponent, pathMatch: 'full'}
          , {path: ':pId', component: CoursesComponent}
        ]
      }
      , {path: 'program-detail/:pId', component: ProgramDetailComponent}
      , {path: 'course-detail/:cId', component: CourseDetailComponent}
      , {path: 'enroll/:fId', component: RegisterComponent}
      , {path: '**', component: ErrorComponent}
    ]
  }
  , {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [
  HeaderMenuComponent
  , HomepageComponent
  , ProgramsComponent
  , CoursesComponent
  , ProgramDetailComponent
  , CourseDetailComponent
  , RegisterComponent
  , ErrorComponent
];
