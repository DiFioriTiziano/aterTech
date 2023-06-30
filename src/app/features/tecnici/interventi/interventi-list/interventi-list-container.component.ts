import {Component, Input, OnInit, TemplateRef,ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InterventiService } from '../../../../shared/service/interventi/interventi.service';
import { InterventiCreateModalContainerComponent } from '../modals/interventi-create/interventi-create-modal-container.component';
import { interventi, InterventiAter } from '../model/interventi.model';
import { concat, merge, Observable, of, Subject } from 'rxjs';
import { InterventiStoreService } from '../../../../shared/service/store/interventi-store.service';
import { map, take } from 'rxjs/operators';
import { SharingInterventiService } from '../../../../shared/service/interventi/sharing-interventi.service';




@Component({
  selector: 'ater-interventi-list-container',
  template: `
  <div class="animated fadeIn">
<!--     <div class="card">
      <div class="card-body">
           <button  type="button" (click)="openModal_Create()" class="btn btn-sm btn-primary" data-toggle="modal" ><i class="fa fa-lg fa-plus-square"></i> Nuovo intervento</button>
      </div>
    </div> -->

       <!-- {{interventiList$ | async | json }}-->
      <ater-interventi-list
      *ngIf="interventi"
          [jobList]= "interventi"
          (annullamento)="datiAnnullati($event)"
          (valida)="valida($event)"
      >
      </ater-interventi-list>
  </div>
  `,
  styles: [
  ]
})
export class InterventiListContainerComponent implements OnInit {

  interventiList$:Observable<InterventiAter[]>;
  interventiLista:InterventiAter[];

  interventi:InterventiAter[] = [];
  tipologie:any;

  bsModalRef: BsModalRef;
  newData$ : Observable<InterventiAter[]>
  testStore:any



  constructor(
    private interventiService: InterventiService,
    private modalService: BsModalService,
    private store:InterventiStoreService,
    private sharingInterventiService : SharingInterventiService
    ) {

      this.sharingInterventiService.update_interventi$.subscribe( (itemAggiornato) =>{
        let Index = this.interventi.findIndex(lista => lista.vpsinf_id === itemAggiornato.vpsinf_id);
                  this.interventi[Index] = itemAggiornato;
      })

     }


    ngOnInit(): void {
      this.interventiService.read({"matricola":""})
      .pipe(
        map( (resp:interventi) => resp.InterventiAter.filter(item => (item.vpsinf_flag_valido === 'SI' && item.vpsinf_utent_id_creazione !== 466)))
      ).subscribe(  (resp)=>{ this.interventi = resp  } )
    }



    public openModal_Create() {
         this.bsModalRef = this.modalService.show(InterventiCreateModalContainerComponent);
      }



    datiAnnullati(datoAnnullato){

      let annullato = {
        "id_ater":datoAnnullato.vpsinf_id,
        "note":datoAnnullato.vpsinf_id,
        "utent_id":datoAnnullato.vpsinf_id,
      }
  }

}
