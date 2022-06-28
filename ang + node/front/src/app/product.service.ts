import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from './product';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};



@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productUrl = 'http://localhost:3001'; //Base Url to REST API

  constructor(private http:HttpClient) { }

  //GET products from the server
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.productUrl+'/');
  }

  //GET product by id. Will 404 if not found
  getProduct(id:string):Observable<any>{
    const url = `${this.productUrl}/detail/${id}`;
    return this.http.get(url);
  }


  //POST : add new product to the server
  addProduct(product: Product){
    return this.http.post(this.productUrl+'/add', product, {headers: new HttpHeaders({'Content-Type': 'application/json'})});   
  }

  //PUT : update product on the server
  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.productUrl+'/update/'+product.id, product, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  //DELETE: delete the product from the server
  deleteProduct(product: Product){
    if(confirm("Are you sure to delete ?")){
      console.log(product);
      
    
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: product,
      responseType: 'text' as 'json'
    };

   return this.http.delete(this.productUrl + '/delete/' + product.id, options);
  }

  return of({});
}

}
