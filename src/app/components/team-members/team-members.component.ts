import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PersonService} from '../../services/person.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit, OnChanges {

  @Input() team;
  @Input() project;

  toggleAll = false;
  allPersons;
  searchList;
  isManager = false;
  modalRef: BsModalRef;
  modalSpinnerStatus = true;
  searchValue;

  /*  selectedPosition;
    selectOptions;
    selectedPerson;*/

  constructor(private modalService: BsModalService, private personService: PersonService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.isManager = this.userService.getCurrentUser().role === 'admin';
  }

  ngOnChanges(): void {
    // this.setOptions();
    this.toggleAll = false;
  }

  /*setOptions() {
    this.selectedPosition = 'Developer';
    this.selectOptions = ['Developer', 'Tester'];
    if (!this.team.find(member => member.position === 'Team Lead')) {
      this.selectOptions.push('Team Lead');
    }
  }*/

  openModal(template) {
    this.modalSpinnerStatus = true;
    this.searchValue = '';
    this.modalRef = this.modalService.show(template);
    this.personService.getAllPersons().subscribe(response => {
      this.allPersons = response;
      this.searchList = this.sortByExisting(this.allPersons);
      this.modalSpinnerStatus = false;
    });
  }

  searchPersons() {
    this.searchList = this.sortByExisting(this.allPersons).filter(member => member.name.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  sortByExisting(allPersons) {
    const sorted = [];
    const other = [];
    allPersons.forEach(person => {
      if (this.checkTeamMemberOnExisting(person)) {
        sorted.push(person);
      } else {
        other.push(person);
      }
    });
    other.forEach(el => sorted.push(el));
    return sorted;
  }

  checkTeamMemberOnExisting(person) {
    return this.team.find(teamMember => teamMember.id === person.id);
  }

  /*  toNextStep(person) {
      if (!this.checkTeamMemberOnExisting(person)) {
        this.stepOfModal = '2';
        this.selectedPerson = person;
      }
    }*/

  closeModal() {
    // this.stepOfModal = '1';
    this.modalRef.hide();
  }

  addPersonToTeam(person) {
    /*   const person = {
         ...this.selectedPerson,
          position: this.selectedPosition
       };*/
    const curTeam = this.team;
    curTeam.push(person);
    const body = {
      ...this.project,
      team: curTeam
    };
    this.personService.updateProjectTeam(body).subscribe();
  }

  removeFromTeam(person) {
    const body = {
      ...this.project,
      team: this.project.team.filter(member => member.id !== person.id)
    };
    this.personService.updateProjectTeam(body).subscribe();
    this.team = this.team.filter(member => !(member.id === person.id));
    // this.setOptions();
  }

  toggle() {
    this.toggleAll = !this.toggleAll;
  }

  goToPersonPage(person) {
    this.router.navigate(['/persons'], {queryParams: {id: person.id}});
  }

}
