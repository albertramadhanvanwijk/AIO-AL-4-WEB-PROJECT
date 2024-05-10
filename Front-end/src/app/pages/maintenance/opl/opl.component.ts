import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opl',
  templateUrl: './opl.component.html',
  styleUrls: ['./opl.component.scss']
})
export class OplComponent implements OnInit{
  users: any[] = []; // Menginisialisasi dengan array kosong
  breadCrumbItems!: Array<{}>;

  userRole!: any;
  userArea!: any;
  userName!: any;
  namaUserRole!: string;
  team!: string;
  areaId!: any;

  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  displayUsers: any[] = [];
  startIndex: number = 0;
  endIndex: number = 0;
  totalEntries: number = 0;

  filteredSearchUsers: any[] = [];
  searchTerm: string = '';

  constructor() { }

  isUserAdmin(): boolean {
    return this.userRole === 1;
  }

  ngOnInit(): void {
    // Inisialisasi properti lainnya
    this.getBreadCrumbItems();
  }

  goToEditUser(userId: number): void {
    // Tindakan saat mengedit pengguna
  }

  getBreadCrumbItems() {
    this.breadCrumbItems = [{ label: "OPL" }];
  }

  getNamaUserRole() {
    if (this.userRole === 1) {
      this.namaUserRole = 'Admin';
    } else if (this.userRole === 2) {
      this.namaUserRole = 'User';
    } else if (this.userRole === 3) {
      this.namaUserRole = 'SPV';
    }
  }

  getDataUserLogin() {
    // Mendapatkan data pengguna saat login
  }

  updatePagination(): void {
    // Memperbarui informasi paginasi
  }

  setPage(page: number): void {
    // Menetapkan halaman paginasi
  }

  onPageChange(): void {
    // Ketika halaman berubah
  }

  calculateTotalPages(): void {
    // Menghitung total halaman
  }

  updateDisplayUsers(): void {
    // Memperbarui pengguna yang ditampilkan
  }

  nextPage(): void {
    // Ke halaman berikutnya
  }

  prevPage(): void {
    // Ke halaman sebelumnya
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  getEndIndex(): number {
    const endIndex: number = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.totalEntries);
  }

  searchUsers(): void {
    // Mencari pengguna
  }

  deleteUser(id: number) {
    // Menghapus pengguna
  }
  
}
