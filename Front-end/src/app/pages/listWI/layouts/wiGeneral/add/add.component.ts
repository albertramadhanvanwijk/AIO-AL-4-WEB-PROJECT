import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SopService } from 'src/app/core/services/sop.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddGeneralComponent {
   // bread crumb items
   breadCrumbItems!: Array<{}>;
   documents!: any[];
  //  Inputan Document
    id_area!: any;
    document_title!: string;
    document_code!: string;
    // Input File
    selectedFile!: File;
    filename!: string;
    // Input Videos
    video_title: string = '';
    video_url: string = '';
    document_id!: any;
   

   constructor(private http: HttpClient, private apiService: SopService) {
  }
   ngOnInit(){
     this.breadCrumbItems = [
       { label: 'General' },
       { label: 'add'}
     ];
     this.fetchDocumentGeneral();
   }

  fetchDocumentGeneral(): void {
    this.apiService.getAllDocument().subscribe(
      (res: any) => {
        this.documents = res.data;
        this.document_id = res.data.length + 1;
        console.log(this.document_id);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  handleData(){
    this.fetchDocumentGeneral();
  }

  // File
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.apiService.uploadDocument(formData).subscribe(
      response => {
        // console.log(response);
        this.filename = response.filename;
        console.log('File sudah di upload:', this.filename);
       this.uploadData();
      },
      error => {
        console.error(error);
        // Tangani error pengunggahan
      }
    );
  }

  uploadData() {
    const formData: any = {
      videoData: [
        {
          document_id: this.document_id,
          video_title: this.video_title,
          video_url: this.video_url
        }
      ],
      documentData: [
        {
          document_title: this.document_title,
          document_code: this.document_code,
          filename: this.filename,
          id_area: this.id_area
        }
      ]
    };
    this.apiService.insertDocument(formData).subscribe(
      (res: any) => {
        console.log("Upload Succes! = ", res)
      }, error => {
        console.log(error);
      }
    );
  }


  onSubmit(): void {
    this.uploadFile();
    this.handleData();
  };
  
   

 }
