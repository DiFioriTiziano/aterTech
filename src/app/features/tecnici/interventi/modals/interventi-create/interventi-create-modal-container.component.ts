import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { of, Observable } from 'rxjs';
import { AssetService } from '../../../../../shared/service/asset/asset.service';
import { InterventiService } from '../../../../../shared/service/interventi/interventi.service';
import { interventi, InterventiAter } from './../../model/interventi.model';
import { UtilityService } from '../../../../../shared/service/utility/utility.service';
import { SharingInterventiService } from '../../../../../shared/service/interventi/sharing-interventi.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'ater-interventi-create-modal-container',
  template: `
    <ater-interventi-create-modal
        *ngIf="asset && tipologie"
          [asset]="asset"
          [tipologie]="tipologie"
          (datiAdd)="create($event)"
          (matricola)="setStatoAllarmato($event)"
      >
  </ater-interventi-create-modal>
  `,
  styles: []
})
export class InterventiCreateModalContainerComponent implements OnInit  {

  asset:any
  tipologie:any
  _vpsinf_stato_immobile: any

  constructor(
    private asset_Service : AssetService,
    private interventiService: InterventiService,
    private utilityService : UtilityService,
    private sharingInterventiService : SharingInterventiService,

    ) { }



  ngOnInit(): void {
        //recupera asset completo
        this.asset_Service.assetAll().subscribe( (res)=> {
          this.asset = res.asset
        });

        //recupera tipologie interventi
        this.interventiService.tipologie().subscribe( (res)=> this.tipologie = res.tipologie);
  }





  create(FormCreate){
    this.interventiService.create(FormCreate,  this._vpsinf_stato_immobile)
    .subscribe( (intervento) => {
        this.sharingInterventiService.subject_add_interventi(intervento.itemCreato[0])
      }
    )

  }



  setStatoAllarmato(matricola){

    // recupero ultimo stato immobile (allarmato/non allarmato .. codici 0,1 chiedere a yuri!!)
    this.interventiService.read({"matricola":""})
        .pipe(
          map( (resp) => resp.InterventiAter.filter((item)=> item.vpsinf_matricola === matricola ))
        ).subscribe(  (resp)=>{
          if(resp){ this._vpsinf_stato_immobile = resp[0].vpsinf_stato_immobile }
            else { this._vpsinf_stato_immobile = 0}
        })

  }

}
