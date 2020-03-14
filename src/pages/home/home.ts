import { Component,ElementRef,ViewChild } from '@angular/core';
import { NavController,ModalController,NavParams,LoadingController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import {RecentResult} from '../../providers/recent-result';
import 'chart.js/dist/Chart.bundle';
import {PrettyPipe} from '../../app/pipes/pretty-pipe';
import { FilteredDetail } from '../filtered-detail/filtered-detail';
declare var Chart;
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/finally';
import { isObject } from 'ionic-angular/umd/util/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {

  ctx : any;
  serviceList : any;
  searchControl: FormControl;
  project : any;
  executions: any;
  timings : any;
  stats : any;
  toggleStats : any; 
  statsIcon:any;
  response:any ;
  demoData:any;
  passFailArray=[];
  choice : any;
  searchTerm:any;
  filteredExecutions=[];
  @ViewChild('canvas') canvas:ElementRef;
  
  constructor(public navCtrl: NavController, public recentResult : RecentResult,public modalCtrl: ModalController,public navParams: NavParams,public loadingCtrl: LoadingController) {
      this.searchControl = new FormControl();
    //this.recentResult.getData().subscribe((data)=>{
        let loader = this.loadingCtrl.create({});
         loader.present();
    this.recentResult.getData(navParams.get('env')).finally(() => {
          loader.dismiss();
        }).subscribe((data)=>{
        console.log("this is response from the report" , data);
        this.response = data;
        this.updateList(data);
        this.updateChart(data);
        
    }, (err) => {
          //deal with error
        })
    this.toggleStats = true;
    this.statsIcon = "ios-arrow-dropup";
    this.choice = "All";
  }

  ionViewDidLoad(){

        this.setFilteredItems();
 
        this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
 
            this.setFilteredItems();
 
        });
 

  }
  onSelectChange(selectedValue: any){
      this.choice = selectedValue;
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

  updateList(data: any){
     this.project = data.collection.info.name;
     this.executions = data.run.executions;
     this.stats = data.run.stats;

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

  setFilteredItems(){
    this.filteredExecutions = [];
    let index = Number(this.searchTerm);
    console.log("filter" +index );
    if(!isNaN(index)){
        
         for(var e_index= 0;e_index<this.executions.length;e_index++){

                if(this.executions[e_index].cursor.iteration==index-1){
                    this.filteredExecutions.push(this.executions[e_index]);
                }
                    
         }

         if(this.filteredExecutions.length>0){
             const modal = this.modalCtrl.create(FilteredDetail, this.filteredExecutions)
             modal.onDidDismiss(()=>{
                 this.searchTerm = "";
             })
                modal.present();

         }

    }else{

    }
  }

  hideStats(){
    this.toggleStats = !this.toggleStats;
    this.statsIcon = this.toggleStats ? "ios-arrow-dropup":"ios-arrow-dropdown";
   
  }

  updateChart(dataResult:any){
      let ctx = this.canvas.nativeElement;

      Chart.pluginService.register({
        beforeDraw: function(chart) {
            var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = (height / 114).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            var text = dataResult.run.stats.assertions.total,
        
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
            myChart.clear();
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
      });
      
        let myChart = new Chart(ctx, {
        type: 'doughnut',
          data: {
          labels: ["Failed", "Passed"],
        
          datasets: [{

            data:[dataResult.run.stats.assertions.failed,dataResult.run.stats.assertions.total-dataResult.run.stats.assertions.failed],
            
            backgroundColor: ["#B20000","#00B200"],

            hoverBackgroundColor: ["#B20000","#00B200"],
            
            }]
            },
          options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Test Cases'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
            
        }

  })
  }






}
