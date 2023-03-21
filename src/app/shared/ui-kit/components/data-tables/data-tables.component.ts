import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';




export interface NumberedPagination {
  index: number;
  maxPages: number;
  pages: number[];
}

export enum RulerFactoryOption {
  Start = 'START',
  End = 'END',
  Default = 'DEFAULT',
}


@Component({
  selector: 'ater-data-tables',
  template: `
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
                <th>Matricola</th>
                <th>Info</th>
                <th>Data</th>
                <th>Stato</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody *ngIf="jobs?.length != 0">

              <tr *ngFor="let item of allJobs | filterAll:searchText" > <!--    filterAll:searchText-->
                <td> {{item.vpsinf_matricola}}</td>
                <td> {{item.vpsinf_info}}</td>
                <td> {{item.vpsinf_dal | date: 'dd/MM/yyyy hh:mm a'}}</td>
                <td><span class="badge badge-success">Active</span></td>

                <td><span class="badge badge-info">Modifica</span></td>
                <td><span class="badge badge-danger">Annulla</span></td>
              </tr>

            </tbody>
          </table>


          <pagination
          [boundaryLinks]="showBoundaryLinks"
              [totalItems]="jobs.length"
              [itemsPerPage]="10"
              (pageChanged)="pageChanged($event)">
          </pagination>

        </div>
      </div>

  `,
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit {


  @Input('jobList') jobList:any;


  searchText = '';
  showBoundaryLinks: boolean = true;
  title:string;

  RecordCount: number;
  jobs:any
  allJobs :any;


  constructor() {
    this.title = "Lista Interventi"
   }


  ngOnInit(): void {

      this.RecordCount = this.jobList.length;
      this.jobs = this.jobList;
      this.allJobs = this.jobs.slice(0, 10);
  }


  search(value: string): void {
    this.allJobs = this.jobList.filter((val) => val.vpsinf_matricola.toLowerCase().includes(value));
    this.RecordCount = this.jobs.length;
  }


   pageChanged(event: PageChangedEvent): void {
    console.log(event)

    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.allJobs = this.jobList.slice(startItem, endItem);
    console.log(this.allJobs)
 }





}

