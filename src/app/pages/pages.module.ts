import { CountoModule } from 'angular2-counto';
import { StatementService } from '../shared/services/statement.service';
import { MaterialModule } from './../shared/layout/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginService } from '../shared/services/login.service';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CountoModule
  ],
  exports: [
    CommonModule,
    HomeComponent, FormsModule,
    ReactiveFormsModule,
    MaterialModule, CountoModule
  ],
  providers: [StatementService, LoginService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
