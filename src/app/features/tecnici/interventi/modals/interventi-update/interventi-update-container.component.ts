import { Component, Input, OnInit } from '@angular/core';
import { InterventiService } from '../../../../../shared/service/interventi/porteAllarmate/porte-allarmate-service.service';
import { InterventiAter } from '../../model/interventi.model';
import { UtilityService } from '../../../../../shared/service/utility/utility.service';

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

  constructor(
      private interventiService: InterventiService,
      private utilityService : UtilityService,
  ) { }

  ngOnInit(): void {
    //recupera tipologie interventi
    this.interventiService.tipologie().subscribe( (res)=> this.tipologie = res.tipologie);
   }





  interventoModificato(datiForm){
    console.log(this.item)

      let datiModificati = {
          "vpsinf_info":  datiForm.vpsinf_info,
          "vpsinf_dal": this.utilityService.convertDateIso(datiForm.vpsinf_dal),
          "vpsinf_al": this.utilityService.convertDateIso(datiForm.vpsinf_al)
      }

      let bodyRequest =  {
              "id_ater": this.item.vpsinf_id,
              "id_esterno": this.item.vpsinf_id_esterno,
              "id_tipologia": this.item.tipvps_id,
              "data_fine": this.utilityService.convertDateIso(datiForm.vpsinf_al),
              "note": datiForm.vpsinf_info,
              "data_inizio": this.utilityService.convertDateIso(datiForm.vpsinf_dal),
              "ora_inizio": '12:03:36',
              "type": '',
              "utent_id": 425
          }

        let itemModificato = {...this.item, ...datiModificati}
           this.interventiService.update(bodyRequest).subscribe( (res) => {
            console.log(res)
           // this.interventiService.emitDataUpdated({"data":itemModificato,"operazione":"U"})
            this.interventiService.emitData({"data":itemModificato,"operazione":"U"})
           })

   }

}
