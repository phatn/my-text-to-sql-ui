import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { UserService } from "../login/user.service";
import { Router } from "@angular/router";

interface SelectControl {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {

  }

}
