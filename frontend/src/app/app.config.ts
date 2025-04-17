import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: 'books', component: BookListComponent },
      { path: 'books/add', component: BookFormComponent },
      { path: 'books/edit/:id', component: BookFormComponent },
      { path: '', redirectTo: '/books', pathMatch: 'full' }
    ]),
    provideHttpClient(),
    provideAnimations()
  ]
};