import { Component, Input, OnInit } from '@angular/core';
import { InterventiService } from '../../../../../shared/service/interventi/porteAllarmate/porte-allarmate-service.service';
import { InterventiAter } from '../../model/interventi.model';
import { UtilityService } from '../../../../../shared/service/utility/utility.service';
import { InterventiStoreService } from '../../../../../shared/service/store/interventi-store.service';
import { DefaultLayoutComponent } from '../../../../../containers/default-layout/default-layout.component';

@Component({
  selector: 'ater-interventi-update-container',
  template: `
        <ater-interventi-update
          *ngIf="item"
          [title]="title"
          [dati]="item"
          [tipologie]="tipologie"
          (datiModificati)="interventoModificato($event)"
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

  intervento:any
  interventi:any

  constructor(
      private interventiService: InterventiService,
      private utilityService : UtilityService,
      private store:InterventiStoreService
  ) {
    this.store.intervento$.subscribe(intervento => this.intervento = intervento );

    this.store.interventi$.subscribe(interventi => this.interventi = interventi )
  }

  ngOnInit(): void {
    //recupera tipologie interventi
    this.interventiService.tipologie().subscribe( (res)=> this.tipologie = res.tipologie);
   }





  interventoModificato(datiForm){
    console.log(this.item)

    console.log(datiForm)

    let dal = this.utilityService.convertDateIso(datiForm.vpsinf_dal)
    let al = this.utilityService.convertDateIso(datiForm.vpsinf_al)

    console.log("dal", dal?dal:null)
    console.log("al", al?al:null)

      let datiModificati = {
          "vpsinf_info":  datiForm.vpsinf_info,
          "vpsinf_dal": dal?dal:null,
          "vpsinf_al": al?al:null
      }

      let bodyRequest =  {
              "id_ater": this.item.vpsinf_id,
              "id_esterno": this.item.vpsinf_id_esterno,
              "id_tipologia": this.item.tipvps_id,
              "data_fine": al?al:null,
              "note": datiForm.vpsinf_info,
              "data_inizio": dal?dal:null,
              "ora_inizio": '12:03:36',
              "type": '',
              "utent_id": 425
          }



        let interventoModificato = {...this.intervento, ...datiModificati}
           //this.interventiService.update(bodyRequest).subscribe( (res) => {

          // });

           // this.interventiService.emitData({"data":itemModificato,"operazione":"U"})

           let Index = this.interventi.findIndex(lista => lista.vpsinf_id === this.intervento.vpsinf_id);
           this.interventi[Index] = interventoModificato;
           this.store.getInterventi(this.interventi)

   }

}
