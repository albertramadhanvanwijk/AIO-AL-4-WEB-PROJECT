import { Component, Output, Input, ViewChild } from '@angular/core';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detail-part',
  templateUrl: './detail-part.component.html',
  styleUrls: ['./detail-part.component.scss']
})
export class DetailPartComponent {
  @ViewChild('viewDetailModal') viewDetailModal: any;
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
  selectedPart = {
    description: '',
    part_number: '',
    stock_in: 0,
    stock_out: 0,
    nama_user: '',
    keterangan: '',
    status: 'Awaiting Approval' // Default value for status
  };
  comment: string = '';

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

  openViewDetailModal(part: any) {
    this.selectedPart = part; 
    this.modalService.open(this.viewDetailModal, { centered: true }); 
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

  submitComment() {
    // Pastikan opsi dipilih dan komentar diisi sebelum mengirim dan menyimpan data
    if (this.selectedPart.status && this.comment.trim() !== '') {
      // Kirim data dan komentar yang diisi
      console.log('Komentar:', this.comment);
      console.log('Status Part:', this.selectedPart.status);
  
      // Simpan data ke local storage
      localStorage.setItem('savedData', JSON.stringify(this.selectedPart));
  
      // Simpan komentar ke local storage jika diperlukan
      this.saveCommentToLocalStorage(this.comment);
  
      // Lakukan logika pengiriman data sesuai kebutuhan aplikasi Anda
      // Misalnya, Anda dapat menggunakan layanan HTTP untuk mengirim data ke server
  
      // Setelah pengiriman data selesai, kosongkan komentar
      this.comment = '';
  
      // Tutup modal setelah pengiriman data selesai
      this.closeModal();

      // Tampilkan pesan Sweet Alert setelah berhasil mengirim komentar
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Komentar berhasil dikirim!',
        showConfirmButton: false,
        timer: 1500 // Durasi pesan tampil dalam milidetik
      });
    } else {
      // Tampilkan pesan kesalahan jika opsi tidak dipilih atau komentar tidak diisi
      alert('Silakan pilih opsi dan isi komentar sebelum mengirim.');
    }
  }
  

  closeModal() {
    // Tutup modal dengan menggunakan NgbModal
    this.modalService.dismissAll();
  }

  saveCommentToLocalStorage(comment: string) {
    // Simpan komentar ke dalam local storage
    localStorage.setItem('comment', comment);
  }

  changePartStatus(event: any) {
    // Metode untuk menangani perubahan status
  }
  
  

}
