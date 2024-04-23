import { Component, EventEmitter, Output } from '@angular/core';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenance-gbl',
  templateUrl: './maintenance-gbl.component.html',
  styleUrls: ['./maintenance-gbl.component.scss']
})
export class MaintenanceGblComponent {
  title = ''
 
  imageUrl: string = 'path/to/fullresimage.jpg';
  // scaleRange: number = 1;
  // xValue: number = 0;
  // yValue: number = 0;

  // BreadCrumb
 breadCrumbItems!: Array<{}>;
  
 // PAGINATION
 index: number = 1;
 pageSize: number = 20;
 currentPage: number = 1;
 totalPages: number = 0;
 displayParts: any;
 entires: any;
 partId!: number;

 // SEARCH
 searchQuery!: string;
 selectedArea: number = 4;

 // data parts
 dataParts!: any;
 isNull: boolean = false;
 areaName!: string;
 dataPartById:any;

 // Data User Login
 userRole!: any;
 
 // parameters areaID
 areaId!: number;

 // Filter Date
 filterDate!: Date | null;

 stockRemain: any;


 constructor(private apiservice: MaintenanceService, private modalService: NgbModal, private authService: AuthService, private route: ActivatedRoute, private router: Router) { 
    // this.imageUrl = 'path/to/fullresimage.jpg'; // Isi dengan URL gambar default jika ada
    // this.scaleRange = 1;
    // this.xValue = 0;
    // this.yValue = 0;
 }

 ngOnInit(): void{
   this.getParams();
   this.getBreadCrumbItems();
   this.getDataUserLogin();
  //  let myNumber: number;
  //   myNumber = 10;

  //   // Gunakan variabel myNumber di sini sesuai kebutuhan
  //   console.log(myNumber);
   
 }

//  valueChanged(value: number) {
//   if (value === 1) {
//     this.scaleRange = 1;
//   } else {
//     this.scaleRange = value;
//   }
// }

// scroll(magnification: number) {
//   this.scaleRange = magnification;
// }
// mouseMove(event: MouseEvent) {
//     this.xValue = event.clientX;
//     this.yValue = event.clientY;
// }

 getDataUserLogin(){
   const role = parseInt(this.authService.getRoleID());
   this.userRole = role
 }

 getBreadCrumbItems(){
   this.breadCrumbItems = [{ label: "Maintenance" }, { label: "List Part" }]; 
 }

 getImgFile(file: any) {
   return environment.apiUrl + '/file/' + file
 }

  // MODAL View
  viewModal(partId: number, viewImage: any) {
   this.partId = partId;
   this.getPartById();
   this.modalService.open(viewImage, { centered: true, size: 'lg' });
 }

 getPartById(){
   this.apiservice.getPartById(this.partId).subscribe(
     (res: any) => {
       this.dataPartById = res.data;
       console.log(this.dataPartById);
       
   })
 }

 getParams(){
   this.route.params.subscribe(params => {
     this.areaId = +params['areaId'];
   } )
   this.fecthParts();

   if(this.areaId === 19){
     this.areaName = "PREPARASI"
   }
   if(this.areaId === 20){
     this.areaName = "PACKING IN"
   }
   if(this.areaId === 21){
     this.areaName = "PACKING OUT"
   }
   if(this.areaId === 22){
     this.areaName = "FILLING"
   }
   if(this.areaId === 23){
     this.areaName = "ELECTRICAL"
   }
 }

 // MODAL DELETE
 centerModal(partId: number, removeModal: any) {
   this.partId = partId;
   this.modalService.open(removeModal, { centered: true });
 }

 // update refurbushid
 toRefurbished(partId: number){
   let data = {
     "id_area": 12,
     "refurbished_at": new Date()
   }
   
   this.apiservice.updatePart(partId, data).subscribe(
     (res: any) => {
       console.log("Success Move This Part to Refurbished Part")
       this.fecthParts();
       this.modalService.dismissAll();
     }
   )
 }

 /**
  * Confirm sweet alert
  * @param confirm modal content
  */
 modelRefurbished(partId: number) {
   Swal.fire({
     title: 'Oops...',
     text: 'Refurbish this part?!',
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: 'rgb(3, 142, 220)',
     cancelButtonColor: 'rgb(243, 78, 78)',
     confirmButtonText: 'Yes!'
   }).then(result => {
     if (result.value) {
       Swal.fire({title: 'Successfully!', text:'Your part has been refurbish.', confirmButtonColor: 'rgb(3, 142, 220)',icon: 'success',});
       this.toRefurbished(partId)
     }
   });
 }

 softDelete(partId: number){
   this.apiservice.softDelete(partId).subscribe(
     (res: any) => {
       this.fecthParts();
       this.modalService.dismissAll(); 
     }, (error: any) => {
       console.log(error, "Remove Failed");
     }
   )
 }

 // fecth parts
 fecthParts(){
   this.apiservice.getPartsByAreaId(this.areaId).subscribe(
     (res: any) => {
       if(res.data.length !== 0){
         const parts = res.data
         this.dataParts = parts.filter((part: any) => !part.is_deleted);
         this.dataParts.forEach((part: any) =>{
           this.apiservice.getTotalRemainInByPartId(part.part_id).subscribe(
             (res: any)=>{
               if(res){
                 part.remainIn = res
               } else {
                 part.remainIn = 0
               }
             },
             (err)=>{
               console.log(err, "Total Remain not found")
             }
           )
           this.apiservice.getTotalRemainOutByPartId(part.part_id).subscribe(
             (res: any)=>{
               if(res){
                 part.remainOut = res
               } else {
                 part.remainOut = 0
               }
             },
             (err)=>{
               console.log(err, "Total Remain not found")
             }
           )
       })
       this.entires = this.dataParts.length;
       }
       else{
         this.dataParts = [];
         this.isNull = true       
       }
       this.calculateTotalPages();
       this.updateDisplayParts();
     }, (err: any) => {
       console.log(err, "Parts not found")
     }
   )
 }

  // SEARCH
  onSearch() {
   this.currentPage = 1; 
   if (this.searchQuery.trim() === '') {
       this.updateDisplayParts();
   } else {
       this.displayParts = this.dataParts.filter((part: any) =>
           part.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
           part.part_number.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
       );
       this.calculateTotalPages();
   }
}

 // DATE FORMATTERS
formatDate(isoDateString: string): string {
 const date = new Date(isoDateString);
 return new Intl.DateTimeFormat(['ban', 'id']).format(date);
}

 // Pagination
 calculateTotalPages() {
   this.totalPages = Math.ceil(this.entires / this.pageSize);
 }
 
 updateDisplayParts(){
   const startIndex = (this.currentPage - 1) * this.pageSize;
   const endIndex = startIndex + this.pageSize;
   this.displayParts = this.dataParts.slice(startIndex, endIndex);
 }
 nextPage(){
   if (this.currentPage < this.totalPages){
     this.currentPage++;
     this.updateDisplayParts();
   }
 }
 prevPage(){
   if (this.currentPage > 1){
         this.currentPage--;
         this.updateDisplayParts();
       }
 }
 getStartIndex(): number {
   return  (this.currentPage - 1) * this.pageSize + 1;
 }
 getEndIndex(): number {
   const endIndex: number = this.currentPage * this.pageSize;
   return Math.min(endIndex, this.entires);
 }

 // Method to navigate to view picture page
 onViewPicture(partId: number) {
   this.router.navigate(['/view-picture', partId]);
 }
}


