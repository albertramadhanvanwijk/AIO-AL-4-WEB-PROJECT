import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-visitor-al4',
  templateUrl: './visitor-al4.component.html',
  styleUrls: ['./visitor-al4.component.scss']
})
export class VisitorAl4Component implements OnInit {
  Visitor: any[] = [];
  visitorProgressMap: { [key: number]: boolean } = {};

  breadCrumbItems!: Array<{}>;

  nama_tamu!: string;
  nama_vendor!: string;
  id_card_hijau!: number;
  id_card_merah!: number;
  keperluan!: string; 
  pic!: string;
  jam_masuk!: string;
  jam_keluar!: string;

  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  displayVisitor: any[] = [];
  startIndex: number = 0;
  endIndex: number = 0;
  totalEntries: number = 0;

  filteredSearchVisitor: any[] = [];
  searchTerm: string = '';

  // List of available page sizes
  pageSizes: number[] = [10, 25, 50, 100];
  selectedPageSize: number = 10; // Default page size
  
  userRole: number = 1; // Deklarasi properti userRole dengan nilai default 1

  constructor(
    private apiService: ApiService, 
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getBreadCrumbItems();
    this.fetchVisitor();
  }

  // Method untuk mengambil data pengunjung dari API
  fetchVisitor(): void {
    this.apiService.getVisitors().subscribe(
      (data: any) => {
        this.Visitor = data;
        this.filteredSearchVisitor = this.Visitor;
        this.totalEntries = this.Visitor.length;
        this.updatePagination();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // Method untuk menavigasi ke halaman edit pengunjung
  goToEditVisitor(visitorId: number): void {
    this.router.navigate(['/app-editvisitor', visitorId]);
  }

  // Method untuk mendapatkan item bread crumb
  getBreadCrumbItems(): void {
    this.breadCrumbItems = [{ label: "DATA VISITOR" }];
  }

  // Method untuk mengupdate pagination
  updatePagination(): void {
    this.calculateTotalPages();
    this.currentPage = Math.max(1, Math.min(this.currentPage, this.totalPages));
    this.updateDisplayVisitor();
  }

  // Method untuk mengatur halaman
  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayVisitor();
    }
  }

  // Method ketika terjadi perubahan halaman
  onPageChange(): void {
    this.updateDisplayVisitor();
  }

  // Method untuk menghitung total halaman
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredSearchVisitor.length / this.pageSize);
  }

  // Method untuk mengupdate data yang ditampilkan pada halaman
  updateDisplayVisitor(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayVisitor = this.filteredSearchVisitor.slice(startIndex, endIndex);
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }

  // Method untuk halaman berikutnya
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  // Method untuk halaman sebelumnya
  prevPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  // Method untuk mendapatkan indeks awal
  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  // Method untuk mendapatkan indeks akhir
  getEndIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalEntries);
  }

  // Method untuk melakukan pencarian pengunjung
  searchVisitor(): void {
    this.filteredSearchVisitor = this.Visitor.filter(visitor =>
      visitor.nama_tamu.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.updatePagination();
  }

  // Method untuk menghapus pengunjung
  deleteVisitor(visitorId: number): void {
    this.apiService.deleteVisitor(visitorId).subscribe(
      (res: any) => {
        this.fetchVisitor();
      },
      (error: any) => {
        console.error('Error saat menghapus pengunjung:', error);
      }
    );
  }

  // Method untuk mengubah ukuran halaman
  changePageSize(): void {
    this.pageSize = this.selectedPageSize;
    this.updatePagination();
  }
}
