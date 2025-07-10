import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "angulardemo111", appId: "1:267263325122:web:f68f26c903f7b74447dc5b", storageBucket: "angulardemo111.firebasestorage.app", apiKey: "AIzaSyDtNiq6gHk-DWS4OoqCTVO4FVU9HWkSYvA", authDomain: "angulardemo111.firebaseapp.com", messagingSenderId: "267263325122" })), provideFirestore(() => getFirestore()),
    provideHttpClient()
  ]
};
