import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.scss']
})
export class AddVisitorComponent {
  visitorData: any = {};
  date!: string;
  nama_tamu!: string;
  nama_vendor!: string;
  id_card_hijau!: number;
  id_card_merah!: number;
  keperluan!: string;
  pic!: string;
  jam_masuk!: string;
  jam_keluar!: string;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  addVisitor(): void {
    const newVisitor = {
      date: this.date,
      nama_tamu: this.nama_tamu,
      nama_vendor: this.nama_vendor,
      id_card_hijau: this.id_card_hijau,
      id_card_merah: this.id_card_merah,
      keperluan: this.keperluan,
      pic: this.pic,
      jam_masuk: this.jam_masuk,
      jam_keluar: this.jam_keluar
    };

    console.log('New Visitor Data:', newVisitor); // Added console log

    this.apiService.insertVisitor(newVisitor).subscribe(
      (response: any) => {
        console.log('Visitor added successfully', response);
        this.router.navigate(['/visitor-al4']); // Redirect to the visitor list page
      },
      (error: any) => {
        console.error('Error adding visitor:', error);
      }
    );
  }
}
