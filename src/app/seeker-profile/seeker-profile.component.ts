import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../login/user.service";
import {ISeeker} from "./SeekerInterface";
import {globalVars} from "../../environments/globalVars";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-seeker-profile',
  templateUrl: './seeker-profile.component.html',
  //styleUrls: ['./seeker-profile.component.css']
  styleUrls: ['../employer/ejob.css']
})
export class SeekerProfileComponent implements OnInit {

  disableSelect = true;

  form!: FormGroup;

  public user!: ISeeker;

  seekerStatuses = globalVars.seekerStatuses;

  constructor(
    private userService: UserService,
    private formBuilder : FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,) {

    this.initFormValue();

  }

  ngOnInit(): void {
  }

  initFormValue(){
    if(this.disableSelect) {
      this.form = this.formBuilder.group({
        fullname: [''],
        email: [''],
        education: [''],
        skill_set: [''],
        yoe: [''],
        resume: [''],
        status: ['']
      });
    }else {
      this.form = this.formBuilder.group({
        fullname: ['', Validators.required],
        email: ['', Validators.required],
        education: ['', Validators.required],
        skill_set: ['', Validators.required],
        yoe: ['', Validators.required],
        resume: ['', Validators.required],
        status: ['', Validators.required]
      });
    }
  }

  cancel(){
    this.router.navigate(['', 'seekers']);
  }

  updateProfile(){
    this.user.fullname = this.form.value.fullname;
    this.user.education = this.form.value.education;
    this.user.skill_set = this.form.value.skill_set.split(",");
    this.user.yoe= this.form.value.yoe;
    this.user.resume = this.form.value.resume;
    this.user.status = this.form.value.status;

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: "left",
      verticalPosition: "top",
    });
  }
}
