import { Injectable } from '@angular/core';
import { Category } from './category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
	providedIn: 'root'
})
export class ApiService {
	PHP_API_SERVER = "http://localhost/categorymaster";
	constructor(private httpClient: HttpClient) { }

	readCategory(): Observable<Category[]> {
		return this.httpClient.get<Category[]>(`${this.PHP_API_SERVER}/index.php`);
	}

	createCategory(category: Category): Observable<Category> {
		return this.httpClient.post<Category>(`${this.PHP_API_SERVER}/create_category.php`, category);
	}

	updateCategory(category: Category) {
		return this.httpClient.put<Category>(`${this.PHP_API_SERVER}/update_category.php`, category);
	}
	
	deleteCategory(id: number) {
		return this.httpClient.delete<Category>(`${this.PHP_API_SERVER}/delete_category.php/?id=${id}`);
	}
}
