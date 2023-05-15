import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ater-interventi-file',
  template: `

      <div class="animated fadeIn">
          <div class="modal-header bg-success">
            <h4 class="modal-title">Gestione file</h4>

            <button type="button" class="close" (click)="bsModalRef.hide()" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>

          </div>

              <div class="modal-body ">


                    <div class="text-center">
                        <input class="form-control" type="file" (change)="onChange($event)">

                        <button (click)="onUpload()" class="btn btn-success"> Upload </button>
                    </div>

                      <!-- Shareable short link of  uploaded file -->
                      <div class="container text-center jumbotron"
                          *ngIf="shortLink">
                          <h2> Visit Here</h2>
                          <a href="{{shortLink}}">{{shortLink}}</a>
                      </div>

                      <!--Flag variable is used here-->
                      <div class="container" *ngIf="loading">
                          <h3>Loading ...</h3>
                      </div>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" (click)="bsModalRef.hide()" >Close</button>
                        </div>

              </div>

      </div>


  `,
  styleUrls: ['./interventi-file.component.css']
})
export class InterventiFileComponent implements OnInit {




  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }






onChange(event) {
  this.file = event.target.files[0];
}

// OnClick of button Upload
onUpload() {
  this.loading = !this.loading;
/*   this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
          if (typeof (event) === 'object') {

              // Short link via api response
              this.shortLink = event.link;

              this.loading = false; // Flag variable
          }
      }
  ); */
}




}
