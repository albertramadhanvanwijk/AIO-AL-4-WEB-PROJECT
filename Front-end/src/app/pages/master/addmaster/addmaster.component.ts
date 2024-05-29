import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SopService } from 'src/app/core/services/sop.service';
import { event } from 'jquery';

@Component({
  selector: 'app-addmaster',
  templateUrl: './addmaster.component.html',
  styleUrls: ['./addmaster.component.scss']
})
export class AddmasterComponent {

  areas: any[] = [];
  roles: any[] = [];
  groups: any[] = [];
  lines: any[] = []
  filteredAreas: any = [];

  nama_user!: string;
  nik!: number;
  password!: string; 
  role!: number;
  area!: number;
  group!: number;
  line!: number;

  selectedArea: string = '';
  selectedRole: string = '';
  selectedGroup: string = '';
  selectedLine: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private sopService: SopService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedArea = params['area'];
      this.selectedRole = params['role'];
      this.selectedGroup = params['group'];
      this.selectedLine = params['line'];
    });

    this.fetchAreas();
    this.fetchRoles();
    this.fetchGroups();
    this.fetchLines();

    if (this.selectedLine) {
      this.onLineChange(this.selectedLine);
    }
  }

  fetchAreas(): void {
    this.apiService.getAllAreas().subscribe(
      (res: any) => {
        this.areas = res.data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  fetchRoles(): void {
    this.apiService.getAllRole().subscribe(
      (res: any) => {
        this.roles = res.data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  fetchGroups(): void {
    this.apiService.getAllTeam().subscribe(
      (res: any) => {
        this.groups = res.data[0];
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  fetchLines(): void {
    this.apiService.getAllLine().subscribe(
      (res: any) => {
        this.lines = res.data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onLineChange(event: any): void {
    const selectLine = event.target.value;
    this.filteredAreas = this.areas.filter(area => area.id_line == selectLine);
  }

  addUser(): void {
    const newUser = {
      nama_user: this.nama_user,
      nik: this.nik,
      password: this.password,
      role_id: this.role,
      id_line: this.line,
      id_area: this.area,
      group_id:this.group

    }
  this.apiService.insertUser(newUser).subscribe(
    (res: any) => {
      this.router.navigate(['/master'])
    },
    (error: any) => {
      console.error('Error:', error);
    }
  );
}

}
