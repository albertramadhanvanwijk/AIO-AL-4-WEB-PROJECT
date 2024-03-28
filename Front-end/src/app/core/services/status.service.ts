import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private ibfStatusSubject: BehaviorSubject<string>;
  private preparasiStatusSubject: BehaviorSubject<string>;
  private packingStatusSubject: BehaviorSubject<string>;

  public ibfStatus$: Observable<string>;
  public preparasiStatus$: Observable<string>;
  public packingStatus$: Observable<string>;

  constructor() {
    const ibfStatus = localStorage.getItem('ibfStatus') || 'green';
    const preparasiStatus = localStorage.getItem('preparasiStatus') || 'green';
    const packingStatus = localStorage.getItem('packingStatus') || 'green';

    this.ibfStatusSubject = new BehaviorSubject<string>(ibfStatus);
    this.preparasiStatusSubject = new BehaviorSubject<string>(preparasiStatus);
    this.packingStatusSubject = new BehaviorSubject<string>(packingStatus);

    this.ibfStatus$ = this.ibfStatusSubject.asObservable();
    this.preparasiStatus$ = this.preparasiStatusSubject.asObservable();
    this.packingStatus$ = this.packingStatusSubject.asObservable();
  }

  // Simpan status di localStorage
  setIBFStatus(status: string): void {
    localStorage.setItem('ibfStatus', status);
    this.ibfStatusSubject.next(status);
  }

  setPreparasiStatus(status: string): void {
    localStorage.setItem('preparasiStatus', status);
    this.preparasiStatusSubject.next(status);
  }

  setPackingStatus(status: string): void {
    localStorage.setItem('packingStatus', status);
    this.packingStatusSubject.next(status);
  }

  
  getIBFStatus(): Observable<string> {
    return this.ibfStatus$;
  }

  getPreparasiStatus(): Observable<string> {
    return this.preparasiStatus$;
  }

  getPackingStatus(): Observable<string> {
    return this.packingStatus$;
  }
}
