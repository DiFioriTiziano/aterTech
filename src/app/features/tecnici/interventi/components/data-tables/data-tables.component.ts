import {  Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { interventiAnnullo_ModalComponent } from '../../modals/interventi-annullo/interventi-annullo_modal.component';
import { interventiNote_ModalComponent } from '../../modals/interventi-note/interventi-note_modal.component';
import { InterventiUpdateContainerComponent } from '../../modals/interventi-update/interventi-update-container.component';
import { interventi, InterventiAter } from '../../model/interventi.model';
import { Observable } from 'rxjs';


/* export interface NumberedPagination {
  index: number;
  maxPages: number;
  pages: number[];
}

export enum RulerFactoryOption {
  Start = 'START',
  End = 'END',
  Default = 'DEFAULT',
}
 */

@Component({
  selector: 'ater-data-tables',
  template: `
<div class="animated fadeIn">
      <div class="card">
        <div class="card-header">
          <i class="fa fa-align-justify"></i> {{title}}

          <div class="card-header-actions">

          </div>
        </div>

        <div class="card-body">

      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text"><i class="fa fa-search"></i></span>
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
                <th>id_Ater</th>
                <th>Matricola</th>
                <th>Intervento</th>
                <th>Note</th>
                <th>Dal</th>
                <th>Al</th>
                <th>Annullamento</th>
                <th>Autore</th>
                <th>Modifica</th>
                <th>Validazione</th>
                <th>Syncro</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
           <!-- <tbody *ngIf="allJobs?.length != 0">-->
           <tbody *ngIf="allJobs">

            <tr *ngFor="let item of allJobs.slice(0, 10)" >
              <td> {{item.vpsinf_id}}</td>
                <td> {{item.vpsinf_matricola}}</td>
                <td> {{item.tipvps_descrizione}}</td>
                <td>
                <a  *ngIf="item.vpsinf_info" href="#/interventi/lista" (click)="openModal_Nota(item)" ><span class="badge badge-success" >Nota</span></a>
                <div  *ngIf="!item.vpsinf_info"  >---</div>
                  <!-- <ater-modal-note [note]="item.vpsinf_info"></ater-modal-note -->
                </td> <!-- {{item.vpsinf_info}} -->
                <td> {{item.vpsinf_dal | date: 'dd/MM/yyyy hh:mm a'}}</td>
                <td> {{item.vpsinf_al | date: 'dd/MM/yyyy hh:mm a'}}</td>
                <td> {{item.vpsinf_cancellato}}</td>
                <td> {{item.utente_creazione}}</td>
                <td> {{item.utente_aggiornamento}}</td>
                <td>
                    <span *ngIf="item.vpsinf_flag_valido==='SI'">Validato</span>
                    <a href="#/interventi/lista" (click)="validazione(item)"> <span *ngIf="item.vpsinf_flag_valido==='NO'"  class="badge  badge-primary">Validare</span></a>
                </td>
                <td>
                  <span *ngIf="item.vpsinf_id_esterno===0"  class="text-danger">Non sync</span>
                  <span *ngIf="item.vpsinf_id_esterno > 0" >{{item.vpsinf_id_esterno}}</span>

                </td>
                <td class="text-primary">
                <a href="#/interventi/lista" (click)="openModal_Update(item)" data-toggle="modal"><i class="fa fa-edit fa-lg"></i></a>
                 </td>
                <td ><a href="#/interventi/lista" (click)="openModal_Annullo(item)" class="text-danger"><i class="fa fa-remove fa-lg"></i></a></td>

              </tr>

            </tbody>
          </table>

<hr>
<!--           {{allJobs | json }} -->


         <pagination *ngIf="jobList"
              [boundaryLinks]="showBoundaryLinks"
              [totalItems]="jobList.length"
              [itemsPerPage]="10"
              (pageChanged)="pageChanged($event)">
          </pagination>

        </div>
      </div>
</div>
  `,
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit {

  @Output('annullamento') annullamento : EventEmitter<any> = new EventEmitter<any>()
  @Output('valida') valida : EventEmitter<any> = new EventEmitter<any>()
  @Input('jobList') jobList: InterventiAter[];




  bsModalRef: BsModalRef;

  startItem:any
  endItem:any

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


  }



  ngOnChanges(changes: SimpleChanges) {
    this.allJobs = changes.jobList.currentValue ;
  }

      public openModal_Update(item) {
            const initialState = {
              data: item,
              title: 'Modifica'
            };
        this.bsModalRef = this.modalService.show(InterventiUpdateContainerComponent, {initialState});
        //this.bsModalRef.content.data= item;
      }

      public openModal_Annullo(item) {
            const initialState = {
              data: [item],
              title: 'Annullamento'
            };
        this.bsModalRef = this.modalService.show(interventiAnnullo_ModalComponent, {initialState});
        this.bsModalRef.content.data= item;
      }

      public openModal_Nota(item) {
            const initialState = {
              dati: item,
              title: 'Note'
            };
        this.bsModalRef = this.modalService.show(interventiNote_ModalComponent, {initialState});
        this.bsModalRef.content.data= item;
      }

  search(value: string): void {
    this.allJobs = this.jobList.filter((val) => val.vpsinf_matricola.toLowerCase().includes(value));
   // this.jobList = this.allJobs.slice(this.startItem, this.endItem);
  }


  pageChanged(event: PageChangedEvent): void {
    this.startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.allJobs = this.jobList.slice(this.startItem, this.endItem);
  }



  validazione(item){
    let obj = {
      id_ater: item.vpsinf_id,
      utent_id: 466
    }
    this.valida.emit(obj);
  }


  edit(item){
    console.log(item)
  }


  annulla(item){
    this.annullamento.emit(item);
  }










}

