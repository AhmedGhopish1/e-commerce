import { Component } from '@angular/core';
import { HomeComponent } from "../../components/home/home.component";
import { CategoriesComponent } from "../../components/categories/categories.component";
import { BrandsComponent } from "../../components/brands/brands.component";
import { NavMainComponent } from "../../components/nav-main/nav-main.component";
import { RouterOutlet } from '@angular/router';
import { NgxSpinner, NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, NavMainComponent, NgxSpinnerComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
