import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  NavigationEnd, Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink],
})
export class AppComponent {
  public dataApp= environment.dataApp
  
  
  
  constructor() { 
  }
}
