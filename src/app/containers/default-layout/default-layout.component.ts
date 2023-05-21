import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/service/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  isLoggedIn : Observable<boolean>;
  nominativoDwh:string

  constructor(private authService: AuthService) {

    this.isLoggedIn = this.authService.isLoggedIn();
      this.isLoggedIn.subscribe(
        (resp)=>{
          this.nominativoDwh = localStorage.getItem('nominativoDwh')
        }
      )





  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
