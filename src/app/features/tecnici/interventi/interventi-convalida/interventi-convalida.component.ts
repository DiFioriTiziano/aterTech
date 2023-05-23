import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InterventiUpdateContainerComponent } from '../modals/interventi-update/interventi-update-container.component';
import { interventiDettaglio_ModalComponent } from '../modals/interventi-dettaglio/interventi-dettaglio_modal.component';
import { InterventiAter } from '../model/interventi.model';

@Component({
  selector: 'ater-intervento-convalida',
  template: `
    <div class="animated fadeIn">

    <div class="card border-info">
      <div class="card-body">

      <div class="card">
        <div class="card-header">
          <i class="fa fa-align-justify"></i> Interventi da convalidare

          <div class="card-header-actions">

          </div>
        </div>

        <div class="card-body">

          <table *ngIf="myInterventi" class="table table-sm table-striped mt-2">
            <thead>
              <tr>
               <!-- <th><i class="fa fa-file-text  text-success"></i> </th>-->
                <th><i class="fa fa-file-text  text-success"></i> </th>
                <th>id_Ater</th>
                <th>Matricola</th>
                <th>Intervento</th>

                <th>Dal</th>
                <th>Al</th>
                <th>Annullo</th>
                <th>Autore</th>
                <th>Modifica</th>
                <th>Validazione</th>
                <th>Modifica</th>
                <th>Convalida</th>

              </tr>
            </thead>

           <tbody >

            <tr *ngFor="let item of interventi" >
                <td>
                  <a href="#/interventi/programmazione" (click)="openModal_Nota(item)" >
                      <i class="fa fa-tasks animated fadeIn text-success"></i>
                  </a>
                </td>

                <td> {{item.vpsinf_id}}</td>
                <td> {{item.vpsinf_matricola}}</td>
                <td> {{item.tipvps_descrizione}}</td>

                <td> {{item.vpsinf_dal | date: 'dd/MM/yyyy hh:mm'}}</td>
                <td> {{item.vpsinf_al | date: 'dd/MM/yyyy hh:mm'}}</td>

                <td *ngIf="item.vpsinf_cancellato==='NO'"><span class="text-success">Attivo</span></td>
                <td *ngIf="item.vpsinf_cancellato==='SI'"><span class="text-danger">Annullato</span></td>

                <td> {{item.utente_creazione}}</td>
                <td> {{item.utente_aggiornamento}}</td>

                <td>
                    <span  class="animated fadeIn" *ngIf="item.vpsinf_flag_valido==='SI'">Validato</span>
                    <span *ngIf="item.vpsinf_flag_valido==='NO'" class="text-danger" >Validare</span>
                </td>
                <td class="text-primary">
                    <a href="#/interventi/programmazione" (click)="openModal_Update(item)" data-toggle="modal"><i class="fa fa-edit fa-lg"></i></a>
                 </td>

                 <td>
                 <a href="#/interventi/programmazione" (click)="convalida(item)"> <span class="badge badge-success animated fadeIn">Convalida</span></a>
                 </td>

              </tr>

            </tbody>
          </table>

        </div>
      </div>


      </div>
    </div>

  </div>
  `,
  styles: [
  ]
})
export class InterventiConvalidaComponent implements OnInit {

  bsModalRef: BsModalRef;
  @Input('interventi') interventi: InterventiAter[]

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  public openModal_Update(item) {
    const initialState = {
      item: item,
      title: 'Modifica'
    };
    this.bsModalRef = this.modalService.show(InterventiUpdateContainerComponent, {initialState});
    //this.bsModalRef.content.data= item;
    }


    public openModal_Nota(item) {
      const initialState = {
        dati: item,
        title: 'Note'
      };
      this.bsModalRef = this.modalService.show(interventiDettaglio_ModalComponent, {initialState});
      this.bsModalRef.content.data= item;
      }

      conferma_(item){
        console.log(item)
      }


}
