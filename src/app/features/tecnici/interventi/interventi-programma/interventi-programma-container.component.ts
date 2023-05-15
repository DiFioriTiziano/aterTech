import { Component, OnInit } from '@angular/core';
import { InterventiStoreService } from '../../../../shared/service/store/interventi-store.service';
import { InterventiAter } from '../model/interventi.model';

@Component({
  selector: 'ater-interventi-programma-container',
  template: `
    <ater-interventi-programma
      [myInterventi]="myInterventi"

    >
    </ater-interventi-programma>
  `,
  styles: []
})
export class InterventiProgrammaContainerComponent implements OnInit {

  myInterventi: InterventiAter[]

  constructor(private store:InterventiStoreService) {

    this.store.myIntervento$.subscribe(data => { this.myInterventi = data });

   }

  ngOnInit(): void {
  }

}
