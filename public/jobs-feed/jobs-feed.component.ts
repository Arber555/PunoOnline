import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-feed',
  templateUrl: './jobs-feed.component.html',
  styleUrls: ['./jobs-feed.component.css']
})
export class JobsFeedComponent implements OnInit {

  constructor(
    private validateService: ValidateService, 
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

   public onLogoutClick() {
    this.authService.logout();
    this.flashMessages.show('You are logged out', {
      cssClass: 'alert-succes',
      timeout: 4000
    });
    this.router.navigate(['/login']);
    return false;
  }

}
