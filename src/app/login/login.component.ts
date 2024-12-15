import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {LoginResult} from "../layout/header/header.component";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    show_spinner = false;
    loginForm!: FormGroup;
    destroy$: Subject<boolean> = new Subject<boolean>();
    loginResult: LoginResult | undefined;

    constructor(private formBuilder: FormBuilder,
                private userService: UserService,
                private router: Router
    ) {

        this.userService.data$.subscribe(data => {
            this.loginResult = data;
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
        const {email, password} = this.loginForm.value;
        this.show_spinner = true;
        this.userService.login(email, password).subscribe(
            (res) => {
                const {success, fullname} = res;
                if (success) {
                    localStorage.setItem('TOKEN_NAME', fullname);
                    this.userService.updateData(fullname);
                    this.router.navigate(["/", "data-search"]);
                } else {
                    this.userService.updateData({errorMessage: 'Login failed', fullname: undefined});
                }
                this.show_spinner = false;
            }
        );
    }

    ngOnInit(): void {
    }

}
