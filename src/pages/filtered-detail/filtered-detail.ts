import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FilteredDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-filtered-detail',
  templateUrl: 'filtered-detail.html',
})
export class FilteredDetail {
response:any;
passFailArray=[];
executions:any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

      
      this.passFailArray=[];
      this.response = navParams.data;
      console.log(this.response);
      this.updateList(navParams);
  }

  ionViewDidLoad() {
    
  }

  computeRequestUrl(req: any) {
      let protocol = req.url.protocol + '//';
      let host = req.url.host.join(".") + '/';
      let path = req.url.path.join("/");
      let query = '';
      req.url.query.forEach(q => {
         if (typeof q === 'object') {
         query = q.key + '=' + q.value;
         }
      });
      let finalUrl = protocol + host + path;
      return (query === '') ? finalUrl : (finalUrl + '?' + query);
  }

  updateList(nav: any){
   
     this.executions = nav.data;
    
     for(var e_index= 0;e_index<this.executions.length;e_index++){
         if(this.executions[e_index].assertions){
              if(this.executions[e_index].assertions.length==0){
                 this.passFailArray.push("NA");
              }else{
                 for(var as_index = 0; as_index < this.executions[e_index].assertions.length;as_index++){
                    if(this.executions[e_index].assertions[as_index].error){
                       this.passFailArray.push("Fail"); 
                       break;
                    }
                   if(this.executions[e_index].assertions.length==as_index+1){
                       this.passFailArray.push("Pass"); 
                    }


                 }
              
             }
            
         }else{
            this.passFailArray.push("NA"); 
         }
       
     }
  }

}
