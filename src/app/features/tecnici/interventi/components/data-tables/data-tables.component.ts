import {  Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { interventiAnnullo_ModalComponent } from '../../modals/interventi-annullo/interventi-annullo_modal.component';
import { interventiNote_ModalComponent } from '../../modals/interventi-note/interventi-note_modal.component';
import { InterventiUpdateContainerComponent } from '../../modals/interventi-update/interventi-update-container.component';
import { interventi, InterventiAter } from '../../model/interventi.model';



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
          <span class="input-group-text  text-primary"><i class="fa fa-search"></i></span>
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
                <th>Syncro</th>
                <th>Validazione</th>
                <th></th>
              </tr>
            </thead>
           <!-- <tbody *ngIf="allJobs?.length != 0">  .slice(0, 10) -->
           <tbody *ngIf="jobList">

            <tr *ngFor="let item of jobList.slice(startItem, endItem)" >
              <td> {{item.vpsinf_id}}</td>
                <td> {{item.vpsinf_matricola}}</td>
                <td> {{item.tipvps_descrizione}}</td>
                <td>
                <a  *ngIf="item.vpsinf_info" href="#/interventi/lista" (click)="openModal_Nota(item)" ><span class="badge animated fadeIn badge-success" >Nota...</span></a>
                <div  *ngIf="!item.vpsinf_info"  >---</div>
                  <!-- <ater-modal-note [note]="item.vpsinf_info"></ater-modal-note -->
                </td> <!-- {{item.vpsinf_info}} -->
                <td> {{item.vpsinf_dal | date: 'dd/MM/yyyy hh:mm a'}}</td>
                <td> {{item.vpsinf_al | date: 'dd/MM/yyyy hh:mm a'}}</td>

                <td *ngIf="item.vpsinf_cancellato==='NO'">
                     {{item.vpsinf_cancellato}} <a href="#/interventi/lista" (click)="openModal_Annullo(item)" class="text-danger animated fadeIn"><i class="fa fa-remove fa-lg"></i></a>
                </td>
                <td *ngIf="item.vpsinf_cancellato==='SI'">{{item.vpsinf_cancellato}} </td>

                <td> {{item.utente_creazione}}</td>
                <td> {{item.utente_aggiornamento}}</td>
                <td>
                    <span *ngIf="item.vpsinf_id_esterno===0"  class="text-danger">Non sync</span>
                    <span *ngIf="item.vpsinf_id_esterno > 0" >{{item.vpsinf_id_esterno}}</span>
                </td>
                <td>
                    <span  class="animated fadeIn" *ngIf="item.vpsinf_flag_valido==='SI'">Validato</span>
                    <a href="#/interventi/lista" (click)="validazione(item)"> <span *ngIf="item.vpsinf_flag_valido==='NO'"  class="badge badge-primary animated fadeIn">Validare</span></a>
                </td>
                <td class="text-primary">
                <a href="#/interventi/lista" (click)="openModal_Update(item)" data-toggle="modal"><i class="fa fa-edit fa-lg"></i></a>
                 </td>

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
    this.allJobs = this.jobList
  }



  ngOnChanges(changes: SimpleChanges) {
  this.jobList = changes.jobList.currentValue ;

  }

      public openModal_Update(item) {
            const initialState = {
              item: item,
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
     if(value){
      this.jobList = this.allJobs.filter((val) => val.vpsinf_matricola.toLowerCase().includes(value));
    }else{ console.log("niente!")
      this.jobList = this.allJobs
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
    console.log(item)
  }


  annulla(item){
    this.annullamento.emit(item);
  }










}

