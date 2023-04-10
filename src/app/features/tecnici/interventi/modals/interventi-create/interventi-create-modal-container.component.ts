import { Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AssetService } from '../../../../../shared/service/asset/asset.service';
import { InterventiService } from '../../../../../shared/service/interventi/porteAllarmate/porte-allarmate-service.service';


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
    private interventiService: InterventiService
    ) { }

  ngOnInit(): void {
        //recupera asset completo
        this.asset_Service.assetAll().subscribe( (res)=> this.asset = res.asset);

        //recupera tipologie interventi
        this.interventiService.tipologie().subscribe( (res)=> this.tipologie = res.tipologie);
  }


  interventoAggiunto(datiAdd){

    this.interventiService.create(datiAdd).subscribe(
      (res) => {
        console.log("create response dati aggiunti", res)
        this.interventiService.emitDataUpdated()
      },
      (error) => {
        console.error(error);
      }

    );
  }



}
