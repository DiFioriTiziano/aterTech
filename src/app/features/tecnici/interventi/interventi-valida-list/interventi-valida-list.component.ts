import {  Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { interventiDettaglio_ModalComponent } from '../modals/interventi-dettaglio/interventi-dettaglio_modal.component';
import { InterventiUpdateContainerComponent } from '../modals/interventi-update/interventi-update-container.component';
import { interventi, InterventiAter } from '../model/interventi.model';
import { InterventiFileContainerComponent } from '../modals/interventi-file/interventi-file-container.component';

@Component({
  selector: 'ater-interventi-valida-list',
  template: `

<div class="animated fadeIn">
      <div class="card">
        <div class="card-header">
          <i class="fa fa-align-justify"></i> Validazioni

          <div class="card-header-actions">

          </div>
        </div>

        <div class="card-body">

          <div class="input-group ">
            <div class="input-group-prepend ">
              <span class="input-group-text  text-primary "><i class="fa fa-search"></i></span>
            </div>
                <input
                  name="searchText"
                  [(ngModel)]="searchText"
                  placeholder="Cerca"
                  class="form-control"
                  type="text"
                  id="searchText"
                  (input)="search($event.target.value)"
                >
          </div>

          <table class="table table-sm table-striped mt-2">
            <thead>
              <tr>
                <th><i class="fa fa-file-text  text-success"></i> </th>
                <th>id_Ater</th>
                <th>Matricola</th>
                <th>Intervento</th>

                <th>Dal</th>
                <th>Al</th>
                <th>Annullo</th>
                <th>Autore</th>
                <th>Modifica</th>
                <th>Syncro</th>
                <th>Valida</th>
                <th></th>

              </tr>
            </thead>

           <tbody *ngIf="interventiLista">

            <tr *ngFor="let item of interventiLista.slice(startItem, endItem)" >
                <td>
                  <a href="#/interventi/validazioni" (click)="openModal_Nota(item)" >
                      <i class="fa fa-tasks animated fadeIn text-success"></i>
                  </a>
                </td>

                <td> {{item.vpsinf_id}}</td>
                <td> {{item.vpsinf_matricola}}</td>
                <td> {{item.tipvps_descrizione}}</td>

                <td> {{item.vpsinf_dal | date: 'dd/MM/yyyy hh:mm'}}</td>
                <td> {{item.vpsinf_al | date: 'dd/MM/yyyy hh:mm'}}</td>

                <td class="text-success" *ngIf="item.vpsinf_cancellato==='NO'"><span class="text-success">Attivo</span></td>
                <td  *ngIf="item.vpsinf_cancellato==='SI'"><span class="text-danger animated fadeIn">Annullato</span></td>

                <td> {{item.utente_creazione}}</td>
                <td> {{item.utente_aggiornamento}}</td>
                <td>
                    <span *ngIf="item.vpsinf_id_esterno===0"  class="text-danger">Non sync</span>
                    <span *ngIf="item.vpsinf_id_esterno > 0" >{{item.vpsinf_id_esterno}}</span>
                </td>
                <td>
                    <span  class="animated fadeIn" *ngIf="item.vpsinf_flag_valido==='SI'">Validato</span>
                    <a href="#/interventi/validazioni" (click)="validazione(item)"> <span *ngIf="item.vpsinf_flag_valido==='NO'"  class="badge badge-primary animated fadeIn">Validare</span></a>
                </td>
                <td class="text-primary">
                    <a href="#/interventi/validazioni" (click)="openModal_Update(item)" data-toggle="modal"><i class="fa fa-edit fa-lg"></i></a>
                 </td>

              </tr>

            </tbody>
          </table>

<hr>
<!--           {{allJobs | json }} -->


         <pagination *ngIf="interventiLista"
              [boundaryLinks]="showBoundaryLinks"
              [totalItems]="interventiLista.length"
              [itemsPerPage]="10"
              [maxSize]="30"
              (pageChanged)="pageChanged($event)">
          </pagination>

        </div>
      </div>
</div>

  `,
  styleUrls: ['./interventi-valida-list.component.css']
})
export class InterventiValidaListComponent implements OnInit {

  @Input('interventiLista') interventiLista: InterventiAter[]

  @Output('intervento') intervento : EventEmitter<any> = new EventEmitter<any>()

  @Output('annullamento') annullamento : EventEmitter<any> = new EventEmitter<any>()
  @Output('valida') valida : EventEmitter<any> = new EventEmitter<any>()





  bsModalRef: BsModalRef;

  startItem:any = 0
  endItem:any = 10

  modeU: string = "U";
  accodaDati : InterventiAter[]


  searchText = '';
  showBoundaryLinks: boolean = true;
  title:string;

  RecordCount: number;
  jobs:any
  allJobs : InterventiAter[];
  data:any


  constructor(private modalService: BsModalService) {
  this.title = "Lista Interventi"

   }


  ngOnInit(): void {
    this.allJobs = this.interventiLista
  }



  ngOnChanges(changes: SimpleChanges) {
 // this.interventiLista = changes.interventiLista.currentValue ;
  this.allJobs = changes.interventiLista.currentValue ;
  }


  //  ************************* GESTIONE APERTURE MODALI  *******************************************

      public openModal_Update(item) {

            const initialState = {
              item: item,
              title: 'Modifica',
              type: 'Validazione'
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

      public openModal_File(item) {
        this.bsModalRef = this.modalService.show(InterventiFileContainerComponent);
      }





  search(value: string): void {

     if(value){
      this.interventiLista = this.allJobs.filter((val) => val.vpsinf_matricola.toLowerCase().includes(value));
    }else{
      this.interventiLista = this.allJobs
    }

  }


  pageChanged(event: PageChangedEvent): void {
    this.startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
  }



  validazione(item){
    this.valida.emit(item);
  }


  edit(item){

  }


  annulla(item){
    this.annullamento.emit(item);
  }



}
