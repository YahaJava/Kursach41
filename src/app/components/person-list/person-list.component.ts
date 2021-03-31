import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, OnChanges {

  @Input() personList;

  searchList;

  @Input() sel;

  selected;

  searchValue;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.sel) {
      this.selected = this.sel.id;
    }
  }

  ngOnChanges() {
    if (this.searchValue) {
      this.searchPersons();
    } else {
      this.searchList = this.sortByName(this.personList);
    }
  }

  private sortByName(list) {
    return list.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  selectPerson(person) {
    this.selected = person.id;
    this.router.navigate(['/persons'], { queryParams: {id: person.id} });
  }

  searchPersons() {
    this.searchList = this.personList.filter(person => person.name.toLowerCase().includes(this.searchValue.toLowerCase()));
  }
}
