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
      *ngIf="interventiLista"
          [jobList]= "interventiLista"
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
  interventiLista:InterventiAter[];
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
      this.interventiService.read(filter).subscribe(  (resp)=>{ this.interventiLista = resp  } )



            this.interventiService.getSubjectInterventiUpdated().subscribe((res) => {

                  switch(res.operazione) {
                    case "U": { //aggiorna
                      console.log("modifica da apportare!",res.data)
                      let Index = this.interventiLista.findIndex(lista => lista.vpsinf_id === res.data.vpsinf_id);
                           this.interventiLista[Index] = res.data;
                      break;
                    }
                    case "C": { //crea
                      this.interventiLista  = [res.data[0], ...this.interventiLista]
                      break;
                    }
                    case "V": { //validazione
                      console.log("modifica da apportare!",res.data)
                      let Index = this.interventiLista.findIndex(lista => lista.vpsinf_id === res.data.vpsinf_id);
                        this.interventiLista[Index] = res.data;
                      break;
                    }
                    default: {
                      //statements;
                      break;
                    }
                }


       })

    }



    public openModal_Create() {

         this.bsModalRef = this.modalService.show(InterventiCreateModalContainerComponent);
      }



    valida(item){

        let request = {
            id_ater: item.vpsinf_id,
            utent_id: 425
        }

        let itemModificato = {...item,"vpsinf_flag_valido": "SI"};

            this.interventiService.valida(request).subscribe( (res) =>
              {
                this.interventiService.emitData({"data":itemModificato,"operazione":"V"});
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
