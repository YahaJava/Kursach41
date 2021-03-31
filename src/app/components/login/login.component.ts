import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = '';
  password = '';
  error = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logIn() {
    if (this.login && this.password) {
      const credentials = {
        login: this.login,
        password: this.password
      };
      this.userService.checkCredentials(credentials).subscribe(response => {
        if (response) {
          this.router.navigate(['/projects']);
        } else {
          this.error = true;
        }
      });
    }
  }
}
