import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { SopService } from 'src/app/core/services/sop.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sop-utama',
  templateUrl: './sop-utama.component.html',
  styleUrls: ['./sop-utama.component.scss'],
})
export class SopUtamaComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  areas: any[] = [];
  // DATA LOGIN
  userRole!: any;
  namaUserRole!: string;
  userName!: any;
  userGroup!: any;
  nik!: number; // Deklarasikan EventEmitter sebagai Input
  team!: string; // Deklarasikan EventEmitter sebagai Input
  userId!: any;
  areaId!: any;
  percentage!: any;

  // TOTAL DOCUMENT
  documentsGeneral!: number;
  documentsIBF!: number;
  documentsPreparasi!: number;
  documentsPacking!: number;

  // Data Users
  usersData!: any;
  userDataByGroup!: any;
  groupId!: number;
  groupNumber!: number;
  totalPercentage: any = [];
  percentageGroup!: number;
  totalUserByGroup!: any;
  completedProgress!: number;

  // CHARTS
  distributedColumnChart: any;
  chartOption: any;
  percentageTeam: any = [];
  progresChart: any;

  // Testing
  percentageTeamIBF!: number;
  percentageTeamPreparasi!: number;
  percentageTeamPacking!: number;

  // Score Quiz
  scoreQuiz!: number;

  constructor(
    private sopService: SopService,
    private http: HttpClient,
    private authService: AuthService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    // Setelah tampilan dimuat, tambahkan kelas animasi
    this.renderer.addClass(this.el.nativeElement, 'fade-in');
  }

  getDataUserLogin() {
    const role = this.authService.getRoleID();
    this.userRole = parseInt(role);
    this.userName = this.authService.getUserName();
    this.team = this.authService.getAreaName();
    this.nik = this.authService.getNIK();
    this.userId = this.authService.getUserId();
    this.userGroup = this.authService.getUserGroup();

    // console.log(this.userName, this.userRole);
  }
  ngOnInit() {
    this.getDataUserLogin();
    this.getNamaUserRole();
    this.getBreadCrumbItems();
    this.fecthAreas();
    this.getAreaId();
    this.fetchPersentageUserLogin();
    this.getTotalDocuments();
    this.fetchUserSpv();
    this.fetchPersentageTeam(this.userGroup, 1);
    this.fetchPersentageTeam(this.userGroup, 2);
    this.fetchPersentageTeam(this.userGroup, 3);
    this.getTotalCompleteduserLogin();
    this.getTotalScoreQuiz();
    // CHART
    this._progressRadialbarChart('["--vz-success"]');
    this._distributedColumnChart(
      '["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]'
    );
  }

  getBreadCrumbItems() {
    this.breadCrumbItems = [{ label: `Dashboard ${this.namaUserRole}` }];
  }

  getNamaUserRole() {
    if (this.userRole === 1) {
      this.namaUserRole = 'Admin';
    }
    if (this.userRole === 2) {
      this.namaUserRole = 'User';
    }
    if (this.userRole === 3) {
      this.namaUserRole = 'SPV';
    }
    if (this.userRole === 4) {
      this.namaUserRole = 'Planner';
    }
  }

  getAreaId() {
    if (this.team === 'IBF') {
      this.areaId = 1;
    }
    if (this.team === 'PREPARASI') {
      this.areaId = 2;
    }
    if (this.team === 'PACKING') {
      this.areaId = 3;
    }
    if (this.team === 'GENERAL') {
      this.areaId = 4;
    }
  }

  fetchUserSpv() {
    this.sopService.getUserByRoleId(3).subscribe(
      (res: any) => {
        this.usersData = res.data;
        this.usersData.forEach((user: any) => {
          this.fetchPersentageGroup(user.group_id);
        });
      },
      (error) => {
        console.log('User not found');
      }
    );
  }

  fecthAreas() {
    this.sopService.getAllAreas().subscribe(
      (res: any) => {
        this.areas = res.data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // TOTAL DOCUMENTS
  getTotalDocuments() {
    this.getTotalDocumentGeneral();
    this.getTotalDocumentIBF();
    this.getTotalDocumentPreparasi();
    this.getTotalDocumentPacking();
  }
  getTotalDocumentIBF() {
    this.sopService.getDocumentByAreaId(1).subscribe(
      (res: any) => {
        this.documentsIBF = res.data.length;
      },
      (error) => {
        console.log('Tidak ada document IBF');
      }
    );
  }
  getTotalDocumentPreparasi() {
    this.sopService.getDocumentByAreaId(2).subscribe(
      (res: any) => {
        this.documentsPreparasi = res.data.length;
      },
      (error) => {
        console.log('Tidak ada document IBF');
      }
    );
  }
  getTotalDocumentPacking() {
    this.sopService.getDocumentByAreaId(3).subscribe(
      (res: any) => {
        this.documentsPacking = res.data.length;
      },
      (error) => {
        console.log('Tidak ada document IBF');
      }
    );
  }
  getTotalDocumentGeneral() {
    this.sopService.getDocumentByAreaId(this.areaId).subscribe(
      (res: any) => {
        this.documentsGeneral = res.data.length;
      },
      (error) => {
        console.log('Tidak ada document IBF');
      }
    );
  }

  fetchPersentageUserLogin() {
    this.sopService
      .getPercentageProgressByArea(this.userId, this.areaId)
      .subscribe(
        (res: any) => {
          this.percentage = res.roundedPercentage;
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  getTotalCompleteduserLogin() {
    this.sopService.getTotalCompleted(this.userId, this.areaId).subscribe(
      (res: any) => {
        this.completedProgress = res.totalCompleted;
      },
      (error: any) => {
        console.log(error, 'Not Completed');
      }
    );
  }

  // Persentase Group/SPV
  getUserPercentage(groupId: number): number {
    const groupData = this.totalPercentage.find(
      (data: { groupId: number }) => data.groupId === groupId
    );
    return groupData ? groupData.percentage : 0;
  }
  fetchPersentageGroup(groupId: number) {
    this.sopService.getDataPercentageByGroup(groupId).subscribe(
      (res: any) => {
        const dataUserByGroup = res.data;
        let lengthData: number = dataUserByGroup.length;
        let sum_persentase: number = 0;

        dataUserByGroup.forEach((user: any) => {
          sum_persentase = sum_persentase + user.total_persentase;
        });

        if (lengthData === 0) {
          this.totalPercentage.push({ groupId, percentage: 0 });
        } else {
          const persentaseByGroup: number = sum_persentase / lengthData;
          this.totalPercentage.push({
            groupId,
            percentage: Math.round(persentaseByGroup),
          });
        }
      },
      (error: any) => {
        console.log('percentage not found');
      }
    );
  }

  fetchPersentageTeam(groupId: number, areaId: number) {
    this.sopService.getDataPercentageTeam(groupId, areaId).subscribe(
      (res: any) => {
        const dataUserByTeam = res.data;
        let lengthDataUserByTeam = dataUserByTeam.length;
        let totalPercentage = 0;
        dataUserByTeam.forEach((user: any) => {
          totalPercentage = totalPercentage + user.total_persentase;
        });

        if (lengthDataUserByTeam.length === 0) {
          this.percentageTeam.push(0);
        } else {
          this.percentageTeam.push(
            Math.round(totalPercentage / lengthDataUserByTeam)
          );
        }
      },
      (error: any) => {
        console.log('Data not found');
      }
    );
  }

  // Color Charts
  // Chart Colors Set
  private getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(' ', '');
      if (newValue.indexOf(',') === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(
          newValue
        );
        if (color) {
          color = color.replace(' ', '');
          return color;
        } else return newValue;
      } else {
        var val = value.split(',');
        if (val.length == 2) {
          var rgbaColor = getComputedStyle(
            document.documentElement
          ).getPropertyValue(val[0]);
          rgbaColor = 'rgba(' + rgbaColor + ',' + val[1] + ')';
          return rgbaColor;
        } else {
          return newValue;
        }
      }
    });
  }

  /**
   * Column with Data Labels
   */
  private _distributedColumnChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    const categories = ['TEAM IBF', 'TEAM PREPARASI', 'TEAM PACKING'];
    this.distributedColumnChart = {
      series: [
        {
          name: ['PERCENTAGE'],
          data: this.percentageTeam,
        },
      ],
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
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + '%';
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: colors,
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          formatter: function (val: any, opt: any) {
            if (val > 100) {
              return '100%'; // Batasi nilai maksimum ke 100%
            }
            return val + '%';
          },
        },
        max: 100, // Atur nilai maksimum sumbu Y ke 100%
      },
    };
  }

  /**
   * CHART admin
   */
  private _progressRadialbarChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.chartOption = {
      // series: [30, 40],
      chart: {
        type: 'radialBar',
        width: 105,
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '70%',
          },
          track: {
            margin: 1,
          },
          dataLabels: {
            show: true,
            name: {
              show: false,
            },
            value: {
              show: true,
              fontSize: '16px',
              fontWeight: 600,
              offsetY: 8,
            },
          },
        },
      },
      colors: colors,
    };
  }

  toDashboardGroup(groupId: number) {
    console.log('click Successfully', 'groupId:' + groupId);
  }

  getTotalScoreQuiz() {
    this.sopService.getScoreUserByUserId(this.userId).subscribe((res: any) => {
      // console.log(res.data[0]);
      let data = res.data[0];
      this.scoreQuiz = data.totalScore;
    });
  }
}
