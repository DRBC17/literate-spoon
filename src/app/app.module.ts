import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//? Módulos para firebase y firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

//? Módulos para las alertas ToastrModule
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//? Modulo para formularios reactivos
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { ListEmpleadoComponent } from './components/list-empleado/list-empleado.component';
import { FormEmpleadoComponent } from './components/form-empleado/form-empleado.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ListEmpleadoComponent,
    FormEmpleadoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
