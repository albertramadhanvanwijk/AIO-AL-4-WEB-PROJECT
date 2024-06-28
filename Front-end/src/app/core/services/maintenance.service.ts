import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private baseUrl = environment.apiUrl;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Metode untuk memperbarui stok suatu bagian setelah disetujui
  updateStock(partId: number, newStock: number): Observable<any> {
    const headers = this.authService.getHeaders();
    const data = { stock: newStock };
    return this.http.put(`${this.baseUrl}/master/update-stock/${partId}`, data, { headers });
  }


  // Metode lain dalam MaintenanceService
  uploadDocument(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
  searchParts(searchQuery: string, areaId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    const params = { search: searchQuery };
    return this.http.get(`${this.baseUrl}/master/search-parts/${areaId}`, { headers, params });
  }
  getFileDocument(fileName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/file/${fileName}`, {
      responseType: 'blob',
    });
  }

  getAllParts(): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/parts`, { headers });
  }

  getPartById(partId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/part/${partId}`, { headers });
  }

  updatePart(partId: number, data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.put(`${this.baseUrl}/master/part/${partId}`, data, { headers });
  }

  insertPart(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.baseUrl}/master/part`, data, { headers });
  }

  addStockOutput(data: any) {
    // Simpan data stok baru dengan status persetujuan 'Pending'
    return this.http.post<any>('api/add-output', data);
  }


  getPartsByAreaId(areaId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/parts/${areaId}`, { headers });
  }

  getTotalPartGroupByArea(): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/total-part-group-by-area`, { headers });
  }

  softDelete(partId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    const data = {
      "is_deleted": 1
    };
    return this.http.put(`${this.baseUrl}/master/delete-part/${partId}`, data, { headers });
  }

  getAllStockRemain(): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/stock-remain`, { headers });
  }

  getOutputByPartId(partId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/output-by-partid/${partId}`, { headers });
  }

  getTotalRemainOutByPartId(partId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/total-remainOut/${partId}`, { headers });
  }

  getTotalRemainInByPartId(partId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/total-remainIn/${partId}`, { headers });
  }

  getDetailOutput(partId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/detail-output/${partId}`, { headers });
  }

  insertOutput(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.baseUrl}/master/output`, data, { headers });
  }

  getTotalPrice(areaId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/total-price/${areaId}`, { headers });
  }

  updateOutput(partId: number, data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.put(`${this.baseUrl}/master/output/${partId}`, data, { headers });
  }

  getImageUrl(partId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/image-url/${partId}`, { headers });
  }

  updatePartWithImage(partId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/parts/${partId}/update`, data);
  }

  // maintenance.service.ts
  updatePartImage(partId: number, imageUrl: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}/parts/${partId}/image`, { imageUrl });
  }

  updatePartStatus(partId: number, status: string, comment: string): Observable<any> {
    const headers = this.authService.getHeaders();
    const body = {
      approval_status: status,
      komentar: comment
    };

    return this.http.put(`${this.baseUrl}/master/output/${partId}`, body, { headers });
  }


  approvePart(partId: number): Observable<any> {
    return this.http.post(`/api/parts/approve`, { partId: partId });
  }

  rejectPart(partId: number): Observable<any> {
    return this.http.post(`/api/parts/reject`, { partId: partId });
  }

  updatePartStock(partId: number, newStock: number): Observable<any> {
    // Implementasikan logika untuk memperbarui stok suatu bagian
    // Anda dapat menggunakan HttpClient untuk membuat permintaan ke API backend Anda
    // Ganti pernyataan return ini dengan implementasi aktual Anda
    return this.http.put(`/api/parts/${partId}/stock`, { stock: newStock });
  }
}



