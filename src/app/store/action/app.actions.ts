import { createAction, props } from '@ngrx/store';
import { Job } from "../../job-seeker/search-jobs/job.model";

export const JOB_SEEKER_SEARCH = '[Job Search Page] Search';
export const JOB_SEEKER_SEARCH_RESULT = '[Job Search Page] Search Result';
export const JOB_SEEKER_APPLY = '[Job Search Page] Apply Job';
export const JOB_SEEKER_APPLY_RESULT = '[Job Search Page] Apply Job Result';

export const JOB_SEEKER_MY_JOB = '[My Jobs] Search';
export const JOB_SEEKER_MY_JOB_RESULT = '[My Jobs] Search Result';

export const RESET_MESSAGE = '[App] Reset Message';

export const LOGIN = '[Login Page] Login';
export const LOGIN_SUCCESS = '[Login Page] Login Success';
export const LOGIN_FAIL = '[Login Page] Login Fail';

export const SIGNUP = '[Signup Page] Signup';
export const SIGNUP_SUCCESS = '[Signup Page] Signup Success';
export const SIGNUP_FAIL = '[Signup Page] Signup Fail';

export const LOGOUT = '[Header Page] - Logout';

export const jobSeekerSearch = createAction(JOB_SEEKER_SEARCH, props<{ keyword:string, city:string, state:string, page:string }>());
export const jobSeekerSearchResult = createAction(JOB_SEEKER_SEARCH_RESULT, props<{jobs: Array<Job>, total: number}>());

export const jobSeekerMyJobResult = createAction(JOB_SEEKER_MY_JOB_RESULT, props<{ jobs: Array<Job>, total: number }>());
export const jobSeekerMyJob = createAction(JOB_SEEKER_MY_JOB, props<{email:string}>());

export const jobApply = createAction(JOB_SEEKER_APPLY, props<{job_id: string, email: string}>());
export const jobApplyResult = createAction(JOB_SEEKER_APPLY_RESULT, props<{success: string, error: string}>());

export const resetMessage = createAction(RESET_MESSAGE);

export const login = createAction(LOGIN, props<{email:string, password:string}>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{token:string}>());
export const loginFail = createAction(LOGIN_FAIL, props<{loginError:string}>());

export const signup = createAction(SIGNUP, props<{formData: FormData}>());
export const signupSuccess = createAction(SIGNUP_SUCCESS, props<{ token:string }>());

export const signupFail = createAction(SIGNUP_FAIL);

export const logout = createAction(LOGOUT);
