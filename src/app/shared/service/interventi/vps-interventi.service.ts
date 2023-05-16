import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VpsInterventiService {

  urlVpsTest = "https://vps-func-clientapi-tst-it.azurewebsites.net/api/customer/property/job/request/aterroma/v1?code=q8TaAqmfijYt02n8wBndWw_OLIhCKq02hyiAXAFcSLXCAzFu5pASPQ=="; //TEST
  urlVpsPreProd = "https://clientapi-it-test.vpsgroup.com/api/customer/property/job/request/aterroma/v1?code=GtRjhatbdf9HYHdSV7YzQGa221IFbvcv_muzgOfT9xr_dYv7"; //PRE PROD
  urlVpsProd = "https://clientapi-it.vpsgroup.com/api/customer/property/job/request/aterroma/v1?code=P3kCXvfZ-_4nhGXZL1KjpTH5MJGaYLScvNZvO5qwf7lh79EV";//PROD

  constructor(private http_client:HttpClient) {

  }



  vps_Crea(){

    console.log("vps_Crea")
  let bodyRequest = {
    "InterventiAter":{
      "id_ater": "4756",
      "vpsinf_matricola": "2NDE1X8445",
      "vpsinf_info": "test ater roma",
      "vpsinf_dal": "2023-05-16T15:00:00.000Z",
      "vpsinf_ora": null,
      "vpsinf_tipvs_id": 2,
    }
  }

    return this.http_client.post<any>(`${this.urlVpsTest}`,bodyRequest).subscribe(
      (resp)=> console.log(resp)
    )

  }

  vps_Update(request){

/*     $dataVps =  array(
      'InterventiAter'=>array(
         'id_ater'=>(int)$_POST['IDVPS'],
         'vpsinf_matricola' => "".$_POST['matricola']."",
         'vpsinf_info'  =>"".$_POST['infovps']."",
         'vpsinf_dal' =>  "".$_POST['VPSDAL']."",
         'vpsinf_ora' => null,
         'vpsinf_tipvs_id' =>  (int)$_POST['vpstipo']
         )
    ); */



    	      //$urlVps ="https://vps-func-clientapi-tst-it.azurewebsites.net/api/customer/property/job/request/aterroma/v1?code=q8TaAqmfijYt02n8wBndWw_OLIhCKq02hyiAXAFcSLXCAzFu5pASPQ=="; //TEST
	//$urlVps="https://clientapi-it-test.vpsgroup.com/api/customer/property/job/request/aterroma/v1?code=GtRjhatbdf9HYHdSV7YzQGa221IFbvcv_muzgOfT9xr_dYv7"; //PRE PROD
            //$urlVps="https://clientapi-it.vpsgroup.com/api/customer/property/job/request/aterroma/v1?code=P3kCXvfZ-_4nhGXZL1KjpTH5MJGaYLScvNZvO5qwf7lh79EV";//PROD
            //print_r($Response );exit;


  }

  vps_Delete(request){

/*     $dataVps =  array(
      'InterventiAter'=>array(
         'id_ater'=>(int)$_POST['IDVPS']
         )
      ); */


          //print_r($Response);exit;
          //$urlVps ="https://vps-func-clientapi-tst-it.azurewebsites.net/api/customer/property/job/request/aterroma/v1?code=q8TaAqmfijYt02n8wBndWw_OLIhCKq02hyiAXAFcSLXCAzFu5pASPQ==";//TEST

    //  $urlVps ="https://clientapi-it-test.vpsgroup.com/api/customer/property/job/cancellation/aterroma/v1?code=GtRjhatbdf9HYHdSV7YzQGa221IFbvcv_muzgOfT9xr_dYv7";//PRE PROD

          //$urlVps ="https://clientapi-it.vpsgroup.com/api/customer/property/job/cancellation/aterroma/v1?code=P3kCXvfZ-_4nhGXZL1KjpTH5MJGaYLScvNZvO5qwf7lh79EV";//PROD



  }





}
