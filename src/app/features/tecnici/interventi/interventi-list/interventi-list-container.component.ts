import {Component, Input, OnInit, TemplateRef,ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InterventiService } from '../../../../shared/service/interventi/porteAllarmate/porte-allarmate-service.service';
import { InterventiCreateModalContainerComponent } from '../modals/interventi-create/interventi-create-modal-container.component';
import { interventi, InterventiAter } from '../model/interventi.model';
import { concat, merge, Observable, of, Subject } from 'rxjs';




@Component({
  selector: 'ater-interventi-list-container',
  template: `
  <div class="animated fadeIn">
    <div class="card">
      <div class="card-body">
           <button  type="button" (click)="openModal_Create()" class="btn btn-sm btn-primary" data-toggle="modal" ><i class="fa fa-lg fa-plus-square"></i> Nuovo intervento</button>
      </div>
    </div>

       <!-- {{interventiList$ | async | json }}-->
      <ater-data-tables
      *ngIf="interventiList$ | async"
          [jobList]= "(interventiList$ | async)"
          (annullamento)="datiAnnullati($event)"
          (valida)="valida($event)"
      >
      </ater-data-tables>
  </div>
  `,
  styles: [
  ]
})
export class InterventiListContainerComponent implements OnInit {

  interventiList$:Observable<InterventiAter[]>;
  tipologie:any;

  bsModalRef: BsModalRef;
  newData$ : Observable<InterventiAter[]>


  constructor(
    private interventiService: InterventiService,
    private modalService: BsModalService
    ) { }


    ngOnInit(): void {

        // recupera tutti interventi vps
        let filter = {"matricola":""}
        this.interventiList$ =  this.interventiService.read(filter);

            this.interventiService.getSubjectInterventiUpdated().subscribe((res) => {
              res.subscribe((x)=> console.log("item arrivato...",x))
              this.newData$ = res

            // console.log("quin invece...",newData$)
            this.newData$ = merge(this.newData$,this.interventiList$)
            this.interventiList$ = this.newData$

             this.interventiList$.subscribe((x)=> console.log("uniti...",x))

       })






    }



    public openModal_Create() {

         this.bsModalRef = this.modalService.show(InterventiCreateModalContainerComponent);
      }



    valida(objValida){
      console.log("dati da validare", objValida)

      this.interventiService.valida(objValida).subscribe( (res) =>
      {
        console.log(res)
       // this.interventiService.emitDataUpdated();
        },
        (error) => {
          console.error(error);
        }
      );
    }


    datiAnnullati(datoAnnullato){

      let annullato = {
        "id_ater":datoAnnullato.vpsinf_id,
        "note":datoAnnullato.vpsinf_id,
        "utent_id":datoAnnullato.vpsinf_id,
      }
  }

}
