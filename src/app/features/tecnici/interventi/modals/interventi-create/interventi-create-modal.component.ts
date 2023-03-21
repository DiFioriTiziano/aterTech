import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { AssetService } from '../../../../../shared/service/asset/asset.service';


@Component({
  selector: 'ater-interventi-create-modal',
  template: `

<button type="button" class="btn btn-sm btn-primary" data-toggle="modal" (click)="primaryModal.show()"><i class="fa fa-lg fa-plus-square"></i> Nuovo intervento</button>


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

<!-- RICERCA JOBS -->
          <div class="card">
            <div class="card-body">

            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-search"></i></span>
              </div>
                  <input
                    name="testCerca"
                    [(ngModel)]="searchQuery"
                    (keyup)="onSearch()"
                    placeholder="Cerca..."
                    class="form-control"
                    type="text"
                    id="testCerca"
                  >
            </div>

            <div class="container">
              <div class="row">
                <div class="col-sm">
                <button  *ngFor="let page of [1,2,3,4,5,6]" class="btn btn-sm"  (click)="onPageChange(page)">{{page}}</button>
                </div>
                <div class="col-sm text-right">
                Asset tot. {{jobTotali}}
                </div>

              </div>
            </div>

            <select (change)="setValore($event.target.value)" id="select1"  name="select1" class="form-control form-control-sm">
              <option *ngFor="let job of filteredItems"   value="{{ job.matricola_su_contratto }}" >{{ job.matricola_su_contratto }} ( {{ job.indirizzo }} )</option>
            </select>

            </div>
          </div>
<!--  ------------------------------ -->


          <form [formGroup]="Form_job_create" class="form-horizontal">
              <div class="form-group row">
                <label class="col-md-3 col-form-label" for="vpsinf_matricola">Matricola</label>
                <div class="col-md-9">
                  <input disabled type="text" formControlName="vpsinf_matricola" value="" id="vpsinf_matricola" name="vpsinf_matricola"  class="form-control" placeholder="">
                </div>
              </div>

              <div   class="form-group row">
                <div class="col-md-9">

<!--                       <select    id="select1"  name="select1" class="form-control form-control-sm">
                        <option *ngFor="let job of asset  | filterAll:searchText" value="{{ job.matricola_su_contratto }}" >{{ job.matricola_su_contratto }} ( {{ job.indirizzo }} )</option>
                      </select> -->

                </div>
              </div>
              <div  *ngIf="timeSearch === true" class="spinner-border text-primary" role="status">
                <span   class="sr-only">Loading...</span>
              </div>


              <div class="form-group row">
                <label class="col-md-3 col-form-label" for="vpsinf_info">Informazioni</label>
                <div class="col-md-9">
                <textarea formControlName="vpsinf_info" value="" id="vpsinf_info" name="vpsinf_info" rows="4" class="form-control" placeholder=""></textarea>
                </div>
              </div>


              <div class="form-group row">
                <label class="col-md-3 col-form-label" for="vpsinf_dal">Data dal</label>
                <div class="col-md-9">
                <input  type="text" formControlName="vpsinf_dal" value="" id="vpsinf_dal" name="vpsinf_dal" rows="4" class="form-control" placeholder="">

                </div>
              </div>

          </form>


          {{ Form_job_create.value | json  }}


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="primaryModal.hide()" (click)="reset()">Close</button>
            <button type="button" class="btn btn-primary">Salva</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


  `,
  styleUrls: ['./interventi-create-modal.component.css']
})
export class InterventiCreateModalComponent implements OnInit {

  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  Form_job_create: FormGroup;
  timeSearch: any
  asset: any

  page = 1;
  pageSize :any;
  filteredItems :any;
  jobTotali:any



  constructor(
    private fb:FormBuilder,
    private asset_Service : AssetService
  ) {
    this.timeSearch = false
    this.pageSize = 20;
  }


  filterItems() {
    this.pageSize = 20;
    this.jobTotali = null
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.filteredItems = this.asset.filter(item =>
      item.matricola_su_contratto.toLowerCase().includes(this.searchQuery.toLowerCase())
    ).slice(start, end);
    let Total = this.asset.filter(item =>
      item.matricola_su_contratto.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
    this.jobTotali = Total.length
    console.log("pages filter",  Math.ceil(this.jobTotali) )
  }


  ngOnInit(): void {
    this.asset_Service.assetAll().subscribe( (res)=> {
      this.asset = res.asset
      console.log(this.asset)
      this.filterItems();

    })

    this.Form_job_create = this.fb.group({
      vpsinf_matricola: [''],
      vpsinf_info: [''],
      vpsinf_dal: [''] ,
    });
  }


  onPageChange(page: number) {
    this.page = page;
    this.filterItems();
  }

  searchQuery = '';

  onSearch() {
    this.page = 1;
    this.filterItems();
  }


  setValore(matricola){
    console.log(matricola)
    this.Form_job_create.controls['vpsinf_matricola'].setValue('');
    this.Form_job_create.controls['vpsinf_matricola'].setValue(matricola);
  }


  reset(){
    this.Form_job_create.reset()
  }


}
