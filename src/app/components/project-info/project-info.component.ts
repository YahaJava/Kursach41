import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {TaskService} from '../../services/task.service';
import {Router} from '@angular/router';
import {ProjectService} from '../../services/project.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-project-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit, OnChanges {

  @Input() project;

  tasksDone;
  tasksAmount;

  progress: string;
  isManager = false;
  addStatus = false;
  editingTask;
  editStatus = false;

  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    link: new FormControl(''),
  });

  searchValue = '';
  modalRef: BsModalRef;
  searchList;
  chosenAssigner;

  constructor(private modalService: BsModalService,
              private taskService: TaskService,
              private projectService: ProjectService,
              private router: Router,
              private userService: UserService
  ) { }

  ngOnInit(): void {
    this.isManager = this.userService.getCurrentUser().role === 'admin';
  }


  ngOnChanges(changes): void {
    this.project.tasks = this.sortTasksByComplete(this.project.tasks);
    this.updateProgress();
  }

  updateProgress() {
    this.tasksDone = this.project.tasks.filter(task => task.status === 'done').length;
    this.tasksAmount = this.project.tasks.length;
    this.progress = (this.tasksDone / this.tasksAmount * 100).toFixed(2).toString();
  }

  sortTasksByComplete(tasks) {
    const sorted = [];
    const other = [];
    tasks.forEach(task => {
      if (task.status === 'undone') {
        sorted.push(task);
      } else {
        other.push(task);
      }
    });
    other.forEach(el => sorted.push(el));
    return sorted;
  }

  changeAddStatus() {
    this.resetStatus();
    this.addStatus = true;
  }

  changeEditingTask(task?) {
    if (!this.editStatus) {
      if (task) {
        this.editingTask = task;
      } else {
        this.editingTask = null;
      }
    }
  }

  changeEditStatus(task) {
    this.resetStatus();
    this.editForm.patchValue({
      name: task.name,
      link: task.link
    });
    this.editStatus = true;
  }

  resetStatus() {
    this.editStatus = false;
    this.addStatus = false;
    this.chosenAssigner = null;
    this.editForm.patchValue({
      name: '',
      link: ''
    });
  }

  openModal(template) {
    this.searchList = this.project.team;
    this.modalRef = this.modalService.show(template);
  }

  searchPersons() {
    this.searchList = this.project.team.filter(member => member.name.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  setAssigner(person) {
    this.chosenAssigner = person;
    this.closeModal();
  }

  closeModal() {
    this.modalRef.hide();
  }

  addTask() {
    const response = {
      name: this.editForm.controls.name.value,
      link: this.editForm.controls.link.value,
      status: 'undone',
      projectId: this.project.id,
      personId: this.chosenAssigner ? this.chosenAssigner.id : null
    };
    this.taskService.addTask(response).subscribe(resp => {
      this.project.tasks.push({
        ...response,
        person: this.chosenAssigner
      });
      this.project.tasks = this.sortTasksByComplete(this.project.tasks);
      this.tasksAmount += 1;
      this.updateProgress();
      this.resetStatus();
    });
  }

  editTask(task) {
    const response = {
      id: task.id,
      name: this.editForm.controls.name.value,
      link: this.editForm.controls.link.value,
      status: 'undone',
      projectId: this.project.id,
      personId: this.chosenAssigner ? this.chosenAssigner.id : null
    };
    this.taskService.editTask(response).subscribe(resp => {
      const index = this.project.tasks.findIndex(t => t.id === task.id);
      this.project.tasks[index] = {
        ...response,
        person: this.chosenAssigner
      };
      this.resetStatus();
    });
  }

  changeTaskStatus(task, status) {
    this.taskService.changeStatus(task.id).subscribe(response => {
      this.project.tasks.forEach(t => {
        if (t.id === task.id) {
          if (status === 'done') {
            t.status = 'undone';
          } else {
            t.status = 'done';
          }
          this.updateProgress();
        }
      });
    });
  }

  deleteTask(task) {
    this.taskService.deleteTask(task.id).subscribe(response => {
      this.project.tasks = this.project.tasks.filter(t => t.id !== task.id);
      this.tasksAmount -= 1;
      this.updateProgress();
    });
  }

  gotoStats() {
    this.router.navigate(['/stats'], {queryParams: {id: this.project.id}});
  }

  gotoEstimation() {
    this.router.navigate(['/estimation'], {queryParams: {id: this.project.id}});
  }

  submit() {
    this.projectService.changeProjectStatus(this.project.id).subscribe(resp => {
      this.project.status = 'Done';
    });
  }
}
