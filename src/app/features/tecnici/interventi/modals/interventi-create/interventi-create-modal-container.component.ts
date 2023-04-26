import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { of, Observable } from 'rxjs';
import { AssetService } from '../../../../../shared/service/asset/asset.service';
import { InterventiService } from '../../../../../shared/service/interventi/porteAllarmate/porte-allarmate-service.service';
import { interventi, InterventiAter } from './../../model/interventi.model';
import { UtilityService } from '../../../../../shared/service/utility/utility.service';


@Component({
  selector: 'ater-interventi-create-modal-container',
  template: `
           <ater-interventi-create-modal
                *ngIf="asset && tipologie"

                  [asset]="asset"
                  [tipologie]="tipologie"
                  (datiAdd)="interventoAggiunto($event)"
              >
          </ater-interventi-create-modal>

  `,
  styles: []
})
export class InterventiCreateModalContainerComponent implements OnInit  {

  asset:any
  tipologie:any

  constructor(
    private asset_Service : AssetService,
    private interventiService: InterventiService,
    private utilityService : UtilityService,
    ) { }

  ngOnInit(): void {
        //recupera asset completo
        this.asset_Service.assetAll().subscribe( (res)=> this.asset = res.asset);

        //recupera tipologie interventi
        this.interventiService.tipologie().subscribe( (res)=> this.tipologie = res.tipologie);
  }





  interventoAggiunto(FormCreate){

  let bodyRequest={
          "id_esterno": 0,
          "id_tipologia":  FormCreate.vpsinf_tipologia,
          "matricola":  FormCreate.vpsinf_matricola,
          "note":  FormCreate.vpsinf_info,
          "data_intervento": this.utilityService.convertDateIso(FormCreate.vpsinf_dal),
          "ora_intervento": FormCreate.ora_dal,
          "data_fine": this.utilityService.convertDateIso(FormCreate.vpsinf_al),
          "utent_id": 425
  }

console.log(FormCreate)

   /*   this.interventiService.create(bodyRequest).subscribe((resp)=> {
          //this.interventiService.emitDataCreate({"data":resp.itemCreato,"operazione":"C"})
          this.interventiService.emitData({"data":resp.itemCreato,"operazione":"C"})
      },
      (error) => {
        console.error(error);
      }
    ) */



  }



}
