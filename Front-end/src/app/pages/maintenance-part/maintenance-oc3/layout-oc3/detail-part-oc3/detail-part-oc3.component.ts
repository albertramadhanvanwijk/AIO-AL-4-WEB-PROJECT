import { Component, Output, Input } from '@angular/core';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-part-oc3',
  templateUrl: './detail-part-oc3.component.html',
  styleUrls: ['./detail-part-oc3.component.scss']
})
export class DetailPartOc3Component {
 // BreadCrumb
 breadCrumbItems!: Array<{}>;
 
 // PAGINATION
 index: number = 1;
 pageSize: number = 20;
 currentPage: number = 1;
 totalPages: number = 0;
 displayParts: any;
 entires: any;
 document_id!: string;

 titlePart!: any;
 
  // SEARCH
  searchQuery!: string;

  // Data Output
  dataOutputPart!: any;
  isNull!: boolean;
  partId!: number;
  outputPartId!: number;
  qty_stock!: number;
  totalIN!: number;
  pricePart!: number;

  // Data User Login
  userRole!: any;

  // Filter Date
  startDateFilter: string = '';
  endDateFilter: string = '';
  selectAllDates: boolean = false;

  // Form Update
  updateForm!: FormGroup;
  stock_out!: number;
  dateOut!: Date;

  exportPdf_now: boolean = false;

  constructor(
    private apiservice: MaintenanceService, 
    private modalService: NgbModal, 
    private authService: AuthService, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    ) { 
      this.updateForm = this.fb.group({
        'remain': [null, Validators.required],
        'updated_at': [this.dateOut, Validators.required]
      })
    }

  ngOnInit() {
    this.getBreadCrumbItems();
    this.getDataUserLogin();
    this.getParamsId();
    
   }
 
   getBreadCrumbItems(){
     this.breadCrumbItems = [{ label: "List output part" }]; 
   }

   getParamsId(){
    this.route.paramMap.subscribe(params => {
      const partIdParam = params.get('partId');
      if (partIdParam !== null) {
        this.partId = +partIdParam;
        this.fecthDataOutput(this.partId);
      } else {
        console.error('Area ID parameter is null');
      }
    });
    this.getPartByPartId()
   }

   getDataUserLogin(){
    const role = parseInt(this.authService.getRoleID());
    this.userRole = role
  }

