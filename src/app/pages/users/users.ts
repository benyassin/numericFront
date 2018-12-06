import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { BASE_URL } from '../../config/globals';


@Component({
  selector: 'users',
  templateUrl: './users.html'
})

export class UsersComponent implements OnInit {
  constructor(private userService: UserService, private http: Http) {}
  
  ngOnInit() {
    this.getRegion().subscribe(data => { this.region = data; console.log(this.region); }, error => console.log(error));
    // this.getProvince().subscribe(data => this.province = data, error => console.log(error));
    // this.getCommune().subscribe(data => this.commune = data, error => console.log(error));
  }

  user: any = {
    login: null,
    password: null,
    nom: null,
    prenom: null,
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

  regionDisabled: any = null;
  provinceDisabled: any = null;
  communeDisabled: any = null;


  // Regions Functions :
  public getRegion(): Observable<any> {
    return this.http.get(BASE_URL + '/regions' )
      .map((res: any) => res.json());
  }

  public onRegionChange(region) {
    console.log(region);
    this.commune = [];
    this.getProvinceByRegion(region).subscribe(data => {
      console.log("data getProvinceByRegion");
      console.log(data);
      this.province = data;
    }, error => console.log(error));
  }

  // Provinces Functions :
  public getProvince(): Observable<any> {
    // return this.http.get('/assets/province.json')
    //   .map((res: any) => res.json() );
    return this.http.get(BASE_URL + '/provinces')
      .map((res: any) => res.json());
  }

  public getProvinceByRegion(region): Observable<any> {
    return this.http.get(BASE_URL + '/provinces/'+region)
      .map((res: any) => res.json());
  }
  
  public onProvinceChange(province) {
    console.log(province);
    this.getCommuneByProvince(province).subscribe(data => {
      console.log("data getCommuneByProvince");
      console.log(data);
      this.commune = data;
    }, error => console.log(error));
  }

  // Communes Functions :
  public getCommune(): Observable<any> {
    // return this.http.get('/assets/commune.json')
    //   .map((res: any) => res.json() );
    return this.http.get(BASE_URL + '/communes')
      .map((res: any) => res.json());
  }
  
  public getCommuneByProvince(province): Observable<any> {
    return this.http.get(BASE_URL + '/communes/' + province)
      .map((res: any) => res.json());
  }

  // Users Functions :
  createUser() {
    const user = this.user;
    console.info(user);
    this.userService.createUser(user).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  public onRoleChange(role){
      console.log(role); // national - regional - controleur - agent

      this.user.region = null;
      this.user.province = null;
      this.user.commune = null;

      if (role =="national"){
          this.regionDisabled = true;
          this.provinceDisabled = true;
          this.communeDisabled = true;
          this.region = [];
          this.province = [];
          this.commune = [];
      }
      
      if (role == "regional") {
          this.regionDisabled = null;
          this.provinceDisabled = true;
          this.communeDisabled = true;
          this.getRegion().subscribe(data => { this.region = data; console.log(this.region); }, error => console.log(error));
          this.province = [];
          this.commune = [];
      }

      if (role == "controleur" || role=="agent") {
          this.regionDisabled = null;
          this.provinceDisabled = null;
          this.communeDisabled = null;
          this.getRegion().subscribe(data => { this.region = data; console.log(this.region); }, error => console.log(error));
          this.province = [];
          this.commune = [];
      }
      console.log(this.regionDisabled);
      console.log(this.provinceDisabled);
      console.log(this.communeDisabled);
  }
    

}


