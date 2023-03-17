import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';



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
          <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" (click)="primaryModal.show()"><i class="fa fa-plus-square"></i>&nbsp;Nuovo intervento</button>
          </div>
        </div>

        <div class="card-body">

      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text"><i class="fa fa-search"></i></span>
        </div>
             <input
              [(ngModel)]="searchText"
              placeholder="Cerca"
              class="form-control"
              type="text"
              id="inputCerca"
              name="inputCerca"
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
            <tbody *ngIf="jobList?.length != 0">

              <tr *ngFor="let item of jobList  | filterAll:searchText" >
                <td> {{item.vpsinf_matricola}}</td>
                <td> {{item.vpsinf_info}}</td>
                <td> {{item.vpsinf_dal}}</td>
                <td><span class="badge badge-success">Active</span></td>

                <td><span class="badge badge-info">Modifica</span></td>
                <td><span class="badge badge-danger">Annulla</span></td>
              </tr>

            </tbody>
          </table>



          <ul class="pagination">
          <li class="page-item" ><a class="page-link" href="#">First page</a></li>
            <li class="page-item"  ><a class="page-link" href="#">Prev</a></li>
            <li><a class="page-link" href="#">1</a></li>
            <li><a class="page-link" href="#">2</a></li>
            <li> <a class="page-link" href="#">3</a></li>
            <li><a class="page-link" href="#">4</a></li>
            <li> <a class="page-link" href="#">5</a></li>

            <li class="page-item"  ><a class="page-link" href="#">Next</a></li>
            <li class="page-item"  ><a class="page-link" href="#">Last page</a></li>
          </ul>
        </div>
      </div>







      <div bsModal #primaryModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-primary" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Nuovo intervento</h4>
        <button type="button" class="close" (click)="primaryModal.hide()" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>One fine body&hellip;</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="primaryModal.hide()">Close</button>
        <button type="button" class="btn btn-primary">Salva</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
  `,
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit {


  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  @Input('jobList') jobList:any;

  searchText = '';
  p: number = 1;

  title:string;


  constructor() {

    this.title = "Lista Interventi"
   }



  ngOnInit(): void {
  }


}

