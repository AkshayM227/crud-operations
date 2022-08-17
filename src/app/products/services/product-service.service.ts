import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Product } from 'src/app/models/model';
import { pipe } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  baseUrl : string = "http://localhost:3000/"
  constructor(private http : HttpClient) { }

  insertData(endPoint :string, product : Product){
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    return this.http.post(this.baseUrl+endPoint,product,{'headers':headers})
  }
  getProductDetails(endPoint :string){
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    return this.http.get<Product[]>(this.baseUrl+endPoint, {'headers':headers})
  }
  deleteProduct(id :any, endPoint :string){
    return this.http.delete<any>(this.baseUrl+endPoint+"/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getProductById(endPoint : string, id : number){
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    return this.http.get(this.baseUrl+endPoint+'/'+id, {'headers':headers})
  }
  updateProduct(endPoint : string, product : Product,){
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    return this.http.put(this.baseUrl+endPoint+'/'+product.id, product, {'headers':headers})
  }

}
