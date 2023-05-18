import { Component, Input, OnInit } from '@angular/core';
import { InterventiService } from '../../../../../shared/service/interventi/interventi.service';
import { InterventiAter } from '../../model/interventi.model';
import { UtilityService } from '../../../../../shared/service/utility/utility.service';
import { InterventiStoreService } from '../../../../../shared/service/store/interventi-store.service';


@Component({
  selector: 'ater-interventi-update-container',
  template: `
        <ater-interventi-update
          *ngIf="item"
          [title]="title"
          [dati]="item"
          [tipologie]="tipologie"
          (datiModificati)="update($event)"
          [type]="type"
        >
      </ater-interventi-update>
  `,
  styles: [
  ]
})
export class InterventiUpdateContainerComponent implements OnInit {

  tipologie: any

  // initialState modale
  item:any
  title:any
  type:any

  intervento:any
  interventi:any

  constructor(
      private interventiService: InterventiService,
      private utilityService : UtilityService,
      private store:InterventiStoreService
  ) {
    //this.store.intervento$.subscribe(intervento => this.intervento = intervento );

    this.store.interventi$.subscribe(interventi => this.interventi = interventi )
  }

  ngOnInit(): void {
    //recupera tipologie interventi
    this.interventiService.tipologie().subscribe( (res)=> this.tipologie = res.tipologie);
   }

   update(datiForm){
      this.interventiService.update(datiForm, this.item, this.type)
   }

}
