import { Injectable } from '@angular/core';
import { Category } from './category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
	providedIn: 'root'
})
export class ApiService {
	LOCALHOST = "http://localhost/categorymaster";
	constructor(private httpClient: HttpClient) { }
	readCategory(): Observable<Category[]> {
		return this.httpClient.get<Category[]>(`${this.LOCALHOST}/index.php`);
	}
	createCategory(category: Category): Observable<Category> {
		return this.httpClient.post<Category>(`${this.LOCALHOST}/create_category.php`, category);
	}
	updateCategory(category: Category) {
		return this.httpClient.put<Category>(`${this.LOCALHOST}/update_category.php`, category);
	}
	deleteCategory(id: number) {
		return this.httpClient.delete<Category>(`${this.LOCALHOST}/delete_category.php/?id=${id}`);
	}
}
