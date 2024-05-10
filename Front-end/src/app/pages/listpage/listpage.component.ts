import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/core/services/status.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-listpage',
  templateUrl: './listpage.component.html',
  styleUrls: ['./listpage.component.scss'],
})
export class ListpageComponent implements OnInit {

  breadCrumbItems!: Array<{}>;

  ibfStatus: string = '';
  preparasiStatus: string = '';
  packingStatus: string = '';

  userRole!: any;
  userArea!: any;
  userName!: any;
  namaUserRole!: string;
  team!: string;
  areaId!: any;

  // Tambahkan variabel untuk mengontrol keadaan filter
  showFilter: boolean = false;

  constructor(private statusService: StatusService, private authService: AuthService) {}

  isUserAdmin(): boolean {
    return this.userRole === 1;
  }

  ngOnInit(): void {
    this.getDataUserLogin();
    this.getNamaUserRole();
    this.getBreadCrumbItems();

    this.statusService.getIBFStatus().subscribe((status) => {
      this.ibfStatus = status;
    });

    this.statusService.getPreparasiStatus().subscribe((status) => {
      this.preparasiStatus = status;
    });

    this.statusService.getPackingStatus().subscribe((status) => {
      this.packingStatus = status;
    });

    this.getAreaId();
  }

  getAreaId() {
    this.team = this.userArea; 
  
    if (this.team === 'IBF') {
      this.areaId = 1;
    } else if (this.team === 'PREPARASI') {
      this.areaId = 2;
    } else if (this.team === 'PACKING') {
      this.areaId = 3;
    } else if (this.team === 'GENERAL') {
      this.areaId = 4;
    }
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

  getBreadCrumbItems(){
    this.breadCrumbItems = [{ label: "AREA" }]; 
  }

  // Fungsi untuk mengubah keadaan filter
  toggleFilter() {
    this.showFilter = !this.showFilter;
  }
}
