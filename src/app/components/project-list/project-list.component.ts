import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  @Input()
  selected;

  @Input()
  projects;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  projectSelected(chosenProject) {
    this.router.navigate(['/projects'], { queryParams: {id: chosenProject.id} });
  }
}
