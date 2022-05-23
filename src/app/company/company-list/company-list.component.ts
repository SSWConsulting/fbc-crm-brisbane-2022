import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies: Company[];

  constructor() {
  }

  ngOnInit(): void {
    this.companies = this.getCompanies();
  }

  getCompanies(): Company[] {
    return [
      { name: 'Jean Company', email: 'jean@acme.com', phone: 111 },
      { name: 'Luke Company', email: 'luke@acme.com', phone: 222 },
      { name: 'Matt Company', email: 'matt@acme.com', phone: 333 },
    ];
  }

}
