import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api-service.service';

@Component({
  selector: 'app-editmaster',
  templateUrl: './editmaster.component.html',
  styleUrls: ['./editmaster.component.scss']
})
export class EditmasterComponent implements OnInit {
  areas: any[] = [];
  roles: any[] = [];
  groups: any[] = [];
  user: any = {};

  selectedArea: string = '';
  selectedRole: string = '';
  selectedGroup: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      this.fetchUserById(userId);
      this.fetchAreas();
      this.fetchRoles();
      this.fetchGroups();
    });
  }

  fetchUserById(userId: number): void {
    this.apiService.getUserById(userId).subscribe(
      (res: any) => {
        this.user = res.data[0];
      },
      (error: any) => {
        console.error(error);
      }
    );
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

  updateUser(): void {
    this.apiService.updateUser(this.user.id_user, this.user).subscribe(
      (res: any) => {
        this.router.navigate(['/master'])
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
