import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SopService } from 'src/app/core/services/sop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateGeneralComponent {
// bread crumb items
breadCrumbItems!: Array<{}>;
documents!: any;
//  Inputan Document
 id_area!: any;
 document_title!: string;
 document_code!: string;
 // Input File
 selectedFile!: File;
 filename!: string;
 backendPdfUrl!: string;
 // Input Videos
 video_title: string = '';
 video_url: string = '';
 document_id!: any;
 params_id!: any;

  constructor(private http: HttpClient, private apiService: SopService, private route: ActivatedRoute){}

  ngOnInit(){
    this.breadCrumbItems = [
      {label: 'Master List'},
      {label: 'Update'}
    ];
    this.route.params.subscribe(params => {
      this.params_id= +params['document_id'];
      this.fetchDocumentById();
      console.log(this.params_id) // Assuming parameter name is 'document_id' 
    });
    console.log(this.selectedFile) // Assuming parameter name is '
    
}

  fetchDocumentById(){
    this.apiService.getDocumentById(this.params_id).subscribe(
      (res: any) => {
        this.documents = res.data[0];
        this.document_title = this.documents.document_title;
        this.document_code = this.documents.document_code;
        this.video_title = this.documents.video_title;
        this.video_url = this.documents.video_url;
        this.id_area = this.documents.id_area;
        this.filename = this.documents.filename;
        this.getFileName();
      }
    )
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    const inputElement = event.target;
    if (inputElement.files.length > 0) {
      this.filename = inputElement.files[0].name;
    } else {
      this.filename = 'No file chosen';
    }
  }

  getFileName(){
    this.backendPdfUrl = `http://localhost:8800/api/file/${this.filename}`;
  }
  

  uploadFile(){
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.apiService.uploadDocument(formData).subscribe(
      response => {
        // console.log(response);
        this.filename = response.filename;
        console.log('File sudah di upload:', this.filename);
      },
      error => {
        console.error(error);
        // Tangani error pengunggahan
      }
    );
  }

  updateDocument(){
    this.uploadFile();
    setTimeout(() => {
      this.updateData();
    }, 1000);
    
  }

  updateData(){
    const formData: any = {
      videoData: 
        {
          document_id: this.params_id,
          video_title: this.video_title,
          video_url: this.video_url
        },
      documentData:
        {
          document_title: this.document_title,
          document_code: this.document_code,
          filename: this.filename,
          id_area: this.id_area
        }
    };
    console.log(formData);
    this.apiService.updateDocument(this.params_id, formData).subscribe(
      (res: any) => {
        console.log("Update Succes! = ", res)
      }, error => {
        console.log(error);
      }
    );
  }

  onSubmit(){
    if(this.selectedFile != undefined){
      this.updateDocument();
    } else {
      this.updateData();
    }
  }

}
