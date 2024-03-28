import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast-service';
import { ChartType } from './dashboard.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api-service.service';
import { SopService } from 'src/app/core/services/sop.service';
import { MaintenanceService } from 'src/app/core/services/maintenance.service';
import { StatusService } from 'src/app/core/services/status.service';

interface AllChartData {
  name: string;
  type: string;
  data: any;
}

interface ChartData {
  rawData: any[];
  categories: any[];
  seriesData: AllChartData[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  //breadcrumb
  breadCrumbItems!: Array<{}>;

  //chart
  ibfChart!: ChartType;
  preparasiChart!: ChartType;
  packingChart!: ChartType;
  amount: any[] = [];

  //login
  userRole!: any;
  namaUserRole!: string;
  userName!: any;
  userGroup!: any;
  nik!: number;
  team!: string;
  userId!: any;
  areaId!: any;
  

  // TOTAL DOCUMENT
  documentsGeneral!: number;
  documentsIBF!: number;
  documentsPreparasi!: number;
  documentsPacking!: number;

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
  totalPriceRefurbished: number = 0;
  totalPrice: number = 0;

  //indicator 
  ibfStatus: string = '';
  preparasiStatus: string = '';
  packingStatus: string = '';

  //item supplies
  ibfTotalItems: number = 0;
  preparasiTotalItems: number = 0;
  packingTotalItems: number = 0;


  ibfSuppliesData: ChartData = {
    rawData: [],
    categories: [],
    seriesData: [],
  };

  preparasiSuppliesData: ChartData = {
    rawData: [],
    categories: [],
    seriesData: [],
  };

  packingSuppliesData: ChartData = {
    rawData: [],
    categories: [],
    seriesData: [],
  };

  month!: number
  year!: number


  constructor(
    public toastService: ToastService,
    private authService: AuthService,
    private apiService: ApiService,
    private sopService: SopService,
    private maintenanceService: MaintenanceService,
    private statusService: StatusService,
  ) { }

  async ngOnInit() {
    let today = new Date()
    this.month = today.getMonth() + 1
    this.year = today.getFullYear()
    this.getDataUserLogin();
    await this.getIBFSuppliesData(this.month, this.year);
    await this.getPreparasiSuppliesData(this.month, this.year);
    await this.getPackingSuppliesData(this.month, this.year);
    this.getDataSerries();
    this.getAmountSupply();
    this.getBreadCrumbItems();
    this.getAreaId();
    this.getTotalDocuments();
    this.getTotalPartsGroupByArea();
    this.getTotalPrice();

    this.statusService.getIBFStatus().subscribe((status) => {
      this.ibfStatus = status;
    });

    this.statusService.getPreparasiStatus().subscribe((status) => {
      this.preparasiStatus = status;
    });

    this.statusService.getPackingStatus().subscribe((status) => {
      this.packingStatus = status;
    });

    this._ibfChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]')
    this._preparasiChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]')
    this._packingChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]')
  }

  getDataUserLogin() {
    const role = this.authService.getRoleID()
    this.userRole = parseInt(role);
    this.userName = this.authService.getUserName();
    this.team = this.authService.getAreaName();
    this.nik = this.authService.getNIK();
    this.userId = this.authService.getUserId();
    this.userGroup = this.authService.getUserGroup();
  }


  private getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(' ', '');
      if (newValue.indexOf(',') === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        if (color) {
          color = color.replace(' ', '');
          return color;
        } else return newValue;
      } else {
        var val = value.split(',');
        if (val.length == 2) {
          var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
          rgbaColor = 'rgba(' + rgbaColor + ',' + val[1] + ')';
          return rgbaColor;
        } else {
          return newValue;
        }
      }
    });
  }

  getDataSerries() {
    this.ibfSuppliesData.seriesData.forEach((data: any) => {
      return data
    })
    this.preparasiSuppliesData.seriesData.forEach((data: any) => {
      return data
    })
    this.packingSuppliesData.seriesData.forEach((data: any) => {
      return data
    })
  }

  private _ibfChart(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.ibfChart = {
      series: [{
        data: this.ibfSuppliesData.seriesData
      }],
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart:any, w:any, e:any) {
          }
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: this.ibfSuppliesData.categories,
        labels: {
          style: {
            colors: colors,
            fontSize: '12px'
          }
        }
      }
    };
  }

  private _preparasiChart(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.preparasiChart = {
      series: [{
        data: this.preparasiSuppliesData.seriesData
      }],
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart:any, w:any, e:any) {
          }
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: this.preparasiSuppliesData.categories,
        labels: {
          style: {
            colors: colors,
            fontSize: '12px'
          }
        }
      }
    };
  }

  private _packingChart(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.packingChart = {
      series: [{
        data: this.packingSuppliesData.seriesData
      }],
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart:any, w:any, e:any) {
          }
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: this.packingSuppliesData.categories,
        labels: {
          style: {
            colors: colors,
            fontSize: '12px'
          }
        }
      }
    };
  }

  async getIBFSuppliesData(month: number, year: number) {
    try {
      const res: any = await this.apiService.getChartDataIBF(month, year).toPromise();
      let data: any[] = res.data[0];
      

      let categoriesData = [...new Set(data.map((item) => item.bulan))];

      this.ibfSuppliesData.rawData = data.filter((item) => item.area === 'IBF');
      this.ibfSuppliesData.categories = data.map(item => item.item);
      this.ibfSuppliesData.seriesData = data.map(item => item.jumlah_out);

      this._ibfChart('["--vz-success", "--vz-primary", "--vz-secondary", "--vz-info", "--vz-warning", "--vz-danger", "--vz-dark"]');
    } catch (err) {
      console.error(err);
    }
  }

  onDateChangeIBF(event$: any) {
    let dateSelected: string = event$.target.value
    let month = dateSelected.substring(5, 7)
    let year = dateSelected.substring(0,4)
    

    this.getIBFSuppliesData(+month, +year)
  }
 

  async getPreparasiSuppliesData(month: number, year: number) {
    try {
      const res: any = await this.apiService.getChartDataPREPARASI(month, year).toPromise();
      let data: any[] = res.data[0];
     

      let categoriesData = [...new Set(data.map((item) => item.bulan))];

      this.preparasiSuppliesData.rawData = data.filter((item) => item.area === 'PREPARASI');
      this.preparasiSuppliesData.categories = data.map(item => item.item);
      this.preparasiSuppliesData.seriesData = data.map(item => item.jumlah_out);

      this._preparasiChart('["--vz-success", "--vz-primary", "--vz-secondary", "--vz-info", "--vz-danger", "--vz-dark", "--vz-warning"]');
    } catch (err) {
      console.error(err);
    }
  }

  onDateChangePreparasi(event$: any) {
    let dateSelected: string = event$.target.value
    let month = dateSelected.substring(5, 7)
    let year = dateSelected.substring(0,4)
    

    this.getPreparasiSuppliesData(+month, +year)
  }


  async getPackingSuppliesData(month: number, year: number) {
    try {
      const res: any = await this.apiService.getChartDataPACKING(month, year).toPromise();
      let data: any[] = res.data[0];
     

      let categoriesData = [...new Set(data.map((item) => item.bulan))];

      this.packingSuppliesData.rawData = data.filter((item) => item.area === 'PACKING');
      this.packingSuppliesData.categories = data.map(item => item.item);
      this.packingSuppliesData.seriesData = data.map(item => item.jumlah_out);

      this._packingChart('["--vz-success", "--vz-primary", "--vz-secondary", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]');

    } catch (err) {
      console.error(err);
    }
  }

  onDateChangePacking(event$: any) {
    let dateSelected: string = event$.target.value
    let month = dateSelected.substring(5, 7)
    let year = dateSelected.substring(0,4)
    

    this.getPackingSuppliesData(+month, +year)
  }


  getMonthName(month: number): string {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    return monthNames[month - 1];
  }

  getAmountSupply(): void {
    this.apiService.getAmountSupply().subscribe(
      (res: any) => {
        this.amount = res.data[0];

        // Pisahkan data untuk setiap area
        this.ibfTotalItems = this.getTotalItemsByArea('IBF');
        this.preparasiTotalItems = this.getTotalItemsByArea('PREPARASI');
        this.packingTotalItems = this.getTotalItemsByArea('PACKING');

      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getTotalItemsByArea(area: string): number {
    const areaData = this.amount.find(item => item.nama_area === area);
    return areaData ? areaData.total_items : 0;
  }

  getBreadCrumbItems() {
    this.breadCrumbItems = [{ label: "Dashboard" }];
  }


  getTotalDocuments() {
    this.getTotalDocumentGeneral();
    this.getTotalDocumentIBF();
    this.getTotalDocumentPreparasi();
    this.getTotalDocumentPacking();
  }

  getTotalDocumentGeneral() {
    this.sopService.getDocumentByAreaId(this.areaId).subscribe(
      (res: any) => {
        this.documentsGeneral = res.data.length

      },
      (error) => {
        console.log("Tidak ada document general");
      }
    )
  }
  getTotalDocumentIBF() {
    this.sopService.getDocumentByAreaId(1).subscribe(
      (res: any) => {
        this.documentsIBF = res.data.length
      },
      (error) => {
        console.log("Tidak ada document IBF");
      }
    )
  }
  getTotalDocumentPreparasi() {
    this.sopService.getDocumentByAreaId(2).subscribe(
      (res: any) => {
        this.documentsPreparasi = res.data.length
      },
      (error) => {
        console.log("Tidak ada document Preparasi");
      }
    )
  }
  getTotalDocumentPacking() {
    this.sopService.getDocumentByAreaId(3).subscribe(
      (res: any) => {
        this.documentsPacking = res.data.length
      },
      (error) => {
        console.log("Tidak ada document Packing");
      }
    )
  }

  getAreaId() {
    if (this.team === "IBF") {
      this.areaId = 1
    }
    if (this.team === "PREPARASI") {
      this.areaId = 2
    }
    if (this.team === "PACKING") {
      this.areaId = 3
    }
    if (this.team === "GENERAL") {
      this.areaId = 4
    }
  }


  //part

  getTotalPartsGroupByArea() {
    this.maintenanceService.getTotalPartGroupByArea().subscribe(
      (res: any) => {
        const areasData = res.data;

        this.totalParts = {
          IBF: 0,
          Preparasi: 0,
          Packing: 0,
          Refurbished: 0
        };

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


 

  // TOTAL PRICE
  getTotalPrice() {
    // IBF
    this.maintenanceService.getTotalPrice(1).subscribe(
      (res: any) => {
        this.totalPriceIbf = res.data[0].total_price;
        this.calculateTotalPrice();
      }
    )
    // Preparasi
    this.maintenanceService.getTotalPrice(2).subscribe(
      (res: any) => {
        this.totalPricePreparasi = res.data[0].total_price;
        this.calculateTotalPrice();
      }
    )
    // Packing
    this.maintenanceService.getTotalPrice(3).subscribe(
      (res: any) => {
        this.totalPricePacking = res.data[0].total_price;
        this.calculateTotalPrice();
      }
    )
    // Refurbished
    this.maintenanceService.getTotalPrice(6).subscribe(
      (res: any) => {
        this.totalPriceRefurbished = res.data[0].total_price;
        this.calculateTotalPrice();
      }
    )
  }

  calculateTotalPrice() {
    // Hitung total harga keseluruhan
    this.totalPrice = this.totalPriceIbf + this.totalPricePreparasi + this.totalPricePacking + this.totalPriceRefurbished;
    
  }

  getPercentage(value: number): string {
    const percentage = (value / this.totalPrice) * 100;
    return `${percentage}%`;
  }
}
