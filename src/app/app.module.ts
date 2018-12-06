// Core Module
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title }    from '@angular/platform-browser';
import { AppRoutingModule }        from './app-routing.module';
import { NgbModule }               from '@ng-bootstrap/ng-bootstrap';
import { NgModule }                from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule, MatTableModule }    from '@angular/material';
import * as global from './config/globals';

// Main Component
import { AppComponent }          from './app.component';
import { HeaderComponent }       from './components/header/header.component';
import { SidebarComponent }      from './components/sidebar/sidebar.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { TopMenuComponent }      from './components/top-menu/top-menu.component';
import { FooterComponent }       from './components/footer/footer.component';
import { PanelComponent }        from './components/panel/panel.component';

// Component Module
import { NvD3Module }           from 'ng2-nvd3';
import { AgmCoreModule }        from '@agm/core';
import { CalendarModule }       from 'angular-calendar';
import { FullCalendarModule }   from 'ng-fullcalendar';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgxChartsModule }      from '@swimlane/ngx-charts';
import { NgxDatatableModule }   from '@swimlane/ngx-datatable';
import { TrendModule }          from 'ngx-trend';
import { HighlightJsModule }    from 'ngx-highlight-js'
import { CountdownModule }      from 'ngx-countdown';
import { ChartsModule }         from 'ng4-charts/ng4-charts';
import { TagsInputModule }      from 'ngx-tags-input/dist';
import { Ng2TableModule }       from 'ngx-datatable/ng2-table';

// Pages
import { DashboardV1Page }          from './pages/dashboard/v1/dashboard-v1';
import { DashboardV2Page }          from './pages/dashboard/v2/dashboard-v2';
import { EmailInboxPage }           from './pages/email/inbox/email-inbox';
import { EmailComposePage }         from './pages/email/compose/email-compose';
import { EmailDetailPage }          from './pages/email/detail/email-detail';

// Widgets
import { WidgetPage }             from './pages/widget/widget';

// Page Options
import { PageBlank }                from './pages/page-options/page-blank/page-blank';
import { PageFooter }               from './pages/page-options/page-with-footer/page-with-footer';
import { PageWithoutSidebar }       from './pages/page-options/page-without-sidebar/page-without-sidebar';
import { PageSidebarRight }         from './pages/page-options/page-with-right-sidebar/page-with-right-sidebar';
import { PageSidebarMinified }      from './pages/page-options/page-with-minified-sidebar/page-with-minified-sidebar';
import { PageFullHeight }           from './pages/page-options/page-full-height/page-full-height';
import { PageTwoSidebar }           from './pages/page-options/page-with-two-sidebar/page-with-two-sidebar';
import { PageSidebarWide }          from './pages/page-options/page-with-wide-sidebar/page-with-wide-sidebar';
import { PageSidebarLight }         from './pages/page-options/page-with-light-sidebar/page-with-light-sidebar';
import { PageSidebarTransparent }   from './pages/page-options/page-with-transparent-sidebar/page-with-transparent-sidebar';
import { PageTopMenu }              from './pages/page-options/page-with-top-menu/page-with-top-menu';
import { PageMixedMenu }            from './pages/page-options/page-with-mixed-menu/page-with-mixed-menu';
import { PageMegaMenu }            from './pages/page-options/page-with-mega-menu/page-with-mega-menu';
import { PageBoxedLayout }          from './pages/page-options/page-with-boxed-layout/page-with-boxed-layout';
import { BoxedLayoutMixedMenu }     from './pages/page-options/boxed-layout-with-mixed-menu/boxed-layout-with-mixed-menu';

// UI Element
import { UIGeneralPage }            from './pages/ui-elements/general/general';
import { UITypographyPage }         from './pages/ui-elements/typography/typography';
import { UITabsAccordionsPage }     from './pages/ui-elements/tabs-accordions/tabs-accordions';
import { UIModalNotificationPage }  from './pages/ui-elements/modal-notification/modal-notification';
import { UIWidgetBoxesPage }        from './pages/ui-elements/widget-boxes/widget-boxes';
import { UIMediaObjectPage }        from './pages/ui-elements/media-object/media-object';
import { UIButtonsPage }            from './pages/ui-elements/buttons/buttons';
import { UIIconsPage }              from './pages/ui-elements/icons/icons';
import { UISimpleLineIconsPage }    from './pages/ui-elements/simple-line-icons/simple-line-icons';
import { UIIoniconsPage }           from './pages/ui-elements/ionicons/ionicons';
import { UILanguageIconPage }       from './pages/ui-elements/language-icon/language-icon';
import { UISocialButtonsPage }      from './pages/ui-elements/social-buttons/social-buttons';

// Bootstrap 4
import { Bootstrap4Page }             from './pages/bootstrap-4/bootstrap-4';

// Calendar
import { CalendarPage }             from './pages/calendar/calendar';

// Map
import { MapPage }                  from './pages/map/map';

// Gallery
import { GalleryV1Page }            from './pages/gallery/gallery-v1/gallery-v1';
import { GalleryV2Page }            from './pages/gallery/gallery-v2/gallery-v2';

