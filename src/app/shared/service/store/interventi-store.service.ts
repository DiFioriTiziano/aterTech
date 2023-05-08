import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InterventiAter,interventi } from '../../../features/tecnici/interventi/model/interventi.model';


@Injectable({
  providedIn: 'root'
})
export class InterventiStoreService {

  interventi:InterventiAter[] = []

  // tutti
  private interventiSubject = new BehaviorSubject<InterventiAter[]>(null);
          interventi$ = this.interventiSubject.asObservable();
  // singolo
  private interventoSubject = new BehaviorSubject<InterventiAter>(null);
          intervento$ = this.interventoSubject.asObservable();

  constructor() { }


    getInterventi(interventi) {
      this.interventiSubject.next(interventi);
    }

    set_Intervento(intervento) {
      this.interventoSubject.next(intervento);
    }

}
