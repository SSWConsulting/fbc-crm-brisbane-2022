import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  formGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    phone: [''],
  });

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  saveCompany(): void {
    const {valid, value} = this.formGroup;
    if (valid) {
      this.companyService
        .addCompany(<Company>value)
        .subscribe(c => {
          console.log('Company created', c);
          this.router.navigate(['/company/list']);
        });
    }
  }

}
