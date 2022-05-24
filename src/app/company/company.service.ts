import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, finalize, delay } from 'rxjs/operators';

import { Company } from './company';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  API_BASE = environment.API_BASE;

  companies$ = new BehaviorSubject<Company[]>([]);

  constructor(
    private httpClient: HttpClient,
  ) {
    this.loadCompanies();
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`).pipe(
      catchError((e) => this.errorHandler<Company>(e)),
    );
  }

  deleteCompany(companyId: number): void {
    this.httpClient
      .delete<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(
        catchError((e) => this.errorHandler<Company>(e)),
      ).subscribe(company => this.loadCompanies());
  }

  addCompany(company: Company): void {
    this.httpClient
      .post<Company>(`${this.API_BASE}/company/`, company, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }).pipe(
        delay(5000),
        catchError(e => this.errorHandler<Company>(e))
      ).subscribe(company => this.loadCompanies());
  }

  updateCompany(company: Company): void {
    this.httpClient
      .put<Company>(`${this.API_BASE}/company/${company.id}`, company, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }).pipe(
        catchError(e => this.errorHandler<Company>(e))
      ).subscribe(company => this.loadCompanies());
  }

  private loadCompanies(): void {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`).pipe(
      catchError((e) => this.errorHandler<Company[]>(e)),
    ).subscribe(companies => this.companies$.next(companies));
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.error('Error in CompanyService!');
    return new Observable<T>();
  }
}
