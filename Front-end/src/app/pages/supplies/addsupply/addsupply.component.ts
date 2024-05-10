import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'add-supply',
  templateUrl: './addsupply.component.html',
  styleUrls: ['./addsupply.component.scss']
})
export class AddSupplyComponent implements OnInit {

  areas: any[] = [];
  newSupply: any = {
    nama_supply: '',
    id_area: null,
    stok: 0, 
    eom: '',
    no_material: '',
    minimal_stok: '',
    max_stok: '',
    resv_date: '' 
  };

  selectedArea: string = '';
  submitted: boolean = false;
  errors: string[] = [];

  breadCrumbItems!: Array<{}>;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedArea = params['area'];
    });

    this.fetchAreas();
    this.getBreadCrumbItems();
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

  addSupply(): void {
    this.submitted = true;
    this.errors = [];
  
    if (this.formValid()) {
      this.apiService.insertSupply(this.newSupply).subscribe(
        (res: any) => {
          this.goBackWithArea();
        },
        (error: any) => {
          console.error('Error:', error);
          
          let errorMessage = 'An unexpected error occurred.';
  
          if (error.status === 400) {
            errorMessage = 'No Material SAP di Area Tersebut Sudah Ada';
          } else if (error.status === 404) {
            errorMessage = 'Resource not found.';
          }
          this.errors.push(errorMessage);
        }
      );
    }
  }

  formValid(): boolean {
    return this.newSupply.no_material && this.newSupply.nama_supply && this.newSupply.id_area;
  }

  goBackWithArea(): void {
    if (this.selectedArea) {
      this.router.navigate(['/supplies'], { queryParams: { area: this.selectedArea } });
    } else {
      this.router.navigate(['/supplies']);
    }
  }

  getBreadCrumbItems(){
    this.breadCrumbItems = [{ label: "ADD SUPPLIES" }]; 
  }
}
