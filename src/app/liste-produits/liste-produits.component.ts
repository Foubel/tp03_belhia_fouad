import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.css']
})
export class ListeProduitsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits', error);
      }
    );
  }

  applyFilters(searchTerms: any): void {
    this.filteredProducts = this.products; 
    
    if (searchTerms.id) {
      this.filteredProducts = this.filteredProducts.filter(product =>
        product.id.toString().includes(searchTerms.id)
      );
    }
    if (searchTerms.name) {
      this.filteredProducts = this.filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerms.name.toLowerCase())
      );
    }
    if (searchTerms.description) {
      this.filteredProducts = this.filteredProducts.filter(product =>
        product.description.toLowerCase().includes(searchTerms.description.toLowerCase())
      );
    }
    if (searchTerms.price) {
      this.filteredProducts = this.filteredProducts.filter(product =>
        product.price.toString().includes(searchTerms.price)
      );
    }
  }
}
