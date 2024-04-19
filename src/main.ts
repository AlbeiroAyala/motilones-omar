import { NgModule, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
// librerias de angular
import { AngularFireModule } from '@angular/fire/compat';
import {  AngularFireAuthModule} from '@angular/fire/compat/auth';
import {  AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {  AngularFireStorageModule } from '@angular/fire/compat/storage'

import { getAuth, provideAuth } from '@angular/fire/auth';

import { getStorage, provideStorage } from '@angular/fire/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { BuscadorPipe } from './app/pipes/buscador.pipe';

if (environment.production) {
  enableProdMode();
}



bootstrapApplication(AppComponent, {

  providers: [

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({}),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
     AngularFireModule.initializeApp(environment.firebaseConfig),
     provideAuth(() => getAuth()),
     AngularFireAuthModule,
     AngularFirestoreModule,
     AngularFireStorageModule,

    ),
    provideRouter(routes),

  ],

});


