import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
declare const L:any;
import * as _ from 'lodash';
import 'leaflet';
import 'leaflet-sidebar-v2';
import 'leaflet.pm';
import { TreeviewItem } from 'ngx-treeview';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {StrateService} from '../../services/strate.service';
import { BASE_URL } from '../../config/globals';

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'main',
  templateUrl: './main.html',
})
export class MainComponent implements OnInit {
    items: TreeviewItem[];
    lmap: any;

  constructor(private http: Http, stratese: StrateService) {
  }
  config : object = {
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: true,
    maxHeight: 1500
 };
    elements = [];
  onSelectedChange(arr){
      if(this.elements.length === 0 ){
          this.elements = arr;
      }
        let missing = _.difference(this.elements, arr);
        if(missing.length === 0 ) {
          missing = _.difference(arr,this.elements)
            missing.forEach(m => {
                this.elements.splice(this.elements.indexOf(m),1)
            })
        }else {
            missing.forEach(m => {
                this.elements.push(m)
            })
        }

  }
  checkboxChange(e){
    if(e.target.checked){
         this.getJSON(e.target.value, 5460).subscribe(data => {
             this.createLayer(data, e.target.value);
            }
             , error => console.log(error));
    } else {
        this.removelayer(e.target.value)
    }
  }
  // tslint:disable-next-line:member-ordering
  layers : any= {};
  styles = {
    10:{"color": "red"},
    20:{"color": "blue"},
    30:{"color": "green"},
    40:{"color": "yellow"},
    50:{"color": "black"},
    60:{"color": "olive"},
    70:{"color": "orange"},
    80:{"color": "aqua"},
    90:{"color": "white"},
    100:{"color": "purple"},


  }
  createLayer(data,el) {
    let layers = []
    data.forEach( element => {
        let feature = { type: 'Feature',
        properties: {
        'code_strat': element.code_strate,
        'Nom_Strat': element.nom_strat,
        'id_commune': element.id_commune,
        'id_province': element.id_province,
        'id_region': element.id_region},
        'geometry': element.wkb_geometry
        };
        layers.push(feature);
    });
    console.log(layers);
    this.layers[el] = L.geoJSON(layers, {style: this.styles[el]}).addTo(this.lmap);
    this.lmap.fitBounds(this.layers[el].getBounds());
}
  removelayer (element) {
      this.layers[element].clearLayers()
  }
  onFilterChange(event){
      console.log(event)
  }
  public getJSON(strate, commune): Observable<any> {
    console.log(strate, commune);
    return this.http.get(BASE_URL + '/strate/commune?commune=' + commune + '&strate=' + strate)
                    .map((res: any) => res.json() );

  }

  getBooks(): TreeviewItem[] {
    const strate = new TreeviewItem({
        text: 'Strates', value: 1, checked: false, children: [
            { text: 'Strate 10', value: 10,checked: false },
            { text: 'Strate 20', value: 20,checked: false },
            { text: 'Strate 30', value: 30,checked: false },
            { text: 'Strate 40', value: 40,checked: false },
            { text: 'Strate 50', value: 50,checked: false },
            { text: 'Strate 60', value: 60,checked: false },
            { text: 'Strate 70', value: 70,checked: false },
            { text: 'Strate 80', value: 80,checked: false },
            { text: 'Strate 90', value: 90,checked: false },
            { text: 'Strate 100', value: 100,checked: false }
        ]
    });
    const reference = new TreeviewItem({
        text: 'Couches de reférence', value: 2,checked: false, children: [
            { text: 'RNA', value: 21,checked: false },
            { text: 'Occupation du sol', value: 22,checked: false },

        ]
    });
    const support = new TreeviewItem({
        text: 'Couches de support', value: 3,checked: false, children: [
            { text: 'données ONSA', value: 31,checked: false },
            { text: 'ANCFCC', value: 32,checked: false },

        ]
    });
    return [strate, reference, support];
    }

  ngOnInit() {
    this.items = this.getBooks();

      this.lmap = new L.Map('map2').setView([0,0],3)
      L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3'],
    }).addTo(this.lmap);
    const sidebar = L.control.sidebar({
        autopan: true,       // whether to maintain the centered map point when opening the sidebar
        closeButton: true,    // whether t add a close button to the panes
        container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
        position: 'left',     // left or right
    }).addTo(this.lmap);
    console.log(this.lmap)
    this.lmap.pm.addControls();

  // To add the marker to the map, call setMap();

  }

}