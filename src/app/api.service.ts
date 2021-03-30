import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './Category';

@Injectable({
  providedIn: 'root'
})
export class apiService {
  LOCALHOST = "http://localhost/categorymaster";
  constructor(private httpClient: HttpClient) { }
  //Load
  async get(url: string) {
    try {
      const resp = await this.httpClient.get(url).toPromise();
      return resp;
    } catch (e) {
      return null;
    }
  }
  //Insert
  async post(url: string, data?: any) 
  {
    try 
    {
      const resp = await this.httpClient.post(url, data, { headers: {},}).toPromise();
      return resp;
    } catch (e) {
      return null;
    }
  }
  //Delete
  deleteCategory(id: number) {
		return this.httpClient.delete<Category>(`${this.LOCALHOST}/delete_category.php/?id=${id}`);
	}
  //Update
  async put(url: string, data?: any) 
  {
    try 
    {
      const resp = await this.httpClient.put(url, data, { headers: {},
       }).toPromise();
      return resp;
    } catch (e) {
      return null;
    }
  }
}