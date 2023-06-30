import { Component, Input, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UtilityService } from '../../../../../shared/service/utility/utility.service';
import { dataFile } from '../../model/dataFile.model';
import { environment } from '../../../../../../environments/environment';




@Component({
  selector: 'ater-interventi-update',
  template: `
  <div class="animated fadeIn">
          <div class="modal-header bg-primary">

            <h4 class="modal-title">{{title}} Intervento n. ( {{this.data.vpsinf_id}} )</h4>
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
                            <select  formControlName="vps_stato_manutentivo" (change)="change_stato_manutentivo($event,this.data.vpsinf_id)" id="vps_stato_manutentivo" name="vps_stato_manutentivo" class="form-control form-control-sm">
                            <option *ngFor="let item of statoManutentivoLista" value="{{item.vpssta_id}}" >{{item.vpssta_descrizione}}</option>
                            </select>
                          </div>

                          <div class="col-md-6 col-form-label">

                            <div class="form-check form-check-inline mr-1">
                              <input formControlName="vpsinf_flag_verbale_tecnico" (change)="change_VerbaleTech($event, this.data.vpsinf_id)" class="form-check-input" type="checkbox" name="vpsinf_flag_verbale_tecnico" id="vpsinf_flag_verbale_tecnico" value="">
                              <label class="form-check-label" for="inline-checkbox1">VerbaleTecnico</label>
                            </div>
                            <div class="form-check form-check-inline mr-1">
                              <input formControlName="vpsinf_flag_sequestro"  (change)="change_Sequestro($event, this.data.vpsinf_id)" class="form-check-input" type="checkbox" name="vpsinf_flag_sequestro" id="vpsinf_flag_sequestro" value="">
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
                        <div *ngIf="livello >  2 ">{{this.data.vpsinf_dal | date:'dd/MM/yyyy' }}</div>
                          <input *ngIf="livello <=  2 "  type="date" formControlName="vpsinf_dal"
                          value="{{this.data.vpsinf_dal}}" class="form-control form-control-sm"
                          id="vpsinf_dal" name="vpsinf_dal" rows="4"
                          [ngClass]="{ 'invalid-control': Form_update.get('vpsinf_dal').invalid }"
                          >
                        </div>

                        <div *ngIf="livello > 2" class="col-md-3"> {{this.vpsinf_ora_dal}} </div>

                        <div *ngIf="livello <=  2 " class="col-md-3">
                          <input  formControlName="vpsinf_ora_dal" value="{{this.vpsinf_ora_dal}}"class="form-control form-control-sm" type="time" id="vpsinf_ora_dal" name="vpsinf_ora_dal"  min="09:00" max="18:00">
                        </div>
                  </div>

                  <div class="form-group row">

                    <label class="col-md-3 col-form-label" for="vpsinf_al">Data/ora fine</label>
                    <div class="col-md-5">
                      <input  type="date" formControlName="vpsinf_al" value="{{this.data.vpsinf_al}}"
                            class="form-control form-control-sm"
                            id="vpsinf_al" name="vpsinf_al" rows="4"
                            [ngClass]="{ 'invalid-control': Form_update.get('vpsinf_al').invalid }"
                            >
                    </div>

                    <div class="col-md-3">
                      <input formControlName="vpsinf_ora_al" class="form-control form-control-sm" type="time" id="vpsinf_ora_al" name="vpsinf_ora_al"  min="09:00" max="18:00">
                    </div>

                  </div>

                  <div   class="form-group row">
                      <label class="col-md-3 col-form-label" for="vpsinf_tipologia">Situazione alloggio</label>
                        <div class="col-md-5">
                          <select  formControlName="vps_esito_intervento"  id="vps_esito_intervento" name="vps_esito_intervento" class="form-control form-control-sm">
                          <option *ngFor="let item of esiti" value="{{item.id}}" >{{item.esito}}</option>
                          </select>
                        </div>
                        <div class="col-md-4" ></div>
                  </div>


                    <div class="form-group row">
                      <div class="col-md-12" >

                        <button type="button" class="btn btn-success btn-sm"
                          (click)="isCollapsed = !isCollapsed"> Carica documenti
                        </button>

                          <div class="card border-success"
                              [collapse]="isCollapsed"
                          >

                            <div class="container">
                              <div class="form-group row bg-secondary">

                                  <div class="col-md-4  mt-1 mb-1" >
                                      <select  (change)="onselect($event.target.value)" id="caricaFile" name="caricaFile" class="form-control form-control-sm">
                                        <option  value="" disabled selected>-Selezionare-</option>
                                        <option *ngFor="let item of listaTipoFile" >{{item.filename}}</option>
                                      </select>
                                  </div>


                                  <div class="col-md-6" >
                                      <input type="file"  [disabled]="fileSelected" class="form-control-sm" id="file1" name="file1" (change)="onFileSelected($event)" #file1 aria-label="File browser example">
                                  </div>

                                  <div class="col-md-2 mb-1" >
                                  <button [disabled]="fileSelected" (click)="salvaFile(this.data)" type="button" class="btn btn-sm btn-success mt-1">Salva</button>
                                  </div>

                              </div>

                              <div *ngFor="let item of dataFile" class="list-group-item-sm-1 list-group-item-action ml-1 mb-1 mr-2">
                                <div class="row">
                                  <div class="col-6"><i class="fa fa-file-pdf-o fa-lg text-danger"></i> <a href="http://192.168.9.206/v0/dwh/manutenzioni/interventi/file/5INC938155/2334/{{item.docope_tipo_file}}.pdf">{{item.docope_tipo_file}}</a></div>
                                  <div class="col-6 text-right text-danger">X</div>
                                </div>

                              </div>


                            </div>




                      </div>
                    </div>


            </div>

                  <!--
                  {{ Form_update.value | json }}


                  <pre>
                    <code>
                      status- <b>{{ Form_update.status }}</b>
                      valid- <b>{{ Form_update.valid }}</b>
                      invalid- <b>{{ Form_update.invalid }}</b>
                    </code>
                  </pre>
                  -->


                <div class="modal-footer">
                  <button [disabled]="!Form_update.valid" type="submit" class="btn btn-primary" >Modifica</button>
                </div>
           </form>

          </div>
  </div>

  `,
  styles: [ `

    .invalid-control {
      border-color: red;
    }

    `
  ]
})
export class InterventiUpdateComponent implements OnInit {


