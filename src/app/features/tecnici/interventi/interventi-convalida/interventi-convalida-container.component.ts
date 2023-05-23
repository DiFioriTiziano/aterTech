import { Component, OnInit } from '@angular/core';
import { InterventiStoreService } from '../../../../shared/service/store/interventi-store.service';
import { InterventiService } from '../../../../shared/service/interventi/interventi.service';
import { InterventiAter } from '../model/interventi.model';

@Component({
  selector: 'ater-interventi-convalida-container',
  template: `
    <ater-intervento-convalida
      *ngIf="interventi"
      [interventi]="interventi"
    >
    </ater-intervento-convalida>
  `,
  styles: [ ]
})
export class InterventiConvalidaContainerComponent implements OnInit {

  interventi: InterventiAter[]

  constructor(private store:InterventiStoreService,private interventiService: InterventiService) {
    this.store.interventi$.subscribe(data => {this.interventi = data, console.log("INTERVENTI CONVALIDARE>", this.interventi)});
   }

  ngOnInit(): void {
    this.interventiService.daConvalidare({"matricola":""})
  }

}
