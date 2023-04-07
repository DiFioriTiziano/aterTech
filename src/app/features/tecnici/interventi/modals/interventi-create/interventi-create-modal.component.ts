import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BsModalRef, ModalDirective} from 'ngx-bootstrap/modal';
import { InterventiService } from '../../../../../shared/service/interventi/porteAllarmate/porte-allarmate-service.service';




@Component({
  selector: 'ater-interventi-create-modal',
  templateUrl: './interventi-create-modal.component.html',

  styles: []
})
export class InterventiCreateModalComponent implements OnInit {

  @ViewChild('primaryModal') public primaryModal: ModalDirective;

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

     this.asset = this.assetAter
      console.log(this.asset)

      this.filterItems(this.keySearch);
    console.log(this.tipologie)

  }




  filterItems(query) {

    this.jobTotali = null
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    let filtro  = query.toLowerCase();
      if (!filtro){
        this.FormCreate.reset();
      }

      this.filteredItems = this.asset.filter(item =>{
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
  }

/*   saveJob(){

    this.FormCreate.controls['vpsinf_matricola'].enable();

    let obj={
      "id_esterno": 0,
      "id_tipologia": this.FormCreate.controls.vpsinf_tipologia.value,
      "matricola": this.FormCreate.controls.vpsinf_matricola.value,
      "note": this.FormCreate.controls.vpsinf_info.value,
      "data_intervento": "2023-09-29T15:00:00.000Z",
      "ora_intervento": "",
      "data_fine": "",
      "utent_id": "466"
    }

    this.interventiService.create(obj).subscribe( (res)=> {
      console.log("response create: ", res)
    });


    this.FormCreate.controls['vpsinf_matricola'].disable();
    this.FormCreate.reset()

  } */




  onSubmit(): void {
    //const newData = this.FormCreate.get('newData').value;
    console.log(this.FormCreate.value)


    this.FormCreate.controls['vpsinf_matricola'].enable();

    this.obj={
      "id_esterno": 0,
      "id_tipologia": this.FormCreate.controls.vpsinf_tipologia.value,
      "matricola": this.FormCreate.controls.vpsinf_matricola.value,
      "note": this.FormCreate.controls.vpsinf_info.value,
      "data_intervento": "2023-04-07T15:00:00.000Z",
      "ora_intervento": "12:00",
      "data_fine": "2023-04-09T15:00:00.000Z",
      "utent_id": "466"
    }

    this.interventiService.create(this.obj).subscribe(
      () => {
        this.obj = '';
        this.interventiService.emitDataUpdated();
      },
      (error) => {
        console.error(error);
      }

    );




    this.FormCreate.controls['vpsinf_matricola'].disable();
    this.FormCreate.reset()



  }





}
