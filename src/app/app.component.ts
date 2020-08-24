import { Component } from '@angular/core';
import { ApiService } from '../app/api.service';
import { HttpResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Observable, Subject } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MedicalServiceApp';
  //services1 =[];
  services = [];
  providers = [];

  providersfiltered = [];
  private readonly destroy$ = new Subject();
  constructor(private apiService: ApiService) { }
  public activeElement = 1;
  ngOnInit() {

    this.apiService.getServices().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.services = res.body.data;
      //this.services = this.services1.map(data => _.uniqBy(data,'attributes'));

    })

    this.apiService.getProviders().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.providers = res.body.data;
    })
   
    //this.providersfiltered = this.providers.filter(element => element.attribute.subspecialties = this.activeElement);
    
  }
  public selectedItem(id) {
    this.activeElement = id;
  }



  // this.apiService.getProviders().subscribe((data: any[]) => {
  //   console.log(data);
  //   this.providers = data;
  // })


}