// Extra Pages
import { ExtraTimelinePage }        from './pages/extra/extra-timeline/extra-timeline';
import { ExtraComingSoonPage }      from './pages/extra/extra-coming-soon/extra-coming-soon';
import { ExtraSearchResultsPage }   from './pages/extra/extra-search-results/extra-search-results';
import { ExtraInvoicePage }         from './pages/extra/extra-invoice/extra-invoice';
import { ExtraErrorPage }           from './pages/extra/extra-error/extra-error';
import { ExtraProfilePage }         from './pages/extra/extra-profile/extra-profile';

// User Login / Register
// import { LoginV1Page }              from './pages/login/login-v1/login-v1';
// import { LoginV2Page }              from './pages/login/login-v2/login-v2';
// import { LoginV3Page }              from './pages/login/login-v3/login-v3';
// import { RegisterV3Page }           from './pages/register/register-v3/register-v3';

// Helper
import { HelperCssPage }            from './pages/helper/helper-css/helper-css';

// Chart
import { ChartNgxPage }             from './pages/chart/chart-ngx/chart-ngx';
import { ChartD3Page }              from './pages/chart/chart-d3/chart-d3';

// Table
import { TableBasicPage }           from './pages/tables/table-basic/table-basic';
import { TableDataPage }           from './pages/tables/table-data/table-data';

// Form
import { FormStuffPage }            from './pages/form-stuff/form-stuff';

import { EventService } from './pages/calendar/event.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { JWT_OPTIONS, JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { RefreshTokenInterceptor } from  './interceptors/refresh-token.interceptor';
import { AuthorizationService } from './services/authorization.service';
import { MainComponent } from './pages/main/main';
import { HttpModule } from '@angular/http';
import { LoginPage } from './pages/login/login';
import { UsersComponent } from './pages/users/users';
import { UserService } from './services/user.service';
import { StrateService } from './services/strate.service';
import { ChoixDecoupageComponent } from './choix-decoupage/choix-decoupage.component';
import { VisiteurComponent } from './pages/visiteur/visiteur';

import { ToastrModule } from 'ng6-toastr-notifications';
import { DownloadComponent } from './pages/download/download.component';
import { ReferenceComponent } from './pages/reference/reference.component';

import { FileSelectDirective } from 'ng2-file-upload';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarRightComponent,
    TopMenuComponent,
    FooterComponent,
    PanelComponent,
    UsersComponent,
    DashboardV1Page,
    DashboardV2Page,

    EmailInboxPage,
    EmailComposePage,
    EmailDetailPage,

    WidgetPage,

    PageBlank,
    PageFooter,
    PageWithoutSidebar,
    PageSidebarRight,
    PageSidebarMinified,
    PageFullHeight,
    PageTwoSidebar,
    PageSidebarWide,
    PageSidebarLight,
    PageSidebarTransparent,
    PageTopMenu,
    PageMixedMenu,
    PageBoxedLayout,
    PageMegaMenu,
    BoxedLayoutMixedMenu,

    UIGeneralPage,
    UITypographyPage,
    UITabsAccordionsPage,
    UIModalNotificationPage,
    UIWidgetBoxesPage,
    UIMediaObjectPage,
    UIButtonsPage,
    UIIconsPage,
    UISimpleLineIconsPage,
    UIIoniconsPage,
    UILanguageIconPage,
    UISocialButtonsPage,

    Bootstrap4Page,

    CalendarPage,

    FormStuffPage,

    MapPage,

    GalleryV1Page,
    GalleryV2Page,

    ExtraTimelinePage,
    ExtraComingSoonPage,
    ExtraSearchResultsPage,
    ExtraInvoicePage,
    ExtraErrorPage,
    ExtraProfilePage,
    LoginPage,
    // LoginV1Page,
    // LoginV2Page,
    // LoginV3Page,
    // RegisterV3Page,

    HelperCssPage,

    ChartNgxPage,
    ChartD3Page,

    TableBasicPage,
    TableDataPage,
    MainComponent,
    ChoixDecoupageComponent,
    VisiteurComponent,
    DownloadComponent,
    ReferenceComponent,
    FileSelectDirective
  ],
  imports: [
    HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyC5gJ5x8Yw7qP_DqvNq3IdZi2WUSiDjskk' }),
    BrowserAnimationsModule,
    BrowserModule,
    CalendarModule.forRoot(),
    CountdownModule,
    ChartsModule,
    FullCalendarModule,
    FormsModule,
    HighlightJsModule,
    NgbModule.forRoot(),
    NgxChartsModule,
    NvD3Module,
    ReactiveFormsModule,
    SlimLoadingBarModule.forRoot(),
    TrendModule,
    TagsInputModule.forRoot(),
    NgxDatatableModule,
    MatSortModule,
    MatTableModule,
    Ng2TableModule,
    HttpClientModule,
    NgHttpLoaderModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8001'],
        blacklistedRoutes: ['localhost:8001/auth/']
      }
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    Title,
    EventService,
    AuthorizationService,
    UserService,
    StrateService,
    JwtInterceptor, // Providing JwtInterceptor allow to inject JwtInterceptor manually into RefreshTokenInterceptor
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    }
   ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const title = 'Numérisation | ' + this.route.snapshot.firstChild.data['title'];
        this.titleService.setTitle(title);
      }
    });
  }
}
