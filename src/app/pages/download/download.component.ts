import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { BASE_URL } from '../../config/globals';
import { AuthorizationService } from '../../services/authorization.service';

import { NgbTabset, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';

// import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  @Output() zone = new EventEmitter();
  @Output() closeMod = new EventEmitter();

  // @ViewChild('tabset') tab : NgbTabset;
  @ViewChild(NgbTabset) tab : NgbTabset;

  decoupage: any = {
    region: "null",
    province: "null",
    commune: "null"
  };

  region: any = [];
  province: any = [];
  commune: any = [];

  regionDisabled: any = null;

  dataToDownload:any;

  hideStrateShowReference:Boolean=true;
  typeToDownLoad:string="strate";


  model:string = "strate";

  constructor(private userService: UserService, private http: Http, private Authorzation: AuthorizationService, public toastr: ToastrManager, public config: NgbTabsetConfig) {
    // customize default values of tabsets used by this component tree
    config.justify = 'fill';
    config.type = 'pills';
  }

  ngOnInit() {
    let userData = this.Authorzation.getUserDetails();
    console.log(userData.role);

    if (userData.role == "regional") {
      this.getRegionById(userData.region.toString()).subscribe(data => {
        this.region = data;
        this.regionDisabled = true;
        this.decoupage.region = userData.region;
        this.onRegionChange(userData.region.toString());
      }, error => {
        console.log(error);
      });

    } else {
      this.getRegion().subscribe(data => {
        this.region = data; console.log(this.region);
      }, error => console.log(error));
    }

  }

  listRadioChange(e){
    console.log(e);
    console.log(e.target.checked);
    console.log(e.target.value);
    this.dataToDownload = e.target.value;
  }

  changeDataToDownLoad(){ 
    console.log(this.hideStrateShowReference);
    if (this.hideStrateShowReference){
      this.typeToDownLoad = "reference";
    }else{
      this.typeToDownLoad = "strate";
    }
    this.hideStrateShowReference = !this.hideStrateShowReference;
    console.log(this.typeToDownLoad);
  }

  toRight(){
    if (this.hideStrateShowReference){
      this.tab.select("strate");
    }else{
      this.tab.select("reference");
    }
  }

  toLeft(){
    this.tab.select("decoupage");
  }

  download(){

    console.log(this.typeToDownLoad);
    console.log(this.dataToDownload);
    console.log(this.getDecoupage());

    let URL = BASE_URL + '/download/';

    if (this.dataToDownload == undefined) {
      this.showToast("info", "Téléchargement " + this.typeToDownLoad + " " + this.dataToDownload, "Veuillez sélectionner une couche à télécharger");
      return;
    }
    if (this.getDecoupage() == null) {
      URL += this.typeToDownLoad + '/' + this.dataToDownload
    }else{
      URL += this.getDecoupage().name + '/' + this.getDecoupage().id + '/' + this.typeToDownLoad + '/' + this.dataToDownload;
    }

    console.log(URL);

    this.http.get(URL)
      .map((res: any) => res.json())
      .subscribe(data => {
          console.log(data);
          if(data.features.length==0) {
            this.showToast("warning", "Téléchargement " + this.typeToDownLoad + " " + this.dataToDownload, "Données non trouvées");
            return; 
          }
          FileSaver.saveAs(new Blob([JSON.stringify(data)], { type: "text" }), this.typeToDownLoad + "_" + this.dataToDownload + ".geojson");
          this.closeModal();
      }, error => console.log(error));


    // this.http.get(BASE_URL + '/json')
    //   .map((res: any) => res.json())
    //   .subscribe(data => {
    //       console.log(data); 
    //     FileSaver.saveAs(new Blob([JSON.stringify(data)], { type: "text" }), "strate_" + strate+".geojson");
    //   }, error => console.log(error));

  }

  public getDownload(): Observable<any> {
    return this.http.get(BASE_URL + '/json')
      .map((res: any) => res.json());
  }

  getDecoupage() {

    const decoupage = this.decoupage;
    // console.info(decoupage);
    if (decoupage.region != "null") {
      if (decoupage.province != "null") {
        if (decoupage.commune != "null") {
          return { name: "commune", id: decoupage.commune};
        } else {
          return { name: "province", id: decoupage.province };
        }
      } else {
        return { name: "region", id: decoupage.region };
      }
    } else {
      // Show a Toast that it's important to select at least a region ;)
      return null;
    }


  }


  // Regions Functions :
  public getRegion(): Observable<any> {
    return this.http.get(BASE_URL + '/regions')
      .map((res: any) => res.json());
  }
 
  public getRegionById(id): Observable<any> {
    console.log(id);
    return this.http.get(BASE_URL + "/regions/" + id)
      .map((res: any) => res.json());
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
    if (province == "null") {
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

  public closeModal() {
    this.closeMod.emit();
  }

  // Decoupage Functions :
  choixDecoupage() {

    const decoupage = this.decoupage;
    console.info(decoupage);
    if (decoupage.region != "null") {
      if (decoupage.province != "null") {
        if (decoupage.commune != "null") {
          this.zone.emit({ name: "commune", id: decoupage.commune, region: decoupage.region, province: decoupage.province, commune: decoupage.commune });
          console.log({ name: "commune", id: decoupage.commune, region: decoupage.region, province: decoupage.province, commune: decoupage.commune });
        } else {
          this.zone.emit({ name: "province", id: decoupage.province, region: decoupage.region, province: decoupage.province, commune: decoupage.commune });
          console.log({ name: "province", id: decoupage.province, region: decoupage.region, province: decoupage.province, commune: decoupage.commune });
        }
      } else {
        this.zone.emit({ name: "region", id: decoupage.region, region: decoupage.region, province: decoupage.province, commune: decoupage.commune });
        console.log({ name: "region", id: decoupage.region, region: decoupage.region, province: decoupage.province, commune: decoupage.commune });
      }
    } else {
      // Show a Toast that it's important to select at least a region ;)
    }


  }


  showToast(type, title, msg) {
    if (type == "success") this.toastr.successToastr(msg, title, { position: "top-center", animate: "slideFromBottom", showCloseButton: true, newestOnTop: true, toastTimeout: 2000 });
    if (type == "error") this.toastr.errorToastr(msg, title, { position: "top-center", animate: "slideFromBottom", showCloseButton: true, newestOnTop: true, toastTimeout: 2000 });
    if (type == "warning") this.toastr.warningToastr(msg, title, { position: "top-center", animate: "slideFromBottom", showCloseButton: true, newestOnTop: true, toastTimeout: 2000 });
    if (type == "info") this.toastr.infoToastr(msg, title, { position: "top-center", animate: "slideFromBottom", showCloseButton: true, newestOnTop: true, toastTimeout: 2000 });

  }


}