  // DATE FORMATTERS
 formatDate(isoDateString: string): string {
    const date = new Date(isoDateString);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      // hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
      // timeZoneName: 'short',
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// fecth data output by part_id
  fecthDataOutput(partId: number){
    this.apiservice.getDetailOutput(partId).subscribe(
      (res: any) => {
        if (res.data.length !== 0) {
          this.dataOutputPart = res.data;
          this.entires = this.dataOutputPart.length;
          this.qty_stock = res.data[0].qty_stock;
          this.getTotalIn()
        } else {
          this.isNull = true
          this.dataOutputPart = [];
          this.entires = 0;
          this.qty_stock = 0;
        }
        
        
        this.calculateTotalPages();
        this.updateDisplayOutput();
      }, (error) => {
        console.log(error, "Fecth Data Output Error");
      }
    )
  }

  getTotalIn(){
    this.apiservice. getTotalRemainInByPartId(this.partId).subscribe(
      (res: any) => {
        this.totalIN = res
      }
    )
  }

  getPartByPartId(){
    this.apiservice.getPartById(this.partId).subscribe(
      (res: any) => {
        this.pricePart = res.data[0].price;
        this.titlePart = res.data[0].description;
      }
    )
  }

 
  // Filter Date
  applyDateFilter(){
    if (this.selectAllDates) {
      this.startDateFilter = '';
      this.endDateFilter = '';
    }
    
    this.displayParts = this.dataOutputPart.filter((data: any) => {
      const ouputDate = new Date(data.created_at);

      if (this.startDateFilter) {
        const startFilterDate = new Date(this.startDateFilter);
        startFilterDate.setHours(0, 0, 0, 0);
        if (ouputDate < startFilterDate) {
          
          return false;
        }
      }

      if (this.endDateFilter) {
        const endFilterDate = new Date(this.endDateFilter);
        endFilterDate.setHours(23, 59, 59, 999);
        if ( ouputDate > endFilterDate) {
          return false;
        }
      }

      return true;
    });

  }

  exportToPDF() {
    const element = document.getElementById('tableToExport');
    const text = `Report Transaction Part`;
  
    if (element) {
      const pdf = new jsPDF('p', 'px', 'letter');
      const options = { background: 'white', scale: 2 };
  
      html2canvas(element, options).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
  
        let y = 40;

        pdf.setFontSize(14);
        pdf.text(`PT Amerta Indah Otsuka`, 30, y);
        y += 20;

        pdf.setFontSize(18);
        pdf.text(`${this.titlePart}`, 30, y);
        y += 20;

        pdf.setFontSize(18);
        pdf.text(text, 30, y);
        y += 20;
        
        pdf.setFontSize(12);
        pdf.text(`Dept. Produksi AL4`, 30, y);
        y += 20;
        
        pdf.setFontSize(12);
        pdf.text(`_______________________________________________________________________________`, 30, y);
        y += 20;
        
        pdf.setFontSize(11);
        const today = new Date().toLocaleDateString();
        pdf.text('Tanggal: ' + today, 350, y);
        y += 15;
  
        // Menyesuaikan lebar dan tinggi gambar agar sesuai dengan halaman PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const scaleFactor = pdfWidth / imgWidth;
  
        const finalImgWidth = imgWidth * scaleFactor;
        const finalImgHeight = imgHeight * scaleFactor;
  
        // Menghitung margin kiri dan kanan
        const marginLeft = (pdfWidth - finalImgWidth) / 2;
        const marginRight = (pdfWidth - finalImgWidth) / 2;
  
        pdf.addImage(imgData, 'PNG', marginLeft, y, finalImgWidth, finalImgHeight);
  
        pdf.save('Output_Part.pdf');
        this.exportPdf_now = false;
      });
    } else {
      console.error('Elemen dengan ID "tableToExport" tidak ditemukan.');
    }
  }

  exportPDF(){
    this.exportPdf_now = true;
    this.exportToPDF()
  }

  onUpdate(){
    const dataForm = this.updateForm.value
   this.apiservice.updateOutput(dataForm, this.outputPartId).subscribe(
    (res: any) => {
      console.log(res)
      this.fecthDataOutput(this.partId)
      this.modalService.dismissAll()
    }
   )
  }

  softDelete(partId: number){
    console.log('soft delete', partId)
  }

  openRemoveModal(partId: number, removeModal: any){
    this.partId = partId;
    this.modalService.open(removeModal, { centered: true });
  }
  openUpdateModal(ouputPartId:number, updateModal: any, remain: number, updateAt: Date){
    this.dateOut = updateAt
    this.stock_out = remain
    this.outputPartId = ouputPartId
    this.modalService.open(updateModal, { centered: true })
  }


  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }
  
  updateDisplayOutput(){
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayParts = this.dataOutputPart.slice(startIndex, endIndex);
  }
  nextPage(){
    if (this.currentPage < this.totalPages){
      this.currentPage++;
      this.updateDisplayOutput();
    }
  }
  prevPage(){
    if (this.currentPage > 1){
          this.currentPage--;
          this.updateDisplayOutput();
        }
  }
  getStartIndex(): number {
    return  (this.currentPage - 1) * this.pageSize + 1;
  }
  getEndIndex(): number {
    const endIndex: number = this.currentPage * this.pageSize;
    if (endIndex){
      return Math.min(endIndex, this.entires);
    } else {
      return 0
    }
    
  }

}


