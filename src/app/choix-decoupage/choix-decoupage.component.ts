import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { BASE_URL } from '../config/globals';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-choix-decoupage',
  templateUrl: './choix-decoupage.component.html',
  styleUrls: ['./choix-decoupage.component.css']
})
export class ChoixDecoupageComponent implements OnInit {

  @Output() zone = new EventEmitter();
  @Output() closeMod = new EventEmitter();
  @Input() decoupageH: any = {region:"null", province:"null", commune:"null"};

  decoupage: any = {
    region: "null",
    province: "null",
    commune: "null"
  };

  region: any = [];
  province: any = [];
  commune: any = [];

  regionDisabled: any = null;

  constructor(private userService: UserService, private http: Http, private Authorzation: AuthorizationService) {
   }

  ngOnInit() {
    let userData = this.Authorzation.getUserDetails();
    console.log(userData.role);
    console.log(this.decoupageH);

    if (userData.role == "regional") {
      this.getRegionById(userData.region.toString()).subscribe(data => {
        this.region = data;
        // this.regionDisabled = true;
        this.onRegionChange(userData.region.toString());
        this.onProvinceChange(this.decoupageH.province);
        this.decoupage.region = this.decoupageH.region == "null" ? userData.region.toString() : this.decoupageH.region;
        this.decoupage.province = this.decoupageH.province == "null" ? "null" : this.decoupageH.province;
        this.decoupage.commune = this.decoupageH.commune == "null" ? "null" : this.decoupageH.commune;
        
      }, error => {
        console.log(error);
      });

    } else {
      this.getRegion().subscribe(data => {
        this.region = data; console.log(this.region);
        // this.onRegionChange(this.decoupageH.region);
        // this.onProvinceChange(this.decoupageH.province);
        // this.decoupage.region = this.decoupageH.region == "null" ? "null" : this.decoupageH.region;
        // this.decoupage.province = this.decoupageH.province == "null" ? "null" : this.decoupageH.province;
        // this.decoupage.commune = this.decoupageH.commune == "null" ? "null" : this.decoupageH.commune;
      }, error => console.log(error));
    }

    console.log(this.decoupageH);
    
  }

 
  // Regions Functions :
  public getRegion(): Observable<any> {
    return this.http.get(BASE_URL + '/regions')
      .map((res: any) => res.json());
  }

  public getRegionById(id): Observable<any> {
    console.log(id);
    return this.http.get(BASE_URL+"/regions/"+id)
    .map((res:any) => res.json());
  }

  public onRegionChange(region) {
    console.log(region);
    if (region == "null") {
      this.province = [];
      this.commune = [];
      this.decoupage.province = "null";
      this.decoupage.commune = "null";
      return;
    }
    this.getProvinceByRegion(region).subscribe(data => {
      console.log("data getProvinceByRegion");
      console.log(data);
      this.province = data;
    }, error => console.log(error));
  }

  // Provinces Functions :
  public getProvince(): Observable<any> {
    return this.http.get(BASE_URL + '/provinces')
      .map((res: any) => res.json());
  }

  public getProvinceByRegion(region): Observable<any> {
    return this.http.get(BASE_URL + '/provinces/' + region)
      .map((res: any) => res.json());
  }

  public onProvinceChange(province) {
    console.log(province);
    if(province=="null") {
      this.commune = [];
      this.decoupage.commune = "null";
      return;
    }
    this.getCommuneByProvince(province).subscribe(data => {
      console.log("data getCommuneByProvince");
      console.log(data);
      this.commune = data;
    }, error => console.log(error));
  }

  // Communes Functions :
  public getCommune(): Observable<any> {
    return this.http.get(BASE_URL + '/communes')
      .map((res: any) => res.json());
  }

  public getCommuneByProvince(province): Observable<any> {
    return this.http.get(BASE_URL + '/communes/' + province)
      .map((res: any) => res.json());
  }

  public closeModal(){
    this.closeMod.emit();
  }

  // Decoupage Functions :
  choixDecoupage() {

      const decoupage = this.decoupage;
      console.info(decoupage);
      if (decoupage.region!="null"){
          if (decoupage.province != "null") {
              if (decoupage.commune != "null") {
                this.zone.emit({ name: "commune", id: decoupage.commune, region: decoupage.region, province: decoupage.province, commune: decoupage.commune});
                console.log({ name: "commune", id: decoupage.commune, region: decoupage.region, province: decoupage.province, commune: decoupage.commune });
              }else{
                this.zone.emit({ name: "province", id: decoupage.province, region: decoupage.region, province: decoupage.province, commune: decoupage.commune });
                console.log({ name: "province", id: decoupage.province, region: decoupage.region, province: decoupage.province, commune: decoupage.commune });
              }
          }else{
            this.zone.emit({ name: "region", id: decoupage.region, region: decoupage.region, province: decoupage.province, commune: decoupage.commune });
            console.log({ name: "region", id: decoupage.region, region: decoupage.region, province: decoupage.province, commune: decoupage.commune });
          }
      }else{
        // Show a Toast that it's important to select at least a region ;)
      }
      

  }

 

}
