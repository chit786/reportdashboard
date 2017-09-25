import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController } from 'ionic-angular';
import {RecentResult} from '../../providers/recent-result';
import 'rxjs/add/operator/finally';
import { HomePage } from '../home/home';
/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {
  env_Types= ['FR_ST','FR_ET','Portal-ET-North','Portal-ET-South','PR_LB_Client','PR_LB_Employee','PR_N_Client','PR_N_Employee','PR_S_Client','PR_S_Employee'];
  dashboard_details={};
  keysDash =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public recentRes:RecentResult,public loadingCtrl: LoadingController) {
    
     for(var i=0;i<this.env_Types.length;i++){
       
        let loader = this.loadingCtrl.create({});
        loader.present();
         recentRes.getDashboardData(this.env_Types[i]).finally(() => {
          loader.dismiss();
        }).subscribe((data)=>{
          
         
            this.dashboard_details = JSON.parse(JSON.stringify(data));
            this.keysDash = Object.keys(this.dashboard_details);
           
        
        }, (err) => {
          //deal with error
        });
      

        // recentRes.getDashboardData(this.env_Types[i]).subscribe((data)=>{
          
         
        //     this.dashboard_details = JSON.parse(JSON.stringify(data));
        //     this.keysDash = Object.keys(this.dashboard_details);
           
        // }
       
        //);
        
     }
  }

  ionViewDidLoad() {
    // console.log( this.recentRes.dashboard_data);
  }

  openEnvDetails(envName:any){
    console.log(envName);
    this.navCtrl.push(HomePage,{env:envName})
  }

}
