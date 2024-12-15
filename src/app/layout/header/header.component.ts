import { Component, OnInit } from '@angular/core';
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

  fullName!: string;

  constructor(private userService: UserService,
              private router: Router) {
    this.userService.data$.subscribe(data => {
      this.fullName = data ?? "";
    });
  }

  logout() {
    this.userService.clearToken();
    this.userService.updateData("");
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {

  }

}
