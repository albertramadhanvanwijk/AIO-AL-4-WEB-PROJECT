import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SopService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}
  // GET USER
  getAllUsers(): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/users`, { headers });
  }

  getUserByTeam(teamId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/users-team/${teamId}`, {
      headers,
    });
  }

  getUserByRoleId(roleId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/user-by-role/${roleId}`, {
      headers,
    });
  }

  getSpv(roleId: number, groupId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/spv/${roleId}/${groupId}`, {
      headers,
    });
  }

  getAllUsersByAreaId(areaId: number, groupId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/user/${areaId}/${groupId}`, {
      headers,
    });
  }

  getUserByUserId(userId: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/users/${userId}`, { headers });
  }

  // GET DOCUMENT
  getAllDocument(): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/documents`, { headers });
  }

  getUserProgress(id_area: number, id_user: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(
      `${this.baseUrl}/master/document/${id_area}/${id_user}`,
      { headers }
    );
  }

  // CRUD
  getDocumentById(id: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/documents/${id}`, { headers });
  }

  insertDocument(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.baseUrl}/master/document`, data, { headers });
  }

  updateDocument(id: any, data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.put(`${this.baseUrl}/master/update-document/${id}`, data, {
      headers,
    });
  }

  softDelete(id: any, data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.put(`${this.baseUrl}/master/soft-delete/${id}`, data, {
      headers,
    });
  }

  // Progress
  getUserProgressByid(userId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/userprogress/${userId}`, {
      headers,
    });
  }

  addProgress(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.baseUrl}/master/add-progress`, data, {
      headers,
    });
  }

  updateProgress(document_id: number, id_user: any): Observable<any> {
    const headers = this.authService.getHeaders();
    const data = { completed: 1 };
    return this.http.put(
      `${this.baseUrl}/master/update-progress/${document_id}/${id_user}`,
      data,
      { headers }
    );
  }
  getPercentageProgressByArea(id_user: any, id_area: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(
      `${this.baseUrl}/master/calculate/${id_user}/${id_area}`,
      { headers }
    );
  }

  getPercentageProgressByGroup(groupId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(
      `${this.baseUrl}/master/progress-by-group/${groupId}`,
      { headers }
    );
  }

  getDataPercentageByGroup(groupId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(
      `${this.baseUrl}/master/percentage-by-group/${groupId}`,
      { headers }
    );
  }
  getDataPercentageTeam(groupId: number, areaId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(
      `${this.baseUrl}/master/percentage-team-bygroup/${groupId}/${areaId}`,
      { headers }
    );
  }

  getTotalCompleted(userId: number, areaId: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(
      `${this.baseUrl}/master/completed/${userId}/${areaId}`,
      { headers }
    );
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
  // Get document by Area
  getDocumentByAreaId(id_area: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/document/${id_area}`, {
      headers,
    });
  }
  // AREA
  getAllAreas(): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/areas`, { headers });
  }

  // QUESTIONS
  getAllQuestions(): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/questions`, { headers });
  }
  addQuestion(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.baseUrl}/master/question`, data, {
      headers,
    });
  }
  updateQuestion(id: any, data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.put(`${this.baseUrl}/master/question/${id}`, data, {
      headers,
    });
  }
  getQuestionDetail(id: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/detail-question/${id}`, {
      headers,
    });
  }
  getQuestionByAreaID(id: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/question/${id}`, {
      headers,
    });
  }

  // ANSWER
  addAnswer(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.baseUrl}/master/answer`, data, {
      headers,
    });
  }
  updateAnswer(id: number, data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.put(`${this.baseUrl}/master/answer/${id}`, data, {
      headers,
    });
  }
  getAnswerById(id: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/edit-answer/${id}`, {
      headers,
    });
  }

  // RESULT
  addResultUser(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.baseUrl}/master/add-result`, data, {
      headers,
    });
  }
  getScoreUserByUserId(id: number): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.baseUrl}/master/total-score/${id}`, {
      headers,
    });
  }
}
