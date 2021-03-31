import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {EstimationService} from '../../services/estimation.service';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.scss']
})
export class EstimationComponent implements OnInit {

  searchValue = '';
  modalRef: BsModalRef;
  searchList;
  project;
  rate;
  selectedPerson;
  feedback = '';

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private modalService: BsModalService,
              private router: Router,
              private estimationService: EstimationService) { }

  ngOnInit(): void {
    let id = '';
    this.route.queryParams.pipe(
      tap(param => id = param.id),
      switchMap(() => this.projectService.getProject(id)),
      tap(data => {
        this.project = data;
      })
    ).subscribe();
  }

  openModal(template) {
    this.searchList = this.project.team;
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  searchPersons() {
    this.searchList = this.project.team.filter(member => member.name.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  selectPerson(person) {
    this.selectedPerson = person;
    this.closeModal();
  }

  estimate() {
    const estimation = {
      projectId: this.project.id,
      personId: this.selectedPerson.id,
      projectName: this.project.title,
      rate: this.rate,
      feedback: this.feedback
    };
    this.estimationService.addEstimation(estimation)
      .subscribe(resp => this.router.navigate(['/projects'], {queryParams: { id: this.project.id}}));
  }
}
