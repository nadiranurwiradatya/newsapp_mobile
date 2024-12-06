import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RegisterPageModule } from './register/register.module';
import { HttpClientModule } from '@angular/common/http';
import {
  LocalNotifications,
  LocalNotificationsOriginal,
} from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    IonicModule,
    IonicStorageModule,
    RegisterPageModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
