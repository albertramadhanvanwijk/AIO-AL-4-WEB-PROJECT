import { Component } from '@angular/core';
import { SopService } from 'src/app/core/services/sop.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-dashboard-group',
  templateUrl: './dashboard-group.component.html',
  styleUrls: ['./dashboard-group.component.scss']
})
export class DashboardGroupComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // chart
  chartOptions: any;
  chartIbf: any;
  chartPreparasi: any;
  chartPacking: any;

  // Data SPV
  userDataSpv: any;
  groupIdSpv!: number;

  // Data Nama User
  dataUserIbf: any = [];
  dataUserPreparasi: any = [];
  dataUserPacking: any = [];

  // Array Persentage
  percentageIbf: any = [];
  percentagePreparasi: any = [];
  percentagePacking: any = [];

  constructor(private sopService: SopService, private route: ActivatedRoute ){}

  ngOnInit(){
    this.getBreadCrumbItems()
    this.getParamsId()
    this.fetchUserSpv() 
  }

  getParamsId(){
    this.route.params.subscribe(params => {
      this.groupIdSpv = +params['groupId'];
    } )
  }

  fetchUserSpv(){
    this.sopService.getSpv(3,this.groupIdSpv).subscribe(
      (res: any) => {
       this.userDataSpv = res.data[0];
       this.fecthUserByAreaGroup();
      },
      error => {
        console.log("User not found")
      }
    )
  }

  getBreadCrumbItems(){
    this.breadCrumbItems = [
      { label: 'Dashboard' },
    ];
  }

  // IBF
  fecthIBF(){
    this.sopService.getAllUsersByAreaId(1,this.groupIdSpv).subscribe(
      (res: any) =>{
        const userIbf = res.data;
  
        // Array untuk menyimpan hasil pemanggilan asinkron
        const percentageObservables = userIbf.map((user: any) => {
          return this.sopService.getPercentageProgressByArea(user.id_user, 1);
        });
  
        // Menggabungkan semua pemanggilan asinkron
        forkJoin(percentageObservables).subscribe(
          (percentageResults: any) => {
            // Memasukkan nilai persentase ke masing-masing pengguna
            userIbf.forEach((user: any, index: number) => {
              user.percentage = percentageResults[index].roundedPercentage;
            });
  
            // Mengisi this.dataUserIbf
            this.dataUserIbf = userIbf.map((user: any) => user.nama_user);
  
            // Mengisi this.percentageIbf
            this.percentageIbf = userIbf.map((user: any) => user.percentage);
  
            // Setelah semua pemanggilan asinkron selesai, Anda dapat memanggil metode _chartIbf
            this._chartIbf('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]');
          },
          (error: any) => {
            console.log(error, "Error fetching percentages");
          }
        );
      },
      (err: any) => {
        console.log(err, "Data not found");
      }
    );
  }

  // Preparasi
  fecthPreparasi(){
    this.sopService.getAllUsersByAreaId(2,this.groupIdSpv).subscribe(
      (res: any) =>{
        const userPreparasi = res.data;
       // Array untuk menyimpan hasil pemanggilan asinkron
       const percentageObservables = userPreparasi.map((user: any) => {
        return this.sopService.getPercentageProgressByArea(user.id_user, 2);
      });

      // Menggabungkan semua pemanggilan asinkron
      forkJoin(percentageObservables).subscribe(
        (percentageResults: any) => {
          // Memasukkan nilai persentase ke masing-masing pengguna
          userPreparasi.forEach((user: any, index: number) => {
            user.percentage = percentageResults[index].roundedPercentage;
          });

          // Mengisi this.dataUserIbf
          this.dataUserPreparasi = userPreparasi.map((user: any) => user.nama_user);

          // Mengisi this.percentageIbf
          this.percentagePreparasi = userPreparasi.map((user: any) => user.percentage);

          // Setelah semua pemanggilan asinkron selesai, Anda dapat memanggil metode _chartIbf
          this._chartPreparasi('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]');
        },
        (error: any) => {
          console.log(error, "Error fetching percentages");
        }
      );
      },
      (err: any) => {
        console.log(err, "Data not found")
      }
    )
  }

  fecthPackings(){
    // Packing
    this.sopService.getAllUsersByAreaId(3,this.groupIdSpv).subscribe(
      (res: any) =>{
        const userPacking = res.data;
        // Array untuk menyimpan hasil pemanggilan asinkron
       const percentageObservables = userPacking.map((user: any) => {
        return this.sopService.getPercentageProgressByArea(user.id_user, 3);
      });

      // Menggabungkan semua pemanggilan asinkron
      forkJoin(percentageObservables).subscribe(
        (percentageResults: any) => {
          // Memasukkan nilai persentase ke masing-masing pengguna
          userPacking.forEach((user: any, index: number) => {
            user.percentage = percentageResults[index].roundedPercentage;
          });

          // Mengisi this.dataUserIbf
          this.dataUserPacking = userPacking.map((user: any) => user.nama_user);

          // Mengisi this.percentageIbf
          this.percentagePacking = userPacking.map((user: any) => user.percentage);

          // Setelah semua pemanggilan asinkron selesai, Anda dapat memanggil metode _chartIbf
          this._chartPacking('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]');
        },
        (error: any) => {
          console.log(error, "Error fetching percentages");
        }
      );
      },(err: any) => {
        console.log(err, "Data not found")
      }
    )
  }
  fecthUserByAreaGroup(){
    this.fecthIBF()
    this.fecthPreparasi()
    this.fecthPackings()
  }

  // CHART
  // Chart Colors Set
  private getChartColorsArray(colors:any) {
    colors = JSON.parse(colors);
    return colors.map(function (value:any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
            if (color) {
            color = color.replace(" ", "");
            return color;
            }
            else return newValue;;
        } else {
            var val = value.split(',');
            if (val.length == 2) {
                var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                return rgbaColor;
            } else {
                return newValue;
            }
        }
    });
    }

    // chart option IBF
    private _chartIbf(colors:any) {
      colors = this.getChartColorsArray(colors);
      const categories = this.dataUserIbf;
      this.chartIbf = {
        series: [{
          name:["PERCENTAGE"],
          data: this.percentageIbf
        }],
        chart: {
          height: 250,
          type: 'bar',
          // events: {
          //   click: function (chart:any, w:any, e:any) {
          //   }
          // }
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '75%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val: any) {
            return val + "%";
          },
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: categories,
          labels: {
            style: {
              colors: colors,
              fontSize: '12px'
            },
          }
        },
        yaxis: {
          labels: {
            show: true,
            formatter: function (val: any, opt: any) {
              if (val > 100) {
                return "100%"; // Batasi nilai maksimum ke 100%
              }
              return val + "%";
            }
          },
          max: 100 // Atur nilai maksimum sumbu Y ke 100%
        }
      };
    }
    // chart option Preparasi
    private _chartPreparasi(colors:any) {
      colors = this.getChartColorsArray(colors);
      const categories = this.dataUserPreparasi;
      this.chartPreparasi = {
        series: [{
          name:["PERCENTAGE"],
          data: this.percentagePreparasi
        }],
        chart: {
          height: 250,
          type: 'bar',
          // events: {
          //   click: function (chart:any, w:any, e:any) {
          //   }
          // }
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '75%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val: any) {
            return val + "%";
          },
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: categories,
          labels: {
            style: {
              colors: colors,
              fontSize: '12px'
            },
          }
        },
        yaxis: {
          labels: {
            show: true,
            formatter: function (val: any, opt: any) {
              if (val > 100) {
                return "100%"; // Batasi nilai maksimum ke 100%
              }
              return val + "%";
            }
          },
          max: 100 // Atur nilai maksimum sumbu Y ke 100%
        }
      };
    }
    // chart option Packing
    private _chartPacking(colors:any) {
      colors = this.getChartColorsArray(colors);
      const categories = this.dataUserPacking;
      this.chartPacking = {
        series: [{
          name:["PERCENTAGE"],
          data: this.percentagePacking
        }],
        chart: {
          height: 250,
          type: 'bar',
          // events: {
          //   click: function (chart:any, w:any, e:any) {
          //   }
          // }
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '75%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val: any) {
            return val + "%";
          },
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: categories,
          labels: {
            style: {
              colors: colors,
              fontSize: '12px'
            },
          }
        },
        yaxis: {
          labels: {
            show: true,
            formatter: function (val: any, opt: any) {
              if (val > 100) {
                return "100%"; // Batasi nilai maksimum ke 100%
              }
              return val + "%";
            }
          },
          max: 100 // Atur nilai maksimum sumbu Y ke 100%
        }
      };
    }
}
