import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InterventiAter,interventi } from '../../../features/tecnici/interventi/model/interventi.model';


@Injectable({
  providedIn: 'root'
})
export class InterventiStoreService {

 // interventi:InterventiAter[] = []
 // MyInterventi:InterventiAter[] = []


  private interventiSubject = new BehaviorSubject<InterventiAter[]>(null);
          interventi$ = this.interventiSubject.asObservable();

   private myInterventoSubject = new BehaviorSubject<InterventiAter[]>(null);
          myIntervento$ = this.myInterventoSubject.asObservable();

  constructor() { }


    getInterventi(interventi) {
      this.interventiSubject.next(interventi);
    }

    myInterventi(MyInterventi) {
      console.log("dati passati allo store:", MyInterventi)
      this.myInterventoSubject.next(MyInterventi);
    }
}
