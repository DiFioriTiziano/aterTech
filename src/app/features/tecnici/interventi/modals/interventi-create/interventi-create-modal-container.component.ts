import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { of, Observable } from 'rxjs';
import { AssetService } from '../../../../../shared/service/asset/asset.service';
import { InterventiService } from '../../../../../shared/service/interventi/interventi.service';
import { interventi, InterventiAter } from './../../model/interventi.model';
import { UtilityService } from '../../../../../shared/service/utility/utility.service';


@Component({
  selector: 'ater-interventi-create-modal-container',
  template: `
    <ater-interventi-create-modal
        *ngIf="asset && tipologie"
          [asset]="asset"
          [tipologie]="tipologie"
          (datiAdd)="create($event)"
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
        this.asset_Service.assetAll().subscribe( (res)=> {
          this.asset = res.asset
        });

        //recupera tipologie interventi
        this.interventiService.tipologie().subscribe( (res)=> this.tipologie = res.tipologie);
  }





  create(FormCreate){
    this.interventiService.create(FormCreate)
  }



}
