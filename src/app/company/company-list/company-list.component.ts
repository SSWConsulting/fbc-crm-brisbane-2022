import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap, map, Observable, finalize } from 'rxjs';

import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies$: Observable<Company[]>;
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getCompanies();
  }


  deleteCompany(companyId: number) {
    //console.log('component.deleteCompany fired. companyId=', companyId);
    this.companyService.deleteCompany(companyId)
    .subscribe( // Subscribe to the observable so it actually does something.
      () => { this.getCompanies() } // do something (ie refresh our company list)
    );
  }

  getCompanies() {
    this.companies$ = this.companyService.getCompanies();
  }
}
