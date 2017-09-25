import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RecentResult provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RecentResult {

  dashboard_data={};
  oDetail:any;
  constructor(public http: Http) {
    console.log('Hello RecentResult Provider');
    
  }

  getData(env:any) {

    return this.http.get("assets\\resource\\report_"+env+".json").map((res:Response) => res.json()); 

  }

  getDashboardData(envType){


   return this.http.get("assets\\resource\\report_" + envType + ".json")
          .map((res:Response) => 
          
              this.fillObject(res)

          )
   
  }

  fillObject(res:any){
        this.oDetail={
          collName:res.json().environment.name,
          lastRun:res.json().run.timings.completed,
          totalAsserts:res.json().run.stats.assertions.total,
          failedAsserts:res.json().run.stats.assertions.failed
        }
       this.dashboard_data[res.json().environment.name] = this.oDetail;
       return this.dashboard_data;
  }
  

}
