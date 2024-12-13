import { Pipe, PipeTransform } from '@angular/core';
import {UserService} from "../login/user.service";

export interface Seeker {
  email:string;
  status:string
}

@Pipe({
  name: 'statusExtractor'
})
export class StatusExtractorPipe implements PipeTransform {

  constructor(private userService: UserService) {
  }

  transform(value: Array<Seeker>): string {
    return '';
  }
}
