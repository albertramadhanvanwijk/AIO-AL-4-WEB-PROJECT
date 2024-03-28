import { Component } from '@angular/core';
import { SopService } from 'src/app/core/services/sop.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
declare var $: any;
// import { PdfViewerModule } from 'ng2-pdf-viewer';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewGeneralComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  documentUrl!: SafeResourceUrl;
  // Data Document
  backendPdfUrl!: SafeResourceUrl;
  videoUrl!: string | undefined;
  areaName!: string ;
  dataDocument!: any;
  documentId!: number;
  filename!: string;

  // PROGRESS
  updateData!: any;

   // DATA LOGIN
   userRole!: any;
   userName!: any;
   userArea!: any;
   areaId!: number;
   userId!: any;
   // Store the PDF URL here

  //  Button Action
  isButtonDisabled: boolean = true;
  showAlerts: boolean = false;
  

  constructor(private apiService: SopService, private modalService: NgbModal, private authService: AuthService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router){}

  ngOnInit(){
    this.breadCrumbItems = [
      { label:this.userArea},
      { label: 'View'}
    ];
    // Get Data Document
    this.route.params.subscribe(params => {
      this.documentId = +params['document_id']; // Assuming parameter name is 'document_id' 
    });
    this.getDocumentById();
    this.getDataUserLogin();
  }

  getDataUserLogin(){
    this.userRole = this.authService.getRoleID();
    this.userName = this.authService.getUserName();
    this.userArea = this.authService.getAreaName();
    this.userId = this.authService.getUserId();
  }

  getDocumentById(){
    this.apiService.getDocumentById(this.documentId).subscribe(
      (res: any) => {
        this.dataDocument = res.data[0];
        // console.log(this.dataDocument);
        this.areaName = this.dataDocument.nama_area
        this.getFileName();
        // this.getSafeVideoUrl();
      },
      error => {
        console.error(error);
      }
    );
  }

  getFileName(){
    this.filename = this.dataDocument.filename;
    const pdfUrl = `http://localhost:8800/api/file/${this.filename}`;
    this.backendPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }

  getSafeVideoUrl(): SafeResourceUrl | undefined {
    if (this.dataDocument && this.dataDocument.video_url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.dataDocument.video_url);
    }
    return undefined;
  }

  onSubmit(){
    // if(this.isButtonDisabled){
    //   this.showAlerts = true
    // } else {
    //   this.updateProgress();
    // }
    this.updateProgress();
  }

  updateProgress(){
    this.apiService.updateProgress(this.documentId, this.userId).subscribe(
      (res: any) => {
        console.log(res);
      },
      error => {
        console.error(error);
      }
    )
    this.showModalSuccess();
  }

  showModalSuccess(){
    $('#successModal').modal('show');
  }

  closeModalSuccess(){
    $('#successModal').modal('hide');
    this.router.navigate(['/sop']);
  }


  onVideoOrPdfClick() {
    // Mengaktifkan tombol "SELESAI"
    this.isButtonDisabled = false;
    this.showAlerts = false
  }

}

