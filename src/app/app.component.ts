import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { apiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [apiService]
})
export class AppComponent {
  p: number = 1;
  categoryName = '';
  categoryStatus: any;
  SaveButton: any;
  UpdateButton: any;
  id: any;
  categories: any = [];
  alert:boolean = false;
  updateMessage:boolean= false;
  constructor(private API: apiService) {
    this.loadData();
    this.SaveButton = true
  }
  categoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  })
//Insert
  saveCategory() {
    this.API.post('http://localhost/categorymaster/create_category.php',
      {
        name: this.categoryName,
        status: this.categoryStatus,
      }).then(() => {
        this.loadData();
        this.alert=true;
      })
  }
//Update
  updateCategory() {
    this.API.post(`http://localhost/categorymaster/update_category.php`,
      {
        id: this.id,
        name: this.categoryName,
        status: this.categoryStatus
      }).then(() => {
        this.loadData();
        this.updateMessage=true;
      })
  }
//Edit
  editCategory(category: any) {
    this.UpdateButton = true;
    this.SaveButton = false;
    this.id = category.id
    this.categoryName = category.name,
    this.categoryStatus = category.status;
  }
//Fetch
  async loadData() {
    try {
      var res: any = await this.API.get(`http://localhost/categorymaster/index.php`);
      console.log('Response is ', res);
      this.categories = res;
    } catch (e) {
      alert("Fetch error")
      console.log('Error', e);
    }
  }
//Delete
  deleteCategory(id: any) {
    if (confirm("Are you sure? You want to remove the record?")) {
      this.API.deleteCategory(id).subscribe(() => {
        this.loadData();
      });
    }
  }
//Reset
  resetForm() {
    this.categoryName = '';
    this.categoryStatus = '';
    this.SaveButton = true
    this.UpdateButton = false
  }
//Close Alert
  closeAlert(){
    this.alert=false;
    this.updateMessage=false;
  }
}