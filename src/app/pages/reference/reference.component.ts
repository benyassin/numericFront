import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { BASE_URL } from '../../config/globals';
import { AuthorizationService } from '../../services/authorization.service';
import { NgbTabset, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';

import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import * as _ from 'underscore';


// import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';

const URL = 'http://localhost:8001/api/upload';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {

  data:any = {
    nom:null,
    file:null
  };

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'file' });

 

  @Output() closeMod = new EventEmitter();

  constructor(private userService: UserService, private http: Http, private Authorzation: AuthorizationService, public toastr: ToastrManager, public config: NgbTabsetConfig) { }

  ngOnInit() {
    let userData = this.Authorzation.getUserDetails();
    console.log(userData.role);

    if (userData.role == "regional" || userData.role=="national") {
      // Afficher Toast : 
    }else{

    }

    this.uploader.onBeforeUploadItem = (item: any) => {
      this.uploader.options.additionalParameter = {
        nom: this.data.nom
      };
    };
    // ---------------------------
    this.uploader.onAfterAddingFile = (file) => { 
      file.withCredentials = false; 
      console.log(file);
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // console.log('FileUpload:uploaded:', item, status, response);
      console.log('FileUpload:uploaded:', response);
      // alert('File uploaded successfully');
    };
  }

  readFile(fileEvent: HTMLInputEvent) {
    const file: File = fileEvent.target.files[0];
    console.log('size', file.size);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      console.log(typeof fileReader.result);
      if(this.validateFile(fileReader.result.toString())) console.log("yeeeeeeeeees");
    }
    fileReader.readAsText(file);
  }

  validateFile(data){
      let donnes = JSON.parse(data).features;
      let features = [];
      if (donnes.length == 0) return;
      let prop = donnes[0].properties;
      var requiredProps = ['code', 'id_commune', 'id_province', 'id_region'];
      var inBoth = _.intersection(_.keys(prop), requiredProps);
      if (inBoth.length === requiredProps.length)   return true;
      return false; 
  }

  televerser(){
    console.log(this.data.nom);

    let formData: FormData = new FormData();
    formData.append('nom', this.data.nom);
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('nom', this.data.nom);
    };

    

    this.uploader.uploadAll();
    // this.closeModal();
  }

  download(){

    // console.log(this.typeToDownLoad);
    // console.log(this.dataToDownload);
    // console.log(this.getDecoupage());

    let URL = BASE_URL + '/download/';

    // if (this.dataToDownload == undefined) {
    //   this.showToast("info", "Téléchargement " + this.typeToDownLoad + " " + this.dataToDownload, "Veuillez sélectionner une couche à télécharger");
    //   return;
    // }
    // if (this.getDecoupage() == null) {
    //   URL += this.typeToDownLoad + '/' + this.dataToDownload
    // }else{
    //   URL += this.getDecoupage().name + '/' + this.getDecoupage().id + '/' + this.typeToDownLoad + '/' + this.dataToDownload;
    // }

    console.log(URL);

    this.http.get(URL)
      .map((res: any) => res.json())
      .subscribe(data => {
          console.log(data);
          if(data.features.length==0) {
            // this.showToast("warning", "Téléchargement " + this.typeToDownLoad + " " + this.dataToDownload, "Données non trouvées");
            return; 
          }
          // FileSaver.saveAs(new Blob([JSON.stringify(data)], { type: "text" }), this.typeToDownLoad + "_" + this.dataToDownload + ".geojson");
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

  showToast(type, title, msg) {
    if (type == "success") this.toastr.successToastr(msg, title, { position: "top-center", animate: "slideFromBottom", showCloseButton: true, newestOnTop: true, toastTimeout: 2000 });
    if (type == "error") this.toastr.errorToastr(msg, title, { position: "top-center", animate: "slideFromBottom", showCloseButton: true, newestOnTop: true, toastTimeout: 2000 });
    if (type == "warning") this.toastr.warningToastr(msg, title, { position: "top-center", animate: "slideFromBottom", showCloseButton: true, newestOnTop: true, toastTimeout: 2000 });
    if (type == "info") this.toastr.infoToastr(msg, title, { position: "top-center", animate: "slideFromBottom", showCloseButton: true, newestOnTop: true, toastTimeout: 2000 });

  }

  public closeModal() {
    this.closeMod.emit();
  }



}
