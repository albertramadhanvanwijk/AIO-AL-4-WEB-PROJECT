import { Component } from '@angular/core';
import { SopService } from 'src/app/core/services/sop.service';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';

@Component({
  selector: 'app-first-page-oc3',
  templateUrl: './first-page-oc3.component.html',
  styleUrls: ['./first-page-oc3.component.scss']
})
export class FirstPageOc3Component {
// BreadCrumb
breadCrumbItems!: Array<{}>;

is_stockReady: boolean = true;

//  Areas
dataArea: any[] = [];
dataAreaByLine: any;

// total parts
totalParts!: any;
totalPartsIbfoc3!: number;
totalPartsPackingoc3!: number;
totalPartsPreparasioc3!: number;
totalPartsElectricaloc3!: number;
totalPartsRefurbished!: number;

// Total Price
totalPriceIbfoc3: number = 0;
totalPricePackingoc3: number = 0;
totalPricePreparasioc3: number = 0;
totalPriceElectricaloc3: number = 0;
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
    this.dataAreaByLine = this.dataArea.filter(item => item.id_line == 5)
  }
)
}


getTotalPartsGroupByArea(){
this.maintenanceService.getTotalPartGroupByArea().subscribe(
  (res: any) => {
    const areasData = res.data;

    // Membuat objek totalParts dengan setiap area diatur ke 0
    this.totalParts = {
      IBFOC3: 0,
      PACKINGOC3: 0,
      PREPARASIOC3: 0,
      ELECTRICALOC3:0,
      Refurbished: 0
    };

    // Mengisi totalParts dengan jumlah part yang sesuai berdasarkan data yang ada
    areasData.forEach((item: any) => {
      const areaId = item.id_area;
      const jumlahPart = item.jumlah_part;

      if (areaId === 26) {
        this.totalParts.IBFOC3 = jumlahPart;
      } else if (areaId === 27) {
        this.totalParts.PACKINGOC3 = jumlahPart;
      } else if (areaId === 28) {
        this.totalParts.PREPARASIOC3 = jumlahPart;
      } else if (areaId === 29) {
        this.totalParts.ELECTRICALOC3 = jumlahPart;
      } else if (areaId === 30) {
        this.totalParts.Refurbished = jumlahPart;
      }
      
    });

    this.totalPartsIbfoc3 = this.totalParts.Preparation
    this.totalPartsPackingoc3 = this.totalParts.Ijection
    this.totalPartsPreparasioc3 = this.totalParts.Blow
    this.totalPartsElectricaloc3 = this.totalParts.Filling
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
// IBF OC3
this.maintenanceService.getTotalPrice(26).subscribe(
  (res: any) => {
    this.totalPriceIbfoc3 = res.data[0].total_price
  }
)
// PACKING OC3
this.maintenanceService.getTotalPrice(27).subscribe(
  (res: any) => {
    this.totalPricePackingoc3 = res.data[0].total_price
  }
)
// PREPARASI OC3
this.maintenanceService.getTotalPrice(28).subscribe(
  (res: any) => {
    this.totalPricePreparasioc3 = res.data[0].total_price
  }
)
// ELECTRICAL OC3
this.maintenanceService.getTotalPrice(29).subscribe(
  (res: any) => {
    this.totalPriceElectricaloc3 = res.data[0].total_price
  }
)
// Refurbished
this.maintenanceService.getTotalPrice(30).subscribe(
  (res: any) => {
    this.totalPriceRefurbished = res.data[0].total_price
  }
)
}

}

