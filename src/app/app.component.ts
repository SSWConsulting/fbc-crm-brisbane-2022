import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CompanyService } from './company/company.service';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Brisbane is awesome';

  companyCount$: Observable<number> = of(0);

  constructor(
    private companyService: CompanyService,
  ) {}

  ngOnInit(): void {
    this.companyCount$ = this.companyService.getCompanies().pipe(
      map(companies => companies.length),
    );
  }
}

