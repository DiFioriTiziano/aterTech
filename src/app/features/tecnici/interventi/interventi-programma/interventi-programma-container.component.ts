import { Component, OnInit } from '@angular/core';
import { InterventiStoreService } from '../../../../shared/service/store/interventi-store.service';
import { InterventiAter } from '../model/interventi.model';
import { InterventiService } from '../../../../shared/service/interventi/interventi.service';

@Component({
  selector: 'ater-interventi-programma-container',
  template: `
    <ater-interventi-programma
    *ngIf="myInterventi"
      [myInterventi]="myInterventi"
      (conferma)="conferma($event)"

    >
    </ater-interventi-programma>
  `,
  styles: []
})
export class InterventiProgrammaContainerComponent implements OnInit {

  myInterventi: InterventiAter[]

  constructor(private store:InterventiStoreService,private interventiService: InterventiService,) {
    this.store.interventi$.subscribe(data => {this.myInterventi = data, console.log("MY INTERVENTI", this.myInterventi)});
   }

  ngOnInit(): void {
   this.interventiService.daConfermare({"matricola":""})
  }



  conferma(item){
    this.interventiService.conferma(item)
  }

}
