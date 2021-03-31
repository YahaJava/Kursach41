import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProjectsPageComponent } from './components/project-page/projects-page.component';
import {RouterModule} from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import {ProgressBarModule} from 'angular-progress-bar';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PersonService} from './services/person.service';
import { PersonPageComponent } from './components/person-page/person-page.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonInfoComponent } from './components/person-info/person-info.component';
import { HttpClientModule} from '@angular/common/http';
import {ProjectService} from './services/project.service';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { StatsComponent } from './components/stats/stats.component';
import { EstimationComponent } from './components/estimation/estimation.component';
import {RatingModule} from 'ngx-bootstrap/rating';

const routes = [
  {
    path: 'projects',
    component: ProjectsPageComponent
  },
  {
    path: 'persons',
    component: PersonPageComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'estimation',
    component: EstimationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/projects'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsPageComponent,
    ProjectListComponent,
    ProjectInfoComponent,
    TeamMembersComponent,
    PersonPageComponent,
    PersonListComponent,
    PersonInfoComponent,
    HeaderComponent,
    LoginComponent,
    StatsComponent,
    EstimationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ProgressBarModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RatingModule
  ],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService, PersonService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
