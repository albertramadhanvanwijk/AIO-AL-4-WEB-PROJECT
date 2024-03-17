import { Component } from '@angular/core';
import { SopService } from 'src/app/core/services/sop.service';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent {
  // BreadCrumb
  breadCrumbItems!: Array<{}>;
  is_stockReady: boolean = true;

  //  Areas
  dataArea: any[] = [];
  dataAreaByLine: any;

  // total parts
  totalParts!: any;
  totalPartsIbf!: number;
  totalPartsPreparasi!: number;
  totalPartsPacking!: number;
  totalPartsRefurbished!: number;

  // Total Price
  totalPriceIbf: number = 0;
  totalPricePreparasi: number = 0;
  totalPricePacking: number = 0;
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
      this.dataArea = res.data
      this.dataAreaByLine = this.dataArea.filter(item => item.id_line == 1)
    }
  )
 }


 getTotalPartsGroupByArea(){
  this.maintenanceService.getTotalPartGroupByArea().subscribe(
    (res: any) => {
      const areasData = res.data;
      console.log(areasData);
      

      // Membuat objek totalParts dengan setiap area diatur ke 0
      this.totalParts = {
        IBF: 0,
        Preparasi: 0,
        Packing: 0,
        Refurbished: 0
      };

      // Mengisi totalParts dengan jumlah part yang sesuai berdasarkan data yang ada
      areasData.forEach((item: any) => {
        const areaId = item.id_area;
        const jumlahPart = item.jumlah_part;

        if (areaId === 1) {
          this.totalParts.IBF = jumlahPart;
        } else if (areaId === 2) {
          this.totalParts.Preparasi = jumlahPart;
        } else if (areaId === 3) {
          this.totalParts.Packing = jumlahPart;
        } else if (areaId === 6) {
          this.totalParts.Refurbished = jumlahPart;
        }
      });

      this.totalPartsIbf = this.totalParts.IBF
      this.totalPartsPreparasi = this.totalParts.Preparasi
      this.totalPartsPacking = this.totalParts.Packing
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
  // IBF
  this.maintenanceService.getTotalPrice(1).subscribe(
    (res: any) => {
      this.totalPriceIbf = res.data[0].total_price
    }
  )
  // Preparasi
  this.maintenanceService.getTotalPrice(2).subscribe(
    (res: any) => {
      this.totalPricePreparasi = res.data[0].total_price
    }
  )
  // Packing
  this.maintenanceService.getTotalPrice(3).subscribe(
    (res: any) => {
      this.totalPricePacking = res.data[0].total_price
    }
  )
  // Refurbished
  this.maintenanceService.getTotalPrice(6).subscribe(
    (res: any) => {
      this.totalPriceRefurbished = res.data[0].total_price
    }
  )
}

}
