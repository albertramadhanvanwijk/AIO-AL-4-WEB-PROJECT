import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { SopService } from 'src/app/core/services/sop.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.scss']
})
export class AddPartComponent {
    // bread crumb items
    breadCrumbItems!: Array<{}>;
    
    // Data Area
    dataArea: any[] = [];
    dataAreaByLine:any;
    
    // INPUTAN
    partNumber!: number;
    description!: string;
    areaId!: any;
    qtyStock!: number;
    price!: number;
    image!:any;
    place!:any

    selectedFile!: File;
    filename!: string;
    
    
    constructor(private http: HttpClient, private apiService: MaintenanceService, private router: Router, private sopService: SopService) {}
    
    ngOnInit(){
        this.getbreadCrumbItems();
        this.getAllArea();
    }
    
    getbreadCrumbItems(){
        this.breadCrumbItems = [
            { label: 'Maintenance' },
            { label: 'add-part'}
        ];
    }
    
    getAllArea(){
        this.sopService.getAllAreas().subscribe(
            (res: any) => {
                this.dataArea = res.data;
                this.dataAreaByLine = this.dataArea.filter(item => item.id_line == 1 && item.id_area != 4)
            }
        )
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
    
    onSubmit(){
        if (parseInt(this.areaId) === 6) {
            if (this.selectedFile) {
                this.uploadFile().subscribe(
                    response => {
                        this.filename = response.filename;
                        console.log('File sudah di upload:', this.filename);
                        this.insertDocument();
                    },
                    error => {
                        console.error(error);
                    }
                );
            } else {
                let data = {
                    "id_area": parseInt(this.areaId),
                    "part_number": this.partNumber,
                    "description": this.description,
                    "refurbished_at": new Date(),
                    "qty_stock": this.qtyStock,
                    "line": "AL4",
                    "price": this.price,
                    "image": this.filename,
                    "place": this.place,
                }
                this.insertDocument(data);
            }
        } else {
            if (this.selectedFile) {
                this.uploadFile().subscribe(
                    response => {
                        this.filename = response.filename;
                        console.log('File sudah di upload:', this.filename);
                        this.insertDocument();
                    },
                    error => {
                        console.error(error);
                    }
                );
            } else {
                let data = {
                    "id_area": parseInt(this.areaId),
                    "part_number": this.partNumber,
                    "description": this.description,
                    "qty_stock": this.qtyStock,
                    "line": "AL4",
                    "price": this.price,
                    "image": this.filename,
                    "place": this.place
                }
                this.insertDocument(data);
            }
        }
    }    
    
    insertDocument(data?: any){
        if (!data) {
            data = {
                "id_area": parseInt(this.areaId),
                "part_number": this.partNumber,
                "description": this.description,
                "qty_stock": this.qtyStock,
                "line": "AL4",
                "price": this.price,
                "image": this.filename,
                "place": this.place,
            }
        }
        this.apiService.insertPart(data).subscribe(
            (res: any) => {
                this.showModal();
            }
        )
    }    
    
    showModal(){
        $('#successModal').modal('show');
    }
    
    closeModal(){
        $('#successModal').modal('hide');
        this.router.navigate(['/maintenance']);
    }

}
