import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../../services/person.service';
import {ProjectService} from '../../services/project.service';
import {UserService} from '../../services/user.service';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss']
})
export class PersonPageComponent implements OnInit {

  persons;
  chosenPerson;
  isInfoLoading;

  constructor(private route: ActivatedRoute,
              private personService: PersonService,
              private userService: UserService,
              private router: Router) {
  }


  ngOnInit(): void {
    if (!this.userService.getCurrentUser()) {
      this.router.navigate(['/login']);
    } else {
      this.isInfoLoading = true;
      this.personService.getAllPersons().pipe(
        tap(response => this.persons = response),
        switchMap(() => this.route.queryParams),
        tap(params => {
          const id = params.id;
          if (id) {
            this.chosenPerson = this.persons.find(person => person.id === id);
            this.isInfoLoading = false;
           /* this.personService.getPerson(id).subscribe(response => {
              this.chosenPerson = response;
              this.isInfoLoading = false;
            });*/
          }
        })).subscribe();
    }
  }

}
