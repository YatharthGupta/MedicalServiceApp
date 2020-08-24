import { Component } from '@angular/core';
import { ApiService } from '../app/api.service';
import { HttpResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'MedicalServiceApp';
  services = [];
  providers = [];

  private readonly destroy$ = new Subject();
  constructor(private apiService: ApiService) { }
  public activeElement = 1;

  ngOnInit() {

    this.apiService.getServices().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.services = res.body.data;
    })

    this.apiService.getProviders().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.providers = res.body.data;
    })

  }
  public selectedItem(id) {
    this.activeElement = id;
  }

}
