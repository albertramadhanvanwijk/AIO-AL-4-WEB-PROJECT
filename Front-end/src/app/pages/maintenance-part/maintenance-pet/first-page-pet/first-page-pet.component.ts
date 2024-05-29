import { Component } from '@angular/core';
import { SopService } from 'src/app/core/services/sop.service';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';

// Sweet Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-first-page-pet',
  templateUrl: './first-page-pet.component.html',
  styleUrls: ['./first-page-pet.component.scss']
})
export class FirstPagePetComponent {
  // BreadCrumb
  breadCrumbItems!: Array<{}>;

  is_stockReady: boolean = true;

  //  Areas
  dataArea: any[] = [];
  dataAreaByLine: any;

  // total parts
  totalParts!: any;
  totalPartsPreparation!: number;
  totalPartsInjection!: number;
  totalPartsBlow!: number;
  totalPartsFilling!: number;
  totalPartsPacking!: number;
  totalPartsRefurbished!: number;

  // Total Price
  totalPricePreparation: number = 0;
  totalPriceInjection: number = 0;
  totalPriceBlow: number = 0;
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
  this.getTotalPriceIBF();
 }

 getBreadCrumbItems() {
  this.breadCrumbItems = [{ label: "Maintenance" }]; 
 }

 getAllArea(){
  this.sopService.getAllAreas().subscribe(
    (res: any) => {
      this.dataArea = res.data;
      this.dataAreaByLine = this.dataArea.filter(item => item.id_line == 3)
    }
  )
 }


 getTotalPartsGroupByArea(){
  this.maintenanceService.getTotalPartGroupByArea().subscribe(
    (res: any) => {
      const areasData = res.data;

      // Membuat objek totalParts dengan setiap area diatur ke 0
      this.totalParts = {
        Preparation: 0,
        Ijection: 0,
        Blow: 0,
        Filling:0,
        Packing: 0,
        Refurbished: 0
      };

      // Mengisi totalParts dengan jumlah part yang sesuai berdasarkan data yang ada
      areasData.forEach((item: any) => {
        const areaId = item.id_area;
        const jumlahPart = item.jumlah_part;

        if (areaId === 7) {
          this.totalParts.Preparation = jumlahPart;
        } else if (areaId === 8) {
          this.totalParts.Ijection = jumlahPart;
        } else if (areaId === 9) {
          this.totalParts.Blow = jumlahPart;
        } else if (areaId === 10) {
          this.totalParts.Filling = jumlahPart;
        } else if (areaId === 11) {
          this.totalParts.Packing = jumlahPart;
        } else if (areaId === 12) {
          this.totalParts.Refurbished = jumlahPart;
        }
        
      });

      this.totalPartsPreparation = this.totalParts.Preparation
      this.totalPartsInjection = this.totalParts.Ijection
      this.totalPartsBlow = this.totalParts.Blow
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
  // Preparasi & hsg
  this.maintenanceService.getTotalPrice(7).subscribe(
    (res: any) => {
      this.totalPricePreparation = res.data[0].total_price
    }
  )
  // Injection
  this.maintenanceService.getTotalPrice(8).subscribe(
    (res: any) => {
      this.totalPriceInjection = res.data[0].total_price
    }
  )
  // Blow
  this.maintenanceService.getTotalPrice(9).subscribe(
    (res: any) => {
      this.totalPriceBlow = res.data[0].total_price
    }
  )
  // Filling
  this.maintenanceService.getTotalPrice(10).subscribe(
    (res: any) => {
      this.totalPriceFilling = res.data[0].total_price
    }
  )
  // Blow
  this.maintenanceService.getTotalPrice(11).subscribe(
    (res: any) => {
      this.totalPricePacking = res.data[0].total_price
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
