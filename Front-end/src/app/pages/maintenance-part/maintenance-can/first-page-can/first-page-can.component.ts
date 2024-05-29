import { Component } from '@angular/core';
import { SopService } from 'src/app/core/services/sop.service';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';

@Component({
  selector: 'app-first-page-can',
  templateUrl: './first-page-can.component.html',
  styleUrls: ['./first-page-can.component.scss']
})
export class FirstPageCanComponent {
  // BreadCrumb
  breadCrumbItems!: Array<{}>;
  is_stockReady: boolean = true;

  //  Areas
  dataArea: any[] = [];
  dataAreaByLine: any;

  // total parts
  totalParts!: any;
  totalPartsPreparation!: number;
  totalPartsFilling!: number;
  totalPartsPacking!: number;
  totalPartsRefurbished!: number;

  // Total Price
  totalPricePreparation: number = 0;
  totalPriceFilling: number = 0;
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
  this.getTotalPricePreparation();
  this.dataArea.forEach(area => {
    this.isStockAvailable(area.id);
  });
  console.log(this.dataArea);
  
 }

 getBreadCrumbItems() {
  this.breadCrumbItems = [{ label: "Maintenance" }]; 
 }

 getAllArea(){
  this.sopService.getAllAreas().subscribe(
    (res: any) => {
      this.dataArea = res.data
      this.dataAreaByLine = this.dataArea.filter(item => item.id_line == 2)
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
        Preparation: 0,
        Filling: 0,
        Packing: 0,
        Refurbished: 0
      };

      // Mengisi totalParts dengan jumlah part yang sesuai berdasarkan data yang ada
      areasData.forEach((item: any) => {
        const areaId = item.id_area;
        const jumlahPart = item.jumlah_part;

        if (areaId === 14) {
          this.totalParts.Preparation = jumlahPart;
        } else if (areaId === 15) {
          this.totalParts.Filling = jumlahPart;
        } else if (areaId === 16) {
          this.totalParts.Packing = jumlahPart;
        } else if (areaId === 17) {
          this.totalParts.Refurbished = jumlahPart;
        }
      });

      this.totalPartsPreparation = this.totalParts.Preparation
      this.totalPartsFilling = this.totalParts.Filling
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
getTotalPricePreparation(){
  // Preparation
  this.maintenanceService.getTotalPrice(14).subscribe(
    (res: any) => {
      this.totalPricePreparation = res.data[0].total_price
    }
  )
  // Filling
  this.maintenanceService.getTotalPrice(15).subscribe(
    (res: any) => {
      this.totalPriceFilling = res.data[0].total_price
    }
  )
  // Packing
  this.maintenanceService.getTotalPrice(16).subscribe(
    (res: any) => {
      this.totalPricePacking = res.data[0].total_price
    }
  )
  // Refurbished
  this.maintenanceService.getTotalPrice(17).subscribe(
    (res: any) => {
      this.totalPriceRefurbished = res.data[0].total_price
    }
  )
}

}
