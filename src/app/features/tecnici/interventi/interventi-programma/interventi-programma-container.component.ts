import { Component, OnInit } from '@angular/core';
import { InterventiStoreService } from '../../../../shared/service/store/interventi-store.service';
import { InterventiAter } from '../model/interventi.model';
import { InterventiService } from '../../../../shared/service/interventi/interventi.service';

@Component({
  selector: 'ater-interventi-programma-container',
  template: `
    <ater-interventi-programma
      [myInterventi]="myInterventi"
      (convalida)="convalida($event)"

    >
    </ater-interventi-programma>
  `,
  styles: []
})
export class InterventiProgrammaContainerComponent implements OnInit {

  myInterventi: InterventiAter[]

  constructor(private store:InterventiStoreService,private interventiService: InterventiService,) {

    this.store.myIntervento$.subscribe(data => {
      this.myInterventi = data
      console.log("my interventi aggiornati!", this.myInterventi)
    });

   }

  ngOnInit(): void {
  }

  convalida(item){
    this.interventiService.convalida(item, "i")
  }

}
