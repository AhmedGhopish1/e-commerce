import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { error } from 'node:console';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit , OnDestroy {

  // private readonly _CategoriesService=inject(CategoriesService)
  constructor(private _CategoriesService:CategoriesService){}

  categorySub!:Subscription;
  categoryRes!:ICategory[];

  ngOnInit(){
    this.categorySub = this._CategoriesService.getCategoryData().subscribe({

      next:(res)=>{
        this.categoryRes=res.data
        
      },

      // error:(error)=>  //replaced by (error interceptor)
      // {
      //   console.log(error) 
      // }
     })
  }

  ngOnDestroy(){

    this.categorySub.unsubscribe();

  }
  
}
 


