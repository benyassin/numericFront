import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import pageSettings from '../../config/page-settings';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthorizationService } from '../../services/authorization.service';

import { ToastrManager } from 'ng6-toastr-notifications';
import { Spinkit, SpinnerVisibilityService } from 'ng-http-loader';

import * as _ from 'lodash';
import 'leaflet';
import 'leaflet-sidebar-v2';
import 'leaflet.pm';
import { TreeviewItem } from 'ngx-treeview';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { StrateService } from '../../services/strate.service';
import { BASE_URL } from '../../config/globals';
import { ActivatedRoute } from '@angular/router';


declare const L: any;
import * as $ from 'jquery';

@Component({
  selector: 'visiteur',
  templateUrl: './visiteur.html',
  styleUrls: ['./visiteur.css']
})
export class VisiteurComponent implements OnInit {
  public spinkit = Spinkit; 
  pageSettings = pageSettings;

  items: TreeviewItem[];
  lmap: any;
  config: object = {
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: true,
    maxHeight: 1500
  };

  elements = [];
  layers: any = {};
  styles = {
    10: { "color": "red" },
    20: { "color": "blue" },
    30: { "color": "green" },
    40: { "color": "yellow" },
    50: { "color": "Lime" },
    60: { "color": "olive" },
    70: { "color": "orange" },
    80: { "color": "aqua" },
    90: { "color": "brown" },
    100: { "color": "purple" },
  };

  decoupageHistory:any;
  region = null;
  province = null;
  commune = null;

  zone:any = {};
  decoupageLayer: any;
  decoupageHidden: any=false;
  checkDecoupage: any=false;
  checkStrate: any=false;
  sidebar: any;
  closeResult: string;
  checkStrate10:any;
  checkStrate20:any;
  checkStrate30:any;
  checkStrate40:any;
  checkStrate50:any;
  checkStrate60:any;
  checkStrate70:any;
  checkStrate80:any;
  checkStrate90:any;
  checkStrate100:any;

  @ViewChild('content') contentEle: ElementRef;
  @ViewChild('download') contentDownload: ElementRef;

  constructor(private http: Http, stratese: StrateService, private modalService: NgbModal, private route: ActivatedRoute, public toastr: ToastrManager,
    private Authorzation: AuthorizationService, private spinner: SpinnerVisibilityService) {
    //   this.pageSettings.pageEmpty = false;
    //   this.pageSettings.pageSidebarTwo = true;
    //   this.pageSettings.pageTopMenu = true;
    this.pageSettings.pageWithFooter = true;
    // spinner.show();
    // spinner.hide();
      // this.checkStrate10 = true;
      // this.checkStrate100 = false;
  }

  ngOnInit() {

    let userData = this.Authorzation.getUserDetails();
    switch (userData.role) {
      case "national": {
        this.zone = {name: "null", id: "null"};
        this.decoupageHidden = true;
        this.checkDecoupage = false;
        this.decoupageHistory = { region: "null", province: "null", commune: "null" };
        setTimeout(() => { this.openModal(this.contentEle); }, 100);
        break;
      }
      case "regional": {
        this.zone = { name: "region", id: userData.region.toString()};
        this.region = userData.region.toString();
        this.decoupageLayer = this.capitalize("region");     
        this.decoupageHidden = false;
        this.decoupageHistory = { region: userData.region.toString(), province: "null", commune: "null"};
        
        this.spinner.show();
        this.getJSONDecoupage(this.zone.name, this.zone.id).subscribe(data => {
          this.createDecouapgeLayer(data);
          this.checkDecoupage = true;
          this.spinner.hide();
        }, error => {
          console.log(error);
          this.spinner.hide();
        });

        setTimeout(() => { this.openModal(this.contentEle); }, 1000);
        console.log(this.decoupageHistory);
        break;
      }
    
      default: {
        console.log("Invalid choice");
        break;
      }
    }

    this.items = this.getStratesList();

    this.lmap = new L.Map('map2').setView([0, 0], 3)
    L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(this.lmap);

    this.sidebar = L.control.sidebar({
      autopan: true,       // whether to maintain the centered map point when opening the sidebar
      closeButton: true,    // whether t add a close button to the panes
      container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
      position: 'right',     // left or right
    }).addTo(this.lmap);
    // this.lmap.pm.addControls();
  }

