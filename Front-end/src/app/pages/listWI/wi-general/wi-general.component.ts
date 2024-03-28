import { Component } from '@angular/core';
import { SopService } from 'src/app/core/services/sop.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wi-general',
  templateUrl: './wi-general.component.html',
  styleUrls: ['./wi-general.component.scss']
})
export class WiGeneralComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  documents!: any[];
  // documentData!: any[];
  id_area!: number;
  userId!: number;
  searchQuery!: string;
  dataDocuments!: any[];

  // PAGINATION
  index: number = 1;
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  displayDocument: any;
  category!: string;
  entires: any;

  // DATA LOGIN
  userRole!: any;
  userName!: any;
  userArea!: any;

  constructor(private apiService: SopService, private modalService: NgbModal, private authService: AuthService, private route: ActivatedRoute) { }

  getTitle(): void {
    this.dataDocuments.forEach(document => {
      if(document.id_area === 1){
          this.category = 'IBF'
        } if(document.id_area === 2){
          this.category = 'Preparasi'
        } if(document.id_area === 3){
          this.category = 'Packing'
        } if(document.id_area === 4){
          this.category = 'General'
        }
    });
    // 
  }
  getDataUserLogin(){
    this.userRole = this.authService.getRoleID();
    this.userName = this.authService.getUserName();
    this.userArea = this.authService.getAreaName();
  }
  ngOnInit(){
    this.getDataUserLogin();
    this.breadCrumbItems = [{ label: this.userArea }];
    
    this.route.paramMap.subscribe(params => {
      const areaIdParam = params.get('area_id');
      const userIdParam = params.get('user_id');
      if (areaIdParam !== null && userIdParam !== null) {
        this.id_area = +areaIdParam;
        this.userId = +userIdParam;
        this.fetchDocumentByArea();
      } else {
        console.error('Area ID parameter is null');
      }
    });
  }

  fetchDocumentByArea(): void {
    this.apiService.getUserProgress(this.id_area, this.userId).subscribe(
      (res: any) => {
        this.documents = res.data;
        this.dataDocuments = this.documents.filter((document: any) => !document.is_deleted);
        this.entires = this.documents.length;
            
        this.calculateTotalPages();
        this.updateDisplayDocument();
        this.getTitle();
      },
      error => {
        console.error(error);
      }
    );
  }

  
  // SEARCH
  onSearch() {
    this.currentPage = 1; 
    if (this.searchQuery.trim() === '') {
      this.updateDisplayDocument();
    } else {
      this.displayDocument = this.dataDocuments.filter((document: any) =>
        (document.document_title && document.document_title.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (document.nama_area && document.nama_area.toLowerCase().includes(this.searchQuery.toLowerCase())) 
      );
      this.calculateTotalPages();
    }
  }

  // MODAL DELETE
  centerModal(removeModal: any) {
    this.modalService.open(removeModal, { centered: true });
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.documents.length / this.pageSize);
  }
  
  updateDisplayDocument(){
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayDocument = this.documents.slice(startIndex, endIndex);
  }
  nextPage(){
    if (this.currentPage < this.totalPages){
      this.currentPage++;
      this.updateDisplayDocument();
    }
  }
  prevPage(){
    if (this.currentPage > 1){
          this.currentPage--;
          this.updateDisplayDocument();
        }
  }
  getStartIndex(): number {
    return  (this.currentPage - 1) * this.pageSize + 1;
  }
  getEndIndex(): number {
    const endIndex: number = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.entires);
  }
  
}
