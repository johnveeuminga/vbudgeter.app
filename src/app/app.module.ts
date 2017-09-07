import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';


import { HomePage } from '../pages/home/home'
import { LoginPage } from '../pages/login/login'
import { RegisterPage } from '../pages/register/register'
import { SellerDashboardPage } from '../pages/seller-dashboard/seller-dashboard'
import { CustomerDashboardPage } from '../pages/customer-dashboard/customer-dashboard'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite'
import { SQLitePorter } from '@ionic-native/sqlite-porter'
import { DatabaseProvider } from '../providers/database/database';
import { IonicStorageModule } from '@ionic/storage';

//mocks
import { SQLiteMock } from '@ionic-native-mocks/sqlite'
import { SQLitePorterMock } from '@ionic-native-mocks/sqlite-porter'
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SellerDashboardPage,
    CustomerDashboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SellerDashboardPage,
    CustomerDashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    // {provide: SQLite, useClass: SQLiteMock},
    // {provide: SQLitePorter, useClass: SQLitePorterMock },
    SQLite,
    SQLitePorter,
    AuthProvider
  ]
})
export class AppModule {}
