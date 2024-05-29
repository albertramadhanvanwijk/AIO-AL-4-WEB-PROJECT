import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { SopService } from 'src/app/core/services/sop.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-update-part-enmix',
  templateUrl: './update-part-enmix.component.html',
  styleUrls: ['./update-part-enmix.component.scss']
})
export class UpdatePartEnmixComponent {
// bread crumb items
breadCrumbItems!: Array<{}>;
// Data Area
dataArea: any [] = [];
dataAreaByLine:any;

// INPUTAN
partNumber!: number;
description!: string;
areaId!: any;
qtyStock!: number;
price!: number;
image!:any;
place!:any
refurbished_at!: Date;

selectedFile!: File;
filename!: string;
paramsId!: number;
areaParamsId!: number;

constructor(private http: HttpClient, private apiService: MaintenanceService, private router: Router, private sopService: SopService, private route: ActivatedRoute) {}

ngOnInit(){
  this.getbreadCrumbItems();
  this.getAllArea();
  this.getParamsId();
  }

  getbreadCrumbItems(){
    this.breadCrumbItems = [
      { label: 'Maintenance' },
      { label: 'Update-part'}
    ];
  }

  getParamsId(){
    this.route.paramMap.subscribe(params => {
      const partIdParam = params.get('partId');
      const areaIdParam = params.get('areaId');
      if (partIdParam !== null && areaIdParam !== null) {
        this.paramsId = +partIdParam;
        this.areaParamsId = +areaIdParam;
        this.getPartById(this.paramsId);
      } else {
        console.error('Part ID parameter is null');
      }
    });
  }
  //Get Part
  getPartById(partId: number){
    this.apiService.getPartById(partId).subscribe(
      (res: any) => {
        let dataInput = res.data[0]
        this.partNumber = dataInput.part_number;
        this.description = dataInput.description;
        this.areaId = dataInput.id_area;
        this.qtyStock = dataInput.qty_stock;
        this.price = dataInput.price;
        this.image = dataInput.image;
        this.place = dataInput.place;
      }
    )
  }

  // Fecth All Area
  getAllArea(){
    this.sopService.getAllAreas().subscribe(
      (res: any) => {
        this.dataArea = res.data;
        this.dataAreaByLine = this.dataArea.filter(item => item.id_line == 3 && item.id_area != 13)
      }
    )
   }

   serviceUpdate(newData: any){
    this.apiService.updatePart(this.paramsId, newData).subscribe(
      (res:any) => {
        this.showModal();
      }
    )
   }

   updatePart(){
    if(parseInt(this.areaId) === 6){
      if (this.selectedFile) {
        this.uploadFile().subscribe(
          response => {
            this.image = response.filename;
            console.log('File sudah di upload:', this.image);
            let newData = {
              "part_number": this.partNumber,
              "description": this.description,
              "id_area": parseInt(this.areaId),
              "qty_stock": this.qtyStock,
              "price": this.price,
              "refurbished_at": this.refurbished_at,
              "image": this.image,
              "place": this.place
            }
            this.serviceUpdate(newData);
          },
          error => {
            console.error(error);
          }
        );
      } else {
        let newData = {
          "part_number": this.partNumber,
          "description": this.description,
          "id_area": parseInt(this.areaId),
          "qty_stock": this.qtyStock,
          "price": this.price,
          "refurbished_at": this.refurbished_at,
          "image": this.image,
          "place": this.place
        }
        this.serviceUpdate(newData);
      }
    } else {
      if (this.selectedFile) {
        this.uploadFile().subscribe(
          response => {
            this.image = response.filename;
            console.log('File sudah di upload:', this.image);
            let newData = {
              "part_number": this.partNumber,
              "description": this.description,
              "id_area": parseInt(this.areaId),
              "qty_stock": this.qtyStock,
              "price": this.price,
              "image": this.image,
              "place": this.place
            }
            this.serviceUpdate(newData);
          },
          error => {
            console.error(error);
          }
        );
      } else {
        let newData = {
          "part_number": this.partNumber,
          "description": this.description,
          "id_area": parseInt(this.areaId),
          "qty_stock": this.qtyStock,
          "price": this.price,
          "image": this.image,
          "place": this.place
        }
        this.serviceUpdate(newData);
      }
    }
  }  

  //  On Submit
  onSubmit(){
   this.updatePart();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  uploadFile() {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      return this.apiService.uploadDocument(formData);
  }

  

   // MODAL
   showModal(){
    $('#successModal').modal('show');
  }
  closeModal(){
    $('#successModal').modal('hide');
    this.router.navigate(['/part-maintenance', this.areaParamsId]);
  }

}

