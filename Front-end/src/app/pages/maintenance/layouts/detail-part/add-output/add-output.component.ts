import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-add-output',
  templateUrl: './add-output.component.html',
  styleUrls: ['./add-output.component.scss']
})
export class AddOutputComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  //  paramter
  partId!: number;
  image!: any;
  selectedFile!: File;
  filename!: string;

  // Data Part
  dataPart!: any;
  partName!: string;
  qtyStock!: number;
  information!: string;
  category!: any;
  newData!: any;
  newDataParts!: any;
  remain_stock!: number;
  
  // userLogin
  userId!: any;

  constructor(private http: HttpClient, private apiService: MaintenanceService, private route: ActivatedRoute, private authService: AuthService, private router: Router) {
  }

  // ngOnInit
  ngOnInit() {
    this.breadCrumbItem();
    this.getParamsId();
    this.getDataUserLogin();
  }

  getDataUserLogin(){
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

  // Breadcrumb
  breadCrumbItem() {
    this.breadCrumbItems = [
      { label: 'List Output' },
      { label: 'Add output' }
    ];
  }

  getParamsId() {
    this.route.paramMap.subscribe(params => {
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
        this.remain_stock = this.dataPart.qty_stock;
        console.log(this.remain_stock);
        this.partName = this.dataPart.description;
      }
    );
  }

  addOutput() {
    if (parseInt(this.category) === 1) {
      this.newData = {
        "part_id": this.partId,
        "stock_in": this.qtyStock,
        "stock_out": 0,
        "id_category": parseInt(this.category),
        "image": this.filename,
        "id_user": parseInt(this.userId),
        "keterangan": this.information
      };
      console.log(this.qtyStock);
      this.newDataParts = {
        "qty_stock": this.dataPart.qty_stock + this.qtyStock
      };

    } if (parseInt(this.category) === 2) {
      this.newData = {
        "part_id": this.partId,
        "stock_in": 0,
        "stock_out": this.qtyStock,
        "id_category": parseInt(this.category),
        "image": this.filename,
        "id_user": parseInt(this.userId),
        "keterangan": this.information
      };
      this.newDataParts = {
        "qty_stock": this.dataPart.qty_stock - this.qtyStock
      };
    }
    this.apiService.updatePart(this.partId, this.newDataParts).subscribe(
      (res: any) => {
        console.log("qty stock terupdate");
      }
    );
    this.apiService.insertOutput(this.newData).subscribe(
      (res: any) => {
        this.showModal();
      }
    );
  }

  // Show Modal
  showModal() {
    $('#successModal').modal('show');
  }
  closeModal() {
    $('#successModal').modal('hide');
    this.router.navigate(['/detail-part', this.partId]);
  }

  // FORM
  onSubmit() {
    if (parseInt(this.category) === 1 || parseInt(this.category) === 2) {
      if (this.selectedFile) {
        // Jika ada file yang dipilih, unggah file terlebih dahulu
        this.uploadFile().subscribe(
          response => {
            // Setel nama file yang diunggah
            this.filename = response.filename;
            console.log('File sudah diupload:', this.filename);
            // Setel data yang akan dikirim ke backend
            let data = {
              "part_id": this.partId,
              "stock_in": parseInt(this.category) === 1 ? this.qtyStock : 0,
              "stock_out": parseInt(this.category) === 2 ? this.qtyStock : 0,
              "id_category": parseInt(this.category),
              "image": this.filename,
              "id_user": parseInt(this.userId),
              "keterangan": this.information
            };
            // Panggil fungsi untuk mengirim data
            this.submitData(data);
          },
          error => {
            console.error(error);
          }
        );
      } else {
        // Jika tidak ada file yang dipilih, langsung kirim data tanpa pengunggahan file
        let data = {
          "part_id": this.partId,
          "stock_in": parseInt(this.category) === 1 ? this.qtyStock : 0,
          "stock_out": parseInt(this.category) === 2 ? this.qtyStock : 0,
          "id_category": parseInt(this.category),
          "image": this.filename,
          "id_user": parseInt(this.userId),
          "keterangan": this.information
        };
        // Panggil fungsi untuk mengirim data
        this.submitData(data);
      }
    }
  }  
  
  // Fungsi untuk mengirim data ke backend
  submitData(data: any) {
    // Panggil layanan untuk mengirim data ke backend
    this.apiService.insertOutput(data).subscribe(
      (res: any) => {
        // Tampilkan modal sukses setelah berhasil menambahkan output
        this.showModal();
      },
      error => {
        console.error('Error saat menambahkan output:', error);
      }
    );
  }
  

}
