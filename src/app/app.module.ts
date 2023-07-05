import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from '../hello.component';
import { AppService } from './app.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { EndFormComponent } from './end-form/end-form.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatExpansionModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
  ],
  declarations: [AppComponent, HelloComponent, EndFormComponent],
  bootstrap: [AppComponent],
  providers: [AppService],
})
export class AppModule {}
