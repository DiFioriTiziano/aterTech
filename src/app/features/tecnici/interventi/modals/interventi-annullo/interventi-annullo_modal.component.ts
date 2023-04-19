import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';



@Component({
  selector: 'ater-annullo-modal',
  template: `
<div class="animated fadeIn">
            <div class="modal-header bg-danger">
                <h4 class="modal-title">{{title}}</h4>

                <button type="button" class="close" (click)="bsModalRef.hide()" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>

            </div>
                <div class="modal-body">
                  <p>
                    Intervento
                    id <b>({{data.vpsinf_id}})</b>
                    Matricola <b>({{data.vpsinf_matricola}})</b>
                  </p>
                    <form class="form-horizontal" [formGroup]="Form_update" (ngSubmit)="onSubmit(Form_update)">
                        <div class="form-group row">
                          <label class="col-md-3 col-form-label" for="note">Motivazione</label>
                          <div class="col-md-9">
                            <textarea formControlName="note" value="" id="note" name="note"   class="form-control" placeholder=""> </textarea>

                          </div>
                        </div>

                          <div class="modal-footer">
                            <button  type="submit" class="btn btn-danger" >Procedi</button>
                          </div>
                    </form>

                </div>
</div>
  `,
  styles: [ ]
})
export class interventiAnnullo_ModalComponent implements OnInit {

  @Input('data') data:any
  @Input('title') title:any
  @Output() itemModifica : EventEmitter<any> = new EventEmitter<any>()


    Form_update: FormGroup;

  constructor(public bsModalRef: BsModalRef, private fb:FormBuilder) { }


  ngOnInit(): void {


    this.Form_update = this.fb.group({
      note: [ '', Validators.required],
    });


    console.log("Prima ",this.data)
   // this.data = this.options.initialState['datiAnnullati']

    console.log("Dopo ",this.data)
  }


  onSubmit(Form_update){
    console.log("submit ",this.Form_update.value)
    this.itemModifica.emit(Form_update)
  }


}
