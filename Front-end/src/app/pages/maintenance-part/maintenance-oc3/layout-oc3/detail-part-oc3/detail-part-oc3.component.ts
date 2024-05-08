import { Component, Output, Input, ViewChild, TemplateRef } from '@angular/core';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detail-part-oc3',
  templateUrl: './detail-part-oc3.component.html',
  styleUrls: ['./detail-part-oc3.component.scss']
})
export class DetailPartOc3Component {
  @ViewChild('viewDetailModal') viewDetailModal: any;
  @ViewChild('viewDetailModalAfterApproval') viewDetailModalAfterApproval!: TemplateRef<any>;
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
  part: any = {};
  comment: string = '';
  pendingApprovals: any[] = [];
  showApprovalList: boolean = false;

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
  selectedPart: any;

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
    });
    this.dataPart = {};
  
    const savedData = localStorage.getItem('savedData');
    if (savedData) {
      this.selectedPart = JSON.parse(savedData);
    }
  }

  ngOnInit() {
    this.getBreadCrumbItems();
    this.getDataUserLogin();
    this.getParamsId();
    this.fecthDataOutput(this.partId);
  }

  getBreadCrumbItems() {
    this.breadCrumbItems = [{ label: "List output part" }];
  }

  getImgFile(file: any) {
    return environment.apiUrl + '/file/' + file
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
          this.totalIN = 0; // Reset totalIN
          this.pricePart = res.data[0].price;
          // Filter pengajuan yang menunggu persetujuan
          this.pendingApprovals = res.data.filter((part: any) => part.status === "Awaiting Approval");
          // Set nilai properti showApprovalList jika terdapat pengajuan yang menunggu persetujuan
          this.showApprovalList = this.pendingApprovals.length > 0;
          // Iterate through dataOutputPart and calculate totalIN based on approval status
          this.dataOutputPart.forEach((part: any) => {
            if (part.status === 'Approved Request') {
              this.totalIN += part.stock_in;
              this.totalIN -= part.stock_out; // Reduce totalIN by stock_out
            }
            // You can handle 'Rejected Request' status if needed
          });
  
          // Set default status to "Awaiting Approval" if status is not already set
          this.dataOutputPart.forEach((part: any) => {
            if (!part.status) {
              part.status = "Awaiting Approval";
            }
          });
        } else {
          this.isNull = true
          this.dataOutputPart = [];
          this.entires = 0;
          this.qty_stock = 0;
          this.totalIN = 0; // Reset totalIN when there is no data
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
    // Hide the action buttons before exporting
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
      button.classList.add('hidden');
    });
    // Hide the action table before exporting
    const actionTable = document.querySelectorAll('.action-table');
    actionTable.forEach(button => {
      button.classList.add('hidden');
    });
  
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
  
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const scaleFactor = pdfWidth / imgWidth;
  
        const finalImgWidth = imgWidth * scaleFactor;
        const finalImgHeight = imgHeight * scaleFactor;
  
        const marginLeft = (pdfWidth - finalImgWidth) / 2;
        const marginRight = (pdfWidth - finalImgWidth) / 2;
  
        pdf.addImage(imgData, 'PNG', marginLeft, y, finalImgWidth, finalImgHeight);
  
        pdf.save('Output_Part.pdf');
  
        // Show the action buttons after exporting
        actionButtons.forEach(button => {
          button.classList.remove('hidden');
        });
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

  // Fungsi untuk membuka modal detail informasi
  openViewDetailModal(part: any) {
    this.selectedPart = part;

    if (part.status === 'Approved Request' || part.status === 'Rejected Request') {
      this.modalService.open(this.viewDetailModalAfterApproval, { centered: true });
    } else {
      this.modalService.open(this.viewDetailModal, { centered: true });
    }
  }

  openViewDetailModalAfterApproval(part: any) {
    this.selectedPart = part;
    if (part.status === "Awaiting Approval") {
      part.comment = "Pending";
    }
    this.modalService.open(this.viewDetailModalAfterApproval, { centered: true });
  }

  openViewDetailModalBasedOnRole(part: any) {
    if (this.userRole === 3) {
        this.openViewDetailModal(part);
    } else if (this.userRole === 4) {
        this.openViewDetailModalAfterApproval(part);
    }
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
    console.log(this.displayParts);
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

  // Function to submit approval
  submitApproval() {
    // Memeriksa apakah status part adalah 'Rejected Request' dan komentar tidak diisi
    if (this.selectedPart.status === 'Rejected Request' && !this.comment.trim()) {
      Swal.fire('Error', 'Harap berikan alasan untuk menolak permintaan.', 'error');
      return;
    }
  
    // Mengubah status part menjadi 'Approved Request' jika belum disetujui
    this.selectedPart.status = this.selectedPart.status === 'Approved Request' ? 'Approved Request' : 'Rejected Request';

    // Mengisi komentar otomatis jika status yang dipilih adalah "Approved Request"
    if (this.selectedPart.status === 'Approved Request') {
        this.comment = 'Diterima'; // Atur komentar menjadi "Diterima"
        // Update comment in selectedPart object
        this.selectedPart.comment = this.comment;
    } else {
        // Jika status part adalah 'Rejected Request', menyimpan komentar
        this.selectedPart.comment = this.comment;
    }
  
    // Mengirim permintaan untuk memperbarui status part ke backend
    this.apiservice.updatePartStatus(this.selectedPart.outputpart_id, this.selectedPart.status, this.comment).subscribe(
      (res: any) => {
        console.log(res);
        // Update totalIN based on the changed status
        if (this.selectedPart.status === 'Approved Request') {
          this.totalIN += this.selectedPart.stock_in;
          this.totalIN -= this.selectedPart.stock_out;
        } else if (this.selectedPart.status === 'Rejected Request') {
          // If rejected, revert the changes to totalIN
          this.totalIN -= this.selectedPart.stock_in;
        }
        
        // Close the modal and show success message
        this.modalService.dismissAll();
        Swal.fire('Success', 'Status berhasil diperbarui.', 'success');
      },
      error => {
        console.error(error);
        Swal.fire('Error', 'Gagal memperbarui status. Silakan coba lagi.', 'error');
      }
    );
  }
}  