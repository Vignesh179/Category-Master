import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Category } from './category';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  changenameUpdate:any = false;
  changenameSave:any = true;
  title = 'Category-Master';
    categories!: Category[];
    selectedCategory: Category = { id : null , name: null, status: null}
    constructor(private apiService: ApiService) {
      this.apiService.readCategory().subscribe((categories: Category[])=>{
      this.categories = categories;
      console.log(this.categories);
    }) }
    ngOnInit()
    {
    }
    createOrUpdateCategory(form:any){
      form.value.id = this.selectedCategory.id;
      form.value.name = this.selectedCategory.name;
      form.value.price = this.selectedCategory.status;
      if(this.selectedCategory && this.selectedCategory.id){
        this.apiService.updateCategory(form.value).subscribe((category: Category)=>{
        console.log("Product updated" , category);
        this.apiService.readCategory().subscribe((categories: Category[])=>{
          this.categories = categories;
        })
      });
    }
    else{
      this.apiService.createCategory(form.value).subscribe((category: Category)=>{
        console.log("Product created, ", category);
        this.apiService.readCategory().subscribe((categories: Category[])=>{
          this.categories = categories;
        })
      });
    }
  }
  
  selectCategory(category: Category){
    this.selectedCategory = category;
    this.changenameUpdate=true;
    this.changenameSave=false;
  }
  
  deleteCategory(id:any){
    this.apiService.deleteCategory(id).subscribe((category: Category)=>{
      console.log("Product deleted, ", category);
      this.apiService.readCategory().subscribe((categories: Category[])=>{
        this.categories = categories;
      })
    });
  }
  resetCategory(form:any){
    // form.value.name = this.selectedCategory.name ="";
    // form.value.price = this.selectedCategory.status="";
    this.changenameSave=true;
    this.changenameUpdate=false;
  }

  }

