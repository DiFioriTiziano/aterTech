import { Injectable, TemplateRef  } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ModalService {

 /*  modalRef!: BsModalRef;
  modalEvent = new Subject();

  constructor(private modalService: BsModalService) {}

  openModal(template?: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalEvent.next(true);
  }

  closeModal() {
    this.modalRef.hide();
  }

 */

/*    modals: any[] = [];

  //constructor(private modalService: BsModalService) {}

     add(modal: any) {
        this.modals.push(modal);
    }

    remove(id: string) {
        this.modals = this.modals.filter(x => x.id !== id);
    }

    open(id: string) {
        let modal: any = this.modals.filter(x => {
          x.id === id
          console.log(x.basicModal)
        })[0];
   ;
          //console.log("se modal", modal.basicModal )
          //modal.basicModal;

    }



    close(id: string) {
        let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.close();
    }
 */

}




























/*


If you use same component then,

HTML #
    <button (click)="openModalWithComponent()">open</button>

    // for display purpose
    <ng-template #template>
      <div class="modal-body">
      </div>
    </ng-template>

COMPONENT #
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ViewChild, ElementRef } from '@angular/core';

      bsModalRef: BsModalRef;
constructor(private modalService: BsModalService) {}
      @ViewChild('template') elementView: ElementRef;
    openModalWithComponent() {
        this.bsModalRef = this.modalService.show(this.elementView);
        // this.bsModalRef.content.closeBtnName = 'Close';
        // (click)="bsModalRef.hide()"

    }


*/


