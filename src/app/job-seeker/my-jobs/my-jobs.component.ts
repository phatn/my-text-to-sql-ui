import { Component, OnInit } from '@angular/core';
import { JobSeekerService } from "../search-jobs/job-seeker.service";
import { Observable } from "rxjs";
import { Job } from "../search-jobs/job.model";
import { Store } from "@ngrx/store";
import { UserService } from "../../login/user.service";
import { map } from "rxjs/operators";
import { AppState } from "../../store/reducer/app.reducer";
import { jobSeekerMyJob } from "../../store/action/app.actions";


@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {

  displayedColumns: string[] = ['SNo.', 'Job Title', 'Location', 'Status'];

  appState$: Observable<AppState>;

  jobs$!: Observable<Array<Job>>;

  constructor(private jobSeekerService: JobSeekerService,
              private userService: UserService,
              private store: Store<{ appReducer: any }>) {

    this.appState$ = store.select('appReducer');

    this.jobs$ = this.appState$.pipe(
      map(({myJobsResult}) => myJobsResult.jobs)
    )
  }

  ngOnInit(): void {
    const {email} = {email: ''}
    this.store.dispatch(jobSeekerMyJob({email}));
  }
}