  @Input('dati') data: any
  @Input('title') title: any
  @Input('type') tipo: any
  @Input('tipologie') tipologie: any
  @Input('dataFile') dataFile: dataFile
  @Input('statoManutentivoLista') statoManutentivoLista: any

  @Output() datiModificati : EventEmitter<any> = new EventEmitter<any>()
  @Output() update_statoManutentivo : EventEmitter<any> = new EventEmitter<any>()
  @Output() update_verbaleTec : EventEmitter<any> = new EventEmitter<any>()
  @Output() update_sequestro : EventEmitter<any> = new EventEmitter<any>()
  @Output() add_datafile : EventEmitter<any> = new EventEmitter<any>()


  livello  = JSON.parse(localStorage.getItem('authLevelDwh'));
  Form_update: FormGroup;
  dataInizio : any;
  isCollapsed: boolean = true;
  fileSelected:boolean = true;
  file:File
  tipoFile: any


  esiti: any =[
    { "id": 1,"esito": "Allarmato" },
    { "id": 2,"esito": "Non allarmato" },
  ]


  listaTipoFile: any =[
    { "idater": 1,"filename": "Mail richiesta" },
    { "idater": 2,"filename": "Scheda odl" },
    { "idater": 2,"filename": "Scheda intervento" },
    { "idater": 2,"filename": "Scheda stato manutentivo" },
    { "idater": 2,"filename": "Scheda censimento" },
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

    let vpssta_id = this.data.vpssta_id
    let vpsinf_flag_verbale_tecnico = this.data.vpsinf_flag_verbale_tecnico
    let vpsinf_flag_sequestro = +this.data.vpsg_flag_sequestro

    let note = this.data.vpsinf_info
    let annullamento:Boolean = this.data.vpsinf_cancellato === "SI"?true:false
    let esito = +this.data.vpsinf_stato_immobile

    // DATE DAL
    let solo_data_Dal = this.utilityService.dataFrom_UTC_ISOstring(this.data.vpsinf_dal)
      let dataDal = this.data.vpsinf_dal ? solo_data_Dal: ""
    let solo_ora_dal = this.utilityService.oraFrom_UTC_ISOstring(this.data.vpsinf_dal)
      let vpsinf_ora_dal = this.data.vpsinf_dal ? solo_ora_dal : ""

    // DATE AL
    let solo_data_Al = this.utilityService.dataFrom_UTC_ISOstring(this.data.vpsinf_al)
      let dataAl = this.data.vpsinf_al ? solo_data_Al: ""
    let solo_ora_al = this.utilityService.oraFrom_UTC_ISOstring(this.data.vpsinf_al)
      let vpsinf_ora_al = this.data.vpsinf_al ? solo_ora_al : "";



      // form group
      this.Form_update = this.fb.group({
        vpsinf_matricola: [{ value: matricola, disabled: true}, Validators.required],
        vpsinf_tipologia: [{ value: tipologia, disabled: true}, Validators.required],
        vpsinf_cancellato: [{ value: annullamento, disabled: false}],

        vps_stato_manutentivo: [{ value: vpssta_id, disabled: false}],
        vpsinf_flag_verbale_tecnico: [{ value: vpsinf_flag_verbale_tecnico, disabled: false}],
        vpsinf_flag_sequestro: [{ value: vpsinf_flag_sequestro, disabled: false}],

        vpsinf_info: [{ value: note, disabled: false}, Validators.required],

        vpsinf_dal: [{ value: dataDal, disabled: false}, [Validators.required,this.utilityService.validateDateIsAfterOrEqualCurrent] ] ,
        vpsinf_ora_dal: [{ value: vpsinf_ora_dal, disabled: false}, Validators.required],

        vpsinf_al: [{ value: dataAl, disabled: false}, [this.utilityService.validateDateIsAfterOrEqualCurrent] ],
        vpsinf_ora_al: [{ value: vpsinf_ora_al, disabled: false}],

        vps_esito_intervento:[{ value: esito, disabled: false}]

      });


  }


