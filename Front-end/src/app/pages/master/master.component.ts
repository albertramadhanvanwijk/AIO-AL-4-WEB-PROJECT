import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api-service.service';
import { SopService } from 'src/app/core/services/sop.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  users: any[] = [];
  userProgressMap: { [key: number]: boolean } = {};

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

  // List of available page sizes
  pageSizes: number[] = [10, 25, 50, 100];
  selectedPageSize: number = 10; // Default page size

  constructor(private apiService: ApiService, private router: Router, private sopService: SopService, private authService: AuthService) { }

  isUserAdmin(): boolean {
    return this.userRole === 1;
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.fecthUserProgress(12);
    this.getBreadCrumbItems();
    this.getDataUserLogin();
    this.getNamaUserRole();
  }

  fetchUsers(): void {
    this.apiService.getAllUsers().subscribe(
      (res: any) => {
        this.users = res.data[0];
        this.users.forEach((user) => {
          this.fecthUserProgress(user.id_user);
        });
        this.filteredSearchUsers = this.users;
        this.updatePagination();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  fecthUserProgress(id: number): void {
    this.sopService.getUserProgressByid(id).subscribe(
      (res: any) => {
        this.userProgressMap[id] = res.data[0] ? false : true;
      }
    );
  }

  goToEditUser(userId: number): void {
    this.router.navigate(['/app-editmaster', userId]);
  }

  getBreadCrumbItems() {
    this.breadCrumbItems = [{ label: "DATA MASTER" }];
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
    const role = this.authService.getRoleID();
    this.userRole = parseInt(role);
    this.userName = this.authService.getUserName();
    this.userArea = this.authService.getAreaName();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredSearchUsers.length / this.pageSize);
    this.currentPage = Math.max(1, Math.min(this.currentPage, this.totalPages));
    this.updateDisplayUsers();
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayUsers();
    }
  }

  onPageChange(): void {
    this.updateDisplayUsers();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredSearchUsers.length / this.pageSize);
  }

  updateDisplayUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayUsers = this.filteredSearchUsers.slice(startIndex, endIndex);
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalEntries);
  }

  searchUsers(): void {
    this.filteredSearchUsers = this.users.filter(user =>
      user.nama_user.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.updatePagination();
  }

  deleteUser(id: number) {
    this.apiService.deleteUser(id).subscribe(
      (res: any) => {
        this.fetchUsers();
      },
      (error: any) => {
        console.error('Error saat menghapus pengguna:', error);
      }
    );
  }

  // Method to change page size
  changePageSize(): void {
    this.pageSize = this.selectedPageSize;
    this.updatePagination();
  }
}
