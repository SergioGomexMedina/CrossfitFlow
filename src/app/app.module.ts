import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { GimnasioComponent } from './components/gimnasio/gimnasio.component';
import { LoginComponent } from './components/login/login.component';
import { PassComponent } from './components/pass/pass.component';
import { ListaComponent } from './components/lista/lista.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { InicioComponent } from './components/inicio/inicio.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { EntrenadoresComponent } from './components/entrenadores/entrenadores.component';
import { ClasesComponent } from './components/clases/clases.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ImagenPipe } from './pipe/imagen.pipe';
import { EntrenadorPipe } from './pipe/entrenador.pipe';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { DateAdapter } from 'angular-calendar';
import { PersonalesComponent } from './components/personales/personales.component';
import { NavbarComponent } from './components/navbar/navbar.components';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    GimnasioComponent,
    LoginComponent,
    PassComponent,
    ListaComponent,
    InicioComponent,
    ActividadesComponent,
    EntrenadoresComponent,
    ClasesComponent,
    ChatbotComponent,
    ReservaComponent,
    ImagenPipe,
    EntrenadorPipe,
    CalendarComponent,
    PersonalesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NavbarComponent,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'crossfitflow',
        appId: '1:831085076098:web:d1cd6646250ff519569e9b',
        databaseURL:
          'https://crossfitflow-default-rtdb.europe-west1.firebasedatabase.app',
        storageBucket: 'crossfitflow.firebasestorage.app',
        apiKey: 'AIzaSyBnVRH_jiQ0bXLL_tHM0U5j4X_SGosyc2U',
        authDomain: 'crossfitflow.firebaseapp.com',
        messagingSenderId: '831085076098',
      })
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
