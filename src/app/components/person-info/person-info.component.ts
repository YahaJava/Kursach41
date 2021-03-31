import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss']
})
export class PersonInfoComponent implements OnInit {

  @Input() spinnerStatus;
  @Input() person;
  modalRef: BsModalRef;
  modalEstimation;
  isManager = false;

  constructor(private modalService: BsModalService, private userService: UserService) { }

  ngOnInit(): void {
    this.isManager = this.userService.getCurrentUser().role === 'admin';
  }

  openModal(template, estimation) {
    this.modalEstimation = estimation;
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }
}
