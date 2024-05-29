import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api-service.service';

@Component({
  selector: 'edit-supply',
  templateUrl: './editsupply.component.html',
  styleUrls: ['./editsupply.component.scss']
})
export class EditSupplyComponent implements OnInit {
  supply: any = {};
  areas: any[] = [];
  selectedArea: string = '';

  breadCrumbItems!: Array<{}>;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedArea = params['area'];
    });
    const supplyId = this.route.snapshot.paramMap.get('id');
    this.fetchSupplyById(Number(supplyId));
    this.fetchAreas();
    this.getBreadCrumbItems();
  }

  fetchSupplyById(supplyId: number): void {
    this.apiService.getSupplyById(supplyId).subscribe(
      (res: any) => {
        this.supply = res.data[0];
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

  updateSupply(): void {
    this.apiService.updateSupply(this.supply.id_supply, this.supply).subscribe(
      (res: any) => {
        this.goBackWithArea();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  goBackWithArea(): void {
    if (this.selectedArea) {
      this.router.navigate(['/supplies'], { queryParams: { area: this.selectedArea } });
    } else {
      this.router.navigate(['/supplies']);
    }
  }

  getBreadCrumbItems(){
    this.breadCrumbItems = [{ label: "EDIT SUPPLIES" }]; 
  }
}
