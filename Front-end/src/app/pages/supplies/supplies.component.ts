import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/core/services/api-service.service';
import { Router } from '@angular/router';
import { StatusService } from 'src/app/core/services/status.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.scss'],
})
export class SuppliesComponent implements OnInit {
  @Output() indicatorStatusChanged: EventEmitter<string> = new EventEmitter<string>();

  breadCrumbItems!: Array<{}>;

  supplies: any[] = [];
  areas: any[] = [];
  selectedArea: any;
  filteredSupplies: any[] = [];
  users: any[] = [];
  user: any;
  userName!: any;
  userId!: any;
  resv_date: string = '';
  description!: any;

  dataSupplies!: any;
  supplyId!: number;

  selectedSupply: any;
  transactionType: string = 'IN';
  quantity: number = 0;
  transactionDate: string = '';
  selectedTransactionType: string = '';

  showAddFormFlag: boolean = false;

  searchTerm: string = '';
  filteredSearchSupplies: any[] = [];

  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  displaySupplies: any[] = [];
  startIndex: number = 0;
  endIndex: number = 0;
  totalEntries: number = 0;

  userRole!: any;
  userArea!: any;
  namaUserRole!: string;
  team!: string;
  areaId!: any;

  indicatorColors: any = {
    green: 'green',
    red: 'red',
    blue: 'blue'
  };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private statusService: StatusService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.statusService.setIBFStatus('green');
    this.statusService.setPreparasiStatus('green');
    this.statusService.setPackingStatus('green');
  }

  isUserAdmin(): boolean {
    return this.userRole === 1;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const areaParam = params['area'];
      if (areaParam) {
        this.selectedArea = areaParam;
        this.applyAreaFilter();
      }
    });

    this.getNamaUserRole();
    this.fetchSupplies();
    this.fetchAreas();
    this.fetchUsers();
    this.getDataUserLogin();
    this.getBreadCrumbItems();
  }

  getDataUserLogin() {
    this.userName = this.authService.getUserName();
    this.userId = this.authService.getUserId();
    const role = this.authService.getRoleID();
    this.userRole = parseInt(role);
  }

  getNamaUserRole() {
    if (this.userRole === 1) {
      this.namaUserRole = 'Admin';
    } else if (this.userRole === 2) {
      this.namaUserRole = 'User';
    } else if (this.userRole === 3) {
      this.namaUserRole = 'SPV';
    } else if (this.userRole === 4) {
      this.namaUserRole = 'MTC';
    }
  }

  fetchSupplies(): void {
    this.apiService.getAllSupplies().subscribe(
      (res: any) => {
        this.supplies = res.data[0];
        this.dataSupplies = this.supplies.filter((supply) => !supply.is_deleted);
        this.applyAreaFilter();
        this.applySearchFilter();
        this.calculateTotalPages();
        this.updateDisplaySupplies();

        this.updateSupplyStatusInArea('IBF');
        this.updateSupplyStatusInArea('PREPARASI');
        this.updateSupplyStatusInArea('PACKING');
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  fetchAreas(): void {
    this.apiService.getAllAreas().subscribe(
      (res: any) => {
        this.areas = res.data;
        this.applyAreaFilter();
        this.applySearchFilter();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  applyAreaFilter(): void {
    if (this.selectedArea === '') {
      this.filteredSupplies = this.dataSupplies;
    } else {
      this.filteredSupplies = this.dataSupplies ? this.dataSupplies.filter((supply: any) => supply.nama_area === this.selectedArea) : [];
    }
    this.applySearchFilter();
    this.updatePagination();
  }

  applySearchFilter(): void {
    if (this.searchTerm) {
      this.filteredSearchSupplies = this.filteredSupplies.filter((supply) =>
        supply.nama_supply.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredSearchSupplies = this.filteredSupplies;
    }
    this.currentPage = 1;
    this.updatePagination();

    this.filteredSearchSupplies.forEach((supply) => {
      supply.stok = parseInt(supply.stok);
      supply.minimal_stok = parseInt(supply.minimal_stok);
    });
  }

  softDelete(id: number) {
    this.apiService.softDelete(id).subscribe(
      (res: any) => {
        this.fetchSupplies();
      },
      (error: any) => {
        console.error('Error saat menghapus persediaan:', error);
      }
    );
  }

  filterByCategory(category: string): void {
    switch (category) {
      case 'IBF':
        this.selectedArea = 'IBF';
        break;
      case 'PREPARASI':
        this.selectedArea = 'PREPARASI';
        break;
      case 'PACKING':
        this.selectedArea = 'PACKING';
        break;
      default:
        this.selectedArea = '';
    }

    this.applyAreaFilter();
  }

  getIndicatorColor(stok: number, minimal_stok: number, max_stok: number): string {
    if (stok > max_stok) {
      return this.indicatorColors.blue;
    } else if (stok >= minimal_stok) {
      return this.indicatorColors.green;
    } else {
      return this.indicatorColors.red;
    }
  }

  updateSupplyStatusInArea(area: string): void {
    let isBadSupply = false;
    const suppliesInArea = this.supplies.filter((supply) => supply.nama_area === area);

    suppliesInArea.forEach((supply) => {
      const isGood = supply.stok >= supply.minimal_stok;
      if (!isGood) {
        isBadSupply = true;
      }
    });

    const status = isBadSupply ? 'red' : 'green';

    switch (area) {
      case 'IBF':
        this.statusService.setIBFStatus(status);
        break;
      case 'PREPARASI':
        this.statusService.setPreparasiStatus(status);
        break;
      case 'PACKING':
        this.statusService.setPackingStatus(status);
        break;
      default:
    }
  }

  goToAddSupply(): void {
    this.router.navigate(['/add-supply'], { queryParams: { area: this.selectedArea } });
  }

  goToEditSupply(supplyId: number): void {
    this.router.navigate(['/edit-supply', supplyId], { queryParams: { area: this.selectedArea } });
  }

  goToDetailSupply(supplyId: number): void {
    this.router.navigate(['/detail-supply', supplyId], { queryParams: { area: this.selectedArea } });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredSearchSupplies.length / this.pageSize);
    this.currentPage = Math.max(1, Math.min(this.currentPage, this.totalPages));
    this.updateDisplaySupplies();
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplaySupplies();
    }
  }

  onPageChange(): void {
    this.updateDisplaySupplies();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredSearchSupplies.length / this.pageSize);
  }

  updateDisplaySupplies(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displaySupplies = this.filteredSearchSupplies.slice(startIndex, endIndex);
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
    const endIndex: number = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.totalEntries);
  }

  getAreaIdByName(areaName: string): string | null {
    const area = this.areas.find((area) => area.nama_area === areaName);
    return area ? area.id_area : null;
  }

  showAddFormTransaction(supply: any): void {
    this.selectedSupply = supply;
    this.transactionType = 'IN';
    this.quantity = 1;
    this.resv_date = supply.resv_date;

    const areaId = this.getAreaIdByName(supply.nama_area);
    if (areaId) {
      this.selectedArea = areaId;
      this.addTransaction();
    } else {
      console.error('ID area not found for the selected supply.');
    }
  }

  fetchUsers(): void {
    this.apiService.getAllUsers().subscribe(
      (res: any) => {
        this.users = res.data[0];
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  cancelAddTransaction(): void {
    this.selectedSupply = null;
    this.transactionType = 'IN';
    this.quantity = 0;
    this.transactionDate = '';
    this.selectedTransactionType = '';
    this.user = null;
  }

  addTransaction(): void {
    const areaId = this.getAreaIdByName(this.selectedSupply.nama_area);
    const idCategory = this.selectedTransactionType === 'IN' ? 1 : 2;
    const data = {
      id_supply: this.selectedSupply.id_supply,
      id_category: idCategory,
      jumlah: this.quantity,
      tanggal: this.transactionDate,
      id_user: this.userId,
      id_area: areaId,
      resv_date: this.selectedTransactionType === 'IN' ? this.resv_date : null, // Hanya mengirimkan reservation date jika transactionType adalah 'IN'
      description: this.description,
    };
    
    this.apiService.insertTransaction(data).subscribe(
      (res: any) => {
        this.showAddFormFlag = false;
        this.cancelAddTransaction();
        this.fetchSupplies();
      },
      (error: any) => {
        console.error('Error adding transaction:', error);
      }
    );
  }   

  getBreadCrumbItems() {
    this.breadCrumbItems = [{ label: "DATA SUPPLIES" }];
  }

  getStatusText(stock: number, minimalStok: number, maxStok: number): string {
    if (stock < minimalStok) {
      return "Low";
    } else if (stock > maxStok) {
      return "High";
    } else {
      return "Optimal";
    }
  }
  getStatusTextColor(stock: number, minimalStok: number, maxStok: number): string {
    if (stock < minimalStok) {
      return "red"; 
    } else if (stock > maxStok) {
      return "blue";
    } else {
      return "green"; 
    }
  }
  
}
