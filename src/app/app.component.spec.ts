import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { Company } from './company/company';
import { CompanyService } from './company/company.service';

describe(`Component: App Component`, () => {

  let companyService: CompanyService;
  let component: AppComponent;

  beforeEach(() => {
    companyService = <CompanyService>{
      getCompanies: () => {}
    };

    component = new AppComponent(companyService);
  });

  it('add 1+1 - PASS', () => {
    expect(1 + 1).toEqual(2);
  });

  it(`title equals 'Brisbane is awesome'`, () => {
    expect(component.title).toEqual("Brisbane is awesome");
  });

  it('company count = 2', () => {
    spyOn(companyService, 'getCompanies').and.returnValue(of([
      <Company>{ },
      <Company>{ }
    ]));

    component.ngOnInit();
    component.companyCount$.subscribe(count => expect(count).toEqual(2));
  });
});
