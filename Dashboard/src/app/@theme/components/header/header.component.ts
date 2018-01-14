import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { AuthService } from '../../../auth/auth.service';
import { Person } from '../../../pages/datacomplete_consumer/services/person.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;
  person : Person;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  UserName = '';

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private auth : AuthService) {
              this.auth.isPersonSource.subscribe(res => {
                this.person = res;
                try {
                  console.log(this.person.i);
                  if(this.auth.person.firstname){
                    this.UserName = this.auth.person.firstname;
                  } else {
                    this.UserName = this.auth.email;
                  }
                } catch (error) {
                  console.log("noch kein user da ");                 
                }
              })
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  logOut(){
  this.auth.logout(); 
  }
  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
