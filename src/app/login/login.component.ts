import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { Observable, Subject, takeUntil} from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/reducer/app.reducer";
import { login } from "../store/action/app.actions";
import { map } from "rxjs/operators";
import {LoginResult} from "../layout/header/header.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;

  token$!: Observable<string>;

  appState$: Observable<AppState>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  loginError$!: Observable<string>;
  loginResult: LoginResult | undefined;
  constructor(private formBuilder : FormBuilder,
              private userService: UserService,
              private router: Router,
              private store: Store<{appReducer: AppState}>
              ) {

    this.appState$ = this.store.select('appReducer');
    this.userService.data$.subscribe(data => {
        this.loginResult = data;
    })
    this.token$ = this.appState$.pipe(map(({token}) => token));
    this.loginError$ = this.appState$.pipe(map(({loginError}) => loginError));

    this.appState$.pipe(takeUntil(this.destroy$)) .subscribe(response => {
        const { token } = response;
        if(token) {
          const { role } = {role: ''};
          if(role) {
            localStorage.setItem('TOKEN', token);
            if(role === 'employer') {
              router.navigate(['/', 'employers']);
            } else if(role === 'seeker'){
              router.navigate(['/', 'seekers']);
            }
          }
        }
      })

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  login(): void {
    const { email, password } = this.loginForm.value;
    this.userService.handleLogin(email, password).subscribe(
                (res) => {
                    const {success, fullname} = res;
                    if (success) {
                        localStorage.setItem('TOKEN_NAME', fullname);
                      this.userService.updateData({errorMessage: undefined, fullname: fullname});
                      this.router.navigate(["/", "data-search"]);
                    } else {
                        this.userService.updateData({errorMessage: 'Login failed', fullname: undefined});
                    }
                }
            );
    //this.store.dispatch(login({email, password}));
  }

  ngOnInit(): void {
  }

}
