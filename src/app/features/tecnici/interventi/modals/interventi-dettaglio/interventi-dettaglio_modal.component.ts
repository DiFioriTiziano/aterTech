import { Component, Input, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'ater-modal-note',
  template: `
<div class="animated fadeIn">
        <div class="modal-header bg-success">
          <h4 class="modal-title">Dettaglio</h4>

          <button type="button" class="close" (click)="bsModalRef.hide()" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

        </div>

        <div class="modal-body ">
            <div class="card border-secondary">
                <div class="card-body">


                    <strong>Autore - {{dati.utente_creazione}} </strong>


                <div class="row">

                  <div class="col-3  text-success">ID Ater</div>
                      <div class="col-9"> {{dati.vpsinf_id}} </div>

                  <div class="col-3  text-success">Matricola</div>
                      <div class="col-9 "> {{dati.vpsinf_matricola}} </div>

                  <div class="col-3  text-success">Indirizzo</div>
                      <div class="col-9 "> {{dati.indirizzo}} - {{dati.localizzazione}} </div>

                </div>
            <hr>

              <div class="row">
                  <div class="col-3  text-success">Note</div>
                    <div class="col-9 "> {{dati.vpsinf_info}}</div>
              </div>


        </div>
    </div>

                <div class="form-group row">
                  <label class="col-md-3 col-form-label" for="vpsinf_info">Allegati: </label>
                  <div class="col-md-9">
                  </div>
                </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="bsModalRef.hide()" >Close</button>
    </div>

        </div>
</div>
  `,
  styles: [],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class interventiDettaglio_ModalComponent implements OnInit {

  dati:any
  //@Input('note') note:string;

  constructor(public bsModalRef: BsModalRef, public options: ModalOptions) { }

  ngOnInit(): void {
   // this.dati = this.options.initialState['datiAnnullati']
  }

}
