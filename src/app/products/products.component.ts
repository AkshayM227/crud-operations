import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from './services/product-service.service';
import { Product } from '../models/model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products:Product[] = [];
  constructor(private router: Router,private service : ProductServiceService) { }

  ngOnInit(): void {
    this.getProductData();
  }

  createProduct(){
    this.router.navigate(['create-product'])
  }
  getProductData(){
    this.service.getProductDetails('products').subscribe(el=>{
      if(Array.isArray(el)){
        this.products =el;
      }
      console.log(el)
    })
  }
  deleteData(product : any){
    this.service.deleteProduct(product.id, 'products').subscribe((res:any)=>{
        console.log(res);
        alert("Product Deleted");
        this.getProductData();
        this.router.navigate(['products'])
    })
  }
  updateData(id :number){
    this.router.navigate(['update-product',id])
  }
}

