import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import pageSettings from '../../config/page-settings';
import { AuthorizationService } from '../../services/authorization.service';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import {Login} from './login.interface';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'login',
    templateUrl: './login.html'
})


export class LoginPage implements OnDestroy {
  pageSettings = pageSettings;
    Login: Login = {
        username: null,
        password: null
    };
    error: any;

  constructor(private router: Router,
    private renderer: Renderer2,
    private Authorzation: AuthorizationService, private httpClient: HttpClient) {
    this.pageSettings.pageEmpty = true;
    this.renderer.addClass(document.body, 'bg-white');
  }

  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
    this.renderer.removeClass(document.body, 'bg-white');
  }

  formSubmit(f: NgForm) {
      if (f.valid) {
        this.Authorzation.login(f.value.username, f.value.password)
        .subscribe(
            data => {
                this.router.navigate(['main']);
            },
            err => {
                console.log(err);
                this.error = err.error.error;
            });
      }
    // this.Authorzation.login('vaeron', '994971crea');
    // this.router.navigate(['dashboard/v2']);
  }
}