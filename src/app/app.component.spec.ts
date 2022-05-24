import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Company } from './company/company';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyTableComponent } from './company/company-table/company-table.component';
import { CompanyService } from './company/company.service';
import { TextComponent } from './controls/text/text.component';

describe(`Component: App Component`, () => {

  let companyService: CompanyService;

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CompanyListComponent,
        CompanyTableComponent,
        CompanyEditComponent,
        TextComponent
      ],
      imports: [
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/'}]
    })

    fixture = TestBed.createComponent(AppComponent);
    de = fixture.debugElement;
    component = fixture.componentInstance;
    companyService = TestBed.inject(CompanyService);
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

    fixture.detectChanges();

    let countElement = de.query(By.css('#company-count')).nativeElement;

    expect(countElement.textContent).toEqual('2');
  });
});
