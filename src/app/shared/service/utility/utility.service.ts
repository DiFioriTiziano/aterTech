import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

convertIsoDate(isoString){
 /*   let todate=new Date(isoString).getDate();
      let tomonth=new Date(isoString).getMonth()+1;
      let toyear=new Date(isoString).getFullYear(); */
  return  new Date(isoString).toLocaleDateString('en-CA')

}

convertDateIso(date){
  /*   let todate=new Date(isoString).getDate();
       let tomonth=new Date(isoString).getMonth()+1;
       let toyear=new Date(isoString).getFullYear(); */
   let isoDate = new Date(date)
       return  isoDate.toISOString()

 }

}
