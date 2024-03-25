import { Component, Output, Input } from '@angular/core';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-part',
  templateUrl: './detail-part.component.html',
  styleUrls: ['./detail-part.component.scss']
})
export class DetailPartComponent {

  // BreadCrumb
  breadCrumbItems!: Array<{}>;

  // PAGINATION
  index: number = 1;
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  displayParts: any[] = [];
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
  dataPart!: any;

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
    {
      this.dataPart = {};
    }
  }

  ngOnInit() {
    this.getBreadCrumbItems();
    this.getDataUserLogin();
    this.getParamsId();
  }

  getBreadCrumbItems() {
    this.breadCrumbItems = [{ label: "List output part" }];
  }

  getParamsId() {
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

  getDataUserLogin() {
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
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  // Fetch data output by part_id
  fecthDataOutput(partId: number) {
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

  getTotalIn() {
    this.apiservice.getTotalRemainInByPartId(this.partId).subscribe(
      (res: any) => {
        this.totalIN = res
      }
    )
  }

  getPartByPartId() {
    this.apiservice.getPartById(this.partId).subscribe(
      (res: any) => {
        this.pricePart = res.data[0].price;
        this.titlePart = res.data[0].description;
      }
    )
  }

  // Filter Date
  applyDateFilter() {
    if (this.selectAllDates) {
      this.startDateFilter = '';
      this.endDateFilter = '';
    }

    this.displayParts = this.dataOutputPart.filter((data: any) => {
      const outputDate = new Date(data.created_at);

      if (this.startDateFilter) {
        const startFilterDate = new Date(this.startDateFilter);
        startFilterDate.setHours(0, 0, 0, 0);
        if (outputDate < startFilterDate) {
          return false;
        }
      }

      if (this.endDateFilter) {
        const endFilterDate = new Date(this.endDateFilter);
        endFilterDate.setHours(23, 59, 59, 999);
        if (outputDate > endFilterDate) {
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

        // Adjusting the width and height of the image to fit the PDF page
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const scaleFactor = pdfWidth / imgWidth;

        const finalImgWidth = imgWidth * scaleFactor;
        const finalImgHeight = imgHeight * scaleFactor;

        // Calculating left and right margins
        const marginLeft = (pdfWidth - finalImgWidth) / 2;
        const marginRight = (pdfWidth - finalImgWidth) / 2;

        pdf.addImage(imgData, 'PNG', marginLeft, y, finalImgWidth, finalImgHeight);

        pdf.save('Output_Part.pdf');
        this.exportPdf_now = false;
      });
    } else {
      console.error('Element with ID "tableToExport" not found.');
    }
  }

  exportPDF() {
    this.exportPdf_now = true;
    this.exportToPDF()
  }

  onUpdate() {
    const dataForm = this.updateForm.value
    this.apiservice.updateOutput(dataForm, this.outputPartId).subscribe(
      (res: any) => {
        console.log(res)
        this.fecthDataOutput(this.partId)
        this.modalService.dismissAll()
      }
    )
  }

  openRemoveConfirmationModal(partId: number, removeConfirmationModal: any) {
    this.partId = partId;
    this.modalService.open(removeConfirmationModal, { centered: true });
  }
  
  softDelete(partId: number){
    this.apiservice.softDelete(partId).subscribe(
      (res: any) => {
        this.fecthDataOutput(partId);
        this.modalService.dismissAll(); 
      }, (error: any) => {
        console.log(error, "Remove Failed");
      }
    )
}  


  openUpdateModal(ouputPartId: number, updateModal: any, remain: number, updateAt: Date) {
    this.dateOut = updateAt
    this.stock_out = remain
    this.outputPartId = ouputPartId
    this.modalService.open(updateModal, { centered: true })
  }


  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayOutput() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayParts = this.dataOutputPart.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayOutput();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayOutput();
    }
  }
  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  getEndIndex(): number {
    const endIndex: number = this.currentPage * this.pageSize;
    if (endIndex) {
      return Math.min(endIndex, this.entires);
    } else {
      return 0
    }

  }

  // getStatusColor(status: string): any {
  //   switch (status) {
  //     case 'Awaiting Approval':
  //       return { 'color': '#CDB00D', 'background-color': '#F6DF5C', 'border-radius': '5px', 'font-weight': 'bold' };
  //     case 'Approved':
  //       return { 'color': '#0D9318', 'background-color': '#54EE61', 'border-radius': '5px', 'font-weight': 'bold' };
  //     case 'Rejected':
  //       return { 'color': '#E22113', 'background-color': '#F36A61', 'border-radius': '5px', 'font-weight': 'bold' };
  //     default:
  //       return {};
  //   }
  // }
  getStatusColor(status: string) {
    switch (status) {
      case 'Approved':
        return { 'color': 'green' }; // Ubah warna teks menjadi hijau untuk status "Approved"
      case 'Rejected':
        return { 'color': 'red' }; // Ubah warna teks menjadi merah untuk status "Rejected"
      default:
        return { 'color': 'blue' }; // Atur warna teks menjadi biru sebagai default
    }
  }



}
