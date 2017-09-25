import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {PrettyJsonModule} from 'angular2-prettyjson';
import {RecentResult} from '../providers/recent-result';
import { HomePage } from '../pages/home/home';
import { FilteredDetail } from '../pages/filtered-detail/filtered-detail';
import { HttpModule } from '@angular/http';
import {MomentModule} from 'angular2-moment';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {PrettyPipe} from './pipes/pretty-pipe';
import { Dashboard } from '../pages/dashboard/dashboard';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FilteredDetail,
    Dashboard,
    PrettyPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    MomentModule,
    PrettyJsonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FilteredDetail,
    Dashboard

  ],
  providers: [
    StatusBar,
    SplashScreen,
    RecentResult,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
