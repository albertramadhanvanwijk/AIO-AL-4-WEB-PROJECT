import { Component } from '@angular/core';
import { SopService } from 'src/app/core/services/sop.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss'],
})
export class MasterListComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  dataDocuments!: any;
  documents!: any;
  // PAGINATION
  index: number = 1;
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  displayDocuments: any;
  entires: any;
  document_id!: string;

  // SEARCH
  searchQuery!: string;
  // DATA LOGIN
  userRole!: any;
  userName!: any;
  userArea!: any;

  //  title
  category!: string;
  id_area!: number;

  constructor(
    private apiService: SopService,
    private modalService: NgbModal,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Master List' }];
    this.fetchAllDocuments();
  }

  getDataUserLogin() {
    this.userRole = this.authService.getRoleID();
    this.userName = this.authService.getUserName();
    this.userArea = this.authService.getAreaName();
  }

  fetchAllDocuments() {
    this.apiService.getAllDocument().subscribe(
      (res: any) => {
        this.documents = res.data;
        this.dataDocuments = this.documents.filter(
          (document: any) => !document.is_deleted
        );
        this.entires = this.dataDocuments.length;
        this.calculateTotalPages();
        this.updateDisplayDocuments();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // SEARCH
  onSearch() {
    this.currentPage = 1;
    if (this.searchQuery.trim() === '') {
      this.updateDisplayDocuments();
    } else {
      this.displayDocuments = this.dataDocuments.filter(
        (document: any) =>
          document.document_title
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          document.nama_area
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
      this.calculateTotalPages();
    }
  }

  // MODAL DELETE
  centerModal(id: any, removeModal: any) {
    this.document_id = id;
    this.modalService.open(removeModal, { centered: true });
  }

  softDelete() {
    const dataUpdate: any = {
      is_deleted: true,
    };

    this.apiService.softDelete(this.document_id, dataUpdate).subscribe(
      (res: any) => {
        console.log('Successfully deleted document', res);
        this.fetchAllDocuments();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayDocuments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayDocuments = this.dataDocuments.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayDocuments();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayDocuments();
    }
  }
  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  getEndIndex(): number {
    const endIndex: number = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.entires);
  }
}
