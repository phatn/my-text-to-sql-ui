import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { UserService } from "../../login/user.service";
import {LOGIN, loginFail, loginSuccess, SIGNUP, signupSuccess} from "../action/app.actions";

@Injectable()
export class UserEffects {

  userLogin$ = createEffect(() =>  this.actions$.pipe(
      ofType(LOGIN),
      exhaustMap((action: {email:string, password:string}) => this.userService.login(action.email, action.password).pipe(
          map(token => loginSuccess(token)),
          catchError(({error}) => {
            const loginError = error.error;
            return of(loginFail({loginError}))
          })
        )
      )
    )
  );

  userSignup$ = createEffect(() =>  this.actions$.pipe(
      ofType(SIGNUP),
      exhaustMap((action: {formData: FormData}) =>
            this.userService.signup(action.formData).pipe(
              map(token => signupSuccess(token)),
              catchError(() => EMPTY)
            )
        )
      )
  );

  constructor(private actions$: Actions, private userService: UserService) {

  }
}
