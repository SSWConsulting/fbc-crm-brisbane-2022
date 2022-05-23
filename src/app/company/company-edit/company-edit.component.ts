import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  companyId: number | null;
  isNewCompany = false;


  formGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    phone: [''],
  });

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = !this.companyId;
    if (!this.isNewCompany) {
      this.companyService.getCompany(this.companyId)
        .subscribe(c => {
          this.formGroup.patchValue(c);
        })
    }
  }

  saveCompany(): void {
    const {valid, value} = this.formGroup;
    if (valid) {
      if (this.isNewCompany) {
        this.companyService
          .addCompany(<Company>value)
          .subscribe(c => {
            console.log('Company created', c);
            this.router.navigate(['/company/list']);
          });
      } else {
        const company = <Company>{
          ...value,
          id: this.companyId,
        };
        this.companyService
          .updateCompany(company)
          .subscribe(c => {
            console.log('Company created', c);
            this.router.navigate(['/company/list']);
          });
      }
    }
  }

}
