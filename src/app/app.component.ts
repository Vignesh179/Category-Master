import { formatCurrency } from '@angular/common';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './api.service';
import { Category } from './category';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  p: number = 1;
  changenameUpdate: boolean = false;
  changenameSave: boolean = true;
  alert:boolean = false;
  updateMessage:boolean= false;
  categories!: Category[];
  selectedCategory: Category = { id: null, name: null, status: null }
  formCategory: Category = { id: null, name: null, status: null }
  constructor(private apiService: ApiService) {
    // this.apiService.readCategory().subscribe((categories: Category[]) => {
    //   this.categories = categories;
    this.loadData();
    //   // console.log(this.categories);
    // })
  }
  ngOnInit() {
  }
  //Fetch
  async loadData() {
    try {
      let res: any = await this.apiService.get(`http://localhost/categorymaster/index.php`);
      console.log('Response is ', res);
      this.categories = res;
    } catch (e) {
    }
  }
  //Insert or Update
  createOrUpdateCategory(form: any) {
    form.value.id = this.selectedCategory.id;
    form.value.name = this.selectedCategory.name;
    form.value.status = this.selectedCategory.status;
    if (this.selectedCategory && this.selectedCategory.id) {
      this.apiService.updateCategory(form.value).subscribe(() => {
        // console.log("Category Master Updated", category);
        // this.apiService.readCategory().subscribe((categories: Category[]) => {
        //   this.categories = categories;
        // })
         this.updateMessage=true;
      });
      
    }
    else {
      this.apiService.createCategory(form.value).subscribe(() => {
        // console.log("Category Master Created, ", category);
        // this.apiService.readCategory().subscribe((categories: Category[]) => {
        //   this.categories = categories;

        this.alert = true; 
        form.reset();
        this.loadData();
        // })
      });
    }
  }
  //Edit
  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.formCategory = category;
    this.changenameUpdate = true;
    this.changenameSave = false;
  }
  //Deletion
  
  deleteCategory(id: any) {
    if(confirm("Are you sure? You want to remove the record?")){
    this.apiService.deleteCategory(id).subscribe(() => {
      // console.log("Category Master deleted, ", category);
      // this.apiService.readCategory().subscribe((categories: Category[]) => {
      //   this.categories = categories;
      this.loadData();
      // })
    });
  }
  }
  //Reset
  // resetCategory(form: any) {
  //   // form.value.name = this.selectedCategory.name ="";
  //   // form.value.price = this.selectedCategory.status="";
  //   form.reset();
  //   this.changenameSave = true;
  //   this.changenameUpdate = false;
  // }
  refresh(form:any) {
   form.reset();
    this.loadData();
    this.changenameSave=true;
    this.changenameUpdate=false;

  }
  closeAlert(){
    this.alert=false;
    this.updateMessage=false;
  }
}

