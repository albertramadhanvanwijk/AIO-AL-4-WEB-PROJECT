import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SopService } from 'src/app/core/services/sop.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-register-progress',
  templateUrl: './register-progress.component.html',
  styleUrls: ['./register-progress.component.scss']
})
export class RegisterProgressComponent {
   // bread crumb items
   breadCrumbItems!: Array<{}>;
   documents!: any[];

  //  Params
  params_userId!: number;
  params_areaId!: number;

  category!: string;
  dataUser!: any;
  username!: string;

  document_id!: number;
  documentLength!: number;
  index: number = 0;


   constructor(private http: HttpClient, private apiService: SopService, private route: ActivatedRoute, private router: Router) {
  }

  // ngOnInit
  ngOnInit(){
    this.getParams();
    this.getTitle();
    this.breadCrumbItem();
    this.fetchUserById();
    this.getTotalDocument();
  }

  // Breadcrumb
  breadCrumbItem(){
    this.breadCrumbItems = [
      { label: this.category },
      { label: 'Add Progress'}
    ];
  }

  // Get Title Area
  getTitle(): void {
    if(this.params_areaId === 1){
      this.category = 'IBF'
    } if(this.params_areaId === 2){
      this.category = 'Preparasi'
    } if(this.params_areaId === 3){
      this.category = 'Packing'
    } if(this.params_areaId === 4){
      this.category = 'General'
    }
  }

  // Get Params
  getParams(){
    this.route.params.subscribe(
      params => {
        this.params_userId = +params['userId'];
        this.params_areaId = +params['areaId'];
      }
    )
  }

  // Get User
  fetchUserById(){
    this.apiService.getUserByUserId(this.params_userId).subscribe(
      (res: any) =>{
        this.dataUser = res.data[0];
        this.username = res.data[0].nama_user;    
      },
      (error) =>{
        console.log(error, 'Not found user with user id: ', this.params_userId);
      }
    );
  }

  // Add Progress
  addProgress(){ 
    for (let i = 1; i <= this.documentLength; i++) {
      this.index = i;
      const newDataProgress = {
        "id_user": this.params_userId,
        "document_id": this.document_id,
    }
    // console.log(newDataProgress.document_id);  
     this.apiService.addProgress(newDataProgress).subscribe(
      (res: any) => {
        // console.log(res);
      }, (error) => {
        console.log(`Data Ke- ${this.index} gagal ditambahkan!`)
      }
    )
    this.document_id = this.document_id + 1;
    }

    // console.log('Successfully Register User Progress');
    
  }

  showModal(){
    $('#successModal').modal('show');
  }

  closeModal(){
    this.router.navigate(['/master']);
    $('#successModal').modal('hide');
  }

  // Submit
  onSubmit(){
    this.addProgress();
    this.showModal();
  }

  getTotalDocument(){
    this.apiService.getDocumentByAreaId(this.params_areaId).subscribe(
      (res: any) => {
        this.document_id = res.data[0].document_id;
        this.documentLength = res.data.length;
      }
    )
  }
}
