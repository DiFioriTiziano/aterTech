import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ater-modal-note',
  template: `
<div class="animated fadeIn">
        <div class="modal-header bg-success">
          <h4 class="modal-title">Note</h4>
          <button type="button" class="close" (click)="bsModalRef.hide()" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-success">

            <form class="form-horizontal">

                <div class="form-group row">
                  <label class="col-md-3 col-form-label" for="vpsinf_info">Dettaglio</label>
                  <div class="col-md-9">
                  <textarea value="{{dati.vpsinf_info}}" id="vpsinf_info" name="vpsinf_info"   class="form-control" placeholder="">

                  </textarea>
                  </div>
                </div>
         </form>

        </div>
</div>
  `,
  styles: []
})
export class interventiNote_ModalComponent implements OnInit {

  dati:any
  //@Input('note') note:string;

  constructor(public bsModalRef: BsModalRef, public options: ModalOptions) { }

  ngOnInit(): void {
    console.log(this.dati)
   // this.dati = this.options.initialState['datiAnnullati']
  }

}
