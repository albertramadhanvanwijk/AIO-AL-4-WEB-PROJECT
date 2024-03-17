import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  // supplies

  getAllSupplies(): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/supplies`, { headers });
  }

  getSupplyById(id: number): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/supplies/${id}`, { headers });
  }

  insertSupply(data: any): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.post(`${this.baseUrl}/master/supplies`, { form_data: data }, { headers });
  }

  updateSupply(id: number, data: any): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.put(`${this.baseUrl}/master/supplies/${id}`, { form_data: data }, { headers });
  }

  deleteSupply(id: number): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.delete(`${this.baseUrl}/master/supplies/${id}`, { headers });
  }

  softDelete(id: number): Observable<any> {
    const headers = this.authService.getHeaders()
    let data = {
      "is_deleted": 1
    }
    return this.http.put(`${this.baseUrl}/master/soft-delete-supplies/${id}`, data, { headers });
  }

  getSuppliesByArea(area: string): Observable<any> {
    const headers = this.authService.getHeaders()
    const url = `${this.baseUrl}/master/supplies/area/${area}`;
    return this.http.get(url, { headers });
  }

  getAmountSupply(): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/amount`, { headers });
  }



  // transaction
  getAllTransactions(): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/transactions`, { headers });
  }

  getTransactionById(id: number): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/transactions/${id}`, { headers });
  }

  insertTransaction(data: any): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.post(`${this.baseUrl}/master/transactions`, data, { headers });
  }

  updateTransaction(id: number, data: any): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.put(`${this.baseUrl}/master/transactions/${id}`, data, { headers });
  }

  deleteTransaction(id: number): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.delete(`${this.baseUrl}/master/transactions/${id}`, { headers });
  }

  getSupplyTransactions(supplyId: number): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/transactions/supply/${supplyId}`, { headers });
  }


  // user
  getAllUsers(): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/users`, { headers });
  }

  getUserById(id: number): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/users/${id}`, { headers });
  }

  insertUser(data: any): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.post(`${this.baseUrl}/master/users`, data, { headers });
  }

  updateUser(id: number, data: any): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.put(`${this.baseUrl}/master/users/${id}`, data, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.delete(`${this.baseUrl}/master/users/${id}`, { headers });
  }
  
  getAllTeam(): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/team`, { headers });
  }

  getAllRole(): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/role`, { headers });
  }

  getAllLine(): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/line`, { headers });
  }


  // area
  getAllAreas(): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/areas`, { headers });
  }

  getAreaById(id: number): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/areas/${id}`, { headers });
  }

  insertArea(data: any): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.post(`${this.baseUrl}/master/areas`, data, { headers });
  }

  updateArea(id: number, data: any): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.put(`${this.baseUrl}/master/areas/${id}`, data, { headers });
  }

  deleteArea(id: number): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.delete(`${this.baseUrl}/master/areas/${id}`, { headers });
  }


  // Category
  getAllCategories(): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/categories`, { headers });
  }

  getCategoryById(id: number): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/categories/${id}`, { headers });
  }

  insertCategory(data: any): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.post(`${this.baseUrl}/master/categories`, data, { headers });
  }

  updateCategory(id: number, data: any): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.put(`${this.baseUrl}/master/categories/${id}`, data, { headers });
  }

  deleteCategory(id: number): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.delete(`${this.baseUrl}/master/categories/${id}`, { headers });
  }


  //grafik
  getChartDataIBF(month: number, year: number): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/grafik/ibf/${month}/${year}`, { headers });
  }

  getChartDataPREPARASI(month: number, year: number): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/grafik/preparasi/${month}/${year}`, { headers });
  }

  getChartDataPACKING(month: number, year: number): Observable<any> {
    const headers = this.authService.getHeaders()
    return this.http.get(`${this.baseUrl}/master/grafik/packing/${month}/${year}`, { headers });
  }
  

}
