import {Component, Input, OnInit, TemplateRef,ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InterventiService } from '../../../../shared/service/interventi/porteAllarmate/porte-allarmate-service.service';
import { InterventiCreateModalContainerComponent } from '../modals/interventi-create/interventi-create-modal-container.component';



@Component({
  selector: 'ater-interventi-list-container',
  template: `
    <div class="card">
      <div class="card-body">
           <!-- <ater-interventi-create-modal-container > </ater-interventi-create-modal-container> -->
           <button  type="button" (click)="openModal_Create()" class="btn btn-sm btn-primary" data-toggle="modal" ><i class="fa fa-lg fa-plus-square"></i> Nuovo intervento</button>
      </div>
    </div>

      <ater-data-tables
        *ngIf="interventiList"
        [jobList]= "interventiList"
        (annullamento)="datiAnnullati($event)"
        (valida)="valida($event)"
      >
    </ater-data-tables>

  `,
  styles: [
  ]
})
export class InterventiListContainerComponent implements OnInit {

  interventiList:any;
  tipologie:any;

  bsModalRef: BsModalRef;



  constructor(
    private interventiService: InterventiService,
    private modalService: BsModalService
    ) { }



    ngOnInit(): void {
      // recupera tutti interventi vps
      let filter = {"matricola":""}
      this.interventiService.read(filter).subscribe( (res)=> this.interventiList = res.InterventiAter);

       //observable rimane in ascolto di aggiornamenti e in caso aggiorna i dati
       this.interventiService.getInterventiUpdatedObservable().subscribe(() => {
        this.interventiService.read(filter).subscribe( (res)=> {
          this.interventiList = res.InterventiAter

        });
      });
    }



    public openModal_Create() {
         this.bsModalRef = this.modalService.show(InterventiCreateModalContainerComponent);
      }



    valida(objValida){
      console.log("dati da validare", objValida)

      this.interventiService.valida(objValida).subscribe( (res) =>
      {
        console.log(res)
        this.interventiService.emitDataUpdated();
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

      /* this.modalAnnullamento.openModal(annullato);
     // this.interventiService.delete(annullato).subscribe( (res)=> console.log(res));

      console.log(datoAnnullato)
    } */
  }

}
