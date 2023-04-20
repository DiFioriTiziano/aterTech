import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BsModalRef, ModalDirective} from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { InterventiService } from '../../../../../shared/service/interventi/porteAllarmate/porte-allarmate-service.service';




@Component({
  selector: 'ater-interventi-create-modal',
  templateUrl: './interventi-create-modal.component.html',

  styles: []
})
export class InterventiCreateModalComponent implements OnInit {

    @ViewChild('primaryModal') public primaryModal: ModalDirective;

    @Output() datiAdd : EventEmitter<any> = new EventEmitter<any>()

    @Input('asset') public assetAter: any;
    @Input('tipologie') public tipologie: any;

    FormCreate: FormGroup;
    asset: any
    page = 1;
    pageSize :any;
    filteredItems :any;
    jobTotali:any;
    keySearch:string = "";


    bloccaMatricola: boolean = false

    obj:any
    time: Date = new Date();


  constructor(
    private fb:FormBuilder,
    private interventiService: InterventiService,
    public bsModalRef: BsModalRef
  ) {
      this.pageSize = 50;


      this.FormCreate = this.fb.group({
        vpsinf_matricola: [{value:'', disabled:true}, [Validators.required]],
        vpsinf_tipologia: ['', Validators.required],
        vpsinf_info: ['', Validators.required],
        vpsinf_dal: ['', Validators.required] ,
        vpsinf_al: ['', Validators.required]
      });

  }



  ngOnInit(): void {

  // this.onClose = new Subject();
    // this.asset = this.assetAter
      this.filterItems(this.keySearch);

  }




  filterItems(query) {

    this.jobTotali = null
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    let filtro  = query.toLowerCase();
      if (!filtro){
        this.FormCreate.reset();
      }

      this.filteredItems = this.assetAter.filter(item =>{
        return Object.values(item).some(value => {
          return typeof value === 'string' && value.toLowerCase().includes(filtro);
        });
      })

      this.jobTotali = this.filteredItems.length
      this.filteredItems = this.filteredItems.slice(start, end);
  }



  onPageChange(page: number) {
    this.page = page;
    this.filterItems(this.keySearch);
  }



  onSearch(query) {
    this.keySearch = query;
    this.page = 1;
    this.filterItems(this.keySearch);
  }


  setValore(matricola){
    this.FormCreate.controls['vpsinf_matricola'].setValue(matricola);
  }

  reset(){
    this.FormCreate.reset()
      this.bsModalRef.hide();
  }



  onSubmit(): void {

    this.FormCreate.controls['vpsinf_matricola'].enable();

    this.datiAdd.emit(this.FormCreate.value);

    this.FormCreate.controls['vpsinf_matricola'].disable();

    this.FormCreate.reset()
    this.bsModalRef.hide()


  }





}
