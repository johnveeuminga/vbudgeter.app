import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { OrdersComponent } from '../components/orders/orders';

import { HomePage } from '../pages/home/home'
import { LoginPage } from '../pages/login/login'
import { RegisterPage } from '../pages/register/register'
import { SellerDashboardPage } from '../pages/seller-dashboard/seller-dashboard'
import { CustomerDashboardPage } from '../pages/customer-dashboard/customer-dashboard'
import { StorePage } from '../pages/store/store'
import { ThankyouPage }from '../pages/thankyou/thankyou'
import { AddVegetablePage }from '../pages/add-vegetable/add-vegetable'
import { EditVegetablePage }from '../pages/edit-vegetable/edit-vegetable'
import { LocatePage }from '../pages/locate/locate'
import { DirectionsPage }from '../pages/directions/directions'
import { LocationPage } from '../pages/location/location'
import { RestockPage } from '../pages/restock/restock'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite'
import { SQLitePorter } from '@ionic-native/sqlite-porter'
import { DatabaseProvider } from '../providers/database/database';
import { IonicStorageModule } from '@ionic/storage';

//mocks
import { SQLiteMock } from '@ionic-native-mocks/sqlite'
import { SQLitePorterMock } from '@ionic-native-mocks/sqlite-porter'
import { Geolocation } from '@ionic-native/geolocation'

import { AuthProvider } from '../providers/auth/auth';
import { RequestProvider } from '../providers/request/request';
import { UserProvider } from '../providers/user/user';
import { StoreProvider } from '../providers/store/store';
import { OrderProvider } from '../providers/order/order';
import { VegetableProvider } from '../providers/vegetable/vegetable';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SellerDashboardPage,
    CustomerDashboardPage,
    OrdersComponent,
    StorePage,
    ThankyouPage,
    AddVegetablePage,
    EditVegetablePage,
    LocatePage,
    DirectionsPage,
    LocationPage,
    RestockPage
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
    CustomerDashboardPage,
    StorePage,
    ThankyouPage,
    AddVegetablePage,
    EditVegetablePage,
    LocatePage,
    DirectionsPage,
    LocationPage,
    RestockPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    {provide: SQLite, useClass: SQLiteMock},
    {provide: SQLitePorter, useClass: SQLitePorterMock },
    // SQLite,
    // SQLitePorter,
    AuthProvider,
    RequestProvider,
    UserProvider,
    StoreProvider,
    OrderProvider,
    VegetableProvider,
    Geolocation
  ]
})
export class AppModule {}
