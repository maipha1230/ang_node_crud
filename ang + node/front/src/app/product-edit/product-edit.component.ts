import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  @Input() product: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService, private location: Location) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void{
    const id: any  = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe(product => this.product = product[0]);
  }
  save(): void{
    this.productService.updateProduct(this.product).subscribe(success => {this.goBack();})
  }

  goBack(): void{
    this.location.back();
  }

}
