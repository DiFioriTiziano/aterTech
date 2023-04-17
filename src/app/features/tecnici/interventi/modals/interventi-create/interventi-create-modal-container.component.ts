import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { of, Observable } from 'rxjs';
import { AssetService } from '../../../../../shared/service/asset/asset.service';
import { InterventiService } from '../../../../../shared/service/interventi/porteAllarmate/porte-allarmate-service.service';
import { interventi, InterventiAter } from './../../model/interventi.model';


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

    let add$ = this.interventiService.create(datiAdd)
    add$.subscribe((x)=> {
      let new$:Observable<InterventiAter[]> = of(x.itemCreato)
      console.log("item passato",x.itemCreato)
        this.interventiService.emitDataCreate(new$)
    })

/*      this.interventiService.create(datiAdd).subscribe(
      (res) => {
          this.interventiService.emitDataCreate()
      },
      (error) => {
        console.error(error);
      }

    ); */


  }



}
