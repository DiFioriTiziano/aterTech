import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ater-dashboard',
  template: `
    <div class="animated fadeIn">


    <div class="card border-primary">
    <div class="card-header">
    <div class="btn-group float-right" dropdown>
            <button type="button" class="btn  dropdown-toggle p-0" dropdownToggle>
            <i class="fa fa-filter "></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right" *dropdownMenu>
              <a class="dropdown-item" href="#">Ultimo mese</a>
              <a class="dropdown-item" href="#">Semestrale</a>
              <a class="dropdown-item" href="#">Annuale</a>
            </div>
    </div>

    <i class="fa fa-tasks fa-lg"></i>Interventi  </div>

    <div class="card-body">



      <div class="row">
    <div class="col-sm-6 col-lg-3">
      <div class="card text-white bg-info">
        <div class="card-body pb-0">
          <button type="button" class="btn btn-transparent p-0 float-right">
          <i class="icon-settings"></i>
          </button>
          <div class="text-value">983</div>
          <div>	Riconsegna alloggio, installazione allarme</div>
        </div>
        <div class="chart-wrapper mt-3 mx-3" style="height:70px;">
sdfgsdfgsdfgsdf
        </div>
      </div>
    </div><!--/.col-->
    <div class="col-sm-6 col-lg-3">
      <div class="card text-white bg-primary">
        <div class="card-body pb-0">
          <div class="btn-group float-right" dropdown>
            <button type="button" class="btn btn-transparent dropdown-toggle p-0" dropdownToggle>
            <i class="fa fa-filter "></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right" *dropdownMenu>
              <a class="dropdown-item" href="#">Ultimo mese</a>
              <a class="dropdown-item" href="#">Semestrale</a>
              <a class="dropdown-item" href="#">Annuale</a>
            </div>
          </div>
          <div class="text-value">385</div>
          <div>Apertura Alloggio</div>
        </div>
        <div class="chart-wrapper mt-3 mx-3" style="height:70px;">
sdfgsdfgsdfgsdfg
        </div>
      </div>
    </div><!--/.col-->
  </div>
</div>









      </div>
    </div>




    <div class="card border-primary">
      <div class="card-body">

      </div>
    </div>



  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
