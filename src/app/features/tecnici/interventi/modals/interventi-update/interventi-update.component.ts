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

              <div class="card border-danger">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3"> </div>
                      <div class="col-md-6">
                        <div class="form-check form-check-inline mr-1">
                          <input formControlName="vpsinf_cancellato" class="form-check-input" type="checkbox" name="vpsinf_cancellato" id="vpsinf_cancellato" value="">
                          <label class="form-check-label" for="inline-checkbox2">Annulla Intervento</label>
                        </div>
                      </div>
                    <div class="col-md-3"> </div>
                  </div>
                </div>
              </div>


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
                      </div>
                  </div>


                  <div   class="form-group row">
                      <label class="col-md-3 col-form-label" for="vpsinf_tipologia">Requisiti</label>
                        <div class="col-md-3">
                          <select  formControlName="vpsstato_descrizione"  id="vpsstato_descrizione" name="vpsstato_descrizione" class="form-control form-control-sm">
                            <option *ngFor="let item of stati"  >{{item.vpssta_descrizione}}</option>
                          </select>
                        </div>

                        <div class="col-md-6 col-form-label">

                          <div class="form-check form-check-inline mr-1">
                            <input formControlName="vpsinf_flag_verbale_tecnico" class="form-check-input" type="checkbox" name="vpsinf_flag_verbale_tecnico" id="vpsinf_flag_verbale_tecnico" value="">
                            <label class="form-check-label" for="inline-checkbox1">VerbaleTecnico</label>
                          </div>
                          <div class="form-check form-check-inline mr-1">
                            <input formControlName="vpsinf_flag_sequestro" class="form-check-input" type="checkbox" name="vpsinf_flag_sequestro" id="vpsinf_flag_sequestro" value="">
                            <label class="form-check-label" for="inline-checkbox2">Sequestro</label>
                          </div>

                        </div>
                  </div>


                  <div class="form-group row">
                    <label class="col-md-3 col-form-label" for="vpsinf_info">Note</label>
                    <div class="col-md-9">
                    <textarea formControlName="vpsinf_info" value="" id="vpsinf_info" name="vpsinf_info" rows="4" class="form-control" placeholder=""></textarea>
                    </div>
                  </div>


                  <div class="form-group row">

                        <label class="col-md-3 col-form-label" for="vpsinf_dal">Data/ora inizio</label>
                        <div class="col-md-5">
                          <input  type="date" formControlName="vpsinf_dal" value="{{this.data.vpsinf_dal}}" class="form-control form-control-sm" id="vpsinf_dal" name="vpsinf_dal" rows="4">
                        </div>

                        <div class="col-md-3">
                        <input class="form-control form-control-sm" type="time" id="appt" name="appt"  min="09:00" max="18:00">
                      </div>

                  </div>

                  <div class="form-group row">

                    <label class="col-md-3 col-form-label" for="vpsinf_al">Data/ora fine</label>
                    <div class="col-md-5">
                      <input  type="date" formControlName="vpsinf_al" value="" class="form-control form-control-sm" id="vpsinf_al" name="vpsinf_al" rows="4">
                    </div>

                    <div class="col-md-3">
                    <input class="form-control form-control-sm" type="time" id="appt" name="appt"  min="09:00" max="18:00">
                  </div>


              </div>

              <div class="card border-warning">
                  <div class="card-body">

                    <div class="form-group row">
                        <input type="file"  class="form-control-sm" id="file1" name="file1" (change)="onFileSelected($event)" #file1 aria-label="File browser example">
                        <input type="file"  class="form-control-sm" id="file2" name="file2" (change)="onFileSelected($event)" #file2 aria-label="File browser example">
                        <input type="file"  class="form-control-sm" id="file3" name="file3" (change)="onFileSelected($event)" #file3 aria-label="File browser example">
                    </div>

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
  @Input('type') tipo: any
  @Input('tipologie') tipologie: any

  @Output() datiModificati : EventEmitter<any> = new EventEmitter<any>()



  Form_update: FormGroup;

  stati: any =[
    { "vpssta_id": "0","vpssta_descrizione": "Non assegnabile" },
    { "vpssta_id": "1","vpssta_descrizione": "Requisiti minimi" },
    { "vpssta_id": "2","vpssta_descrizione": "Requisiti medi" },
    { "vpssta_id": "3","vpssta_descrizione": "Requisiti buoni" }
  ]


  constructor(
    private fb:FormBuilder,
    private utilityService : UtilityService,
    public bsModalRef: BsModalRef
  ) {}



  ngOnInit(): void {

    let abilita = this.tipo === "Validazione"?false:true

    let matricola = this.data.vpsinf_matricola
    let tipologia = this.data.tipvps_descrizione

    let annullamento:Boolean = this.data.vpsinf_cancellato === "SI"?true:false


    let vpsstato_descrizione = this.data.vpsstato_descrizione
    let vpsinf_flag_verbale_tecnico = this.data.vpsinf_flag_verbale_tecnico
    let vpsinf_flag_sequestro = this.data.vpsinf_flag_sequestro
    let note = this.data.vpsinf_info
    let dataDal = this.utilityService.convertIsoDate(this.data.vpsinf_dal)
    let dataAl = this.data.vpsinf_al?this.utilityService.convertIsoDate(this.data.vpsinf_al): null //0000-00-00 00:00:00

      this.Form_update = this.fb.group({
        vpsinf_matricola: [{ value: matricola, disabled: true}, Validators.required],
        vpsinf_tipologia: [{ value: tipologia, disabled: true}, Validators.required],
        vpsinf_cancellato: [{ value: annullamento, disabled: false}],
        vpsstato_descrizione: [''],
        vpsinf_flag_verbale_tecnico: [{ value: vpsinf_flag_verbale_tecnico, disabled: false}],
        vpsinf_flag_sequestro: [{ value: vpsinf_flag_sequestro, disabled: false}],
        vpsinf_info: [{ value: note, disabled: false}, Validators.required],
        vpsinf_dal: [{ value: dataDal, disabled: abilita}, Validators.required] ,
        vpsinf_al: [{ value: dataAl, disabled: false}, Validators.required]
      });

  }



  onSubmit(Form_update): void {
    this.datiModificati.emit(Form_update.value);

    this.bsModalRef.hide()

  }


  onFileSelected(event) {
    const file:File = event.target.files[0];

    }



}
