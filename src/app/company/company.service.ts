import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  getCompanies(): Company[] {
    return [
      { name: 'Jean Company', email: 'jean@acme.com', phone: 111 },
      { name: 'Luke Company', email: 'luke@acme.com', phone: 222 },
      { name: 'Matt Company', email: 'matt@acme.com', phone: 333 },
    ];
  }
}
