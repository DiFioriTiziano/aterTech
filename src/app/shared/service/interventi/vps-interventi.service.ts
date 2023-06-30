import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class VpsInterventiService {

  constructor(private http_client:HttpClient, private utilityService : UtilityService) {

  }



  vps_Crea(item){

    let bodyRequest ={
        "id_ater": item.vpsinf_id,
        "vpsinf_matricola": item.vpsinf_matricola,
        "vpsinf_info": item.vpsinf_info,
        "vpsinf_dal": this.utilityService.convertDateIso(item.vpsinf_dal) , // 2023-05-18T15:00:00.000Z
        "vpsinf_ora": null,
        "vpsinf_tipvs_id": item.vpsinf_tipvs_id
      }

        return this.http_client.post<any>(`${environment.BASE_API_URL}/v1/vps/interventi/create`, bodyRequest)

  }

  vps_Update(request){

    let bodyRequest ={
      "id_ater": request.vpsinf_id,
      "vpsinf_matricola": request.vpsinf_matricola,
      "vpsinf_info": request.vpsinf_info,
      "vpsinf_dal": this.utilityService.convertDateIso(request.vpsinf_dal) , // 2023-05-18T15:00:00.000Z
      "vpsinf_ora": null,
      "vpsinf_tipvs_id": request.vpsinf_tipvs_id
    }

    console.log(this.utilityService.dataFrom_UTC_ISOstring(request.vpsinf_dal))

    return this.http_client.post<any>(`${environment.BASE_API_URL}/v1/vps/interventi/update`, bodyRequest)

  }

  vps_Delete(request){

    /*                          ***** questa è da creare sul backend!! *******
    let bodyRequest ={
      "id_ater": request.vpsinf_id
    }

    return this.http_client.post<any>(`${environment.BASE_API_URL}/v1/vps/interventi/delete`, bodyRequest)

 */
  }





}
