import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import pageSettings from '../../config/page-settings';
import { AuthorizationService } from '../../services/authorization.service';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import {Login} from './login.interface';
@Component({
    selector: 'login',
    templateUrl: './login.html'
})


export class LoginPage implements OnDestroy {
  pageSettings = pageSettings;
    Login: Login = {
        login: null,
        password: null
    };
    error: any;

  constructor(private router: Router, private renderer: Renderer2, private Authorzation: AuthorizationService, private httpClient: HttpClient) {
    this.pageSettings.pageEmpty = true;
    this.renderer.addClass(document.body, 'bg-white');
  }

  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
    this.renderer.removeClass(document.body, 'bg-white');
  }

  formSubmit(f: NgForm) {
      if (f.valid) {
        this.Authorzation.login(f.value.login, f.value.password)
        .subscribe(
            data => {
              console.log("login data");
                console.log(data);
                // Cette fct doit retourner ttes les infos du User connecté 
                // et donc selon son rôle on gère sur quel page il doit naviguer et avec quels informations 
              if (data.role == "agent" || data.role =="controleur"){
                this.router.navigate(['main']);
              }else{
                this.router.navigate(['visiteur']);
              }
                
                // this.router.navigate(['main'], { queryParams: { popup: true, mode: "visit" } });
            },
            err => {
                console.log(err);
                this.error = err.error.error;
            });
      }
  }


}