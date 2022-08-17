import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ProductServiceService } from '../services/product-service.service';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  productForm !: FormGroup;
  id : any=0;
  actionName : any;
  constructor(private formbuilder : FormBuilder, private service : ProductServiceService, private router : Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.formData();
    console.log(this.route);
    this.id=this.route.snapshot.params['id'];
    console.log('id',this.id);
    if(this.id){
      this.actionName="update"
     this.service.getProductById("products",this.id).subscribe(el=>{
      this.productForm.setValue(el);
      console.log("Data",el);
     })
    }
    else{
      this.actionName ="create";
      console.log("No data")
    }
  }
  formData(){
      this.productForm = this.formbuilder.group({
        id : [],
        productName : ['', Validators.required],
        discription : ['', Validators.required],
        quantity : ['', Validators.required],
        price : ['', Validators.required]

      })
  }
  submitData(){
    if(this.actionName == 'create'){
     this.service.insertData('products', this.productForm.value).subscribe(el=>{
        alert("Data Submitted")
        console.log(el);
        this.router.navigate(['products'])
     })
    }
    else{
      this.service.updateProduct('products', this.productForm.value).subscribe(el=>{
        alert("Data Updated")
        console.log(el);
        this.router.navigate(['products'])
      })
    }
  } 
}
