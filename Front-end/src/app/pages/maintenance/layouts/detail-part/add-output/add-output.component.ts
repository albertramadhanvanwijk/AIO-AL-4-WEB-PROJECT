import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-add-output',
  templateUrl: './add-output.component.html',
  styleUrls: ['./add-output.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class AddOutputComponent {
  breadCrumbItems!: Array<{}>;

  partId!: number;
  image!: any;
  selectedFile!: File;
  filename!: string;

  dataPart!: any;
  partName!: string;
  qtyStock!: number;
  information!: string;
  category!: any;
  newData!: any;
  newDataParts!: any;
  remain_stock!: number;
  stock: number = 0;

  userId!: any;

  constructor(
    private http: HttpClient,
    private apiService: MaintenanceService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.breadCrumbItem();
    this.getParamsId();
    this.getDataUserLogin();
  }

  getDataUserLogin() {
    const user_id = this.authService.getUserId();
    this.userId = user_id;
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

  breadCrumbItem() {
    this.breadCrumbItems = [{ label: 'List Output' }, { label: 'Add output' }];
  }

  getParamsId() {
    this.route.paramMap.subscribe((params) => {
      const partIdParam = params.get('partId');
      if (partIdParam !== null) {
        this.partId = +partIdParam;
        this.fetchPartById(this.partId);
      } else {
        console.error('Area ID parameter is null');
      }
    });
  }

  fetchPartById(partId: number) {
    this.apiService.getPartById(partId).subscribe(
      (res: any) => {
        this.dataPart = res.data[0];
        this.remain_stock = this.dataPart.stock;
        this.partName = this.dataPart.description;
      },  
      (error) => {
        console.error('Error fetching part by ID:', error);
      }
    );
  }

  addOutput() {
    if (parseInt(this.category) === 1) {
      this.newData = {
        part_id: this.partId,
        stock_in: this.stock,
        stock_out: 0,
        id_category: parseInt(this.category),
        image: this.filename,
        id_user: parseInt(this.userId),
        keterangan: this.information,
      };
      this.newDataParts = {
        stock: this.dataPart.stock + this.stock,
      };
    } else if (parseInt(this.category) === 2) {
      this.newData = {
        part_id: this.partId,
        stock_in: 0,
        stock_out: this.stock,
        id_category: parseInt(this.category),
        image: this.filename,
        id_user: parseInt(this.userId),
        keterangan: this.information,
      };
      this.newDataParts = {
        stock: this.dataPart.stock - this.stock,
      };
    }

    this.apiService.updatePart(this.partId, this.newDataParts).subscribe(
      (res: any) => {
        console.log("Stock quantity updated");
        this.apiService.updateStock(this.partId, this.newDataParts.stock).subscribe(
          (res: any) => {
            console.log("Stock updated after approval");
          },
          (error) => {
            console.error('Error updating stock after approval:', error);
          }
        );
      },
      (error: any) => {
        console.error("Failed to update stock:", error);
      }
    );

    this.apiService.insertOutput(this.newData).subscribe(
      (res: any) => {
        this.showModal();
      },
      (error: any) => {
        console.error('Failed to insert output:', error);
      }
    );
  }

  showModal() {
    $('#successModal').modal('show');
  }

  closeModal() {
    $('#successModal').modal('hide');
    this.router.navigate(['/detail-part', this.partId]);
  }

  onSubmit() {
    this.addOutput();
  }
}