  onselect(value){
    console.log("ci siamo! ", value)
      value !== "-Selezionare-"?this.fileSelected = false: null
      this.tipoFile = value
  }

  salvaFile(item){

    let datiAggiunti = {
      "docope_vps_id": item.vpsinf_id,
      "docope_matricola": item.vpsinf_matricola,
      "docope_tipo_file": this.tipoFile,
      "docope_utent_id": localStorage.getItem('userID_Dwh'),
      "docope_DOCUM_LINK": `${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/file/${item.vpsinf_matricola}/${item.vpsinf_id}/${this.file.name}.pdf`
    }

    this.add_datafile.emit({...this.dataFile[0],...datiAggiunti})
  }




  onSubmit(Form_update): void {
    this.datiModificati.emit(Form_update.value);
    this.bsModalRef.hide()
  }


  onFileSelected(event) {
    this.file = event.target.files[0];

    }


    change_stato_manutentivo(stato, vpsinf_id){
      let req = {"statoManutentivo": stato.target.value, "idItem":vpsinf_id}

      this.update_statoManutentivo.emit(req)
    }

    change_VerbaleTech(verbaleTech, vpsinf_id){
      let req = {"valoreVerbale": verbaleTech.currentTarget.checked, "idItem":vpsinf_id}

      this.update_verbaleTec.emit(req)
    }
    change_Sequestro(sequestro, vpsinf_id){
      let req = {"valoreSequestro": sequestro.currentTarget.checked, "idItem":vpsinf_id}

      this.update_sequestro.emit(req)
    }

}
