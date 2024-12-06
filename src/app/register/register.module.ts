import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { AuthService } from '../services/auth.service';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    IonicStorageModule,
  ],
  declarations: [RegisterPage],
  providers: [AuthService],
})
export class RegisterPageModule {}
