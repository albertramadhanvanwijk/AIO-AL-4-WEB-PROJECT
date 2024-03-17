import { Component } from '@angular/core';
import { SopService } from 'src/app/core/services/sop.service';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';

// Sweet Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-first-page-gbl',
  templateUrl: './first-page-gbl.component.html',
  styleUrls: ['./first-page-gbl.component.scss']
})
export class FirstPageGblComponent {
 // BreadCrumb
 breadCrumbItems!: Array<{}>;

 is_stockReady: boolean = true;

 //  Areas
 dataArea: any[] = [];
 dataAreaByLine: any;

 // total parts
 totalParts!: any;
 totalPartsPreparasi!: number;
 totalPartsPacking_in!: number;
 totalPartsPacking_out!: number;
 totalPartsFilling!: number;
 totalPartsElectrical!: number;
 totalPartsRefurbished!: number;

 // Total Price
 totalPricePreparasi: number = 0;
 totalPricePacking_in: number = 0;
 totalPricePacking_out: number = 0;
 totalPriceFilling: number = 0;
 totalPriceElectrical: number = 0;
 totalPriceRefurbished: number = 0 ;

 stockRemain: any;
 stockRemainGrouped: { [key: number]: any[] } = {};
 

constructor(private sopService: SopService, private maintenanceService: MaintenanceService){}

ngOnInit() {
 this.getBreadCrumbItems();
 this.getAllArea();
 this.getTotalPartsGroupByArea()
 this.fetchStockRemain();
 this.getTotalPriceIBF();
}

getBreadCrumbItems() {
 this.breadCrumbItems = [{ label: "Maintenance" }]; 
}

getAllArea(){
 this.sopService.getAllAreas().subscribe(
   (res: any) => {
     this.dataArea = res.data;
     this.dataAreaByLine = this.dataArea.filter(item => item.id_line == 4)
   }
 )
}


getTotalPartsGroupByArea(){
 this.maintenanceService.getTotalPartGroupByArea().subscribe(
   (res: any) => {
     const areasData = res.data;

     // Membuat objek totalParts dengan setiap area diatur ke 0
     this.totalParts = {
       Preparasi: 0,
       Packing_in: 0,
       Packing_out: 0,
       Filling:0,
       Electrical: 0,
       Refurbished: 0
     };

     // Mengisi totalParts dengan jumlah part yang sesuai berdasarkan data yang ada
     areasData.forEach((item: any) => {
       const areaId = item.id_area;
       const jumlahPart = item.jumlah_part;

       if (areaId === 19) {
         this.totalParts.Preparasi = jumlahPart;
       } else if (areaId === 20) {
         this.totalParts.Packing_in = jumlahPart;
       } else if (areaId === 21) {
         this.totalParts.Packing_out = jumlahPart;
       } else if (areaId === 22) {
         this.totalParts.Filling = jumlahPart;
       } else if (areaId === 23) {
         this.totalParts.Electrical = jumlahPart;
       }else if (areaId === 24) {
        this.totalParts.Refurbished = jumlahPart;
      }
       
     });

     this.totalPartsPreparasi = this.totalParts.Preparasi
     this.totalPartsPacking_in = this.totalParts.Packing_in
     this.totalPartsPacking_out = this.totalParts.Packing_out
     this.totalPartsFilling = this.totalParts.Filling
     this.totalPartsElectrical = this.totalParts.Electrical
     this.totalPartsRefurbished = this.totalParts.Refurbished
   }
 )
}

fetchStockRemain(){
 this.maintenanceService.getAllStockRemain().subscribe(
   (res: any)=>{
     let data = res.data.filter((part: any) => !part.is_deleted)
     data.forEach((part: any) => {
       const id_area = part.id_area;

       if (!this.stockRemainGrouped[id_area]) {
         this.stockRemainGrouped[id_area] = [];
       }

       this.stockRemainGrouped[id_area].push(part);
       console.log(this.stockRemainGrouped);
       
     });
   }
 )
}

isStockAvailable(areaId: number): boolean {
 const stockRemain = this.stockRemainGrouped[areaId];
 if (stockRemain) {
   return stockRemain.every(remain => remain.stock_remain !== 0);
 }
 return false;
}

// TOTAL PRICE
getTotalPriceIBF(){
 // Preparasi
 this.maintenanceService.getTotalPrice(7).subscribe(
   (res: any) => {
     this.totalPricePreparasi = res.data[0].total_price
   }
 )
 // Packing_in
 this.maintenanceService.getTotalPrice(8).subscribe(
   (res: any) => {
     this.totalPricePacking_in = res.data[0].total_price
   }
 )
 // Packing_out
 this.maintenanceService.getTotalPrice(9).subscribe(
   (res: any) => {
     this.totalPricePacking_out = res.data[0].total_price
   }
 )
 // Filling
 this.maintenanceService.getTotalPrice(10).subscribe(
   (res: any) => {
     this.totalPriceFilling = res.data[0].total_price
   }
 )
 // Electrical
 this.maintenanceService.getTotalPrice(11).subscribe(
   (res: any) => {
     this.totalPriceElectrical = res.data[0].total_price
    }
    )
    // Refurbished
    this.maintenanceService.getTotalPrice(12).subscribe(
      (res: any) => {
        this.totalPriceRefurbished = res.data[0].total_price
      }
    )
  }
  
  }
  