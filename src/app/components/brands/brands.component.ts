import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrands } from '../../core/interfaces/ibrands';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {


  private readonly _BrandsService=inject(BrandsService)

  brandsData!:IBrands[];
  brandSub!:Subscription;

  
  ngOnInit(){

  this.brandSub = this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brandsData=res.data
        console.log(this.brandsData)
      }
    })
  }


  ngOnDestroy(){

    this.brandSub?.unsubscribe();
  }

}
