import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';


@Component({
  selector: 'ater-modal',
  template: `
    <div class="animated fadeIn">

        <ater-annullo-modal
            [data]="data"
            [title]="title"
            (itemModifica)="modificaItem()"
        >
        </ater-annullo-modal>

    </div>
  `,
  styles: [ ]
})
export class interventiAnnullo_ModalContainerComponent implements OnInit {

  data: any
  title:string



  constructor(public bsModalRef: BsModalRef, private fb:FormBuilder) { }


  ngOnInit(): void { }


  modificaItem(){

  }

}
