import { Component } from '@angular/core';
import { SopService } from 'src/app/core/services/sop.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-user-progress',
  templateUrl: './list-user-progress.component.html',
  styleUrls: ['./list-user-progress.component.scss']
})
export class ListUserProgressComponent {
breadCrumbItems!: Array<{}>;
params_id!: any;
category!: any;

// PAGINATION
index: number = 1;
pageSize: number = 20;
currentPage: number = 1;
totalPages: number = 0;
displayUsers: any;
entires: any;

// FecthUsers
dataUsers!: any;
usernames!: any;
userId!: any;
userRole!: any;
userGroup!: any;
userName!: any;
userArea!: any;

// Search
searchQuery!: any;

constructor(private apiService: SopService, private modalService: NgbModal, private authService: AuthService, private route: ActivatedRoute) { }

ngOnInit(){
  this.getDataUserLogin();
  this.breadCrumbItems = [{ label: "List User" }];
  this.getParamsId();
  this.getTitle();
  this.fetchUser();
  this.userGroup = parseInt(this.userGroup);

}

getDataUserLogin(){
  this.userRole = this.authService.getRoleID();
  this.userName = this.authService.getUserName();
  this.userArea = this.authService.getAreaName();
  this.userGroup = this.authService.getUserGroup();
}

getTitle(): void {
  if(this.params_id === 1){
    this.category = 'IBF'
  } if(this.params_id === 2){
    this.category = 'Preparasi'
  } if(this.params_id === 3){
    this.category = 'Packing'
  } if(this.params_id === 4){
    this.category = 'General'
  }
}

getParamsId(){
  this.route.params.subscribe(params => {
    this.params_id = +params['area_id'];
  } )
}

fetchUser(){
  this.apiService.getAllUsersByAreaId(this.params_id, this.userGroup).subscribe(
    (res: any) => {
      this.dataUsers = res.data;
      this.dataUsers.forEach((user: any) => {
        this.apiService.getPercentageProgressByArea(user.id_user, this.params_id).subscribe(
          (res: any) => {
            user.percentage = res.roundedPercentage;
          },
          error => {
            console.log(error);
          }
        );
      });
      
      this.entires = this.dataUsers.length;
      this.calculateTotalPages();
      this.updateDisplayUser();
    },
    error => {
      console.log(error);
    }
  )
}

// SEARCH
onSearch() {
  this.currentPage = 1; 
  if (this.searchQuery.trim() === '') {
    this.updateDisplayUser();
  } else {
    this.displayUsers = this.dataUsers.filter((user: any) => {
      const namaUserLowerCase = user.nama_user.toLowerCase();
      const percentageLowerCase = (user.percentage || '').toString().toLowerCase();
      const searchQueryLowerCase = this.searchQuery.toLowerCase();
      const userMatchesQuery = (
        namaUserLowerCase.includes(searchQueryLowerCase) ||
        percentageLowerCase.includes(searchQueryLowerCase)
      );

      return userMatchesQuery;
      });
    this.calculateTotalPages();
  }
}

// Pagination
calculateTotalPages() {
  this.totalPages = Math.ceil(this.entires / this.pageSize);
}

updateDisplayUser(){
  const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayUsers = this.dataUsers.slice(startIndex, endIndex);
}

nextPage(){
  if (this.currentPage < this.totalPages){
    this.currentPage++;
    this.updateDisplayUser();
  }
}
prevPage(){
  if (this.currentPage > 1){
        this.currentPage--;
        this.updateDisplayUser();
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
