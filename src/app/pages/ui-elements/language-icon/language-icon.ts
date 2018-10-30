import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import pageSettings from '../../../config/page-settings';

@Component({
    selector: 'ui-language-icon',
    templateUrl: './language-icon.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [ '../../../../../node_modules/flag-icon-css/css/flag-icon.min.css' ]
})

export class UILanguageIconPage implements OnDestroy {
  pageSettings = pageSettings;

  constructor() {
    this.pageSettings.pageLanguageBar = true;
  }

  ngOnDestroy() {
    this.pageSettings.pageLanguageBar = false;
  }
}
