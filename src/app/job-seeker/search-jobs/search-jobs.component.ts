import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subject, takeUntil} from "rxjs";
import { Job } from "./job.model";
import { map } from "rxjs/operators";
import { UserService } from "../../login/user.service";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import { PageEvent } from "@angular/material/paginator";
import { AppState } from "../../store/reducer/app.reducer";
import { jobApply, jobSeekerSearch, resetMessage } from "../../store/action/app.actions";

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.css']
})
export class SearchJobsComponent implements OnInit, OnDestroy {

  searchJobForm!: FormGroup;

  destroy$: Subject<boolean> = new Subject<boolean>();

  appState$: Observable<AppState>;

  jobsResult$: Observable<any>;

  job$: Observable<any>;

  jobApplyResult$!: Observable<any>;

  showPaginator$: Observable<boolean> = new Observable<false>();

  showDetail(job_id: string) {
    this.job$ = this.appState$.pipe(map(({jobsSearchResult}) =>
        jobsSearchResult.jobs.find(job => job._id == job_id)));
  }

  apply(job_id: string) {
    const { email } = {email: ''}
    this.store.dispatch(jobApply({job_id, email}));
  }

  constructor(private formBuilder : FormBuilder,
              private router: Router,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private store: Store<{appReducer: AppState}>) {

    this.job$ = new Observable<Job>();
    this.destroy$.next(false);
    this.appState$ = store.select('appReducer');

    this.jobsResult$ = this.appState$.pipe(
      map(({jobsSearchResult}) => jobsSearchResult)
    )

    this.appState$.pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        const {  jobApplyResult } = response;
      if(jobApplyResult.success) {
        this.openSnackBar("Job applied, good luck!", "");
        this.store.dispatch(resetMessage());
      }
    })

    this.showPaginator$ = this.appState$.pipe(
      map(({jobsSearchResult}) => jobsSearchResult.total > 0)
    );


    this.searchJobForm = this.formBuilder.group({
      keyword: [],
      city: [],
      state: []
    });
  }

  search() {
    const { keyword, city, state } = this.searchJobForm.value;
    this.store.dispatch(jobSeekerSearch({keyword, city, state, page: '0'}));
  }

  onPageChange($event:PageEvent) {
    const { keyword, city, state } = this.searchJobForm.value;
    const page = ($event.pageIndex + 1).toString();
    this.store.dispatch(jobSeekerSearch({keyword, city, state, page}));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
