import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

import { Company } from './company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`).pipe(
      tap((companies) => {
        //console.log('logging from service ', companies);
      }),
      catchError((e) => this.errorHandler<Company[]>(e)),
      finalize(() => {
        //console.log('finalized the stream');
      })
    );
  }

  deleteCompany(companyId): Observable<Company> {
    //console.log('service.deleteCompany fired. CompanyId=', companyId);
    return this.httpClient
      .delete<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(catchError((e) => this.errorHandler<Company>(e)));
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.error('Error in CompanyService!');
    return new Observable<T>();
  }
}
