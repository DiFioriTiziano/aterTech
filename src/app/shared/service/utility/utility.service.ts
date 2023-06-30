import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';
import 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

convertIsoDate(isoString){
  return  new Date(isoString).toLocaleDateString('en-CA') // controllare n-CA !!!!
}


convertDateIso(date){
   let isoDate = new Date(date)
       return  isoDate.toISOString()

 }






createUTC_ISOstring(data, ora){
  const datetimeString = `${data}T${ora}`;
  const isoValue = moment.utc(datetimeString).toISOString();
return isoValue
}

dataFrom_UTC_ISOstring(UTC_ISOstring){
  const date = moment.utc(UTC_ISOstring).format('YYYY-MM-DD');
return date
}

oraFrom_UTC_ISOstring(UTC_ISOstring){
  const time = moment.utc(UTC_ISOstring).format('HH:mm');
return time
}

formatDateTime(dateTime: string): string {
  return moment.utc(dateTime).subtract(0, 'hours').format('DD/MM/YYYY HH:mm');
}




validateDateIsAfterOrEqualCurrent(control: AbstractControl): ValidationErrors | null {
  const selectedDate = moment(control.value, 'YYYY-MM-DD');
  const currentDate = moment();
    if (selectedDate.isValid() && selectedDate.isSameOrAfter(currentDate, 'day')) {
      return null;
    }
  //  control.setErrors({ dateIsNotAfterOrEqualCurrent: true });
  return { dateIsNotAfterOrEqualCurrent: true };
}


}
