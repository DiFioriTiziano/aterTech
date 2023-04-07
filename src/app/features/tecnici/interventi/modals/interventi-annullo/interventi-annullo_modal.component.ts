import { Component, OnInit} from '@angular/core';

import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';


@Component({
  selector: 'ater-modal',
  template: `
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
                    <form class="form-horizontal">
                        <div class="form-group row">
                          <label class="col-md-3 col-form-label" for="note">Motivazione</label>
                          <div class="col-md-9">
                            <textarea value="" id="note" name="note"   class="form-control" placeholder=""> </textarea>
                          </div>
                        </div>

                          <div class="modal-footer">
                            <button  type="submit" class="btn btn-danger" >Annulla</button>
                          </div>
                    </form>

                </div>
  `,
  styles: [ ]
})
export class interventiAnnullo_ModalComponent implements OnInit {


  data: any
  title:string

  constructor(public bsModalRef: BsModalRef) {

  }

  ngOnInit(): void {
    console.log("Prima ",this.data)
   // this.data = this.options.initialState['datiAnnullati']

    console.log("Dopo ",this.data)
  }



}