  openModal(content) {
    this.sidebar.close();
    console.log(this.decoupageHistory);
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title', backdrop:false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openDownLoad(modal) {
    console.log("gggggggggggggggggggggggggggggggggggggggggggggg");
    this.sidebar.close();
    console.log(this.decoupageHistory);
    this.modalService.open(modal, { centered: true, ariaLabelledBy: 'modal-basic-title', backdrop:false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  decoup:any;
  
  choosenZone(zone){
    this.checkDecoupage = false;
    // this.checkStrate = false;
    console.log(zone);
    this.zone.name = zone.name;
    this.zone.id = zone.id;
    console.log(this.zone);
    this.decoupageHistory = {region: zone.region, province : zone.province, commune: zone.commune};
    console.log("zzzzzzzzzzzzzzzz");
    console.log(this.decoupageHistory);
    if(this.zone.name=="" || this.zone.name== undefined ){
      this.decoupageHidden = true;
      return;
    }
    this.decoup = false;
    this.decoupageHidden = false;
    this.decoupageLayer = this.capitalize(this.zone.name);
    
    // Clear all the layers from the Map :
    this.uncheckAllStrate();
    for (let key in this.layers) {
      this.layers[key].clearLayers();
    }

  }

  uncheckAllStrate(){
    console.log(this.checkStrate60);
    this.checkStrate10 = false;
    this.checkStrate20 = false;
    this.checkStrate30 = false;
    this.checkStrate40 = false;
    this.checkStrate50 = false;
    this.checkStrate60 = false;
    this.checkStrate70 = false;
    this.checkStrate80 = false;
    this.checkStrate90 = false;
    this.checkStrate100 = false;
  }

  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSelectedChange(arr) {
    if (this.elements.length === 0) {
      this.elements = arr;
    }
    let missing = _.difference(this.elements, arr);
    if (missing.length === 0) {
      missing = _.difference(arr, this.elements)
      missing.forEach(m => {
        this.elements.splice(this.elements.indexOf(m), 1)
      })
    } else {
      missing.forEach(m => {
        this.elements.push(m)
      })
    }

  }

  // Functions of decoupage : 
  checkboxChangeDecoupage(e) {
    if (this.zone.name =="null"){
      // Show a Toast : "Veuillez séléctionner au moins une région ..."
      return;
    }
    if (e.target.checked) {
      this.spinner.show();
      this.getJSONDecoupage(this.zone.name, this.zone.id).subscribe(data => {
        this.createDecouapgeLayer(data);
        this.spinner.hide(); 
      }, error => {
        console.log(error);
        this.spinner.hide(); 
      });
    } else {
      this.removelayer("decoupage");
      this.spinner.hide(); 
    }
  }

  public getJSONDecoupage(zone, id): Observable<any> {
    console.log(zone, id);
    return this.http.get(BASE_URL + '/' + zone +'/'+ zone+'/'+ id)
      .map((res: any) => res.json());
  }

  createDecouapgeLayer(data) {
    let layers = []
    data.forEach(element => {
      let feature = { type: 'Feature', properties: { 'nom': element.nom }, 'geometry': element.geometry };
      layers.push(feature);
    });

    this.layers["decoupage"] = L.geoJSON(layers, { style: { "color": "black" } }).addTo(this.lmap);
    this.layers["decoupage"].eachLayer(function (layer) {
      layer.bindTooltip(layer.feature.properties.nom).openTooltip();;
    });
    if (layers.length == 0) {
      this.showToast("warning", "decoupage", "Données non trouvées");
      return;
    }
    this.lmap.fitBounds(this.layers["decoupage"].getBounds());
  }


  

    // Functions of strates : 
  checkboxChange(e) {
    
    if (this.zone.name == "null"){
      this.showToast("error", "Attention", "Veuillez séléctionner une zone à afficher");
      return;
    }

    if (e.target.checked) {
      this.spinner.show();
      this.getJSON(e.target.value, this.zone.name, this.zone.id).subscribe(data => {
        this.createLayer(data, e.target.value);
        this.spinner.hide(); 
      }, error => {
        console.log(error);
        this.spinner.hide(); 
      });
    } else {
      this.removelayer(e.target.value);
      this.spinner.hide(); 
    }

  }
  
  public getJSON(strate, zone, id): Observable<any> {
    console.log(strate, id);
    return this.http.get(BASE_URL + '/strate/' + zone+'?' + zone+'=' + id + '&strate=' + strate)
      .map((res: any) => res.json());

  }

  createLayer(data, el) {
    let layers = []
    data.forEach(element => {
      let feature = {
        type: 'Feature',
        properties: {
          'code_strat': element.code_strat,
          'Nom_Strat': element.nom_strat,
          'id_commune': element.id_commune,
          'id_province': element.id_province,
          'id_region': element.id_region
        },
        'geometry': element.geometry
      };
      layers.push(feature);
    });
    console.log(layers);

    this.layers[el] = L.geoJSON(layers, { style: this.styles[el] }).addTo(this.lmap);
    if (layers.length ==0){
      this.showToast("warning", "Strate " + el,"Données non trouvées");
      return;
    } 
    this.lmap.fitBounds(this.layers[el].getBounds());
  }

  removelayer(element) {
    this.layers[element].clearLayers();
  }

 
  getStratesList(): TreeviewItem[] {
    const strate = new TreeviewItem({
      text: 'Strates', value: 1, checked: false, children: [
        { text: 'Strate 10', value: 10, checked: false },
        { text: 'Strate 20', value: 20, checked: false },
        { text: 'Strate 30', value: 30, checked: false },
        { text: 'Strate 40', value: 40, checked: false },
        { text: 'Strate 50', value: 50, checked: false },
        { text: 'Strate 60', value: 60, checked: false },
        { text: 'Strate 70', value: 70, checked: false },
        { text: 'Strate 80', value: 80, checked: false },
        { text: 'Strate 90', value: 90, checked: false },
        { text: 'Strate 100', value: 100, checked: false }
      ]
    });
    const reference = new TreeviewItem({
      text: 'Couches de reférence', value: 2, checked: false, children: [
        { text: 'RNA', value: 21, checked: false },
        { text: 'Occupation du sol', value: 22, checked: false },

      ]
    });
    const support = new TreeviewItem({
      text: 'Couches de support', value: 3, checked: false, children: [
        { text: 'données ONSA', value: 31, checked: false },
        { text: 'ANCFCC', value: 32, checked: false },

      ]
    });
    return [strate, reference, support];
  }

  showToast(type, title, msg) {
    if (type == "success") this.toastr.successToastr(msg, title, { position: "top-center", animate: "slideFromBottom", showCloseButton: true, newestOnTop: true, toastTimeout: 2000 });
    if (type == "error") this.toastr.errorToastr(msg, title, { position: "top-center", animate: "slideFromBottom", showCloseButton: true, newestOnTop: true, toastTimeout: 2000 });
    if (type == "warning") this.toastr.warningToastr(msg, title, { position: "top-center", animate: "slideFromBottom", showCloseButton: true, newestOnTop: true, toastTimeout: 2000 });
    if (type == "info") this.toastr.infoToastr(msg, title, { position: "top-center", animate: "slideFromBottom", showCloseButton: true, newestOnTop: true, toastTimeout: 2000 });
    
  }

  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


}
