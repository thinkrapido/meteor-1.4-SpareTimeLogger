import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import {SquareImage} from './components/SquareImage';
import {Statistics} from './components/Statistics';


@NgModule({
  declarations: [
    AppComponent, 
    SquareImage, 
    Statistics,
  ],
  entryComponents: [
    AppComponent,
  ],
  providers: [
    { provide: ErrorHandler }
  ]
})
export class AppModule {}