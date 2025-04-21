import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.css'
})
export class CategorydetailsComponent implements OnInit {

  constructor(private _CategoriesService:CategoriesService,
              private _ActivatedRoute:ActivatedRoute,
  ){}

  categoryId!:string|null;
  catDetailsData!:ICategory | null;




  ngOnInit(): void {


    this._ActivatedRoute.paramMap.subscribe({

      next:(urlInfo)=>{
        this.categoryId = urlInfo.get('c_id');
        console.log(urlInfo.get('c_id'))

      }

    })
    
    this._CategoriesService.categoryDetails(this.categoryId).subscribe({

      next:(res)=>{
        this.catDetailsData=res.data;
        console.log(this.catDetailsData)
      }

    })

  }

}
