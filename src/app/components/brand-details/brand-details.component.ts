import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { IBrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.css'
})
export class BrandDetailsComponent implements OnInit {

  constructor(){}
  private readonly _BrandsService =inject(BrandsService);
  private readonly _ActivatedRoute =inject(ActivatedRoute)

  barndId!:string|null;
  brandDetails!:IBrands | null;




ngOnInit(): void {
  
  this._ActivatedRoute.paramMap.subscribe({
    next:(urlInfo)=>{
      this.barndId = urlInfo.get('b_id')
      console.log(this.barndId)

    }
  })

  this._BrandsService.getBrandDetails(this.barndId).subscribe({

    next:(res)=>{
      this.brandDetails = res.data
      console.log(this.brandDetails)

    }

  })

}

}
