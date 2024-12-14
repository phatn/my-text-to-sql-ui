import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { UserService} from "../../login/user.service";
import { Router } from "@angular/router";

export interface LoginResult {
  errorMessage: string,
  fullname: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token$!: Observable<string>;

  credential$!: Observable<{role: string, fullname: string}>;


  loginResult: LoginResult | undefined;

  constructor(private userService: UserService,
              private router: Router) {

    this.userService.data$.subscribe(data => {
      this.loginResult = data;
    })
  }

  logout() {
    this.userService.clearToken();
    this.loginResult = {errorMessage: '', fullname: ''}
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {

  }

}
