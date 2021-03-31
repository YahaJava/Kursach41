import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../../services/person.service';
import {ProjectService} from '../../services/project.service';
import {switchMap, tap} from 'rxjs/operators';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {

  projects;
  chosenProject;
  team;

  constructor(private route: ActivatedRoute,
              private personService: PersonService,
              private projectService: ProjectService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!this.userService.getCurrentUser()) {
      this.router.navigate(['/login']);
    } else {
      this.projectService.getAllProjects().pipe(
        tap(data => (this.projects = data)),
        switchMap(() => this.route.queryParams),
        tap( params => {
          const id = params.id;
          if (id) {
            const findProject = this.projects.find(project => project.id === id);
            this.chosenProject = findProject ? findProject : this.projects[0];
            this.team = this.chosenProject.team; /*
            this.projectService.getProject(id).subscribe(response => {
              this.chosenProject = response;
              this.team = this.chosenProject.team;
            });*/
          } else {
            this.chosenProject = this.projects[0];
          }
        })).subscribe();
    }
  }

}
