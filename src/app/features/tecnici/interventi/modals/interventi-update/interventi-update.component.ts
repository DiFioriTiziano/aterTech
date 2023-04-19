import { Component, Input, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { UtilityService } from '../../../../../shared/service/utility/utility.service';



@Component({
  selector: 'ater-interventi-update',
  template: `
  <div class="animated fadeIn">
          <div class="modal-header bg-primary">
            <h4 class="modal-title">{{title}}</h4>
            <button type="button" class="close" (click)="bsModalRef.hide()" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-primary">

              <form *ngIf="Form_update" [formGroup]="Form_update" (ngSubmit)="onSubmit(Form_update)" class="form-horizontal">
                  <div class="form-group row">
                    <label class="col-md-3 col-form-label" for="vpsinf_matricola">Matricola</label>
                      <div class="col-md-9">
                        <input  type="text" formControlName="vpsinf_matricola" value="" id="vpsinf_matricola" name="vpsinf_matricola"  class="form-control form-control-sm" placeholder="">
                      </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-md-3 col-form-label" for="vpsinf_tipologia">Intervento</label>
                      <div class="col-md-9">
                      <input  type="text" formControlName="vpsinf_tipologia" value="" id="vpsinf_tipologia" name="vpsinf_tipologia"  class="form-control form-control-sm" placeholder="">

                        <!--  <select  formControlName="vpsinf_tipologia"  id="vpsinf_tipologia" name="vpsinf_tipologia" class="form-control form-control-sm">
                            <option *ngFor="let tipo of tipologie"   value="{{ tipo.tipvps_id }}" >{{ tipo.tipvps_id }} ) {{ tipo.tipvps_descrizione }} </option>
                          </select> -->

                      </div>
                  </div>

                  <div   class="form-group row">
                    <div class="col-md-9">



                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-md-3 col-form-label" for="vpsinf_info">Informazioni</label>
                    <div class="col-md-9">
                    <textarea formControlName="vpsinf_info" value="" id="vpsinf_info" name="vpsinf_info" rows="4" class="form-control" placeholder=""></textarea>
                    </div>
                  </div>


                  <div class="form-group row">

                        <label class="col-md-3 col-form-label" for="vpsinf_dal">Data inizio</label>
                        <div class="col-md-5">
                          <input  type="date" formControlName="vpsinf_dal" value="{{this.data.vpsinf_dal}}" class="form-control form-control-sm" id="vpsinf_dal" name="vpsinf_dal" rows="4">
                        </div>

                        <div class="col-md-3">
                        <input class="form-control form-control-sm" type="time" id="appt" name="appt"  min="09:00" max="18:00">
                      </div>

                  </div>

                  <div class="form-group row">

                    <label class="col-md-3 col-form-label" for="vpsinf_al">Data fine</label>
                    <div class="col-md-5">
                      <input  type="date" formControlName="vpsinf_al" value="" class="form-control form-control-sm" id="vpsinf_al" name="vpsinf_al" rows="4">
                    </div>

                    <div class="col-md-3">
                    <input class="form-control form-control-sm" type="time" id="appt" name="appt"  min="09:00" max="18:00">
                  </div>


              </div>

                <div class="modal-footer">
                  <button [disabled]="!Form_update.dirty" type="submit" class="btn btn-primary" >Modifica</button>
                </div>
           </form>

          </div>
  </div>

  `,
  styles: []
})
export class InterventiUpdateComponent implements OnInit {

 // @ViewChild('updateModal') public updateModal: ModalDirective;

  @Input('dati') data: any
  @Input('title') title: any
  @Input('tipologie') tipologie: any

  @Output() datiModificati : EventEmitter<any> = new EventEmitter<any>()



  Form_update: FormGroup;


  constructor(
    private fb:FormBuilder,
    private utilityService : UtilityService,
    public bsModalRef: BsModalRef
  ) {}



  ngOnInit(): void {

   let matricola = this.data.vpsinf_matricola
   let tipologia = this.data.tipvps_descrizione
   let note = this.data.vpsinf_info
   let dataDal = this.utilityService.convertIsoDate(this.data.vpsinf_dal)
   let dataAl = this.utilityService.convertIsoDate(this.data.vpsinf_al)

      this.Form_update = this.fb.group({
        vpsinf_matricola: [{ value: matricola, disabled: true}, Validators.required],
        vpsinf_tipologia: [{ value: tipologia, disabled: true}, Validators.required],
        vpsinf_info: [{ value: note, disabled: false}, Validators.required],
        vpsinf_dal: [{ value: dataDal, disabled: false}, Validators.required] ,
        vpsinf_al: [{ value: dataAl, disabled: false}, Validators.required]
      });


  }



  onSubmit(Form_update): void {
    this.datiModificati.emit(Form_update.value);

    this.bsModalRef.hide()

  }




}
