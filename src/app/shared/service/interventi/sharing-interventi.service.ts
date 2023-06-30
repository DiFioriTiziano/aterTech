import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingInterventiService {

  private add_interventiSubject = new Subject<any>();
    add_interventi$ = this.add_interventiSubject.asObservable();

  private update_interventiSubject = new Subject<any>();
    update_interventi$ = this.update_interventiSubject.asObservable();

  private dataFile_interventiSubject = new Subject<any>();
    dataFile_interventi$ = this.dataFile_interventiSubject.asObservable();

  constructor() { }


  subject_add_interventi(item) {
    this.add_interventiSubject.next(item);
  }

  subject_update_interventi(item) {
    this.update_interventiSubject.next(item);
  }

  subject_dataFile_interventi(item) {
    this.dataFile_interventiSubject.next(item);
  }
}
