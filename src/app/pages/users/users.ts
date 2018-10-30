import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
@Component({
  selector: 'users',
  templateUrl: './users.html'
})

export class UsersComponent implements OnInit {
    constructor(private userService: UserService, private http: Http) {}
    user: any = {
        username: null,
        password: null,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        role: null,
        region: null,
        province: null,
        commune: null
      };
      region: any = [];
      province: any = [];
      commune: any = [];

    public getRegion(): Observable<any> {

      return this.http.get('/assets/region.json')
                      .map((res: any) => res.json() );
    }
    public getProvince(): Observable<any> {

      return this.http.get('/assets/province.json')
                      .map((res: any) => res.json() );
    }
    public getCommune(): Observable<any> {

      return this.http.get('/assets/commune.json')
                      .map((res: any) => res.json() );
    }
    
    createUser() {
        const user = this.user;
        this.userService.createUser(user).subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
      }

    ngOnInit() {
      this.getRegion().subscribe(data => this.region = data, error => console.log(error));

      this.getProvince().subscribe(data => this.province = data, error => console.log(error));
      this.getCommune().subscribe(data => this.commune = data, error => console.log(error));
    }

}


