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
  getPartOutputById: any;
  deleteDetailOutput: any;

  constructor(private http: HttpClient, private authService: AuthService) { 
   }

  // File PDF
  uploadDocument(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData);
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

  updateOutput(data: any, partId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.put(`${this.baseUrl}/master/output/${partId}`, data, { headers });
  }

  getImageUrl(partId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/image-url/${partId}`, { headers });
  }

}
