import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() { }

  private userLoggedIn = new Subject<void>();

  userLoggedIn$ = this.userLoggedIn.asObservable();

  notifyUserLoggedIn() {
    this.userLoggedIn.next();
  }
}
