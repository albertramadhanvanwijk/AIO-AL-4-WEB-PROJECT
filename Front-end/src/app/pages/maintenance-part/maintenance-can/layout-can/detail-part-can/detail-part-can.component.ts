import { Component, Output, Input, ViewChild, TemplateRef } from '@angular/core';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-part-can',
  templateUrl: './detail-part-can.component.html',
  styleUrls: ['./detail-part-can.component.scss']
})
export class DetailPartCanComponent {
  @ViewChild('viewDetailModal') viewDetailModal: any;
  @ViewChild('viewDetailModalAfterApproval') viewDetailModalAfterApproval!: TemplateRef<any>;
  // BreadCrumb
  breadCrumbItems!: Array<{}>;

  // PAGINATION
  index: number = 1;
  pageSize: number = 1000;
  currentPage: number = 1;
  totalPages: number = 0;
  displayParts: any[] = [];
  entires: any;
  document_id!: string;
  filename: string = '';
  titlePart!: any;
  image!: any;

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
  selectedFile: File | null = null;
  area!: any;



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
  selectedPart: any = {};
  imagePreview: string | null = null;
  userrole: number = 3;
  isImageSubmitted: boolean = false;
  viewDetailModalAfterSubmitImage: any;
  selectedImage: File | null = null;
  imageSelected: boolean = false;
  modalStatus: string = 'viewDetail';
  isImageUploaded: boolean = false;


  constructor(
    private apiservice: MaintenanceService,
    private modalService: NgbModal,
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private sanitizer: DomSanitizer,
    private router: Router,

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
  getUploadedFileUrl(): string {
    return environment.apiUrl + '/file/' + this.filename;
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
    console.log('id part', partId);

    this.apiservice.getDetailOutput(partId).subscribe(
      (res: any) => {
        if (res.data.length !== 0) {
          this.dataOutputPart = res.data;
          this.entires = this.dataOutputPart.length;
          this.qty_stock = res.data[0].qty_stock;
          this.totalIN = 0; // Reset totalIN
          this.pricePart = res.data[0].price;
          this.dataOutputPart.forEach((part: any) => {
            if (part.status === 'Approved Request') {
              this.totalIN += part.stock_in;
              this.totalIN -= part.stock_out;
              this.qty_stock += part.stock;
              this.qty_stock -= part.stock; // Reduce totalIN by stock_out
            }
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

  openViewDetailModalAfterSubmitImage(part: any) {
    this.modalStatus = 'afterSubmitImage';
    // Buka modal dengan menggunakan ViewChild untuk mengakses modal template
    this.modalService.open(this.viewDetailModalAfterSubmitImage);
    this.selectedPart = part;
    if (part.status === 'Approved Request' || part.status === 'Rejected Request') {
      this.modalService.open(this.viewDetailModalAfterSubmitImage, { centered: true });
    } else {
      this.modalService.open(this.viewDetailModal, { centered: true });
    }
  }

  openViewDetailModalBasedOnRole(part: any) {
    if (this.userRole === 3) {
      this.openViewDetailModal(part);
    } else if (this.userRole === 4 || this.userRole === 1 || this.userRole === 2) {
      if (this.isImageSubmitted) {
        // Jika gambar sudah diunggah, buka modal viewDetailModalAftersubmitImage
        this.openViewDetailModalAfterSubmitImage(part);
      } else {
        // Jika belum, buka modal standar
        this.openViewDetailModal(part);
      }
    }
  }

  openRemoveConfirmationModal(partId: number, removeConfirmationModal: any) {
    this.partId = partId;
    this.modalService.open(removeConfirmationModal, { centered: true });
  }

  softDelete(partId: number) {
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

  submitImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.isImageUploaded = true;
      this.modalService.dismissAll();

      this.apiservice.uploadFile(formData).subscribe(
        (response: any) => {
          console.log('File uploaded successfully', response);
          const data: any = { image: response.filename }

          this.apiservice.updateOutput(this.selectedPart.outputpart_id, data).subscribe(
            (res: any) => {
              console.log("cekcek", res);
              // Tampilkan alert
              Swal.fire('Success', 'Image berhasil diunggah.', 'success').then((result) => {
                // Jika pengguna menekan OK, muat ulang halaman
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }
          )
        },
        (error: any) => {
          console.error('File upload failed', error);
          Swal.fire('Error', 'Gagal mengunggah image. Silakan coba lagi.', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Silakan pilih image terlebih dahulu.', 'error');
    }
  }


  // Function to submit approval
  submitApproval() {
    // Memeriksa apakah status part adalah 'Rejected Request' dan komentar tidak diisi
    if (this.selectedPart.status === 'Rejected Request' && !this.comment.trim()) {
      Swal.fire('Error', 'Harap berikan alasan untuk menolak permintaan.', 'error');
      return;
    }

    // Mengubah status part menjadi 'Approved' jika belum disetujui
    this.selectedPart.status = this.selectedPart.status === 'Approved Request' ? 'Approved Request' : 'Rejected Request';

    // Mengisi komentar otomatis jika status yang dipilih adalah "Approved"
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
          this.qty_stock += this.selectedPart.stock; // Tambahkan stock ke qty_stock setelah disetujui
          this.dataPart.qty_stock += this.selectedPart.stock;
          this.dataPart.qty_stock -= this.selectedPart.stock;
        } else if (this.selectedPart.status === 'Rejected Request') {
          // If rejected Request, revert the changes to totalIN
          this.totalIN -= this.selectedPart.stock_in;
          this.qty_stock -= this.selectedPart.stock;
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





  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.apiservice.uploadFile(formData).subscribe(
      (response: any) => {
        // Tindakan setelah unggahan berhasil
        console.log('File uploaded successfully', response);
        let data: any = {
          image: response.filename
        }

        Swal.fire('Success', 'File berhasil diunggah.', 'success');
      },
      (error: any) => {
        // Tindakan setelah unggahan gagal
        console.error('File upload failed', error);
        Swal.fire('Error', 'Gagal mengunggah file. Silakan coba lagi.', 'error');
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}