import {  Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { interventiDettaglio_ModalComponent } from '../modals/interventi-dettaglio/interventi-dettaglio_modal.component';
import { InterventiUpdateContainerComponent } from '../modals/interventi-update/interventi-update-container.component';
import { interventi, InterventiAter } from '../model/interventi.model';
import { InterventiFileContainerComponent } from '../modals/interventi-file/interventi-file-container.component';



@Component({
  selector: 'ater-interventi-list',
  template: `
<div class="animated fadeIn">
      <div class="card">
        <div class="card-header">
          <i class="fa fa-align-justify"></i> {{title}}

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
                <th>Validazione</th>
                <th></th>

              </tr>
            </thead>
           <!-- <tbody *ngIf="allJobs?.length != 0">  .slice(0, 10) -->
           <tbody *ngIf="jobList">

            <tr *ngFor="let item of jobList.slice(startItem, endItem)" >
                <td>
                  <a href="#/interventi/lista" (click)="openModal_Nota(item)" >
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
                    <span *ngIf="item.vpsinf_id_esterno===0"  class="text-danger">Non sync</span>
                    <span *ngIf="item.vpsinf_id_esterno > 0" >{{item.vpsinf_id_esterno}}</span>
                </td>
                <td>
                    <span  class="animated fadeIn" *ngIf="item.vpsinf_flag_valido==='SI'">Validato</span>
                    <span *ngIf="item.vpsinf_flag_valido==='NO'" class="text-danger" >Validare</span>
                </td>
                <td *ngIf="livello !== 2" class="text-primary">
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
              [maxSize]="30"
              (pageChanged)="pageChanged($event)">
          </pagination>

        </div>
      </div>
</div>
  `,
  styleUrls: ['./interventi-list.component.css']
})
export class InterventiListComponent implements OnInit {

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
  livello:any

  constructor(private modalService: BsModalService) {
  this.title = "Lista Interventi"

  this.livello  = JSON.parse(localStorage.getItem('authLevelDwh')); // faccio il parse perche nello storage salva solo stringa ma i volori sono diversi alla fonte.

   }


  ngOnInit(): void {
    this.allJobs = this.jobList
  }



  ngOnChanges(changes: SimpleChanges) {
  //this.jobList = changes.jobList.currentValue ;

  }


  //  ************************* GESTIONE APERTURE MODALI  *******************************************

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

      public openModal_File(item) {
        this.bsModalRef = this.modalService.show(InterventiFileContainerComponent);
      }





  search(value: string): void {
    console.log(value)

     this.jobList = this.allJobs.filter((val) => val.vpsinf_matricola.toLowerCase().includes(value));


/*      if(value || value == null){
      this.jobList = this.allJobs.filter((val) => val.vpsinf_matricola.toLowerCase().includes(value));
        console.log("if ", this.jobList)
    }else{
      this.jobList = this.allJobs.filter((val) => val.vpsinf_matricola.toLowerCase().includes(""));
        console.log("else", this.jobList)
    } */

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

