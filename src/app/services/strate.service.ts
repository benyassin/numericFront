import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { BASE_URL } from '../config/globals';
import { AuthorizationService } from './authorization.service';
@Injectable()

export class StrateService {
    constructor (
        private httpClient: HttpClient,
    ) {
    }


    listByCommune(id): Observable<any> {
        return this.httpClient.get(BASE_URL + '/strate/commune?commune=' + id);
    }
}
