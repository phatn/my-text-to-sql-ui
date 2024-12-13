import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';

import { JobSeekerService } from "../../job-seeker/search-jobs/job-seeker.service";
import {
  JOB_SEEKER_APPLY, JOB_SEEKER_MY_JOB,
  JOB_SEEKER_SEARCH,
  jobApplyResult, jobSeekerMyJobResult,
  jobSeekerSearchResult, RESET_MESSAGE, resetMessage
} from "../action/app.actions";

@Injectable()
export class JobSeekerEffects {

  jobSearch$ = createEffect(() =>  this.actions$.pipe(
      ofType(JOB_SEEKER_SEARCH),
      exhaustMap((action: {keyword: string, city: string, state: string, page:number}) =>
        this.jobSeekerService.searchJobs(action.keyword, action.city, action.state, action.page)
        .pipe(
          map(response => {
            const {jobs, total} = response;
            return jobSeekerSearchResult({ jobs, total });
          }),
          catchError(() => EMPTY))
      )
    )
  );

  myJobs$ = createEffect(() =>  this.actions$.pipe(
      ofType(JOB_SEEKER_MY_JOB),
      exhaustMap((action: {email: string}) => this.jobSeekerService.getMyJobs(action.email)
        .pipe(
          map(response => {
            const {jobs, total} = response;
            return jobSeekerMyJobResult({ jobs, total });
          }),
          catchError(() => EMPTY))
      )
    )
  );

  jobApply$ = createEffect(() =>  this.actions$.pipe(
      ofType(JOB_SEEKER_APPLY),
      exhaustMap((action: {job_id:string, email: string}) => this.jobSeekerService.applyJob(action.job_id, action.email)
        .pipe(
          map(response => {
            const { success, error } = response;
            return jobApplyResult({success, error});
          }),
          catchError(() => EMPTY))
      )
    )
  );


  constructor(
    private actions$: Actions,
    private jobSeekerService: JobSeekerService
  ) {}
}
